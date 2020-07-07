// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

// ---- EXPRESS JS - Framework
let fs = require('fs'),
	path = require('path');


// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//let helpers = require('view-helpers'),
	consolidate = require('consolidate');

app.engine('html', consolidate['mustache']);
app.set('view engine', 'html');
app.set('views',__dirname + '/templates');


// ------------------------
// ROUTES RESOURCES
// ------------------------
/////////////////////////////////////////
app.get('/', (req,res)=>{
	console.log('hello');
res.status(200).json({"hello" : "world"});
})

var tmp = [{
	"id" : "1",
	"nom" : "aissi",
	"prenom" : "youssef",
	"ne" : "20176126"
}];

//Recuperer un patient
app.get('/patients',(req,res)=>{
	res.status(200).json(tmp)
})

//creer un patient
app.post('/patients',(req,res)=>{
	tmp.push(req.body)
	res.status(200).json(req.body)
})

//retirer et afficher le premier patient
app.get('/patients/:id',(req,res)=>{
	res.status(200).json(tmp.pop())
})

//modifer un patient
app.put('/patients/:id',(req,res)=>{
	res.status(204).json()
})
//supp un patient
app.delete('/patients/:id',(req,res)=>{
	res.status(204).json()
})
// ------------------------
// ROUTES VUES
// ------------------------
app.get('/',(req,res)=>{
	res.render('helloWorld', {'message' : req.query.message})
})



// ------------------------
// START SERVER
// ------------------------
app.listen(3011,function(){
    console.info('HTTP server started on port 3011');
});