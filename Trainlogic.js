// $(document).ready(function() {


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

    var trainName = "";
    var trainDestination = "";
    var firstTraintime = "";
    var trainFrequency = 0;
    var nextArrival = 0;

// 2. Button for adding Trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        trainName = $("#train-name-input").val().trim();
        trainDestination = $("#destination-input").val().trim();
        firstTraintime = moment($("#firsttraintime-input").val().trim(), "HH/MM").format("X");
        trainFrequency = $("#frequency-input").val().trim();


        // Uploads train data to the database
        database.ref().push({
            name: trainName,
            destination: trainDestination,
            traintime: firstTraintime,
            frequency: trainFrequency

        });

        // Logs everything to console
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTraintime);
        console.log(trainFrequency);

        // Alert
        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#firsttraintime-input").val("");
        $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTraintime= childSnapshot.val().traintime;
    var trainFrequency= childSnapshot.val().frequency;

    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTraintime);
    console.log(trainFrequency);

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("value", function(snapshot) {

        // Print the initial data to the console.
        console.log(snapshot.val());

        // Log the value of the various properties
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().traintime);
        console.log(snapshot.val().frequency);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        firstTraintime + "</td><td>" + nextArrival + "</td><td>" + trainFrequency + "</td></tr>");
        // If any errors are experienced, log them to console.
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);

    });


});