const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiRoutes = require('./routes/apiRoutes');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('public'));

app.locals.title = 'Palette Picker';

app.use('/api/v1', apiRoutes);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line 
  console.log(`${app.locals.title} server running on port ${app.get('port')}`);
});

module.exports = app;
