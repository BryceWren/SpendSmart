const db = require ('dotenv').config
const express = require("express");
const { Pool } = require('pg');
const app = express()
const bcrypt = require('bcrypt');
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: ,
  host: ,
  port: ,
  password: ,
  database: ,
})
//const pool = await client.connect(); //client.connect needs to say outside of post because it can't call it multiple times which server is running



app.post('/register', async (req, res)=>{//was app.post


  const email = req.body.backEmail;
  //console.log("email = " + req.body.backEmail);
  const pass = req.body.backPassword;
  //const hashPass = bcrypt.hash(pass, 10); would like to use this later in order to hash passwords available in our database
  //console.log("pass = " + req.body.backPassword);
  //console.log(backid);
  const emailExists = await (pool.query("select * from users where email = $1", [email]))
  if (emailExists.rows.length > 0) {
    console.log("user already registered")
  }
  else{
  await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, pass]);
  console.log("you have been register");
  
  }
});



app.post('/', async (req, res)=>{


  const check_array = [];
  const email = req.body.backEmail;
  //console.log("email = " + req.body.backEmail);
  const pass = req.body.backPassword;
  //console.log("pass = " + req.body.backPassword);
  var flag = false;
  await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pass], (err, result) => {
    if (err) {
      console.log(err);
    }if (result.rows.length > 0){
      console.log("you are logged in :)")
      //if (bcrypt.compare(pass, result[0].pass) = true){ would like to use this to cdompare passwords
      //  console.log("login was successful");
      //}

    } else{
      console.log("you suck buddy, you messed something up"); //this means email or password was either wrong or doesnt exist
    }
    
    //for (var rows of Object.keys(result)){
      //console.log(rows + " ->" + result[rows])
    //}
    
  });
  
  //console.log("out of query");

});

app.listen(PORT, () =>{
  console.log('server running on port 3001 ');
});


/*
client.query('select * from users', (err, res)=>{
  if(!err){
    console.log(res.rows);
  } else{
    console.log(err.message);
  }
  client.end();
})
*/
//app.post('/login', (req,res) =>{
 // let email = req.body.email;
 // let password = req.body.password
//})




