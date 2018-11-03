// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Reservations (DATA)
// =============================================================
var reservations = [
  {
    id: "1",
    name: "Jose",
    email: "josej@gmail.com",
    phone: "253-555-5555"
  },
  {
    id: "2",
    name: "Terresa",
    email: "t@gmail.com",
    phone: "222-222-4444"
  },
  {
    id: "3",
    name: "Kyle",
    email: "k@gmail.com",
    phone: "253-555-5555"
  },
  {
    id: "4",
    name: "Jia",
    email: "j@gmail.com",
    phone: "222-333-4444"
  },
  {
    id: "5",
    name: "Jessie",
    email: "jj@gmail.com",
    phone: "253-555-5555"
  }
];
var waitlist = [
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all 
app.get("/api/makereservation", function(req, res) {
    return res.json(reservations);
  });

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New Reservation - takes in JSON input
app.post("/api/makereservation", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newreservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
  var allRes = reservations.concat(waitlist);
  var newID = Math.floor(Math.random() * 100 +100)
  for (i = 0; i < allRes.length; i++) {
      if (newID === allRes[i].id) {
          newID = Math.floor(Math.random() * 100 +100)
          i = 0;
      }
  }

  newreservation.id = newID
  console.log(newreservation);

  if (reservations.length < 5) {
      reservations.push(newreservation);
  }
  else {
      waitlist.push(newreservation);
      console.log(waitlist)
  }

  res.json(newreservation);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });