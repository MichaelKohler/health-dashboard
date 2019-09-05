import test from 'ava';
import request from 'supertest';

import app from '../..';

test('should return health data - admin', async (t) => {
  await request(app)
    .get('/health?username=admin&password=foo')
    .expect(200)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test('should return health data - readonly', async (t) => {
  await request(app)
    .get('/health?username=readonly&password=foo')
    .expect(200)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not return anything - no roles user', async (t) => {
  await request(app)
    .get('/health?username=inexisting&password=foo')
    .expect(401)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});
