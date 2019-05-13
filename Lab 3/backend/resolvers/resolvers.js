const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const jwtToken = (user, secret, expiration_time) => {
    const { name, email } = user;
    return jwt.sign({ name, email }, secret, {expiresIn: expiration_time});
};
   

exports.resolvers = {
    Query: {
        showUnregisteredCourses: async (root, { email }) => {
            const allCourses = await Roster.find({email})
            const new_array = []
            allCourses.forEach(function(element) {  
                new_array.push(element.CourseId)
            })
            const allListedCourses = await Course.find({CourseId: { "$nin": new_array } })
            return allListedCourses
        },
        showRegisteredCourses: async (root, { email }) => {
            const allCourses = await Roster.find({email})
            const new_array = []
            allCourses.forEach(function(element) {  
                new_array.push(element.CourseId)
            })
            const allListedCourses = await Course.find({CourseId: { "$in": new_array } })
            return allListedCourses
          
        },
        getAllUsers: async (root, args, { Auth }) => {
           const allUsers = await Auth.find()
           return allUsers
       },

       getActiveUser: async (root, args, { activeUser, Auth }) => {
           if (!activeUser) {
               return null
           }

           const user = await User.findOne({ email: activeUser.email})
              
       },
       showCreatedCourses: async (root,  {  email }) => {
           console.log(email)
           const allCreatedCourses = await Course.find({email})
           return allCreatedCourses
       },
       getProfile: async (root, { email }) => {
            const profileInfo = await Profile.findOne({email})
            return profileInfo
       }

   },
    Mutation: {


        register: async (root, { first_name, last_name, email, password }, { Auth }) => {
            const user = await Auth.findOne({ email });
            if (user) {
                throw new Error('User already exists')
            }
            
           
            console.log("email in resolver " + email)
            console.log("password in resolver " + password)
   
            const newUser = await new Auth({
                first_name,
                last_name,
                email,
                password 
            }).save()
              return {
                  jwtToken: jwtToken(newUser, 'secret', '1hr')
              }
       },

       login: async (root, { email, password}, {Auth}) => {
             const user = await Auth.findOne({email})
             if (!user) {
                throw new Error('User not found')
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            console.log(password)
            console.log(user.password)
            if (!isValidPassword) {
                throw new Error('Invalid password')
            } 
            return { jwtToken: jwtToken(user, 'secret', '1hr') }
       },

       registerCourse: async (root, { email, faculty_email, CourseId }) => {
        const newRecipe = await new Roster({
            email,
            faculty_email,
            CourseId
          }).save();
       },
       createCourse: async (root, { email, CourseId, CourseName, CourseDept, CourseDescription, 
            CourseRoom, CourseCapacity, WaitlistCapacity,  CourseTerm}, {Auth}) => {
            const course = await Course.findOne({email, CourseId})
            var data = {
                email: email,
                CourseId: CourseId,
                CourseName: CourseName,
                CourseDept: CourseDept,
                CourseDescription: CourseDescription,
                CourseRoom: CourseRoom,
                CourseCapacity: CourseCapacity,
                WaitlistCapacity: WaitlistCapacity,
                CourseTerm: CourseTerm
            }
        if (!course) {
            //throw new Error('Course already exists')
            console.log("find it")
            data = await new Course ({
                email: email,
                CourseId: CourseId,
                CourseName: CourseName,
                CourseDept: CourseDept,
                CourseDescription: CourseDescription,
                CourseRoom: CourseRoom,
                CourseCapacity: CourseCapacity,
                WaitlistCapacity: WaitlistCapacity,
                CourseTerm: CourseTerm
            }).save()
        } else {
            console.log("sfdfsf")
            console.log(email)
            console.log(CourseId)
            await Course.findOneAndUpdate({email, CourseId}, data)
          
               
        }
    
        return data
     },

     createProfile: async (root, { name, email, phone_number, about_me, city, 
        country, company, school,  hometown, languages, gender}, { Profile } ) => {
        const profile = await Profile.findOne({email: email})
        var data = {
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
        if (!profile) {
           await Profile.create(data)
        } else {
            await Profile.findOneAndUpdate({email}, data)
        }
       
     },


     deleteCreatedCourse: async (root, {email, CourseId}, { Course } ) => {
          const course = await Course.findOneAndRemove({ email: email, CourseId: CourseId })
          return course
     },

     deleteRegisteredCourse: async (root, {email, CourseId}, { Course } ) => {
        const course = await Roster.findOneAndRemove({ email: email, CourseId: CourseId })
        return course
     }

    }

}