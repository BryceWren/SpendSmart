// DB CONNECTION
require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})


// TRANSACTIONS

const getTransactions = (request, response) => {
  const userID = parseInt(request.params.userID)

  pool.query('SELECT * FROM transactions t join category c on t."categoryID" = c."categoryID" WHERE t."userID" = $1 ORDER BY date desc', [userID], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    }
    response.status(200).json(results.rows)
  })
}

const addTransaction = (request, response) => {
  const userID = parseInt(request.body.userID)
  const date = request.body.date
  const desc = request.body.desc
  const amount = parseInt(request.body.amount)
  const category = parseInt(request.body.category)
  const note = request.body.note


  pool.query('INSERT INTO transactions (description, amount, date, "categoryID", notes, "userID") VALUES ($1, $2, $3, $4, $5, $6)', [desc, amount, date, category, note, userID], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    }
    response.status(200).send(`Added transaction ${results.transactionID}`)
  })
}

const editTransaction = (request, response) => {
  const transactionID = parseInt(request.body.transactionID)
  const desc = request.body.desc
  const amount = parseInt(request.body.amount)
  const date = request.body.date
  const category = parseInt(request.body.category)
  const notes = request.body.note

  pool.query('UPDATE transactions SET description=$1, amount=$2, date=$3, "categoryID"=$4, notes=$5 WHERE "transactionID"=$6', [desc, amount, date, category, notes, transactionID], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    }
    response.status(200).send(`Updated transaction ${results.transactionID}`)
  })
}

const deleteTransaction = (request, response) => {
  const transactionID = parseInt(request.body.transactionID)

  pool.query('DELETE FROM transactions WHERE "transactionID"=$1', [transactionID], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    }
    response.status(200).send(`Deleted transaction ${results.transactionID}`)
  })
}


// USERS

const registerUser = (request, response) => {
  const first = request.body.backFirst
  const last = request.body.backLast
  const email = request.body.backEmail
  const pass = request.body.backPassword
  //const hashPass = bcrypt.hash(pass, 10) //would like to use this later in order to hash passwords available in our database

  pool.query("SELECT * FROM users WHERE email = $1", [email], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    }

    if (results.rows.length > 0) {
      console.log("Email already registered.")
      response.status(401).json(results.rows) // 401: unauthorized
    } else {
      pool.query('call register_user($1, $2, $3, $4)', [first, last, email, pass], (error, results) => {
        if (error) {
          console.error(error)
          response.status(500).json(error) // 500: internal server error
        }

        response.status(200).send('User registered successfully.')
      })
    }
  })
}

const verifyLogin = (request, response) => {
  const email = request.body.backEmail
  const pass = request.body.backPassword

  pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pass], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    }

    if (results.rows.length > 0) {
      console.log("you are logged in :)")
      response.status(200).json(results.rows[0])
    } else {
      console.log("you suck buddy, you messed something up") //this means email or password was either wrong or doesnt exist
      response.status(401).json(results.rows) // 401: unauthorized
    }
  })
}

/*
const deleteUser = (request, response) => {
  const email = request.body.showEmail
  const pass = request.body.showPass

  pool.query('DELETE FROM users WHERE email = $1 AND password = $2', [email, pass], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
      }
      response.status(200).send(`Deleted User`)
    }
  )
}
*/



// categories

const getCategories = (request, response) => {
  const userID = parseInt(request.params.userID)

  pool.query('SELECT * FROM "categoryDesc" c WHERE c."userID" = $1', [userID], (error, results) => {
    if (error) {
      console.error(error)
      response.status(500).json(error) // 500: internal server error
    } else {
      response.status(200).json(results.rows)
    }
  })
}


// EXPORT

module.exports = {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  registerUser,
  verifyLogin,
  getCategories,
  //deleteUser, //commented this because still working
}