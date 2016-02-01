var express = require('express');
var app = express();
//set port
app.set('port', process.env.PORT || 1337);

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set up the public directory to serve static files
app.use(express.static(__dirname + '/public'));

//body parser -- for form processing
app.use(require('body-parser').urlencoded({extended:true}));

var syllabus = require('./syllabus');

//syllabus("2016-02-17", [2,4], 12)

app.get('/',function(req,res){
	res.render('form');
});

app.post('/process',function(req,res){
	var d = req.body.date;
	var w = req.body.dayweek; //array
	var n = req.body.numweeks;
	var result = syllabus(d, w, n);
	//res.send('ok');
	res.render('dates',{weeks:result});
	//console.log(result);
	 
});


// 404
app.use(function (req,res,next) {
	res.status(404);
	res.render('404');
});
// 500
app.use(function (err, req, res, next) {
	console.error(err.message);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'),function(){
	console.log('Express started on port ' +
				app.get('port') +
				". Press Ctrl-C to terminate");

});