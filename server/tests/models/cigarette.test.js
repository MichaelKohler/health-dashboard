import test from 'ava';
import sinon from 'sinon';

const cigarette = require('../../models/cigarette');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  const Cigarette = sinon.stub();
  t.context.stubs = {
    sequelizeStub: {
      define: t.context.sandbox.stub().returns(Cigarette),
    },
  };

  t.context.DataTypes = {
    BOOLEAN: 'BOOLEAN',
  };
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('should init correct fields', (t) => {
  const { stubs, DataTypes } = t.context;
  cigarette(stubs.sequelizeStub, DataTypes);
  t.true(stubs.sequelizeStub.define.calledOnce);
  const [modelName, fullFields] = stubs.sequelizeStub.define.getCall(0).args;
  t.is(modelName, 'Cigarette');
  const fields = Object.keys(fullFields);
  t.true(fields.includes('rolled'));
});
