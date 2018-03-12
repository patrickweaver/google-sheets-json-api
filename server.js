// Express is a framework that is used with Node.js to create a webserver:
// https://expressjs.com/
var express = require('express');
var app = express();


// * * * * * * * * * * * * * * * * * * *
// SETTINGS:
// * * * * * * * * * * * * * * * * * * *

// spreadsheet key is the long id in the sheets URL (after "/d/").
// https://docs.google.com/spreadsheets/d/1C7Ojs1i8duxWBmBYPtMTDVLRF7mu-WMTEjKi1-xCuE8/edit#gid=707399917
//                                        ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
const SPREADSHEET_KEY             = "1C7Ojs1i8duxWBmBYPtMTDVLRF7mu-WMTEjKi1-xCuE8";

const DEFAULT_TAB                 = 0; // Could also use the name of a tab like "Trees", or null for no default and just links

const API_URL                     = "https://google-sheet-json-api.glitch.me/";

// This example uses the 'google-spreadsheet' NPM package to access the sheet
// https://www.npmjs.com/package/google-spreadsheet
// Note: There are two NPM packages with similar names, 'google-spreadsheet' and 'google-spreadsheets'
// We don't use it in this file, but you will see the following line in sheets.js
//var GoogleSpreadsheet = require('google-spreadsheet');

var sheets = require('./modules/sheets');
sheets.SPREADSHEET_KEY = SPREADSHEET_KEY;
sheets.API_URL = API_URL;

app.get("/favicon.ico", function(req, res) {
  res.send("");
});

app.get("/", function(req, res, next) {
  res.locals.tab = DEFAULT_TAB;
  next();
});

app.get("/:tab", function(req, res, next) {
  res.locals.tab = req.params.tab;
  next();
});



app.use(function(req, res, next) {
  sheets.getData(res.locals.tab)
  .then(function(data){
    res.json(data);
    return;
  })
  .catch(function(error) {
    res.locals.error = error;
    next();
  });
});

app.use(function(req, res, next) {
  res.json({error: "" + res.locals.error});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
