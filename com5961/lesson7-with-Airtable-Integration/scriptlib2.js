$(document).ready(function(){

    $("button#hide_h2").click(function() {
        $("h2").hide(500);
    });

    $("button#show_h2").click(function() {
        $("h2").show(300);
        $("h2").css("color","blue");
        $("h2").html("You clicked me hard.");
    });

    $("button#get_data").click(function() {
        var items = [];
        var i = 0;
        var airtable_read_endpoint = "https://api.airtable.com/v0/appM38HXlEVhxmnqx/Tasks?api_key=keyTcsTzckqyBTlk8&sortField=_createdTime&sortDirection=desc";
        var dataSet = [];
        $.getJSON(airtable_read_endpoint, function(result) {
               $.each(result.records, function(key,value) {
                   items = [];
                       items.push(value.fields.Name);
                       items.push(value.fields.Stage_Desc);
                       items.push(value.fields.Completed);
                       items.push(value.fields.Time_Estimate);
                       items.push(value.fields.Weight_Factor);
                       items.push(value.fields.converted);
                       dataSet.push(items);
                       console.log(items);
                }); // end .each
                console.log(dataSet);

             $('#example').DataTable( {
                 data: dataSet,
                 retrieve: true,
                 columns: [
                     { title: "Name",
                       defaultContent:""},
                     { title: "Stage",
                         defaultContent:"" },
                     { title: "Completed",
                       defaultContent:"" },
                     { title: "Time Estimated",
                       defaultContent:""},
                     { title: "Weight Factor",
                         defaultContent:""},
                     { title: "Converted",
                       defaultContent:""},
                 ]
             } );
        }); // end .getJSON
     }); // end button

     $("button#roll_up").click(function() {
         var items = [];
         var i = 0;
         var airtable_read_endpoint =
         "https://api.airtable.com/v0/appM38HXlEVhxmnqx/Stage?api_key=keyTcsTzckqyBTlk8";
         var dataSet = [];
         $.getJSON(airtable_read_endpoint, function(result) {
                $.each(result.records, function(key,value) {
                    items = [];
                        items.push(value.fields.Name);
                        items.push(value.fields.Total_Entries);
                        dataSet.push(items);
                 }); // end .each
                $('#example').DataTable( {
                    data: dataSet,
                    retrieve: true,
                    columns: [
                        { title: "Name",
                          defaultContent:""},
                        { title: "Total Entries",
                          defaultContent:""},
                    ] // rmf columns
                } ); // end dataTable

                var  chart = c3.generate({

                  data: {
                      json: dataSet,
                      type: 'bar',
                      keys: {
                          x: 'Name',
                          value: ['Total_Entries'],
                          }
                  },

                      axis: {
                          x: {
                             type: 'category'
                          }
                  }
                }); /* end c3.generate */




          }); // end .getJSON
       }); // end button

        // $.getJSON('http://localhost/d756a/data_export.json/Computer+TV', function(obj) {

}); // document ready
