function error_message(id, message){
    document.getElementById(id).innerHTML = message;
  }
  
  
  function validate(event){
    var name = document.getElementById("name").value.trim();
    var gender = document.getElementById("gender").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var city = document.getElementById("city").value.trim();
    var state = document.getElementById("state").value.trim();
    var country = document.getElementById("country").value.trim();
  
    if( name == "" ){
      error_message("name_msg", "Please enter your name");
    }
    else{
      if( name.length < 6 ){
         error_message("name_msg", "Please enter the name which has more than 6 letters.");
      }
      else{
         error_message("name_msg", "");
      }
    }
    
    if( gender == "" ){
      error_message("gender_msg", "Please select your gender")
    }
    else{
      error_message("gender_msg", "")
    }
  
    if( email == "" ){
      error_message("email_msg", "Please enter your email address")
    }
    else{
      if(email.indexOf("@") == -1 || email.length < 6){
        error_message("email_msg", "Please enter the valid email address");
      }
      else{
        error_message("email_msg", "")
      }
    }
    
    if( phone == "" ){
      error_message("phone_msg", "Please enter your phone number")
    }
    else{
       if(isNaN(phone) || phone.length != 10){
          error_message("phone_msg", "Please enter the valid phone number")
        }
        else{
          error_message("phone_msg", "")
        }
    }
    
    if( city == "" ){
      error_message("city_msg", "Please enter your city name");
    }
    else{
      error_message("city_msg", "");
    }
    
    if( state == "" ){
      error_message("state_msg", "Please enter your state name")
    }
    else{
      error_message("state_msg", "")
    }
    
    if( country == "" ){
     error_message("country_msg", "Please enter your country name")
    }
    else{
      error_message("country_msg", "")
    }
  
    if( name == "" || gender == "" || email == "" || 
      phone == "" || city == "" || state == "" || country == "" ){
      return false;
    }
    else{
      return true;
    }
  }