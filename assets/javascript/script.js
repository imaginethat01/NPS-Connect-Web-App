



  window.onload = function() {

    var searchThis =  [ $("#userInput").val(''),
                        $(this).data('search') ]
  
  
    var queryURL = "https://developer.nps.gov/api/v1/parks?=stateCode=" + searchThis + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW"

 

    $.ajax({
            url: queryURL,
            method: "GET"
          
          }).done(function(response) {
            var results = response.data;
            console.log(results);
            $("#resultsField").empty();
            for (var i = 0; i < results.length; i++) {
            var displayDiv = $("<div class='col-md-4'>"); }
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


  $('.grid').packery({
    // options
    itemSelector: '.grid-item',
    gutter: 10
  });

  
};

$("#pickRandomPark").on("click", function(event) {

  var randomSelect=Math.floor(Math.random() * 60);
console.log(randomSelect);
var parkCodes = ["acad","npsa","arch","badl","bibe","bisc","blca","brca","cany","care","cave","chis","cong","crla","cuva", "deva","dena","drto","ever","gaar","jeff","glac","glba","grca","grta","grba","grsa","grsm","gumo","hale","havo","hosp","isro","jotr","katm","kefj","seki","kova","lacl","lavo","maca","meve","mora","noca","olym","pefo","pinn","redw","romo","sagu","shen","thro","viis","voya","wica","wrst","yell","yose","zion"];
  var selectedCode=parkCodes[randomSelect]
var queryQRL = "https://developer.nps.gov/api/v1/parks?parkCode=" + selectedCode + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW";
console.log(queryQRL);
var pickRandom = function randomSelect() {
    for (var i = 0; i < parkcodes.length; i++) {
    var randomSelect=Math.floor(Math.random() * 60); 
    var selectedCode=parkCodes[randomSelect]
var queryQRL = "https://developer.nps.gov/api/v1/parks?parkCode" + selectedCode + "&api_key=7wQNlZMqMhlH0js2AdSZsiMoge4n3Z0ud2rZVlfW";
console.log(queryQRL);
var selectedCode=parkCodes[randomSelect] 

    }
  }
    
    });

   
