import test from 'ava';
import sinon from 'sinon';
import bcrypt from 'bcrypt';

const user = require('../../models/user');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  const belongsToMany = t.context.sandbox.stub();
  const User = sinon.stub();
  User.belongsToMany = belongsToMany;
  t.context.stubs = {
    belongsToMany,
    sequelizeStub: {
      define: t.context.sandbox.stub().returns(User),
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
  user(stubs.sequelizeStub, DataTypes);
  t.true(stubs.sequelizeStub.define.calledOnce);
  const [modelName, fullFields] = stubs.sequelizeStub.define.getCall(0).args;
  t.is(modelName, 'User');
  const fields = Object.keys(fullFields);
  t.true(fields.includes('id'));
  t.true(fields.includes('email'));
  t.true(fields.includes('password'));
});

test('should associate relationship', (t) => {
  const { stubs, DataTypes } = t.context;
  const User = user(stubs.sequelizeStub, DataTypes);
  const models = {
    UserRole: {},
  };
  User.associate(models);
  t.true(stubs.belongsToMany.calledWith(models.UserRole, { through: 'UserUserRole' }));
});

test.serial('checkValidPassword: should return value of compare - true', (t) => {
  const { stubs, DataTypes, sandbox } = t.context;
  const User = user(stubs.sequelizeStub, DataTypes);
  const newUser = new User();
  sandbox.stub(bcrypt, 'compareSync').returns(true);
  const isValidPassword = newUser.checkValidPassword('foo');
  t.true(isValidPassword);
});

test.serial('checkValidPassword: should return value of compare - false', (t) => {
  const { stubs, DataTypes, sandbox } = t.context;
  const User = user(stubs.sequelizeStub, DataTypes);
  const newUser = new User();
  sandbox.stub(bcrypt, 'compareSync').returns(false);
  const isValidPassword = newUser.checkValidPassword('foo');
  t.false(isValidPassword);
});
