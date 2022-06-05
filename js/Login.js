const form = document.getElementById("login");

form.addEventListener("submit", async (event) => {
  
  event.preventDefault();

  
  let Username = form.elements[0].value;
  let Pword = form.elements[1].value;

  let loginTemplate = {
    username: Username,
    password: Pword,
  };
  console.log(`HttpRequest body: ` + JSON.stringify(loginTemplate));

  //do http request and send to server
  try {
    const raw_response = await fetch(
      `http://localhost:5432/api/user/authenticate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(loginTemplate),
      }
    );

    //check for a successful response
    if (!raw_response.ok) {
      throw new Error(raw_response.status);
    }

    const json_data = await raw_response.json();

    console.log(json_data);

   
    sessionStorage.setItem("user-auth-token", JSON.stringify(json_data));

    
    console.log("Success! Redirecting user to home page...");
    if (json_data !== null) {
      setTimeout(() => {
        console.log("redirect starting...");
        window.location.href = "../html/homepage.html";
      }, 1000);
    }
  } catch (error) {
    
    console.log(error);
  }
});


/******************************/
function togglePasswordView() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}