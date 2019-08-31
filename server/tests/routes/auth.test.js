import test from 'ava';
import request from 'supertest';
import sinon from 'sinon';
import express from 'express';
import bodyParser from 'body-parser';

import authentication from '../../lib/authentication';
import authRoutes from '../../routes/auth';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('no params should fail login and give unsuccessful response', async (t) => {
  t.context.sandbox.stub(authentication, 'getToken').rejects(new Error('NOPE!'));

  await request(makeApp())
    .post('/auth/login')
    .expect('Content-Type', /json/)
    .expect(401)
    .then((response) => {
      t.false(response.body.success);
      t.is(response.body.message, 'Authentication failed');
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('login returns token', async (t) => {
  const TOKEN = 'TOKEN_1234';
  t.context.sandbox.stub(authentication, 'getToken').resolves(TOKEN);

  await request(makeApp())
    .post('/auth/login')
    .send({
      email: 'foo',
      password: 'bla',
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      t.true(response.body.success);
      t.is(response.body.token, `JWT ${TOKEN}`);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

function makeApp() {
  const app = express();
  app.use(bodyParser.json());
  app.use('/auth', authRoutes);
  return app;
}
