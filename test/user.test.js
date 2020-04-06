const User = require("../models/user-schema");

function userTest(chai, server) {
    const newUserError = {
        username: "ahmed",
        password: "ahmed"
    }

    const newUser = {
        username: "ahmed",
        password: "ahmed",
        email: "ahmed@ahmed.com"
    }

    before((done) => {
        User.deleteMany({}, (err) => { 
        done();           
        })    
    });

    describe('/POST User', () => {

        it('should create a user', async() => {
            try{
                const res = await chai.request(server)
                                    .post('/api/v1/registerUser')
                                    .send(newUser)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('username');
                res.body.data.should.have.property('email'); 
            }
            catch(err){
                throw err;
            }
        });

        it('should not create a user without username and email field', async() => {
            try{
                const res = await chai.request(server)
                                    .post('/api/v1/registerUser')
                                    .send(newUserError)
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('error'); 
            }
            catch(err){
                throw err;
            }
        });


    });
}
module.exports = userTest;