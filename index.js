const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = __dirname + '/public/';

//Alternativ måde at skrive de to ovenstående linjer på:
// const app = require('express').express;

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoDbUrl = 'mongodb://jakob:1234@cluster0-shard-00-00-xcvyq.mongodb.net:27017,cluster0-shard-00-01-xcvyq.mongodb.net:27017,cluster0-shard-00-02-xcvyq.mongodb.net:27017/zalandodummy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

app.use(express.static('public'));

app.use(express.static('staticFiles'));

app.use(bodyParser.urlencoded({extended : true}));

app.get('/customers', function(req, res){



MongoClient.connect(mongoDbUrl, function (err, db){

    var col = db.collection('customers');

//     if(err){
//         console.log(err)
//     }
// else{
//     console.log('Connected to db: ' + db.databaseName)
// }

//CRUD

//Read All

col.find().toArray(function (err, result){
    // console.log(result);
    res.json(result);
});


db.close;
});

});

//Read single element by ID

app.get('/customers/:id', function(req, res){
    
    MongoClient.connect(mongoDbUrl, function(err, db){
        var col = db.collection('customers');
        
        col.findOne({'_id' : ObjectId(req.params.id)}, function(err, result){
res.json(result);
        });
        db.close();
    });
    });

//Create

app.post('/customers/', function(req, res){
    
    MongoClient.connect(mongoDbUrl, function(err, db){
        var col = db.collection('customers');
        
       col.insertOne(req.body, function(err, result){
            res.status(201);
            res.json({msg : 'Customer created'});
       });

        db.close();
    });
    });

    //Delete

    app.delete('/customers/:id', function(req, res){
        
        MongoClient.connect(mongoDbUrl, function(err, db){
            var col = db.collection('customers');
            
            col.deleteOne({'_id' : ObjectId(req.params.id)}, function(err, result){
    res.json(result);
            });
            db.close();
        });
        });

        //fuckkodestart

app.get('/login', function (req, res) {
    res.sendFile( path + 'login.html', function (err) {
        //Her kan man handle errors
    });
});

app.post('/login', function (req, res) {
   
    // console.log(req.body.user);
    // console.log(req.body.password);

    if (req.body.user === 'user'){
        res.sendFile( path + 'verysecret.html', function (err) {
            
        })
    } else
    res.sendFile( path + 'login.html', function (err) {
        //Her kan man handle errors
    });


})
        //fuckkodeslut
    

app.listen(3000);
