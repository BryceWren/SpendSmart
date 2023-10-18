const { randomInt } = require('crypto') // temp soln for transactionID
require ('dotenv').config()

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
    pool.query('SELECT * FROM transactions ORDER BY date desc', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const addTransaction = (request, response) => {
    // const transactionID = request.body.userID + randomInt(99).toString() // TODO: fix how its creating this
    const date = request.body.date
    const desc = request.body.desc
    const amount = request.body.amount
    const category = request.body.category
    const note = request.body.note

     
    pool.query('INSERT INTO transactions (description, amount, date, category, notes) VALUES ($1, $2, $3, $4, $5)', [desc, amount, date, category, note], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send(`Added transaction ${results.transactionID}`)
    })
  }

  const editTransaction = (request, response) => {
    const transactionID = request.body.transactionID
    const desc = request.body.desc
    const amount = request.body.amount
    const date = request.body.date
    const category = request.body.category
    const notes = request.body.note

     
    pool.query('UPDATE transactions SET description=$1, amount=$2, date=$3, category=$4, notes=$5 WHERE "transactionID"=$6', [desc, amount, date, category, notes, transactionID], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send(`Updated transaction ${results.transactionID}`)
    })
  }

  const deleteTransaction = (request, response) => {
    const transactionID = request.body.transactionID

     
    pool.query('DELETE FROM transactions WHERE "transactionID"=$1', [transactionID], (error, results) => {
    if (error) {
        throw error
    }
    response.status(201).send(`Deleted transaction ${results.transactionID}`)
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
          throw error
        }

        if (results.rows.length > 0) {
            console.log("Email already registered.")
        } else {  
            pool.query('INSERT INTO users ("firstName", "lastName", email, password) VALUES ($1, $2, $3, $4) RETURNING id', [first, last, email, pass], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User registered successfully.`)
            })
        }
    })

    
  }

const verifyLogin = (request, response) => {
    const email = request.body.backEmail
    const pass = request.body.backPassword

    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pass], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(200).json(results.rows)
      if (results.rows.length > 0){
        console.log("you are logged in :)")
        response.status(200).json(results.rows)
        //if (bcrypt.compare(pass, result[0].pass) = true){ would like to use this to compare passwords
        //  console.log("login was successful")
        //}
      } else {
        console.log("you suck buddy, you messed something up") //this means email or password was either wrong or doesnt exist
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
  }