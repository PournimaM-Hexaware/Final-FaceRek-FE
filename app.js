var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var rekHandler = require('./rekHandler');
var app = express();

var port = process.env.PORT || 8123;

app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');


/**
 * To support JSON-encoded bodies.
 */
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: '100mb',extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname+"/home.html");
})

app.get('/facerec', (req, res) => {
    res.sendFile(__dirname+"/public/facerec.html");
})

app.get('/data', (req, res) => {
    res.send("hello new");
})


app.post('/upload',(req,res) =>{

     new rekHandler().recognizer(req.body,(err,result)=>{

        console.log(err,JSON.stringify(result));
        console.log(result.results.FaceMatches[0].Face.ExternalImageId)
        var imageid=result.results.FaceMatches[0].Face.ExternalImageId
        res.render('welcome',{
            data:imageid
   
        })

     }); 

   


})



app.listen(port);
console.log("Server Running Successfully at port " + port);

module.exports = app