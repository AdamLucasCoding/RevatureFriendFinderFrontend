var tableArray = []

buildTable(tableArray)

$.ajax({
    method: "GET",
    url:'http://localhost:8080/api/activity/all',
    success:function(response){
        tableArray = response
        console.log(tableArray)
    }

})

function buildTable(data){
    var table = document.getElementById('tableArray')

    for (var i = 0; i < data.length; i++){
        var row = <tr>
            
                        <td>$[data[i].a_id]</td>
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



}