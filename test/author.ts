import chai, { assert, expect } from "chai"
import chaiHttp from "chai-http"
import serverApp from '../src/index'
chai.should()
chai.use(chaiHttp)

describe('Author API', () => {
    after(() => serverApp.close());
    it('with done & a callback', (done) => {
        chai.request(serverApp)
            .get('/hello')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });
    /**
     * Test the GET route
     */
    describe('GET All author', () => {
        it('it should GET all the authors', async () => {
            const res = await chai.request(serverApp).get('/author');
            assert.equal(res.status, 200);
            assert.equal(res.body.success, true);
            assert.equal(res.body.data.length, 5);
            assert.equal(res.body.message, "Success");

        });
    });
    describe('/GET All Author', () => {
        it('it should GET all the authors', (done) => {
           chai.request(serverApp)
              .get('/author')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                done();
              });
        });
    });

    describe('/GET a Author', () => {
        it('it should GET a  authors', (done) => {
           chai.request(serverApp)
              .get('/author/' + 3)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('bio');
                res.body.data.should.have.property('image');
                res.body.data.should.have.property('id').eql(3);
                done();
              });
        });
    });

    /**
     * Test the POST route
     */



    /**
     * Test the PUT route
     */



    /**
     * Test the DELETE route
     */


})
