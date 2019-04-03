const Profile = require('../models/Profile')
const Roster = require('../models/Roster')

exports.profileService = function profileService(msg, callback) {
  
    switch(msg.method) {
        case "get_viewProfile":
            get_viewProfile(msg, callback)
            break
        case 'post_viewProfile':
            post_viewProfile(msg, callback)
            break
        case 'get_profileFromCourse':
            get_profileFromCourse(msg, callback)
            break
             
    }
}

function get_viewProfile(msg, callback){
   
    Profile.find({email: msg.email}, function(err, docs) {
        
        if (docs) {
            console.log(docs)
            callback(null, docs);
        } else {
            console.log(err)
            callback(err,"error");
        }
    })
}


function post_viewProfile(msg, callback) {
    console.log('post_viewProfile')
    console.log(msg)
    var image_path = "user_images/" + msg.msg.email + '.jpg'
    var email = msg.msg.email
    var name = msg.msg.name
   
    var phone_number = msg.msg.phone_number
    var about_me = msg.msg.about_me
    var city = msg.msg.city
    var country = msg.msg.country
    var company = msg.msg.company
    var school = msg.msg.school
    var hometown = msg.msg.hometown
    var languages = msg.msg.languages
    var gender = msg.msg.gender
    var data = {
        image_path,
        name,
        email,
        phone_number,
        about_me,
        city,
        country,
        company,
        school,
        hometown,
        languages,
        gender
    }
    
    Profile.findOne({email: email}, function(err, docs) {
		if (docs) {
			Profile.findOneAndUpdate({email: email}, data, function(err, result) {
				 if (err) {
                     //res.send("Fail")
                     callback(err,"error");
				 } else {
				 	console.log(result)
	 				callback(null, data);
	 			 }
			})
		} else {
			   console.log(data)
				Profile.create(data, function(err, newlyCreated) {
					if (err) {
						console.log("Error Data");
                        callback(err,"error");
					} else {
                        callback(null, newlyCreated);
					}
			   })

		}

	})

}

function get_profileFromCourse(msg, callback) {
    var Id = msg.Id;
    var faculty_email = msg.faculty_email
    
    Roster.find({CourseId: Id, faculty_email: faculty_email}, function(err, docs) {
        if (err) {
            throw err
        } else {
            var profile_array = docs.map(i => i.email); 
            var new_array = []
            profile_array.forEach(function(element) {
                console.log(element)
                new_array.push(element)
            })

            Profile.find({email: {$in : new_array}}, function(err, profiles) {
                //res.send(profiles)
                callback(null, profiles)
            })

           
        }
    })
}
