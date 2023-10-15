const express = require('express'); 
const app = express();
const port = process.env.PORT || 3001;


// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});