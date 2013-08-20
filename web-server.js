var express = require("express"),
app = express(),
port = parseInt(process.env.PORT, 10) || 8082;

var databaseUrl = "localhost:27017/geoprova"; 
var collections = ["comuni"]
var db = require("mongojs").connect(databaseUrl, collections);

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/'));
	app.use(app.router);
});

app.get('/comuni', function (req, res){
	
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	db.comuni.find({'properties.name': req.param('name'), 'geometry.type':'Polygon'}, function(err, data){
		res.writeHead(200, {'Content-Type': 'application/json'});
		console.log(data);
		res.end(JSON.stringify(data));
	});
});
 app.listen(port);
 console.log('Now serving the app at http://localhost:'+ port + '/');
