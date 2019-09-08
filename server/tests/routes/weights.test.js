import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../app';
import { Weight } from '../../models';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should return all weights in correct order - admin', async (t) => {
  const weights = [{
    id: 1,
    weight: 80.5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Weight, 'findAll').resolves(weights);

  await request(app)
    .get('/weights?username=admin&password=foo')
    .expect(200)
    .then(() => {
      t.true(Weight.findAll.calledWith({ order: [['createdAt', 'DESC']] }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all weights - admin', async (t) => {
  const weights = [{
    id: 1,
    weight: 80.5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Weight, 'findAll').resolves(weights);

  await request(app)
    .get('/weights?username=admin&password=foo')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, weights);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all weights - readonly', async (t) => {
  const weights = [{
    id: 1,
    weight: 80.5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Weight, 'findAll').resolves(weights);

  await request(app)
    .get('/weights?username=readonly&password=foo')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, weights);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should fail to get entries', async (t) => {
  t.context.sandbox.stub(Weight, 'findAll').rejects(new Error('NOPE'));

  await request(app)
    .get('/weights?username=readonly&password=foo')
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not return anything - no roles user', async (t) => {
  const weights = [{
    id: 1,
    weight: 5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Weight, 'findAll').resolves(weights);

  await request(app)
    .get('/weights?username=inexisting&password=foo')
    .expect(401)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should create entry - default', async (t) => {
  t.context.sandbox.stub(Weight, 'create').resolves();

  await request(app)
    .post('/weights')
    .send({
      weight: 5,
      username: 'admin',
      password: 'foo',
    })
    .expect(201)
    .then(() => {
      t.true(Weight.create.calledWith({ weight: 5 }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not create entry - unauthorized', async (t) => {
  t.context.sandbox.stub(Weight, 'create').resolves();

  await request(app)
    .post('/weights')
    .send({
      weight: 5,
      username: 'inexistent',
      password: 'foo',
    })
    .expect(403)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not create entry - readonly', async (t) => {
  t.context.sandbox.stub(Weight, 'create').resolves();

  await request(app)
    .post('/weights')
    .send({
      weight: 5,
      username: 'readonly',
      password: 'foo',
    })
    .expect(403)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should fail to create entry', async (t) => {
  t.context.sandbox.stub(Weight, 'create').rejects(new Error('NOPE'));

  await request(app)
    .post('/weights')
    .send({
      weight: 5,
      username: 'admin',
      password: 'foo',
    })
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should delete entry - default', async (t) => {
  t.context.sandbox.stub(Weight, 'destroy').resolves();

  await request(app)
    .delete('/weights/1')
    .send({
      username: 'admin',
      password: 'foo',
    })
    .expect(200)
    .then(() => {
      t.true(Weight.destroy.calledWith({ where: { id: '1' } }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not delete entry - unauthorized', async (t) => {
  t.context.sandbox.stub(Weight, 'destroy').resolves();

  await request(app)
    .delete('/weights/1')
    .send({
      username: 'inexistent',
      password: 'foo',
    })
    .expect(403)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not delete entry - readonly', async (t) => {
  t.context.sandbox.stub(Weight, 'destroy').resolves();

  await request(app)
    .delete('/weights/1')
    .send({
      username: 'readonly',
      password: 'foo',
    })
    .expect(403)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should fail to delete entry', async (t) => {
  t.context.sandbox.stub(Weight, 'destroy').rejects(new Error('NOPE!'));

  await request(app)
    .delete('/weights/1')
    .send({
      username: 'admin',
      password: 'foo',
    })
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});
