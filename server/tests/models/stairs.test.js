import test from 'ava';
import sinon from 'sinon';

const stairs = require('../../models/stairs');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  const Stairs = sinon.stub();
  t.context.stubs = {
    sequelizeStub: {
      define: t.context.sandbox.stub().returns(Stairs),
    },
  };

  t.context.DataTypes = {
    INTEGER: 'INTEGER',
  };
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('should init correct fields', (t) => {
  const { stubs, DataTypes } = t.context;
  stairs(stubs.sequelizeStub, DataTypes);
  t.true(stubs.sequelizeStub.define.calledOnce);
  const [modelName, fullFields] = stubs.sequelizeStub.define.getCall(0).args;
  t.is(modelName, 'Stairs');
  const fields = Object.keys(fullFields);
  t.true(fields.includes('stairs'));
});
