import test from 'ava';
import sinon from 'sinon';
import jwt from 'jwt-simple';

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
  const token = await authentication.getToken('email', 'wrongpassword');
  t.false(typeof token === 'undefined');
  t.true(token.startsWith('ey'));
});

test.serial('getToken: should not encode password in JWT', async (t) => {
  t.context.sandbox.stub(jwt, 'encode');
  t.context.sandbox.stub(User, 'findOne').returns({
    password: 'foo',
    checkValidPassword: sinon.stub().returns(true),
  });
  await authentication.getToken('email', 'wrongpassword');
  const [userArgs] = jwt.encode.getCall(0).args;
  t.true(typeof userArgs.password === 'undefined');
});
