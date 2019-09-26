var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "San Jose", 
// 	image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg",
// 	description: "This a huge granite hill, no bathrooms. No water. Beautiful grantite!"

// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("NEWLY CREATED CAMPGROUND:");
// 		console.log(campground);
// 	}
// });

// var campgrounds = [
// 		{name: "Salmon Creek", image:"https://www.californiabeaches.com/wp-content/uploads/2014/09/North-Salmon-Creek-Bodega-Bay-Bryce-Sept2015-13-650x323.jpg"},
// 		{name: "San Jose", image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"},
// 		{name: "Milpitas", image:"https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"},
// 		{name: "Salmon Creek", image:"https://www.californiabeaches.com/wp-content/uploads/2014/09/North-Salmon-Creek-Bodega-Bay-Bryce-Sept2015-13-650x323.jpg"},
// 		{name: "San Jose", image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"},
// 		{name: "Milpitas", image:"https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"},
// 		{name: "Salmon Creek", image:"https://www.californiabeaches.com/wp-content/uploads/2014/09/North-Salmon-Creek-Bodega-Bay-Bryce-Sept2015-13-650x323.jpg"},
// 		{name: "San Jose", image:"https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg"},
// 		{name: "Milpitas", image:"https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_960_720.png"},
// 	];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index", {campgrounds:allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// campgrounds.push(newCampground);
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});