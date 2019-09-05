import test from 'ava';
import sinon from 'sinon';

const weight = require('../../models/weight');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  const Weight = sinon.stub();
  t.context.stubs = {
    sequelizeStub: {
      define: t.context.sandbox.stub().returns(Weight),
    },
  };

  t.context.DataTypes = {
    FLOAT: 'FLOAT',
  };
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('should init correct fields', (t) => {
  const { stubs, DataTypes } = t.context;
  weight(stubs.sequelizeStub, DataTypes);
  t.true(stubs.sequelizeStub.define.calledOnce);
  const [modelName, fullFields] = stubs.sequelizeStub.define.getCall(0).args;
  t.is(modelName, 'Weight');
  const fields = Object.keys(fullFields);
  t.true(fields.includes('weight'));
});
