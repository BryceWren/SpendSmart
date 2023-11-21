// #region DEPENDENCIES
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const db = require('./queries')
const PORT = process.env.PORT || 3001
const pool = require('./postgres')

// #endregion

// #region LOGGING/ERROR HANDLING
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

// #endregion

// #region BACKEND API SETUP
const allowCrossDomain = (req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://spendsmart.vercel.app'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
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
// #endregion

// #region QUERIES

// transactions
app.get('/transactions/:userID', db.getTransactions)
app.post('/transactions/add', db.addTransaction)
app.put('/transactions/edit', db.editTransaction)
app.delete('/transactions/delete', db.deleteTransaction)

app.get('/calendar/all/:userID', db.getCalendarTransactions)
app.post('/calendar/add', db.addCalendarTransaction)
app.put('/calendar/edit', db.editCalendarTransaction)
app.delete('/calendar/delete', db.deleteCalendarTransaction)

// users
app.post('/login', db.verifyLogin)
app.post('/register', db.registerUser)
app.put('/user/email', db.editEmail)
app.put('/user/pass', db.editPassword)
app.put('/resetpassword', db.resetPassword)
app.delete('/delete', db.deleteUser)
app.post('/resendVerify', db.resendVerify)
app.put('/confirmation/:token', db.confirmUser)
app.post('/forgotpassword', db.forgotpassword) //send the email
app.put('/resetpassword', db.resetPassword)

// categories
app.get('/loadChart/:userID', db.loadChartByCategory)
app.get('/categories/:userID', db.getCategories)
app.get('/categories/types', db.getCategoryTypes)
app.get('/categories/duration', db.getCategoryDurations)
app.post('/categories/add', db.addCategory)
app.put('/categories/edit', db.editCategory)
app.delete('/categories/delete', db.deleteCategory)

// #endregion