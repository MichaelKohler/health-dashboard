import test from 'ava';
import sinon from 'sinon';

const roleCheck = require('../../middleware/roles');

const PERMISSION_DENIED_STATUS = 403;

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.req = {
    user: {
      getUserRoles: sinon.stub().resolves([{ dataValues: { name: 'admin' } }]),
    },
  };
  t.context.res = {
    status: sinon.stub(),
    json: sinon.stub(),
  };
  t.context.next = sinon.stub();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('should call next if user has role', async (t) => {
  const {
    req, res, next,
  } = t.context;
  const check = await roleCheck('admin');
  await check(req, res, next);
  t.true(req.user.getUserRoles.calledOnce);
  t.true(next.calledOnce);
});

test('should call next if user has role (multiple user roles)', async (t) => {
  const {
    req, res, next,
  } = t.context;
  req.user.getUserRoles.resolves([{ dataValues: { name: 'foo' } }, { dataValues: { name: 'meh' } }]);
  const check = await roleCheck('foo');
  await check(req, res, next);
  t.true(req.user.getUserRoles.calledOnce);
  t.true(next.calledOnce);
});

test('should call next if user has role (multiple user roles to check)', async (t) => {
  const {
    req, res, next,
  } = t.context;
  const check = await roleCheck('foo', 'admin');
  await check(req, res, next);
  t.true(req.user.getUserRoles.calledOnce);
  t.true(next.calledOnce);
});

test('should send 403 if user does not have role', async (t) => {
  const {
    req, res, next,
  } = t.context;
  const check = await roleCheck('inexistingrole');
  await check(req, res, next);
  t.true(req.user.getUserRoles.calledOnce);
  t.true(res.status.calledWith(PERMISSION_DENIED_STATUS));
  t.true(res.json.calledWith({}));
  t.false(next.called);
});

test('should send 403 if user does not have role (multiple user roles to check)', async (t) => {
  const {
    req, res, next,
  } = t.context;
  const check = await roleCheck('inexistingrole', 'inexisting2');
  await check(req, res, next);
  t.true(req.user.getUserRoles.calledOnce);
  t.true(res.status.calledWith(PERMISSION_DENIED_STATUS));
  t.true(res.json.calledWith({}));
  t.false(next.called);
});
