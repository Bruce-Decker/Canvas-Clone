const Quiz = require('../models/Quiz')
const Grade = require('../models/Grade')

exports.quizService = function quizService(info, callback) {
    switch(info.method) {
        case "post_createQuiz":
            post_createQuiz(info, callback)
            break  
        case "get_quizzes":
            get_quizzes(info, callback)
            break
        case "get_takeQuiz":
            get_takeQuiz(info, callback)
            break
        case "post_submitQuiz":
            post_submitQuiz(info, callback)
            break
    }
}

function post_createQuiz(info, callback) {
    var quiz_name = info.message.quiz_name
    quiz_name = quiz_name.replace(/\s/g, '');
    console.log(quiz_name)
    quiz_name = quiz_name.toString()
    var email = info.message.email
    var CourseId = info.id
    var question_id = info.message.question_id;
    var question = info.message.question
    var uuid = email +  CourseId +  quiz_name + '-' + question_id 
    
    
    var option_one_question = info.message.option_one_question
    var option_two_question = info.message.option_two_question
    var option_three_question = info.message.option_three_question
    var option_four_question = info.message.option_four_question
    var right_answer = info.message.right_answer
    var points = parseInt(info.message.points)
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
                     //res.send("Fail")
                     callback(null, "Fail")
				 } else {
				 	 console.log(result)
                     //res.send("Update successfully")
                     callback(null, "Update successfully")
	 			 }
			})
		} else {
            console.log(data)
				Quiz.create(data, function(err, newlyCreated) {
					if (err) {
						 console.log(err);
                         //res.send({msg: "False"});
                         callback(null, {msg: "False"})
					} else {
                         //res.send({msg: "True"});
                         callback(null, {msg: "True"})
					}
			   })
		}

	})
}


function get_quizzes(info, callback) {
    var CourseId = info.CourseId
    var email = info.email
    Quiz.aggregate([
      
        { $match: {
           CourseId: CourseId,
           email: email
         }
       },
       {
        $group: {
            _id: '$quiz_name',  
            points: {$sum: '$points'}
        }
    }
       
    ]).then(result => callback(null, result))

}

function get_takeQuiz(info, callback) {
    var CourseId = info.CourseId
    var quiz_name = info.quizName
    var faculty_email = info.faculty_email
    Quiz.find({CourseId: CourseId, quiz_name: quiz_name, email: faculty_email}).sort('question_id').exec(function(err, docs) {
        if (err) {
            //res.send({msg: "Error"})
            callback(null, {msg: "Error"})
         } else {
             //res.send(docs)
            callback(null, docs)
         }
    })

}

function post_submitQuiz(info, callback) {
    console.log("info sadf24")
    console.log(info)
   
    var CourseId = info.CourseId
    var quiz_name = info.quizName
    var faculty_email = info.faculty_email
    var student_email = info.student_email
    var submission_data = info.message
    var user_answer_store = []
    var correct_answer_store = []
    var total_points = 0
    for (var key in submission_data) {
        if (submission_data.hasOwnProperty(key)) {
            console.log("sd2332sdfsdfsdffdf " +  submission_data[key] + " key " + key)
            user_answer_store.push(submission_data[key])
        }
    }



    Quiz.find({CourseId: CourseId, quiz_name: quiz_name, email: faculty_email}, function(err, result) {
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
          console.log("current score is a " + current_score)
          var uuid = student_email + "-" + CourseId + "-" + quiz_name 
          var grade_data = {
            uuid,
            email: student_email,
            item_name: quiz_name,
            CourseId,
            earned_points: current_score,
            full_points: total_points
       }
          Grade.findOne({uuid: uuid}, function(err, docs) {
            if (docs) {
                Grade.findOneAndUpdate({uuid: uuid}, grade_data, function(err, result) {
                     if (err) {
                         //res.send("Fail")
                         callback(null, "Fail")
                     } else {
                         console.log(result)
                         //res.send("Update successfully")
                         callback(null, "Update successfully")
                      }
                })
            } else {
                console.log(grade_data)
                    Grade.create(grade_data, function(err, newlyCreated) {
                        console.log(grade_data)
                        if (err) {
                            console.log(err);
                             //res.send({msg: "False"});
                             callback(null, {msg: "False"})
                        } else {
                             //res.send({msg: "True"});
                             callback(null, {msg: "True"})
                        }
                   })
            }
    
        })

        }

    })
}

function compare_answers(user_answer, correct_answer) {
    var count = 0
    for (var i = 0; i < user_answer.length; i++) {
            console.log("ASDf09324 " + user_answer[i])
            console.log("adsfo90 " + correct_answer[i])
      
            if (user_answer[i] === correct_answer[i]) {
                count = count + 1
            }
        
    }

    return count;

}


