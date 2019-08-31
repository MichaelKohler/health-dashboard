import test from 'ava';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

import healthRoutes from '../../routes/health';

test('should not allow unauthenticated user', async (t) => {
  await request(makeApp())
    .get('/health')
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

function makeApp() {
  const app = express();
  app.use(bodyParser.json());
  app.use('/health', healthRoutes);
  return app;
}
