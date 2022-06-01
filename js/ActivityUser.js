const currentUser = JSON.parse(sessionStorage.getItem('user-auth-token'));
console.log(currentUser);
window.addEventListener('load', async(event) => {
    //get token from session and check for current user is verified to be on page
    let token = currentUser.jwttoken;
    
    let verifyTemplate = {
      jwttoken: token
    };
    console.log(`HttpRequest body: ` + JSON.stringify(verifyTemplate));
    
     //do http request and send to server
     try {
      const raw_response = await fetch(`http://localhost:9001/api/user/verify`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(verifyTemplate)
      });
    
      //check for a successful response
      if(!raw_response.ok){
          throw new Error(raw_response.status);
      }
    
      const json_data = await raw_response.json();
    
      console.log(json_data);
    
      //save token into a sessionStorage variable
      sessionStorage.setItem('currentUser', JSON.stringify(json_data));
      console.log(JSON.stringify(json_data));
      //set timeout to transition to the home page if user token is not null
      console.log("Success! Redirecting user to home page...")
      if(json_data !== null){
          console.log(`Successful verification for user ${json_data.username}`);
          //TODO: append username to webpage top bar
          let userHeader = document.getElementById("user-tag");
          userHeader.innerHTML =`User Username: ${json_data.username}`;
          sessionStorage.setItem("user-username", JSON.stringify(json_data.username))
      }
    } catch (error) {
      //this catch block is for network errors
      console.log(error);
    }
});






async function getActivityByUsername(){
    console.log("retrieving trainer info by username...");
    let uname = JSON.parse(sessionStorage.getItem('username'));
    console.log(uname);
    
    //do fetch request here
    try {
        const raw_response = await fetch(
          `http://localhost:9001/api/user/username-lookup?username=${uname}`,
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

        let userTemplate = {
            userId: json_data.userId,
            userName: json_data.userName,
            password: json_data.password,
            email: json_data.email
            
        };
        console.log(userTemplate);

        return userTemplate;
      } catch (error) {
        //this catch block is for network errors
        console.log(error);
        return null;
      }
}