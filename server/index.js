const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const PORT = process.env.PORT || 3001;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(PORT, () =>{
  console.log('server running on port 3001 ');
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// QUERIES
app.get('/transactions', db.getTransactions)
app.post('/transactions', db.addTransaction)
app.post('/register', db.registerUser)
app.post('/login', db.verifyLogin)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)