// Set the configuration for your app
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC17fdCK6p51zkJyjTJeOWrSCGj5_TKzIY",
  authDomain: "web-1-survey.firebaseapp.com",
  databaseURL: "https://web-1-survey.firebaseio.com",
  storageBucket: "web-1-survey.appspot.com",
  messagingSenderId: "847577523701"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

$("#survey-form").on('submit', function (e) {
  e.preventDefault();

  var responses = buildResponses();

  saveResponses(responses);
})

function saveResponses(responses) {
  firebase.database().ref('/').set({
    responses: responses
  })
}

function buildResponses() {
  var inputArray = $("input[type='text']");
  var responses = {};

  for(var i=0; i<inputArray.length; i++) {
    var keyName = inputArray[i]['name'];
    var value = inputArray[i]['value'];

    responses[keyName] = value;
  }

  return responses;
}
