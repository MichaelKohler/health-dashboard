import test from 'ava';
import sinon from 'sinon';

const actionsHandler = require('../../lib/actions-handler');
const mqtt = require('../../lib/mqtt');
const { Cigarette, Stairs } = require('../../models');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should not throw if undefined', (t) => {
  t.context.sandbox.stub(mqtt, 'initialize').returns(undefined);
  t.notThrows(actionsHandler.initialize);
});

test.serial('should register listener for cigarettes', (t) => {
  const onStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'initialize').returns({
    on: onStub,
  });

  actionsHandler.initialize();
  const { args } = onStub.getCall(0);
  t.is(args[0], 'ADD_CIGARETTE');
});

test.serial('should create cigarette', (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();
  const onStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'initialize').returns({
    on: onStub,
  });

  actionsHandler.initialize();
  const { args } = onStub.getCall(0);
  const [, cb] = args;
  cb();
  t.true(Cigarette.create.calledOnce);
});

test.serial('should not throw when failing to create cigarette', (t) => {
  t.context.sandbox.stub(Cigarette, 'create').rejects();
  const onStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'initialize').returns({
    on: onStub,
  });

  actionsHandler.initialize();
  const { args } = onStub.getCall(0);
  const [, cb] = args;
  t.notThrows(cb);
});

test.serial('should register listener for stairs', (t) => {
  const onStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'initialize').returns({
    on: onStub,
  });

  actionsHandler.initialize();
  const { args } = onStub.getCall(1);
  t.is(args[0], 'ADD_STAIRS');
});

test.serial('should create stairs', (t) => {
  t.context.sandbox.stub(Stairs, 'create').resolves();
  const onStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'initialize').returns({
    on: onStub,
  });

  actionsHandler.initialize();
  const { args } = onStub.getCall(1);
  const [, cb] = args;
  cb();
  t.true(Stairs.create.calledOnce);
});

test.serial('should not throw when failing to create stairs', (t) => {
  t.context.sandbox.stub(Stairs, 'create').rejects();
  const onStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'initialize').returns({
    on: onStub,
  });

  actionsHandler.initialize();
  const { args } = onStub.getCall(1);
  const [, cb] = args;
  t.notThrows(cb);
});
