// DEPENDENCIES
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const db = require('./queries')
const PORT = process.env.PORT || 3001
const pool = require('./postgres')


// LOGGING/ERROR HANDLING
process.on('exit', () => { // frees the db connection on exit of server
  console.log('Closing database connections...')
  pool.end((err) => {
      if (err) {
          console.error('Error closing database connections:', err)
      } else {
          console.log('Database connections closed.')
      }
  })
})

process.on('SIGINT', () => { // checks for ctrl-c to shut down server
  console.log('\nShutting down server...')
  process.exit(0)
})

process.on('unhandledRejection', (reason, promise) => { // catches issues from api calls
  console.error('Unhandled Promise Rejection:', reason);
});

// BACKEND API SETUP
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(PORT, () =>{
  console.log('server running on port 3001 ')
})

app.get('/', (request, response) => {
  response.json({ info: 'SpendSmart Backend API: Powered by Node.js, Express, and Postgres' })
})


// QUERIES

// transactions
app.get('/transactions/:userID', db.getTransactions)
app.post('/addtransaction', db.addTransaction)
app.put('/edittransaction', db.editTransaction)
app.delete('/deletetransaction', db.deleteTransaction)

// users
app.post('/login', db.verifyLogin)
app.post('/register', db.registerUser)
// app.put('/edit', db.updateUser)
app.delete('/delete', db.deleteUser)

// categories
app.get('/categories/:userID', db.getCategories)
app.get('/loadChart/:userID', db.loadChartByCategory)
// app.post('/addcategory', db.addCategory)
// app.put('/editcategory', db.editCategory)
// app.delete('/deletecategory', db.deleteCategory)