
const form = document.getElementById("users");
console.log(form);
form.addEventListener('submit', (event) => {
  
  event.preventDefault();
 
  
  let username = form.elements[0].value;
  let pword = form.elements[1].value;
  let email = form.elements[2].value;

 
  let xhr = new XMLHttpRequest();

 
  let tempUser = {
    
    username: username,
    password: pword,
    email: email
  };
  console.log(tempUser);

  
    xhr.onreadystatechange = function() {
    
    if(this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data); 
      sessionStorage.setItem('message', xhr.responseText);
      
      //redirect user to the success page
      window.location.replace("registration success.html");
    }else if(this.readyState ===4 && xhr.status ===204) {
        console.log("Failed. Status Code: " + xhr.status)
        var reason = {
            code : xhr.status,
            issue : 'Failed to log in. Incorrect Username or Password.'
        };
        console.log(reason);
        sessionStorage.setItem('failMessage', JSON.stringify(reason));
        console.log(sessionStorage.getItem('failMessage'));
    }else if(this.readyState ===4 && xhr.status === 415) {
      console.log("Failed on Frontend. Status Code: " + xhr.status)
      var reason = {
          code : xhr.status,
          issue : 'METHOD NOT ALLOWED'
      };
      console.log(reason);
      sessionStorage.setItem('failMessage', JSON.stringify(reason));
      console.log(sessionStorage.getItem('failMessage'));
  }
    console.log("Processing")
  };


  //open the request
  xhr.open("POST", 'http://localhost:9001/api/user/register', true);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  console.log(xhr);
  
  xhr.send(JSON.stringify(tempUser));
});