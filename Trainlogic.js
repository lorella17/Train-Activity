// Initialize Firebase
var config = {
    apiKey: "AIzaSyArLeTB9Nm8HCAS6gXWUhHFUJhQI36845Q",
    authDomain: "gt07project.firebaseapp.com",
    databaseURL: "https://gt07project.firebaseio.com",
    projectId: "gt07project",
    storageBucket: "gt07project.appspot.com",
    messagingSenderId: "912498120790"
};
firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-train--btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTraintime = moment($("#firsttraintime-input").val().trim(), "DD/MM/YY").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var trainName = {
        name: trainName,
        destination: trainDestination,
        firstTraintime: firstTraintime,
        frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(trainName);

    // Logs everything to console
    console.log(trainName.name);
    console.log(trainName.destination);
    console.log(trainName.firstTraintime);
    console.log(trainName.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firsttraintime-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTraintime = childSnapshot.val().firstTraintime;
    var trainfrequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTraintime);
    console.log(trainfrequency);

    // Prettify the train start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the trains frequency using hardcore math
    // To calculate the trains frequency
    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the minutes
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        empStartPretty + "</td><td>" + trainfrequency + "</td><td>" + trainfrequency + "</td></tr>");
});