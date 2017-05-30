$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyCThIOMshwISkqqyaQV1I5b9PuIhoL-9y4",
    authDomain: "trainscheduler-ecb60.firebaseapp.com",
    databaseURL: "https://trainscheduler-ecb60.firebaseio.com",
    projectId: "trainscheduler-ecb60",
    storageBucket: "trainscheduler-ecb60.appspot.com",
    messagingSenderId: "31072111663"
  };
  firebase.initializeApp(config);

var database = firebase.database();



  $("#add-train").on("click", function(event) {
      event.preventDefault();
      var trainName = $("#new-train").val().trim();
      var trainDestination = $("#destination").val().trim();
      var firstTrain = $("#init-time").val().trim();
      var frequency = $("#frequency").val().trim();

      var newTrain = {
          name: trainName,
          destination: trainDestination,
          start: firstTrain,
          rate: frequency
      }

      database.ref().push(newTrain);

      $("#new-train").val("");
      $("#destination").val("");
      $("#init-time").val("");
      $("#frequency").val("");
  })

  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var trainName = snapshot.val().name;
    var destination = snapshot.val().destination;
    var trainStart = snapshot.val().start;
    var frequency = snapshot.val().rate;

    var mStart = moment(trainStart, "hh:mm");

    var currentTime = moment();
    var diffTime = moment().diff(moment(mStart), "minutes");
    var remainder = diffTime % frequency;
    var minTilArr = parseInt(frequency) - parseInt(remainder);
    var nextTrain = moment().add(minTilArr, "m").format("mm");

    var minArrFormat = moment(minTilArr).format("hh:mm A");

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" +  + "</td><td>" + minArrFormat + "</td><td>" + nextTrain + "</td></tr>");
  });

});