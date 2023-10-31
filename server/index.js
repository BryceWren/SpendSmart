// DEPENDENCIES
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const env = require('dotenv').config()
const Pool = require('pg').Pool
const db = require('./queries')
const PORT = env.PORT || 3001

// DB CONNECTION
const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_HOST,
  port: env.DB_PORT,
  password: env.DB_PASSWORD,
  database: env.DB,
})

// FREE DB ON EXIT
process.on('exit', () => {
  console.log('Closing database connections...')
  pool.end((err) => {
      if (err) {
          console.error('Error closing database connections:', err)
      } else {
          console.log('Database connections closed.')
      }
  })
})

process.on('SIGINT', () => {
  console.log('\nShutting down server...')
  process.exit(0)
})

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