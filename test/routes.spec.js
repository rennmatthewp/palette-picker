const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {});

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return all projects', done => {
      chai
        .request(server)
        .get('/api/v1/projects')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('lil project');
          done();
        });
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should get the specified project based on request params', done => {
      chai
        .request(server)
        .get('/api/v1/projects/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('name');
          response.body.name.should.equal('lil project');
          done();
        });
    });

    it('should respond with a 404 error if no project found', done => {
      chai
        .request(server)
        .get('/api/v1/projects/3')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property('error');
          response.body.error.should.equal('could not find project with id: 3');
          done();
        });
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should create a new project in the db', done => {
      chai
        .request(server)
        .post('/api/v1/projects')
        .send({ name: 'new new' })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          done();
        });
    });

    it('should respond with 422 error if missing required parameters', done => {
      chai
        .request(server)
        .post('/api/v1/projects')
        .send({ wrong: 'nope' })
        .end((error, response) => {
          response.should.have.status(422);
          response.should.be.json;
          response.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(
            'Expected format: { name: <String> }. Missing name property.'
          );
          done();
        });
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should return all palettes', done => {
      chai
        .request(server)
        .get('/api/v1/palettes')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('go blue');
          response.body[0].should.have.property('palette');
          response.body[0].palette.should.be.an('array');
          response.body[0].palette.should.deep.equal([
            '#000ff',
            '#000ff',
            '#000ff',
            '#000ff',
            '#000ff'
          ]);
          done();
        });
    });
  });

  describe('GET /api/v1/palettes/:id', () => {
    it('should respond with the requested palette', done => {
      chai
        .request(server)
        .get('/api/v1/palettes/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(1);
          response.body.should.have.property('name');
          response.body.name.should.equal('go blue');
          response.body.should.have.property('palette');
          response.body.palette.should.be.an('array');
          response.body.palette.should.deep.equal([
            '#000ff',
            '#000ff',
            '#000ff',
            '#000ff',
            '#000ff'
          ]);
          done();
        });
    });

    it('should respond with 404 error if palette is not found', done => {
      chai
        .request(server)
        .get('/api/v1/palettes/4')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find palette with id: 4');
          done();
        });
    });
  });

  describe('POST /api/v1/palettes', () => {
    it('should add a palette to the db and return the palette id', done => {
      chai
        .request(server)
        .post('/api/v1/palettes')
        .send({
          name: 'murderface',
          project_id: 2,
          palette: ['#000000', '#000000', '#000000', '#000000', '#000000']
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(4);
          done();
        });
    });

    it('should respond with 422 error if request is missing required parameters', done => {
      chai
        .request(server)
        .post('/api/v1/palettes')
        .send({
          name: 'murderface',
          project_id: 2
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('error');
          response.body.error.should.equal(
            "Expected format: { name: <String>, project_id: <Number>, palette: <String> }. You're missing a palette property"
          );
          done();
        });
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should remove requested palette from db', done => {
      chai
        .request(server)
        .delete('/api/v1/palettes/1')
        .end((error, response) => {
          response.should.have.status(204);
          done();
        });
    });

    it('should return a 404 error if a palette does not exist', done => {
      chai
        .request(server)
        .delete('/api/v1/palettes/100')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property('error');
          response.body.error.should.equal('Could not find palette to delete');
          done();
        });
    });
  });
});
