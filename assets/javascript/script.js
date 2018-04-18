
$(document).ready(function () {

  $("#pickRandomPark").on("click", function (event) {
   
    event.preventDefault();
    $('#insertParkInfoHere').empty();
    // //Pick A Random Number Between 1-60
    var randomSelect = Math.floor(Math.random() * 60);
  
    // //parkCode Array
    var parkCodes = ["acad", "npsa", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care", "cave", "chis", "cong", "crla", "cuva", "deva", "dena", "drto", "ever", "gaar", "jeff", "glac", "glba", "grca", "grta", "grba", "grsa", "grsm", "gumo", "hale", "havo", "hosp", "isro", "jotr", "katm", "kefj", "seki", "kova", "lacl", "lavo", "maca", "meve", "mora", "noca", "olym", "pefo", "pinn", "redw", "romo", "sagu", "shen", "thro", "viis", "voya", "wica", "wrst", "yell", "yose", "zion"];
    console.log(parkCodes);
    var mapRef
    //Gives us a Random Park Code
    var selectedCode = parkCodes[randomSelect]
    console.log(selectedCode);
    // API Query
    var queryQRL = "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedCode + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW";
    console.log(queryQRL);
 
    var pickRandom = parkCodes[Math.floor(Math.random() * parkCodes.length)];
    console.log(pickRandom);
   
    $.ajax({
      url: "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedCode + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW",
      method: "GET"
    }).done(function (response) {
      console.log('response.data[0]', response.data[0]);

      $('#insertParkInfoHere').empty();
      var mapRef = response.data[0].fullName;
      console.log('the random park is: ' + mapRef );
      $('#insertParkInfoHere').append('<h2>' + "Name of National Park: " + '</h2><span id="responseInfo">' + response.data[0].fullName + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Location: " + '</h2><span id="responseInfo">' + response.data[0].states + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Latitude & Longitude: " + '</h2><span id="responseInfo">' + response.data[0].latLong + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Description: " + '</h2><span id="responseInfo">' + response.data[0].description + '</span>');
      $('#insertParkInfoHere').append('<h2>' + "Weather: " + '</h2><span id="responseInfo">' + response.data[0].weatherInfo + '</span>');
      $('#insertGooglehere').empty();
      $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + mapRef + '" allowfullscreen></iframe >');

        
     $("#gasBtn").on("click", function (event) {
      event.preventDefault();
      var place = mapRef + ' gas stations';
      console.log(place);
      $('#insertGooglehere').empty();
      $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >')
});

$("#hotelBtn").on("click", function (event) {
    event.preventDefault();
    var place = mapRef  + ' hotels';
    console.log(place);
    $('#insertGooglehere').empty();
    $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >')
});

$("#restaurantBtn").on("click", function (event) {
  event.preventDefault();
  var place = mapRef  + ' restaurants';
  console.log(place);
  $('#insertGooglehere').empty();
  $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >')
});

});
});


  $("#keywordSearchBtn").on("click", function (event) {
    event.preventDefault();
    var search = $('#keywordSearchInput').val().trim();  
    console.log(search);
    $('#insertGooglehere').empty();
    $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + search +  '" allowfullscreen></iframe >'); 
 });


  // 2 of 3 AJAX CALLS / THIS DISPLAYS THE LIST OF SITES PER STATE FROM STATE SELECT HTML 

  $("#browseStateBtn").on("click", function (event) {
    event.preventDefault();
    var selectedState = $('#browseStateOption').val()
    console.log(selectedState);
 
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
      console.log('obj ', obj);

      let parkObj = {
      name: obj.fullName,
      description: obj.description
        }
        html = 
        `
        <h2 class="respsTitle">${parkObj.name}</h2>
        <h3 class="respsTitle">Description: </h3><span class="respsInfo">'${parkObj.description}</span>
        `; $('#insertParkInfoHere').append(html);
  });
  })
  });

  // 3 OF 3 AJAX CALL GRABS PARK FULL NAME FROM OPTION SELECT HTML

  $("#browseParkBtn").on("click", function (event) {
    event.preventDefault();
    var selectedPark = $('#browseParkOption').val()

    $.ajax({
      url: "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedPark + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW",
      method: "GET"
  })  .done(function (response) {
      console.log(response);

      var mapRef = response.data[0].fullName
      console.log(mapRef),
      // forEach to bring up more than 1 park
      $('#insertParkInfoHere').empty();
      $('#insertParkInfoHere').append('<h2 id="responseTitle">' + response.data[0].fullName + '</h2>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Location: " + '</h3><span id="responseInfo">' + response.data[0].states + '</span>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Latitude & Longitude: " + '</h3><span id="responseInfo">' + response.data[0].latLong + '</span>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Description: " + '</h3><span id="responseInfo">' + response.data[0].description + '</span>');
      $('#insertParkInfoHere').append('<h3 id="responseTitle">' + "Weather: " + '</h3><span id="responseInfo">' + response.data[0].weatherInfo + '</span>');
      $('#insertGooglehere').empty();
      $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + mapRef + '" allowfullscreen></iframe >');

     $("#gasBtn").on("click", function (event) {
           event.preventDefault();
           var place = mapRef + ' gas stations';
           console.log(place);
           $('#insertGooglehere').empty();
           $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >')
     });
     
     $("#hotelBtn").on("click", function (event) {
         event.preventDefault();
         var place = mapRef  + ' hotels';
         console.log(place);
         $('#insertGooglehere').empty();
         $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >')
     });
     
     $("#restaurantBtn").on("click", function (event) {
       event.preventDefault();
       var place = mapRef  + ' restaurants';
       console.log(place);
       $('#insertGooglehere').empty();
       $('#insertGooglehere').append(' <iframe width="550" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCESN4bg_XY8N82CwU7ssef7snFR53K1rY&q=' + place + '" allowfullscreen></iframe >')
     });
     

    })
  });
  });
            
                                   
// external js: packery.pkgd.js, jquery-ui-draggable.js

var $grid = $('.grid').packery({
itemSelector: '.grid-item',
  columnWidth: 100
});

// make all items draggable
var $items = $grid.find('.grid-item').draggable();
// bind drag events to Packery
$grid.packery( 'bindUIDraggableEvents', $items );

// PACKERY AND GMAP BUTTONS -- NEEDS TROUBLESHOOT


// SIDE NAV CODE

function openNav() {
  document.getElementById("mySidenav").style.width = "250px"; }
  
function closeNav() {
  document.getElementById("mySidenav").style.width = "0"; } 



// SLIDE SHOW CODE 
var slideIndex = 0;
showSlides();


function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";

  setTimeout(showSlides, 3000); // Change image every 2 seconds
}
  


  // MODAl ELEMENT CODE

var modal = document.getElementById('id01'); 
  window.onclick = function(event) {
  if (event.target == modal) {
  modal.style.display = "none"; } }


  // FIREBASE CONFIG CODE 
    
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
        var birthDate = "";
        // Capture Button Click
        $("#submitGoFire").on("click", function(event) {
          event.preventDefault();
          // Grabbed values from text boxes
          name = $("#name").val().trim();
          email = $("#email").val().trim();
          birthDate = $("#birthDate").val().trim(); 
          // Code for handling the push
          database.ref().push({
            name: name,
            email: email,
            birthDate: birthDate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          
          });
        });