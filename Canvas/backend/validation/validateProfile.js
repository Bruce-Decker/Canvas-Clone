const Validator = require('validator')
const isEmpty = require('./isEmpty');

module.exports = function validateProfile(data) {
    let errors = {};
  
    data.name = !isEmpty(data.name) ? data.name : '';
   // data.image_path = !isEmpty(data.image_path) ? data.image_path : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
    data.about_me = !isEmpty(data.about_me) ? data.about_me : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.school = !isEmpty(data.school) ? data.school : '';
    data.hometown = !isEmpty(data.hometown) ? data.hometown : '';
    data.languages = !isEmpty(data.languages) ? data.languages : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';

  
   
    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
      }

    //   if (Validator.isEmpty(data.image_path)) {
    //     errors.name = 'A picture is required';
    //   }
  
  

    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Phone number is required';
    }

    if (Validator.isEmpty(data.about_me)) {
        errors.about_me = 'About me is required';
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = 'City is required';
    }

    if (Validator.isEmpty(data.country)) {
        errors.country = 'Country is required';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company is required';
    }

    if (Validator.isEmpty(data.school)) {
        errors.school = 'School is required';
    }

    if (Validator.isEmpty(data.hometown)) {
        errors.hometown = 'Hometown is required';
    }

    if (Validator.isEmpty(data.languages)) {
        errors.languages = 'At least one language is required';
    }

    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender is required';
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };