var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image:"https://www.californiabeaches.com/wp-content/uploads/2014/09/North-Salmon-Creek-Bodega-Bay-Bryce-Sept2015-13-650x323.jpg"},
		{name: "San Jose", image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"},
		{name: "Milpitas", image:"https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"},
		{name: "Salmon Creek", image:"https://www.californiabeaches.com/wp-content/uploads/2014/09/North-Salmon-Creek-Bodega-Bay-Bryce-Sept2015-13-650x323.jpg"},
		{name: "San Jose", image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"},
		{name: "Milpitas", image:"https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"},
		{name: "Salmon Creek", image:"https://www.californiabeaches.com/wp-content/uploads/2014/09/North-Salmon-Creek-Bodega-Bay-Bryce-Sept2015-13-650x323.jpg"},
		{name: "San Jose", image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"},
		{name: "Milpitas", image:"https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"},
	];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});



app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});