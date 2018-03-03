# Google Sheet App: JSON API

This is a simple JSON API that reads data from a Google Spreadsheet. Rows from the spreadsheet are displayed as a "data" array. The first row is used has property names.

There is also a "worksheets" array of objects that have data from other tabs in the sheet. The "apiURL" property of a "worksheets" object has a link to the api url for that tab's data.

The Google Spreadsheet needs to be "published to the web" (not just shared with "anyone can view"). See the (google-spreadsheet)[https://www.npmjs.com/package/google-spreadsheet] NPM package for instructions. Note: There are two NPM packages with similar names "google-spreadsheet" and "google-spreadsheets".