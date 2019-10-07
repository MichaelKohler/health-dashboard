import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../app';
import { Cigarette, Stairs, Weight } from '../../models';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get all stats - admin', async (t) => {
  t.context.sandbox.stub(Cigarette, 'findAll').resolves([]);
  t.context.sandbox.stub(Stairs, 'findAll').resolves([]);
  t.context.sandbox.stub(Weight, 'findAll').resolves([]);

  await request(app)
    .get('/stats?username=admin&password=foo')
    .expect(200)
    .then(() => {
      t.true(Cigarette.findAll.calledOnce);
      t.true(Weight.findAll.calledOnce);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should fail to get stats', async (t) => {
  t.context.sandbox.stub(Cigarette, 'findAll').rejects(new Error('NOPE'));

  await request(app)
    .get('/stats?username=readonly&password=foo')
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not return anything - no roles user', async (t) => {
  t.context.sandbox.stub(Cigarette, 'findAll').resolves([]);
  t.context.sandbox.stub(Stairs, 'findAll').resolves([]);
  t.context.sandbox.stub(Weight, 'findAll').resolves([]);

  await request(app)
    .get('/stats?username=inexisting&password=foo')
    .expect(401)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});
