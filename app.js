
var express = require('express');
const {Db} =require('mongodb');
var path = require('path');
var fs= require('fs');
var alert= require('alert');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var togoarr =[]; 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// const x= 1000 * 60 * 60 * 24;
// app.use(session({
//   secret: "ir76mkmk7",
//   saveUninitialized: true,
//   cookie: { maxAge: x},
//   resave: true
// }));
app.use(
  session({
    secret: 'sessionstring',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function(req, res, next) {
  res.locals.togoarr = req.session.togoarr;
  next();
});
app.get('/',function(req,res){
  res.render('login')
});


app.post('/search', function(req,res){
  
  searchResString="";
  search= req.body.Search.toLowerCase();
  search=search.replace(/\s+/g, '');
  if(("annapurna circuit").includes(search)){
    searchResString+="1"
  }
  if(("bali island").includes(search)){
    searchResString+="2"
  }
  if(("inca trail to machu picchu").includes(search)){
    searchResString+="3"
  }
  if(("paris").includes(search)){
    searchResString+="4"
  }
  if(("rome").includes(search)){
    searchResString+="5"
  }
  if(("santorini island").includes(search)){
    searchResString+="6"
  }

  res.redirect('searchresults');
});


app.post('/', function(req,res){

  if (req.body.username=="admin" && req.body.password=="admin"){
    req.session.username=req.body.username;
    //user=req.body.username;
    res.redirect('home');
  }
  else{

  
  var url="mongodb://127.0.0.1:27017";

  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    db.collection("myCollection").findOne({username: req.body.username}, (err,results) => {
      if (results==null){
       // res.send('not send');
       alert("Username is not correct. Please register");
      }
      else{
        if (results.password!=req.body.password){
          alert("Incorrect credentials. Please try again");
        }
        else{
          //sessionStorage.setItem('user',req.body.username);
          //session=req.session;
          req.session.username=req.body.username;
          //user=req.body.username;
          res.redirect('home');
        }
      }
    });

  });
};
});
   
 // MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  //  if (err) throw err;
  //  var db = client.db('myDB');
   // db.collection('myCollection').insertOne({username:'user1', password:'pass1'});
  //});
    
app.get('/annapurna',function(req,res){
  if (req.session.username){
    res.render('annapurna')
  }
  else{
    alert("you need to login first");
  }
  
});


app.get('/bali',function(req,res){
  if (req.session.username){
  res.render('bali')
  }
  else{
    alert("you need to login first");
  }
  });
app.get('/cities',function(req,res){
  if (req.session.username){
  res.render('cities')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/hiking',function(req,res){
  if (req.session.username){
  res.render('hiking')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/home',function(req,res){
  if (req.session.username){
  res.render('home')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/inca',function(req,res){
  if (req.session.username){
  res.render('inca')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/islands',function(req,res){
  if (req.session.username){
  res.render('islands')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/paris',function(req,res){
  if (req.session.username){
  res.render('paris')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/registration',function(req,res){
  res.render('registration')
});
app.post('/register',function(req,res){

  var url="mongodb://127.0.0.1:27017";

  
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    if (req.body.username==null || req.body.username=="" || req.body.password==null || req.body.password==""){
      //console.log("Please don't leave any of the field empty");
      alert("Please don't leave any of the field empty");
    }
    else{
      db.collection("myCollection").findOne({username: req.body.username}, (err,results) => {
        if (results==null){
          togoarr=[]
          db.collection('myCollection').insertOne({username:req.body.username, password:req.body.password, togoarr: togoarr });
         alert("Registration succesfull!");
         //console.log("registration succesful");
          res.redirect('/');
        }
        else{
          alert("Username already taken. Please choose another username");
        // console.log("username already taken");
        }
      });
    }
  
  });
});
app.get('/rome',function(req,res){
  if (req.session.username){
  res.render('rome')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/santorini',function(req,res){
  if (req.session.username){
  res.render('santorini')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/searchresults',function(req,res){
  if (req.session.username){
  res.render('searchresults')
  }
  else{
    alert("you need to login first");
  }
});
app.get('/wanttogo',function(req,res){
  if (req.session.username){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username: req.session.username}, (err,results) => {
      if (results != null){ 
      res.render('wanttogo',{togo: results.togoarr});
      }
      });
    }
  
  );
    }
  else{
    alert("you need to login first");
  }

});
app.post('/wantinca',function(req,res){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  //console.log(session.user);
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username: req.session.username}, (err,results) => {
        
        if (results != null){
        if (results.togoarr.includes('Inca')){
          
         alert("This destination is already in your want to go list!");
       
        }
        else{
          db.collection("myCollection").updateOne({username: req.session.username}, {$push : { togoarr : "Inca" }});
          //results.togoarr.push('Inca');
          alert("Destination added successfully to your to go list");
        
        }
      }
      });
    }
  
  );


});
app.post('/wantanna',function(req,res){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  //console.log(session.user);
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username:req.session.username}, (err,results) => {
        
        if (results != null){
        if (results.togoarr.includes('Annapurna')){
          
         alert("This destination is already in your want to go list!");
       
        }
        else{
          db.collection("myCollection").updateOne({username: req.session.username}, {$push : { togoarr : "Annapurna" }});
          //results.togoarr.push('Inca');
          alert("Destination added successfully to your to go list");
        
        }
      }
      });
    }
  
  );


});
app.post('/wantbali',function(req,res){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  //console.log(session.user);
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username: req.session.username}, (err,results) => {
        
        if (results != null){
        if (results.togoarr.includes('Bali')){
          
         alert("This destination is already in your want to go list!");
       
        }
        else{
          db.collection("myCollection").updateOne({username: req.session.username}, {$push : { togoarr : "Bali" }});
          //results.togoarr.push('Inca');
          alert("Destination added successfully to your to go list");
        
        }
      }
      });
    }
  
  );


});
app.post('/wantparis',function(req,res){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  //console.log(session.user);
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username: req.session.username}, (err,results) => {
        
        if (results != null){
        if (results.togoarr.includes('Paris')){
          
         alert("This destination is already in your want to go list!");
       
        }
        else{
          db.collection("myCollection").updateOne({username: req.session.username}, {$push : { togoarr : "Paris" }});
          //results.togoarr.push('Inca');
          alert("Destination added successfully to your to go list");
        
        }
      }
      });
    }
  
  );


});
app.post('/wantrome',function(req,res){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  //console.log(session.user);
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username:req.session.username}, (err,results) => {
        
        if (results != null){
        if (results.togoarr.includes('Rome')){
          
         alert("This destination is already in your want to go list!");
       
        }
        else{
          db.collection("myCollection").updateOne({username: req.session.username}, {$push : { togoarr : "Rome" }});
          //results.togoarr.push('Inca');
          alert("Destination added successfully to your to go list");
        
        }
      }
      });
    }
  
  );


});
app.post('/wantsant',function(req,res){
  var url="mongodb://127.0.0.1:27017";
  //session=req.session;
  //console.log(session.user);
  MongoClient.connect(url, function(err,client){
    if (err) throw err;
    var db = client.db('myDB');
    
    db.collection("myCollection").findOne({username: req.session.username}, (err,results) => {
        
        if (results != null){
        if (results.togoarr.includes('Santorini')){
          
         alert("This destination is already in your want to go list!");
       
        }
        else{
          db.collection("myCollection").updateOne({username:req.session.username}, {$push : { togoarr : "Santorini" }});
          //results.togoarr.push('Inca');
          alert("Destination added successfully to your to go list");
        
        }
      }
      });
    }
  
  );


});



const PORT = process.env.PORT || 3000;

// your code

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

