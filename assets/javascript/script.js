
$(document).ready(function () {
  //Click Handler for Random Park Search
  $("#pickRandomPark").on("click", function (event) {
    console.log("click handler working");
    event.preventDefault();
    $('#insertParkInfoHere').empty();
    // //Pick A Random Number Between 1-60
    var randomSelect = Math.floor(Math.random() * 60);
    console.log(randomSelect); //number in console
    // //parkCode Array
    var parkCodes = ["acad", "npsa", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care", "cave", "chis", "cong", "crla", "cuva", "deva", "dena", "drto", "ever", "gaar", "jeff", "glac", "glba", "grca", "grta", "grba", "grsa", "grsm", "gumo", "hale", "havo", "hosp", "isro", "jotr", "katm", "kefj", "seki", "kova", "lacl", "lavo", "maca", "meve", "mora", "noca", "olym", "pefo", "pinn", "redw", "romo", "sagu", "shen", "thro", "viis", "voya", "wica", "wrst", "yell", "yose", "zion"];
    console.log(parkCodes);
    //Gives us a Random Park Code
    var selectedCode = parkCodes[randomSelect]
    console.log(selectedCode);
    // API Query
    var queryQRL = "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedCode + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW";
    console.log(queryQRL);
    //  
    var pickRandom = parkCodes[Math.floor(Math.random() * parkCodes.length)];
    console.log(pickRandom);
   
    $.ajax({
      url: "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedCode + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW",
      method: "GET"
    }).done(function (response) {
      console.log('response.data[0]', response.data[0]);
      $('#insertParkInfoHere').empty();
      selectedParkName = response.data[0].fullName;
      console.log('the random park is: ' + selectedParkName );
      $('#insertParkInfoHere').append('<h2>' + "Name of National Park: " + '</h2><span id="responseInfo">' + response.data[0].fullName + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Location: " + '</h2><span id="responseInfo">' + response.data[0].states + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Latitude & Longitude: " + '</h2><span id="responseInfo">' + response.data[0].latLong + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Description: " + '</h2><span id="responseInfo">' + response.data[0].description + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Weather: " + '</h2><span id="responseInfo">' + response.data[0].weatherInfo + '</span>');
    });
  });

  $("#browseStateBtn").on("click", function (event) {
    //prevents on click from resorting to default state
    event.preventDefault();
    //get value from state dropdown
    // var selectedState = $('#browseStateOption option:selected.val()').text();
    var selectedState = $('#browseStateOption').val()
    console.log(selectedState);
    //stateCode object  ---not needed right now
    // var stateCodeObject = {
    //   "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansa": "AR", "California": "CA", "Colorado": "CO", "Conneticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconson": "WI", "Wyoming": "WY"
    // }
    // API QUERY FOR STATE CODES FROM NPS
    $.ajax({
      url: "https://developer.nps.gov/api/v1/parks?stateCode=" + selectedState + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW",
      method: "GET"
    }).done(function (response) {
      $('#insertParkInfoHere').empty();

      console.log("response ", response);

      let array = response.data;
      console.log("array ", array);
      array.forEach(obj => {
        console.log(obj);

        // let index = obj.indexOf(array);

        console.log('obj ', obj);

        let parkObj = {
          name: obj.fullName,
          description: obj.description
        }
        console.log
        html = 
        `
        <h2 class="respsTitle">${parkObj.name}</h2>
        <h3 class="respsTitle">Description: </h3><span class="respsInfo">'${parkObj.description}</span>
        `;


        $('#insertParkInfoHere').append(html);
      });
    })
  });


  $("#browseParkBtn").on("click", function (event) {
    //prevents on click from resorting to default state
    event.preventDefault();

    //get value from state dropdown
    // var selectedState = $('#browseStateOption option:selected.val()').text();
    var selectedPark = $('#browseParkOption').val()
    // console.log(selectedPark);
    //CLEAR PARK INFO SECTION

    // API QUERY FOR Park CODES FROM NPS
    $.ajax({
      url: "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedPark + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW",
      method: "GET"
    }).done(function (response) {
      console.log(response);

      // forEach to bring up more than 1 park
      $('#insertParkInfoHere').empty();
      $('#insertParkInfoHere').append('<h2 id="responseTitle">' + response.data[0].fullName + '</h2>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Location: " + '</h3><span id="responseInfo">' + response.data[0].states + '</span>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Latitude & Longitude: " + '</h3><span id="responseInfo">' + response.data[0].latLong + '</span>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Description: " + '</h3><span id="responseInfo">' + response.data[0].description + '</span>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Weather: " + '</h3><span id="responseInfo">' + response.data[0].weatherInfo + '</span>');
    })
  });



          var config = {
            apiKey: "AIzaSyCKZfkPIfQAelCisqxhuniO9zhmCRn0VOw",
            authDomain: "contactformdb.firebaseapp.com",
            databaseURL: "https://contactformdb.firebaseio.com",
            projectId: "contactformdb",
            storageBucket: "",
            messagingSenderId: "691050789317"
          };
          firebase.initializeApp(config);
          
          
              // Create a variable to reference the database.
              var database = firebase.database();
              // Initial Values
              var name = "";
              var email = "";
              var password1 = "";
              var password2 = "";
              var birthDate = "";
              // Capture Button Click
              $("#submitGoFire").on("click", function(event) {
                event.preventDefault();
                // Grabbed values from text boxes
                name = $("#firstName").val().trim();
                email = $("#email").val().trim();
                password1 = $("#password1").val().trim();
                password2 = $("#password2").val().trim();
                birthDate = $("#birthDate").val().trim(); 
                // Code for handling the push
                database.ref().push({
                  name: name,
                  email: email,
                  password1: password1,
                  password2: password2,
                  birthDate: birthDate,
                  dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
              });


              $("#browseStateBtn").on("click", function (event) {
                //prevents on click from resorting to default state
                event.preventDefault();
                $('#insertParkInfoHere').empty();
                //get value from state dropdown
                //var selectedState = $('#browseStateOption option:selected').text();
              var selectedState = $('#browseStateOption').val()
                console.log(selectedState);
               
               // stateCode object
                // var stateCodeObject = {
                //   "Alabama": AL, "Alaska": AK, "Arizona": AZ, "Arkansa": AR, "California": CA, "Colorado": CO, "Conneticut": CT, "Delaware": DE, "Florida": FL, "Georgia": GA, "Hawaii": HI, "Idaho": ID, "Illinois": IL, "Indiana": IN, "Iowa": IA, "Kansas": KS, "Kentucky": KY, "Louisiana": LA, "Maine": ME, "Maryland": MD, "Massachusetts": MA, "Michigan": MI, "Minnesota": MN, "Mississippi": MS, "Missouri": MO, "Montana": MT, "Nebraska": NE, "Nevada": NV, "New Hampshire": NH, "New Jersey": NJ, "New Mexico": NM, "New York": NY, "North Carolina": NC, "North Dakota": ND, "Ohio": OH, "Oklahoma": OK, "Oregon": OR, "Pennsylvania": PA, "Rhode Island": RI, "South Carolina": SC, "South Dakota": SD, "Tennessee": TN, "Texas": TX, "Utah": UT, "Vermont": VT, "Virginia": VA, "Washington": WA, "West Virginia": WV, "Wisconson": WI, "Wyoming": WY
                // }
            
                // // API QUERY FOR STATE CODES FROM NPS
                 var queryQRL = "https://developer.nps.gov/api/v1/parks?="+selectedState + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW"
                // //console.log of API Query
                 console.log(queryQRL);
              });
            });
            
            const emptyNPS = () => {
              console.log('in emptyNPS');
              $('#insertSearchFormhere').empty();
              $('#insertParkInfoHere').empty();
            }

       
// external js: packery.pkgd.js, jquery-ui-draggable.js

// initialize Packery
var $grid = $('.grid').packery({
  itemSelector: '.grid-item',
  // columnWidth helps with drop positioning
  columnWidth: 100
});

// make all items draggable
var $items = $grid.find('.grid-item').draggable();
// bind drag events to Packery
$grid.packery( 'bindUIDraggableEvents', $items );


$("#keywordSearchBtn").on("click", function (event) {
     event.preventDefault();
      $('#insertGooglehere').empty();
     var place = $('#keywordSearchInput').val().trim() + 'national park';
    console.log(place);
     $('#insertGooglehere').append(' <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >'); 
    });