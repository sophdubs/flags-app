var express = require('express');
var flagController = require('./controllers/flagController');
var PORT = process.env.PORT || 7000;
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

flagController(app);

app.listen(PORT, function(err){
    if (err) throw err;
});

