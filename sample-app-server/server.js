require('dotenv').config()

//Environment Variables.
const PORT = process.env.PORT || 3000;
const DEVPORT = process.env.DEVPORT || 4200;
const SERVER = process.env.SERVER || "https://localhost";
const BUILD = process.env.BUILD || "prod"; 
const DEVSERVER = process.env.DEVSERVER || "http://localhost";
const MONDODB_URL = process.env.MONDODB_URL || "mongodb://127.0.0.1:27017";

const express = require('express');  // Import express.js
const {MongoClient} = require('mongodb');
const app = express();  // The app object conventionally denotes the Express application. Create it by
                        // calling the top-level express() function exported by the Express module.
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const formidable = require('formidable');
const fs = require('fs');
const cors = require('cors');

const options = {

    //generate a SSL certificate authority and cert.
    //openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=US/CN=My-Root-CA"
    //openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
    //openssl req -new -nodes -newkey rsa:2048 -keyout localhost.key -out localhost.csr -subj "/C=US/ST=YourState/L=YourCity/O=Example-Certificates/CN=localhost.local"
    //openssl x509 -req -sha256 -days 1024 -in localhost.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out localhost.crt
    // move generated files to the ssl directory.
    key: fs.readFileSync('ssl/localhost.key'),
    cert: fs.readFileSync('ssl/localhost.crt')
};
const https = require('https').Server(options,app);

if( BUILD === "prod"){
    originserver = SERVER+":"+PORT;
}else if(BUILD === "dev"){
    originserver = DEVSERVER+":"+DEVPORT;
}

//MiddleWare
var corsOptions = {
    origin: originserver,
    optionsSuccessStatus: 200 ,
    methods:['GET','POST'],
  }
  
app.use(cors(corsOptions));
app.disable("x-powered-by");

app.use(function(req,res,next){
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; frame-ancestors 'self'; upgrade-insecure-requests; X-Content-Type-Options 'nosniff';"
      );
      next();  
})


app.use (express.json());   // Mounts the specified middleware function at the
                            // specified path: the middleware function is executed when the base of the
                            // requested path matches path. In this case we are using middleware to parse
                            // JSON data

app.use(expressSanitizer());
app.use('/images',express.static(path.join(__dirname, 'userimages')));


if( BUILD === "prod"){
let staticpath = path.resolve('www');
app.use('/',express.static(staticpath, { redirect: false }));

}


    const io = require('socket.io')(https,{
         cors:{
           origin: originserver,
              methods:["GET","POST"],
          }
    });


const sockets = require('./socket.js');
sockets.connect(io, PORT);
//mongo connection string to mongo  database
const uri = MONDODB_URL;

const client = new MongoClient(uri);
async function main() {
	
    try{
       
        await client.connect();
        let db = client.db("demo-app");
        //check if collection exists
        const collections = await db.listCollections().toArray();
        const exists = collections.map(c => c.name).includes('cars');
        debug(exists);
           if (exists == false) { 
            //import initial data if the collection did not exist.
             let importcars =  JSON.parse(fs.readFileSync(path.join(__dirname, 'data/demo-app-cars3.json')));
            
              const result = await db.collection('cars').insertMany(importcars, { ordered: true }); 
       
         }
        //POST Route for uploading images.
        require('./routes/api-uploads.js')(app,formidable,fs,path);

        //POST route for updating user profile information
        require('./routes/api-update-users.js')(app,db);

        // POST Route for checking user credentials
        require('./routes/api-login.js')(app,db);

        // POST Route for create new user 
        require('./routes/api-register.js')(app,db);

        // GET Route for getting all car data
        require('./routes/api-data-cars.js')(app,db);
        
        // POST Route for updating a cars data
        require('./routes/api-cars-update.js')(app,db);

        if( BUILD === "prod"){
        app.get('*',function (req, res, next) {
            res.sendFile(path.resolve(path.join(__dirname, 'www/index.html')));
          });
        }
        // // Start the server listening on port 3000. Output message to console once server has started.(diagnostic only)
         require('./listen.js')(https,PORT,BUILD);
         
    }
    catch(e){
        console.log(e);
    }
    
}main().catch(console.error);

function debug(v){
    if(BUILD === 'dev'){
        console.log(v);
    }
}