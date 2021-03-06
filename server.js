// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/fchow2018/express-personal-api",
    baseUrl: "https://polar-ridge-40446.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Who I am"},
      {method: "GET", path: "/api/nhlteams", description: "Index of all NHL teams"},
      {method: "POST", path: "/api/nhlteams", description: "Create a new NHL team"},
      {method: "PUT", path: "/api/nhlteams/:id", description: "Edit a previous NHL team entry and update it"},
      {method: "DELETE", path: "/api/nhlteams/:id", description: "Destroy an NHL team"},
    ]
  })
});

/**********
 * ROUTES *
 **********/

// get profile
app.get('/api/profile', function showMyProfile(req, res){
  var proj = db.Project.find({}, function(err, allProjects){
    if (err) {
      console.log(err);
    } else {
    res.json({
        name: "Felix",
        gitUserName: "fchow2018",
        githubProfileImage: "https://avatars2.githubusercontent.com/u/34549985?s=400&v=4",
        personalSiteLink: "http://fchow2018.github.io",
        currentCity: "Fremont, California",
        hockeyEquipment: [{type: "hockey stick", company: "CCM"}, {type: "helmet", company: "Bauer"}, {type: "gloves", company: "CCM"}, {type: "padding", company: "CCM"}, ],
        hockeyEquipment: [{type: "hockey stick", company: "CCM"}, {type: "helmet", company: "Bauer"}, {type: "gloves", company: "CCM"}, {type: "skates", company: "CCM"}],
        projects: allProjects
      })
    }
  })
})

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
