var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
describe('/GET profile from one user', () => {
    it('it should GET one profile and get required fields as well as getting expected response', (done) => {
      chai.request(server)
          .get('/profile/viewProfile/bruce@gmail.com')
          .end((err, res) => {
                res.should.have.status(200);
               
            done();
          });
    });
});

describe('/POST register information', () => {
    it('it should POST a user with required fields', (done) => {
        let user = {
           
            email: "tony@gmail.com",
            password: "123456",
        }
        console.log(user)
      chai.request(server)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
               
            done();
          });
    });
})

describe('/GET/:CourseId (Get all users from one course)', () => {
    it('it should GET all users by the given course id and return an array of objects', (done) => {
       chai.request(server)
          .get('/profile/retrieveUserProfileFromCourse/272/bruce@gmail.com')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                
            
            done();
          });
        });

    });

describe('/POST create a course', () => {
        it('it will create a course and return a status code of 200', (done) => {
            let course_info = {
                email: "steve@gmail.com",
                CourseId: "202",
                CourseName: "Software Systems Engineering",
                CourseDept: "CMPE",
                CourseDescription: "Integrated approach to software design and development including requirements elicitation and analysis",
                CourseRoom: "189",
                CourseCapacity: "50",
                WaitlistCapacity: "10",
                CourseTerm: "Spring 2017"
            }
          chai.request(server)
              .post('/course/createCourse')
              .send(course_info)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                   
                done();
              });
        });
})

describe('/GET/:email (Get all registered courses of one user)', () => {
    it('it should GET all courses registered by the user and GET required fields', (done) => {
       chai.request(server)
          .get('/course/registerCourse/bill@gmail.com')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
           
            done();
          });
        });

    });



//  delete from basicUsers where email = "steveStrange@gmail.com";
