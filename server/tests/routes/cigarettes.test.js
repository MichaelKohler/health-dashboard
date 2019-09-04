import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../index';
import { Cigarette } from '../../models';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.skip('should return empty array', async (t) => {
  await request(app)
    .get('/cigarettes')
    .expect(200)
    .then((response) => {
      t.is(response, []);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.skip('should create entry - not rolled', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
    .send({ rolled: false })
    .expect(201)
    .then(() => {
      t.true(Cigarette.create.calledWith({ rolled: false }));
    })
    .catch((error) => {
      console.error(error);
      t.fail(error.message);
    });
});

test.skip('should create entry - rolled', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
    .send({ rolled: true })
    .expect(201)
    .then(() => {
      t.true(Cigarette.create.calledWith({ rolled: true }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.skip('should create entry - default', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
    .send({})
    .expect(201)
    .then(() => {
      t.true(Cigarette.create.calledWith({ rolled: true }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});
