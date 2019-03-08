var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
describe('/GET profile from one user', () => {
    it('it should GET one profile', (done) => {
      chai.request(server)
          .get('/viewProfile/bruce@gmail.com')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
            done();
          });
    });
});

describe('/POST register information', () => {
    it('it should not POST a user without required fields', (done) => {
        let user = {
            name: "Steve",
            email: "steveStrange@gmail.com",
            password: "1234567",
            password2: "1234567"
        }
        console.log(user)
      chai.request(server)
          .post('/createBasicUser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
               
            done();
          });
    });
})

describe('/GET/:CourseId (Get all users from one course)', () => {
    it('it should GET all users by the given course id', (done) => {
       chai.request(server)
          .get('/retrieveUserProfileFromCourse/272')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('image_path');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('email');
                res.body[0].should.have.property('phone_number');
                res.body[0].should.have.property('about_me');
                res.body[0].should.have.property('city');
                res.body[0].should.have.property('country');
                res.body[0].should.have.property('company');
                res.body[0].should.have.property('school');
                res.body[0].should.have.property('hometown');
                res.body[0].should.have.property('languages');
                res.body[0].should.have.property('gender');
            done();
          });
        });

    });



//  delete from basicUsers where email = "steveStrange@gmail.com";
