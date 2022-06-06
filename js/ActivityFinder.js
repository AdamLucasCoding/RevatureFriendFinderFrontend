

async function loadIntoTable(url, table table-sm; table-striped; table-sortable){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody"); 
    const response = await fetch('http://localhost:8080/api/activity/all')
    
}

loadIntoTable()




/** 
async function getAllActivities(){
    console.log("retrieving All Activities...");
    let activities = JSON.parse(sessionStorage.getItem('activities'));
    console.log(activities);
    
    //do fetch request here
    try {
        const raw_response = await fetch(
          `http://localhost:8080/api/activity/all`,
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

        let activityTemplate = {
            activityId: json_data.a_id,
            activityName: json_data.name,
            activityType: json_data.type,
            activityLocation: json_data.location,
            createdDate: json_data.created_date,
            activityDate: json_data.actvity_date,
            createdBy: json_data.created_by,
            Occupancy: json_data.occupancy_max
            
        };
        console.log(activityTemplate);

        return activityTemplate;
      } catch (error) {
        //this catch block is for network errors
        console.log(error);
        return null;
      }
}

var tableArray = []

buildTable(tableArray)

async function buildTable(data){
    var table = document.getElementById('tableArray')

    for (var i = 0; i < data.length; i++){
        var row = <tr>
            
                        <td>[json_data[i].a_id]</td>
                        <td>$[data[i].name]</td>
                        <td>$[data[i].type]</td>
                        <td>$[data[i].location]</td>
                        <td>$[data[i].created_date]</td>
                        <td>$[data[i].activity_date]</td>
                        <td>$[data[i].created_by]</td>
                        <td>$[data[i].occupancy_max]</td>

                  </tr>

                    
                    
        table.innerHTML += row
    }



}*/