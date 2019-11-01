import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../app';
import { Cigarette } from '../../models';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get with limit', async (t) => {
  const cigarettes = [{
    id: 1,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Cigarette, 'findAll').resolves(cigarettes);

  await request(app)
    .get('/cigarettes?username=admin&password=foo&limit=1')
    .expect(200)
    .then(() => {
      t.true(Cigarette.findAll.calledWith({
        order: [['createdAt', 'DESC']],
        limit: 1,
      }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all cigarettes in correct order - admin', async (t) => {
  const cigarettes = [{
    id: 1,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Cigarette, 'findAll').resolves(cigarettes);

  await request(app)
    .get('/cigarettes?username=admin&password=foo')
    .expect(200)
    .then(() => {
      t.true(Cigarette.findAll.calledWith({ order: [['createdAt', 'DESC']] }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all cigarettes - admin', async (t) => {
  const cigarettes = [{
    id: 1,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Cigarette, 'findAll').resolves(cigarettes);

  await request(app)
    .get('/cigarettes?username=admin&password=foo')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, cigarettes);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should return all cigarettes - readonly', async (t) => {
  const cigarettes = [{
    id: 1,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Cigarette, 'findAll').resolves(cigarettes);

  await request(app)
    .get('/cigarettes?username=readonly&password=foo')
    .expect(200)
    .then((response) => {
      t.deepEqual(response.body, cigarettes);
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should fail to get entries', async (t) => {
  t.context.sandbox.stub(Cigarette, 'findAll').rejects(new Error('NOPE'));

  await request(app)
    .get('/cigarettes?username=readonly&password=foo')
    .expect(500)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not return anything - no roles user', async (t) => {
  const cigarettes = [{
    id: 1,
    createdAt: Date.now(),
  }];
  t.context.sandbox.stub(Cigarette, 'findAll').resolves(cigarettes);

  await request(app)
    .get('/cigarettes?username=inexisting&password=foo')
    .expect(401)
    .then(() => t.pass())
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should create entry - not rolled', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
    .send({
      rolled: false,
      username: 'admin',
      password: 'foo',
    })
    .expect(201)
    .then(() => {
      t.true(Cigarette.create.calledWith({ rolled: false }));
    })
    .catch((error) => {
      console.error(error);
      t.fail(error.message);
    });
});

test.serial('should create entry - rolled', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
    .send({
      rolled: true,
      username: 'admin',
      password: 'foo',
    })
    .expect(201)
    .then(() => {
      t.true(Cigarette.create.calledWith({ rolled: true }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should create entry - default', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
    .send({
      username: 'admin',
      password: 'foo',
    })
    .expect(201)
    .then(() => {
      t.true(Cigarette.create.calledWith({ rolled: true }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not create entry - unauthorized', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
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

test.serial('should not create entry - readonly', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').resolves();

  await request(app)
    .post('/cigarettes')
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

test.serial('should fail to create entry', async (t) => {
  t.context.sandbox.stub(Cigarette, 'create').rejects(new Error('NOPE'));

  await request(app)
    .post('/cigarettes')
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

test.serial('should delete entry - default', async (t) => {
  t.context.sandbox.stub(Cigarette, 'destroy').resolves();

  await request(app)
    .delete('/cigarettes/1')
    .send({
      username: 'admin',
      password: 'foo',
    })
    .expect(200)
    .then(() => {
      t.true(Cigarette.destroy.calledWith({ where: { id: '1' } }));
    })
    .catch((error) => {
      t.fail(error.message);
    });
});

test.serial('should not delete entry - unauthorized', async (t) => {
  t.context.sandbox.stub(Cigarette, 'destroy').resolves();

  await request(app)
    .delete('/cigarettes/1')
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
  t.context.sandbox.stub(Cigarette, 'destroy').resolves();

  await request(app)
    .delete('/cigarettes/1')
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
  t.context.sandbox.stub(Cigarette, 'destroy').rejects(new Error('NOPE!'));

  await request(app)
    .delete('/cigarettes/1')
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
