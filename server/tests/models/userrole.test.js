import test from 'ava';
import sinon from 'sinon';

const userRole = require('../../models/userrole');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  const belongsToMany = t.context.sandbox.stub();
  t.context.stubs = {
    belongsToMany,
    sequelizeStub: {
      define: t.context.sandbox.stub().returns({
        belongsToMany,
      }),
    },
  };

  t.context.DataTypes = {
    INTEGER: 'INTEGER',
    STRING: 'STRING',
  };
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('should init correct fields', (t) => {
  const { stubs, DataTypes } = t.context;
  userRole(stubs.sequelizeStub, DataTypes);
  t.true(stubs.sequelizeStub.define.calledOnce);
  const [modelName, fullFields] = stubs.sequelizeStub.define.getCall(0).args;
  t.is(modelName, 'UserRole');
  const fields = Object.keys(fullFields);
  t.true(fields.includes('id'));
  t.true(fields.includes('name'));
});

test('should associate relationship', (t) => {
  const { stubs, DataTypes } = t.context;
  const UserRole = userRole(stubs.sequelizeStub, DataTypes);
  const models = {
    User: {},
  };
  UserRole.associate(models);
  t.true(stubs.belongsToMany.calledWith(models.User, { through: 'UserUserRole' }));
});
