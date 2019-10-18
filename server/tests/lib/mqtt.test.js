import test from 'ava';
import sinon from 'sinon';
import mqtt from 'mqtt';

const mqttLib = require('../../lib/mqtt');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.onStub = t.context.sandbox.stub();
  t.context.subscribeStub = t.context.sandbox.stub();
  t.context.sandbox.stub(mqtt, 'connect').returns({
    on: t.context.onStub,
    subscribe: t.context.subscribeStub,
  });
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should connect and setup', (t) => {
  mqttLib.initialize();

  t.true(mqtt.connect.calledOnce);

  const { args: connectArgs } = t.context.onStub.getCall(0);
  const [, connectCb] = connectArgs;
  t.notThrows(connectCb);

  const { args: disconnectArgs } = t.context.onStub.getCall(1);
  const [, disconnectCb] = disconnectArgs;
  t.notThrows(disconnectCb);

  t.true(t.context.subscribeStub.calledOnce);
});

test.serial('should return instance', (t) => {
  const mqttInstance = mqttLib.initialize();
  t.false(typeof mqttInstance === 'undefined');
});

test.serial('should return same instance', (t) => {
  const mqttInstance = mqttLib.initialize();
  const mqttInstance2 = mqttLib.initialize();
  t.is(mqttInstance, mqttInstance2);
});
