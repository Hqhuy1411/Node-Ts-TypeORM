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
    describe('/POST author', () => {
        it('it should POST a author with duplicate email', (done) => {
            let author = {
                name: "Hdq Huy",
                email: "huyngu@fb.comeee",
                bio: "abc",
                image: ""
            }
            chai.request(serverApp)
                .post('/author')
                .send(author)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property('message').eql('Error for   Duplicate');
                    res.body.should.have.property('success').eql(false);
                    done();
                });
        });
        it('it should POST a author ', (done) => {
            let author = {
                name: "Hdq Huy2",
                email: "hdqhuy1411@gmail.com",
                bio: "abc",
                image: ""
            }
            chai.request(serverApp)
                .post('/author')
                .send(author)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Save success');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('email');
                    res.body.data.should.have.property('bio');
                    done();
                });
        });
    });


    /**
     * Test the PUT route
     */

    describe('/PUT/:id author', () => {
        it('it should UPDATE a author given the id', (done) => {
            const idAuthor = 50
            let author = {
                name: "Hdq Huy2 dai ca x4 eqws",
                email: "hdqhuy1411@gmail.com",
            }
            chai.request(serverApp)
                .put('/author/' + idAuthor)
                .send(author)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Update success');
                    res.body.data.should.have.property('name').eql(author.name);
                    done();
                });
        });
    });
    /**
     * Test the DELETE route
     */
    describe('/DELETE  author', () => {
        it('it should Delete a author by id', (done) => {
            const idAuthor = 50
            chai.request(serverApp)
                .delete('/author' + idAuthor)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Delete success');
                    done();
                });
        });

    });
});


