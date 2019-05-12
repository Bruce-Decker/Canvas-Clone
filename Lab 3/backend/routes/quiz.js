const express = require('express');
const router = express.Router();
var multer = require('multer')


const passport = require('passport');

const Quiz = require('../schema/Quiz')
const Grade = require('../schema/Grade')
const mongoose = require('mongoose')
var db = mongoose.connection;



router.post('/createQuiz/:id', (req, res) => {
    var quiz_name = req.body.quiz_name
    quiz_name = quiz_name.replace(/\s/g, '');
    console.log(quiz_name)
    quiz_name = quiz_name.toString()
    var email = req.body.email
    var CourseId = req.params.id
    var question_id = req.body.question_id;
    var question = req.body.question
    var uuid = email +  CourseId +  quiz_name + '-' + question_id 
    
    
    var option_one_question = req.body.option_one_question
    var option_two_question = req.body.option_two_question
    var option_three_question = req.body.option_three_question
    var option_four_question = req.body.option_four_question
    var right_answer = req.body.right_answer
    var points = parseInt(req.body.points)
    var present_time = new Date()
    var time = present_time.getMonth() + "/" + present_time.getDate() + "/"
    time = time + present_time.getFullYear() + " " + present_time.getHours()
    time = time + ":" + present_time.getMinutes() + ":" + present_time.getSeconds()
    time = time + ":" + present_time.getMilliseconds()


    var data = {
       uuid,
       quiz_name,
       question_id,
       email,
       CourseId,
       question,
       option_one_question,
       option_two_question,
       option_three_question,
       option_four_question,
       right_answer,
       points,
       time
    }
   

    Quiz.findOne({uuid: uuid}, function(err, docs) {
		if (docs) {
			Quiz.findOneAndUpdate({uuid: uuid}, data, function(err, result) {
				 if (err) {
				 	res.send("Fail")
				 } else {
				 	console.log(result)
	 				res.send("Update successfully")
	 			 }
			})
		} else {
            console.log(data)
				Quiz.create(data, function(err, newlyCreated) {
					if (err) {
						console.log(err);
						 res.send({msg: "False"});
					} else {
						 res.send({msg: "True"});
					}
			   })
		}

	})

})

router.get('/quizzes/:CourseId/:email', function(req, res) {
    var CourseId = req.params.CourseId
    var email = req.params.email
    // Quiz.aggregate([
    //     {
    //         $group: {
    //             _id: '$CourseId',  //$region is the column name in collection
    //             points: {$sum: '$points'}
    //         }
    //     }       
    // ]).then(result => res.send(result))
    Quiz.aggregate([
        { $match: {
           CourseId: CourseId,
           email: email
         }
       },
       {
        $group: {
            _id: '$quiz_name',  //$region is the column name in collection
            points: {$sum: '$points'}
        }
    }
       
    ]).then(result => res.send(result))
})




router.get('/takeQuiz/:CourseId/:quizName/:faculty_email', function(req, res) {
    var CourseId = req.params.CourseId
    var quiz_name = req.params.quizName
    var faculty_email = req.params.faculty_email
    Quiz.find({CourseId: CourseId, quiz_name: quiz_name, email: faculty_email}, function(err, docs) {
       if (err) {
          res.send({msg: "Error"})
       } else {
           res.send(docs)
       }
    })

})




router.post('/submitQuiz/:CourseId/:quizName', function(req, res) {
    var email = req.body.email;
    var CourseId = req.params.CourseId
    var quiz_name = req.params.quizName
    var email = req.params.faculty_email
    var submission_data = req.body
    var user_answer_store = []
    var correct_answer_store = []
    var total_points = 0
    for (var key in submission_data) {
        if (submission_data.hasOwnProperty(key)) {
            
            user_answer_store.push(submission_data[key])
        }
    }

    Quiz.find({CourseId: CourseId, quiz_name: quiz_name, email: email}, function(err, result) {
        if (err) {
            throw err
        } else {
          
            result.forEach(function(element) {
                console.log(element)
                total_points = element.points + total_points
                correct_answer_store.push(element.right_answer)
            })

            user_answer_store.forEach(function(element) {
              console.log(element)
             
          })

          var correct_count = compare_answers(user_answer_store, correct_answer_store)
          console.log(correct_count)
          var current_score = (correct_count / correct_answer_store.length) * total_points
          console.log("current score is " + current_score)
          var uuid = email + "-" + CourseId + "-" + quiz_name 
          var grade_data = {
            uuid,
            email,
            item_name: quiz_name,
            CourseId,
            earned_points: current_score,
            full_points: total_points
       }
          Grade.findOne({uuid: uuid}, function(err, docs) {
            if (docs) {
                Grade.findOneAndUpdate({uuid: uuid}, grade_data, function(err, result) {
                     if (err) {
                         res.send("Fail")
                     } else {
                         console.log(result)
                         res.send("Update successfully")
                      }
                })
            } else {
                console.log(grade_data)
                    Grade.create(grade_data, function(err, newlyCreated) {
                        console.log(grade_data)
                        if (err) {
                            console.log(err);
                             res.send({msg: "False"});
                        } else {
                             res.send({msg: "True"});
                        }
                   })
            }
    
        })

        }

    })

})



function compare_answers(user_answer, correct_answer) {
    var count = 0
    for (var i = 0; i < user_answer.length; i++) {
      
      
            if (user_answer[i] === correct_answer[i]) {
                count = count + 1
            }
        
    }

    return count;

}


module.exports = router;