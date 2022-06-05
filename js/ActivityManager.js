// In AJAX, you send a request using the XMLHttpRequest object,
// which is built into JS
const form = document.getElementById("activity manager");
console.log(form);
form.addEventListener('submit', (event) => {
  // stop form submission
  event.preventDefault();
  //check values in form
  //console.log(form.elements);
  let a_id = form.elements[0].value;
  let name = form.elements[1].value;
  let type = form.elements[2].value;
  let location = form.elements[3].value;
  let created_date = form.elements[4].value;
  let activity_date = form.elements[5].value;
  let created_by = form.elements[6].value;
  let occupancy_max = form.elements[7].value;
  

  //Now we can start AJAX request
  //STEP 1
  // This object is used for asynchronous requests to your server. 
  let xhr = new XMLHttpRequest();

  //STEP 2
  //set up template JS object for JSON parsing
  let tempActivity = {
    ActivityId: a_id,
    ActivityName: name,
    ActivityType: type,
    ActivityLocation: location,
    CreatedDate: created_date,
    ActivityDate: activity_date,
    UserIdThatCreated: created_by,
    Occupancy: occupancy_max
    
  };
  console.log(tempActivity);

  
    xhr.onreadystatechange = function() {
    
    if(this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data); 
      sessionStorage.setItem('message', xhr.responseText);
      
      //redirect user to the success page
      window.location.replace("edit success.html");
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
  xhr.open("POST", 'http://localhost:5432/api/activity/update', true);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  console.log(xhr);
  
  xhr.send(JSON.stringify(tempActivity));
});