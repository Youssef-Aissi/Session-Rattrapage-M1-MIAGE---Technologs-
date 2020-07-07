// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

// ---- Gestion Files System
let fs = require('fs'),
	path = require('path');


// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// - Gestion des vues
let helpers = require('./view-helpers'),
	consolidate = require('consolidate');

app.engine('html', consolidate['mustache']);
app.set('view engine', 'html');
app.set('views',__dirname + '/templates');


// ------------------------
// ROUTES RESOURCES
// ------------------------
/////////////////////////////////////////

// --- Base de donnees
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/bd",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});

// --- Definition du models
//--- Module dependencies
const Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let RecettePizzaSchema = new Schema({
    nom      : String,
    description		: String,
    ingredients     : [{ 
       					type: Schema.ObjectId, 
       					ref: 'ingredient' }],
    quantitéIngredients : [{
    					type: String
       					}]
});

let ingredientSchema = new Schema({
    nom      : String,
    mesure		: String,
    description		: String,
    tempsCuisson		: String
   
});

mongoose.model('Pizza', RecettePizzaSchema);

mongoose.model('ingredient', ingredientSchema);







//Recuperer toutes les recettes

app.get('/pizzas',(req, res)=>{
	let pizza = mongoose.model('Pizza')
	Pizza.find({}).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})

//Recuperer une recettes a partir de son nom

app.get('/pizzas/:nom',(req, res)=>{
	let pizza = mongoose.model('Pizza')
	Pizza.find({}).then((result)=>{
            res.status(200).json(result)
        },(err)=>{
            res.status(400).json(err)
        })
})




// ------------------------
// ROUTES VUES
// ------------------------
app.get('/',(req,res)=>{
	res.render('affichePizzas', {'message' : req.query.message})
})



// ------------------------
// START SERVER
// ------------------------
app.listen(3000,function(){
    console.info('HTTP server started on port 3000');
});