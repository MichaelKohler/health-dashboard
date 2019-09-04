import test from 'ava';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';

const authentication = require('../../lib/authentication');
const { User } = require('../../models');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('getToken: should throw if no email provided', async (t) => {
  const error = await t.throwsAsync(authentication.getToken);
  t.is(error.message, 'NO_EMAIL_OR_PASSWORD_PASSED');
});

test('getToken: should throw if no password provided', async (t) => {
  const error = await t.throwsAsync(() => authentication.getToken('email'));
  t.is(error.message, 'NO_EMAIL_OR_PASSWORD_PASSED');
});

test.serial('getToken: should throw if no user found', async (t) => {
  t.context.sandbox.stub(User, 'findOne').returns(null);
  const error = await t.throwsAsync(() => authentication.getToken('email', 'password'));
  t.is(error.message, 'WRONG_USER_OR_PASSWORD');
});

test.serial('getToken: should throw if incorrect password', async (t) => {
  t.context.sandbox.stub(User, 'findOne').returns({
    checkValidPassword: sinon.stub().returns(false),
  });
  const error = await t.throwsAsync(() => authentication.getToken('email', 'wrongpassword'));
  t.is(error.message, 'WRONG_USER_OR_PASSWORD');
});

test.serial('getToken: should get token if correct password', async (t) => {
  t.context.sandbox.stub(User, 'findOne').returns({
    checkValidPassword: sinon.stub().returns(true),
  });
  const token = await authentication.getToken('email', 'password');
  t.false(typeof token === 'undefined');
  t.true(token.startsWith('ey'));
});

test.serial('getToken: should encode in JWT', async (t) => {
  t.context.sandbox.stub(jwt, 'sign');
  t.context.sandbox.stub(User, 'findOne').returns({
    id: 1234,
    password: 'foo',
    checkValidPassword: sinon.stub().returns(true),
    email: 'foo@example.com',
  });
  await authentication.getToken('email', 'somepassword');
  const [userArgs] = jwt.sign.getCall(0).args;
  t.true(typeof userArgs.password === 'undefined');
  t.is(userArgs.id, 1234);
  t.is(userArgs.email, 'foo@example.com');
});
