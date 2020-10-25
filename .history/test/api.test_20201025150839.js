const request = require('supertest');
const app = require('../app');
const mongoDB = require('../mongoDB');

/* beforeAll(() => {
  mongoDB.connect();
});
afterAll(done => {
  mongoDB.disconnect(done);
}); */

describe('Test for invalid requests', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });
  test('Invalid endpoint, it should response 404', done => {
    request(app)
      .get('/invalid')
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

  test('Invalid params it should response 400', done => {
    request(app)
      .post('/')
      .send({
        foo: 'bar'
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test('Invalid params it should response 400 - 2', done => {
    request(app)
      .post('/')
      .send({
        startDate: 'bar',
        endDate: 0,
        minCount: '...',
        maxCount: ''
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});

describe('Test main endpoint', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });
  test('It should response with Success', done => {
    request(app)
      .post('/')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2700,
        maxCount: 3000
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.code).toBe(0);
        expect(response.body.msg).toBe('Success');
        done();
      });
  });
});