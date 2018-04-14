$(document).ready(function () {

const dbInterface = {
  // provides single interface to Firebase
  database: '',
  name: '',
  email: '',
  password: '',
  initializeDB: function () {
    // initializes database at start of planning session
    console.log('in dbInterface.initializeDB()');
    const config = {
      apiKey: "AIzaSyCaK_iaORmRwSf2oxnDDWoaE48-gHXoxLM",
      authDomain: "npconnect-60820.firebaseapp.com",
      databaseURL: "https://npconnect-60820.firebaseio.com",
      projectId: "npconnect-60820",
      storageBucket: "npconnect-60820.appspot.com",
      messagingSenderId: "1065780332036"
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  },
  createNewUser(userName, userEmail, userPassword) {
    // TODO (future) return success or failure
    console.log('in dbInterface.createNewUser');
    const processedUserEmail = this.processUserEmail(userEmail);
    // console.log('processedUserEmail is ' + processedUserEmail);
    this.database.ref().child(processedUserEmail).set({
      name: userName,
      password: userPassword,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  },
  processUserEmail: function(userEmail) {
    console.log('in processUserEmail');
    // Replaces '.' with '-dot-' in email address
    // needed to make legal key in Firebase
    return userEmail.split('.').join('-dot-');
  },
  // methods below will be built if they are required and time permits 
  createNewPlan: function(userEmail, newPlan) {
    // TODO
    // stores a newly created plan in the database
    // plan is a JSON object. Only one plan stored at a time
  },
  updatePlan: function(userEmail, plan) {
    // TODO
    // overwrites existly plan with updated content
    // plan is a JSON object
  },
  deletePlan: function(userEmail) {
    // TODO
    // returns 'success' if successful or 'failed' if not
  },
  createNewMemory: function(userEmail, newMemory) {
    // TODO if required
    // stores a newly created JSON object in the database to save memories of trip
    // Only one 'memory' is stored at a time
  },
  updateMemory: function(userEmail, memory) {
    // TODO if required
    // overwrites existly memory with updated content
    // memory is a JSON object
  },
  deleteMemory: function(userEmail) {
    // TODO if required
    // returns 'success' if successful or 'failed' if not
  }
}

const checkPassword = (email, password) => {
  // Authorizes access to NPS Connect as a user
    console.log('in checkPassword');
    let storedPassword;
    const processedUserEmail = dbInterface.processUserEmail(email);
    console.log('processedUserEmail is: ' + processedUserEmail);
    // retrieve password using email as key
    dbInterface.database.ref().child(processedUserEmail).on("value", function(snapshot) {
      setTimeout(() => {
        if (snapshot.val() === null) {
          console.log('no such email in DB');
          promptForCorrectEmail();
        }
        else {
          storedPassword = snapshot.val().password;
          console.log('stored password is ' + storedPassword);
          if (password === storedPassword ) {
            console.log('password is good');
            clearIt();
            welcomeUser();
            setTimeout(() => {
              clearIt();
            }, 2000);
          } else {
            console.log('password is NO good');
            promptForCorrectPassword();
          }
        }
      }, 1000);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

const captureProfileData = (e) => {
 $("#submitGoFire").on("click", function(event) {
  event.preventDefault();
  // Grabbed values from text boxes
  let email = $("#email").val().trim();
  let name = $("#name").val().trim();
  let password1 = $("#pwd1").val().trim();
  let password2 = $("#pwd2").val().trim();
  console.log(email, name, password1, password2);
  const validPassword = validatePassword(password1, password2);
  if (validPassword) {
    console.log('passwords match');
    dbInterface.createNewUser(name, email, password1);
    return true;
  } else {
    console.log('passwords do not match');
    return false;
  }
});

const validatePassword = (password1, password2) => {
  console.log('in validatePassword');
    if (password1 === password2) {
      console.log ('password is valid');
      return true;
  } else {
    console.log('password is NOT valid');
    return false;
  }
}

}})