This is an API I created for my vision of making an easy to use UI to compare different tennis strings. 

To start I used puppeteer to scrape data on over 700 strings from tennis warehouses website, the code can be found in scrapers.js. one I had all the data I created a database using node.js and express and hosted it on heroku. 

if you would like to make a request to the api please use https://tennis-string-api.herokuapp.com/api/ and the name of your string with _ instead of spaces.

I currently working on adding a background job that checks for when a new string is added to tennis warehouse and automatically adds it to my database.