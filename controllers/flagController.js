module.exports = function(app){
    var bodyParser = require('body-parser');

    var urlencodedParser = bodyParser.urlencoded({extended: false});

    var mongoose = require('mongoose');
    var multer  = require('multer')

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/assets/img/')
      },
      filename: function (req, file, cb) {
        var arr = file.originalname.split('.');
        var ext = arr[arr.length - 1];
        cb(null, req.body.country.toLowerCase().replace(' ','_') + '.' + ext);
      }
    });

    var upload = multer({ storage: storage });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Connect to database
    // mongoose.connect('mongodb://localhost/flag_database');
    mongoose.connect('mongodb+srv://test:test@cluster0-t8yvg.mongodb.net/test?retryWrites=true');

    mongoose.connection.once('open', function(){
        console.log('Connection has been made. Now make fireworks....');
    }).on('error', function(error){
        console.log('Connection error:' + error);
    });


    //Create a schema (blueprint for data)
    var flagSchema = new mongoose.Schema({
        country: String,
        colors: [String],
        image: String
    });

    //Create Flag model.
    var Flag = mongoose.model('Flag', flagSchema);

    // fetching flag data from database
    var flags;
    Flag.find({}, function(err, docs){
        if (err) throw err;
        flags = docs;
    });


    app.get('/flags', function(req, res){
        res.render('flags', {flags: flags});
    });

    app.get('/upload-your-own-flag', function(req, res){
        res.render('upload-your-own-flag');
    });

    app.post('/flags', upload.single('file'), function(req, res){
        var splitCountry = (req.body.country.split(' '));
        var countryName = [];

        for (var i = 0; i < splitCountry.length; i++){
            var firstLtr = splitCountry[i].slice(0, 1);
            var rest = splitCountry[i].slice(1);
            countryName.push(firstLtr.toUpperCase() + rest.toLowerCase());
        }

        let newFlag = {
            country: countryName.join(' '),
            colors : req.body.colors,
            image : "/assets/img/" + req.file.filename
        };

        Flag(newFlag).save(function(err){
            if (err) throw err;
            Flag.find({}, function(err, docs){
                if (err) throw err;
                flags = docs;
                res.render('flags', {flags: flags});
            });

        });

    });
};