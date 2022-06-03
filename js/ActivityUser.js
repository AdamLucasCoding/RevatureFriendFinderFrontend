const form = document.getElementById("user-finder-form");
console.log(form);
form.addEventListener('submit', (event) => {
  
  event.preventDefault();
 
  
  let userId = form.elements[0].value;
  

 
  let xhr = new XMLHttpRequest();

 
  let tempUser = {
    userId: userId
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






async function getActivityByUserId(){
    console.log("retrieving Activities by userId...");
    let uname = JSON.parse(sessionStorage.getItem('created_by'));
    console.log(uname);
    
    //do fetch request here
    try {
        const raw_response = await fetch(
          `http://localhost:5432/api/activities/userId-lookup?userId=${created_by}`,
          {
              headers: {
                  "Authorization": `Bearer ${currentUser.jwttoken}`
              }
          }
        ); //returns a Promise
    
        //check for a successful response
        if (!raw_response.ok) {
          throw new Error(raw_response.status);
        }
    
        const json_data = await raw_response.json();
    
        console.log(json_data);

        let ActivityTemplate = {
            
            activityname: json_data.name,
            activitytype: json_data.type,
            activitylocation: json_data.location,
            createddate: json_data.created_date,
            activitydate: json_data.activity_date,
            userId: json_data.created_by,
            activityoccupancy: json_data.occupancy_max
            
        };
        console.log(ActivityTemplate);

        return userTemplate;
      } catch (error) {
        //this catch block is for network errors
        console.log(error);
        return null;
      }
}