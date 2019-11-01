import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../app';
import { Stairs } from '../../models';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get with limit', async (t) => {
  const stairs = [{
    id: 1,
    stairs: 5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Stairs, 'findAll').resolves(stairs);

  await request(app)
    .get('/stairs?username=admin&password=foo&limit=1')
    .expect(200)
    .then(() => {
      t.true(Stairs.findAll.calledWith({
        order: [['createdAt', 'DESC']],
        limit: 1,
      }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all stairs in correct order - admin', async (t) => {
  const stairs = [{
    id: 1,
    stairs: 5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Stairs, 'findAll').resolves(stairs);

  await request(app)
    .get('/stairs?username=admin&password=foo')
    .expect(200)
    .then(() => {
      t.true(Stairs.findAll.calledWith({ order: [['createdAt', 'DESC']] }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all stairs - admin', async (t) => {
  const stairs = [{
    id: 1,
    stairs: 5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Stairs, 'findAll').resolves(stairs);

  await request(app)
    .get('/stairs?username=admin&password=foo')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, stairs);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all stairs - readonly', async (t) => {
  const stairs = [{
    id: 1,
    stairs: 5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Stairs, 'findAll').resolves(stairs);

  await request(app)
    .get('/stairs?username=readonly&password=foo')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, stairs);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should fail to get entries', async (t) => {
  t.context.sandbox.stub(Stairs, 'findAll').rejects(new Error('NOPE'));

  await request(app)
    .get('/stairs?username=readonly&password=foo')
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not return anything - no roles user', async (t) => {
  const stairs = [{
    id: 1,
    stairs: 5,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Stairs, 'findAll').resolves(stairs);

  await request(app)
    .get('/stairs?username=inexisting&password=foo')
    .expect(401)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should create entry - default', async (t) => {
  t.context.sandbox.stub(Stairs, 'create').resolves();

  await request(app)
    .post('/stairs')
    .send({
      stairs: 5,
      username: 'admin',
      password: 'foo',
    })
    .expect(201)
    .then(() => {
      t.true(Stairs.create.calledWith({ stairs: 5 }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not create entry - unauthorized', async (t) => {
  t.context.sandbox.stub(Stairs, 'create').resolves();

  await request(app)
    .post('/stairs')
    .send({
      stairs: 5,
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
  t.context.sandbox.stub(Stairs, 'create').resolves();

  await request(app)
    .post('/stairs')
    .send({
      stairs: 5,
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
  t.context.sandbox.stub(Stairs, 'create').rejects(new Error('NOPE'));

  await request(app)
    .post('/stairs')
    .send({
      stairs: 5,
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
  t.context.sandbox.stub(Stairs, 'destroy').resolves();

  await request(app)
    .delete('/stairs/1')
    .send({
      username: 'admin',
      password: 'foo',
    })
    .expect(200)
    .then(() => {
      t.true(Stairs.destroy.calledWith({ where: { id: '1' } }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not delete entry - unauthorized', async (t) => {
  t.context.sandbox.stub(Stairs, 'destroy').resolves();

  await request(app)
    .delete('/stairs/1')
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
  t.context.sandbox.stub(Stairs, 'destroy').resolves();

  await request(app)
    .delete('/stairs/1')
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
  t.context.sandbox.stub(Stairs, 'destroy').rejects(new Error('NOPE!'));

  await request(app)
    .delete('/stairs/1')
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
