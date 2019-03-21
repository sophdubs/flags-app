var express = require('express');
var flagController = require('./controllers/flagController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

flagController(app);

app.listen(7000, function(err){
    if (err) throw err;
    console.log('Listening to port 7000');
});

