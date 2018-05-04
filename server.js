const express = require('express'); //pulls in express
const bodyParser = require('body-parser'); //pulls in body-parser
const app = express(); //instantiates express app
const apiRoutes = require('./routes/apiRoutes'); //pulls in api endpoints

app.set('port', process.env.PORT || 3000); //set port dynamically or default to 3000
app.use(bodyParser.json()); //use body parser to return json
app.use(express.static('public')); //serve static file

app.locals.title = 'Palette Picker'; //set app title

app.use('/api/v1', apiRoutes); //use relative routes from apiRoutes

app.listen(app.get('port'), () => { //listen for server at specified port and log message
  // eslint-disable-next-line 
  console.log(`${app.locals.title} server running on port ${app.get('port')}`);
});

module.exports = app; //export the app
