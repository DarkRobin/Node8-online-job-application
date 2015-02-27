var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/applicants');

var Applicant = mongoose.model('Applicant', {   //Good convention uppercase model
	name: String,																	//dont forget to update the rest of my app.js
	bio: String,
	skills: String,
	years: Number,
	why: String
});

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	applicant.find({}, function(err, results){
			if(err)
				console.log('Sorry no applicants.');
			else
				console.log('Results: ', results);
				res.render('applicants',{'applicants': results});
	});

});


// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	var person = new Applicant(req.body);
	person.save(function (err) {
		if (err)
			console.log('No good try again');		//console.log the error itself
	});
	// console.log(req.body);
	res.redirect('applicants');			// move into person.save function its redirecting
																	//befor save
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});