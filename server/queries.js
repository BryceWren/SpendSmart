const pool = require('./postgres')
const smtp = require('./emails')
const { response } = require('express')


//#region TRANSACTIONS
const getTransactions = async (request, response) => {
  const userID = parseInt(request.params.userID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM transactions t join category c on t."categoryID" = c."categoryID" WHERE t."userID" = $1 ORDER BY date desc', 
      [userID])
    console.log('returned ' + result.rows.length + ' transactions')
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const addTransaction = async (request, response) => {
  const userID = parseInt(request.body.userID)
  const date = request.body.date
  const desc = request.body.desc
  const amount = parseInt(request.body.amount)
  const category = parseInt(request.body.category)
  const note = request.body.note


  const client = await pool.connect()
  try {
    const result = await client.query(
      'INSERT INTO transactions (description, amount, date, "categoryID", notes, "userID") VALUES ($1, $2, $3, $4, $5, $6) RETURNING "transactionID"', 
      [desc, amount, date, category, note, userID])
    console.log('added transaction ' + result.rows[0][0])
    response.status(200).send('added transaction ' + result.rows[0][0])
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const editTransaction = async (request, response) => {
  const transactionID = parseInt(request.body.transactionID)
  const desc = request.body.desc
  const amount = parseInt(request.body.amount)
  const date = request.body.date
  const category = parseInt(request.body.category)
  const notes = request.body.note

  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE transactions SET description=$1, amount=$2, date=$3, "categoryID"=$4, notes=$5 WHERE "transactionID"=$6', 
      [desc, amount, date, category, notes, transactionID])
    console.log('updated transaction ' + transactionID)
    response.status(200).send('updated transaction ' + transactionID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const deleteTransaction = async (request, response) => {
  const transactionID = parseInt(request.body.transactionID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'DELETE FROM transactions WHERE "transactionID"=$1', 
      [transactionID])
    console.log('deleted transaction ' + transactionID)
    response.status(200).send('deleted transaction ' + transactionID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}
//#endregion

//#region CALENDAR
const getCalendarTransactions = async (request, response) => {
  const userID = parseInt(request.params.userID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM repeatTransactions t join category c on t."categoryID" = c."categoryID" WHERE t."userID" = $1 ORDER BY date desc', 
      [userID])
    console.log('returned ' + result.rows.length + ' repeat transactions')
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const addCalendarTransaction = async (request, response) => {
  const userID = parseInt(request.body.userID)
  const desc = request.body.desc
  const amount = parseInt(request.body.amount)
  const date = request.body.date
  const repeat = parseInt(request.body.repeat)
  const category = parseInt(request.body.category)
  const notes = request.body.note


  const client = await pool.connect()
  try {
    const result = await client.query(
      'INSERT INTO repeatTransactions (description, amount, date, repeat, "categoryID", notes, "userID") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "recurringID"', 
      [desc, amount, date, repeat, category, notes, userID])
    console.log('added repeat transaction ' + result.rows[0][0])
    response.status(200).send('added repeat transaction ' + result.rows[0][0])
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const editCalendarTransaction = async (request, response) => {
  const recurringID = parseInt(request.body.recurringID)
  const desc = request.body.desc
  const amount = parseInt(request.body.amount)
  const date = request.body.date
  const repeat = parseInt(request.body.repeat)
  const category = parseInt(request.body.category)
  const notes = request.body.note

  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE repeatTransactions SET description=$1, amount=$2, date=$3, "categoryID"=$4, notes=$5, repeat=$6 WHERE "recurringID"=$7', 
      [desc, amount, date, category, notes, repeat, recurringID])
    console.log('updated repeat transaction ' + recurringID)
    response.status(200).send('updated repeat transaction ' + recurringID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const deleteCalendarTransaction = async (request, response) => {
  const recurringID = parseInt(request.body.recurringID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'DELETE FROM repeatTransactions WHERE "recurringID"=$1', 
      [recurringID])
    console.log('deleted repeat transaction ' + recurringID)
    response.status(200).send('deleted repeat transaction ' + recurringID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}
//#endregion

//#region USERS
const generateToken = () => {
  return Math.random().toString(36).substring(2,15);
}

const registerUser = async (request, response) => {
  const first = request.body.backFirst
  const last = request.body.backLast
  const email = request.body.backEmail
  const pass = request.body.backPassword
  
  //const hashPass = bcrypt.hash(pass, 10) //would like to use this later in order to hash passwords available in our database

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1', 
      [email])
    if (result.rows.length > 0) { //this is where you will send a message to the user to confirm their email
      console.log("email already registered or has not been confirmed")
      response.status(401).json(result.rows) // 401: unauthorized
    } else { //once email has been confirmed flip a "false statement to true to allow access once user clicks on link"
      //emailVerify(email) //add my emailVerify funciton grabbing both email and password 
      token = generateToken()
      const result = client.query(
        'CALL register_user($1, $2, $3, $4)', 
        [first, last, email, pass])
        /*
        'CALL register_user($1, $2, $3, $4, $5)', 
        [first, last, email, pass, token]) 
        i am messing with stored procedures need addison to mess with 
        */
        console.log('user registered successfully')
        response.status(200).send('User registered successfully.')
    }
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const verifyLogin = async (request, response) => {
  const email = request.body.backEmail
  const pass = request.body.backPassword

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2', 
      [email, pass])
      if (result.rows.length > 0) {
        console.log("you are logged in :)")
        response.status(200).json(result.rows[0])
        token = generateToken();
        smtp.sendMail(email, "Account Registration", "http://localhost:3001/confrimation?token=${token}"); //on login to test 
        //console.log(generateToken())
      } else {
        console.log("you suck buddy, you messed something up") //this means email or password was either wrong or doesnt exist
        response.status(401).json(result.rows) // 401: unauthorized
      }
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

/*
const confirm = async (request, response) => { 
    await client.query(
      'SELECT * FROM users WHERE email = $1 AND token = $2', [email, token]
    )
    if (result.rows.length > 0) {
      await client.query(
        'UPDATE users SET confirmation = $1', [1]
      )
      console.log("your email has been confirmed ")
    }

}
^^^ this is a rough draft on the backend server call to change the confirmation number from a 0 (when an email is not confirmed) to a 1 (an email is confirmed)
*/ 

const editEmail = async (request, response) => {
  const userID = parseInt(request.body.userID)
  const email = request.body.email

  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE users SET email=$1 WHERE "userID"=$2', 
      [email, userID])
    console.log('updated email for user ' + userID)
    response.status(200).send('updated email for user ' + userID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const editPassword = async (request, response) => {
  const userID = parseInt(request.body.userID)
  const pass = request.body.email

  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE users SET pass=$1 WHERE "userID"=$2', 
      [pass, userID])
    console.log('updated pass for user ' + userID)
    response.status(200).send('updated pass for user ' + userID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const deleteUser = async (request, response) => {
  const userID = parseInt(request.body.userID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'CALL delete_user($1)', 
      [userID])
    console.log('deleted user ' + userID)
    response.status(200).send('deleted user ' + userID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}
//#endregion

//#region CATEGORIES
  // columns: "userID" (integer),	"categoryID" (integer),	"categoryName" (string),	"amount" (float),	"typeDesc" (string),	"durationDesc" (string)
const getCategories = async (request, response) => {
  const userID = parseInt(request.params.userID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM "categoryDesc" c WHERE c."userID" = $1', 
      [userID])
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

  // columns: type (integer), typeDesc (string)
  // possible values: 1=income, 2=needs, 3=wants, 4=debts, 5=savings
const getCategoryTypes = async (request, response) => {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM "categoryTypes"')
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

  // columns: duration (integer), durationDesc (string)
  // possible values: 1=monthly, 2=weekly, 3=bi-weekly, 4=bi=monthly, 5=quarterly, 6=semester, 7=yearly, 8=until date
const getCategoryDurations = async (request, response) => {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM "categoryDuration"')
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const loadChartByCategory = async (request, response) => {
  const userID = parseInt(request.params.userID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT c."categoryName" as label, SUM(t.amount) as value FROM public.transactions t JOIN "categoryDesc" c on c."categoryID" = t."categoryID" WHERE t."userID" = $1 GROUP BY t."userID", c."categoryName"',
      [userID])
    response.status(200).json(result.rows)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const addCategory = async (request, response) => {
  const userID = parseInt(request.body.userID)
  const categoryName = request.body.categoryName
  const type = parseInt(request.body.type) 
    // possible values: 1=income, 2=needs, 3=wants, 4=debts, 5=savings
  const duration = parseInt(request.body.duration) 
    // possible values: 1=monthly, 2=weekly, 3=bi-weekly, 4=bi=monthly, 5=quarterly, 6=semester, 7=yearly, 8=until date
  const amount = parseFloat(request.body.amount)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'INSERT INTO category ("userID", "categoryName", "type", "duration", "amount") VALUES ($1, $2, $3, $4, $5) RETURNING "categoryID"', 
      [userID, categoryName, type, duration, amount])
    console.log('added category ' + result.rows[0][0])
    response.status(200).send('added category ' + result.rows[0][0])
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const editCategory = async (request, response) => {
  const categoryID = parseInt(request.body.categoryID)
  const categoryName = request.body.categoryName
  const type = parseInt(request.body.type) 
    // possible values: 1=income, 2=needs, 3=wants, 4=debts, 5=savings
  const duration = parseInt(request.body.duration) 
    // possible values: 1=monthly, 2=weekly, 3=bi-weekly, 4=bi=monthly, 5=quarterly, 6=semester, 7=yearly, 8=until date
  const amount = parseFloat(request.body.amount)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE category SET "categoryName"=$1, type=$2, duration=$3, "amount"=$4 WHERE "categoryID"=$5', 
      [categoryName, type, duration, amount, categoryID])
    console.log('updated category ' + categoryID)
    response.status(200).send('updated category ' + categoryID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const deleteCategory = async (request, response) => {
  const categoryID = parseInt(request.body.categoryID)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'DELETE FROM category WHERE "categoryID"=$1', 
      [categoryID])
    console.log('deleted category ' + categoryID)
    response.status(200).send('deleted category ' + categoryID)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}
//#endregion


// EXPORT
module.exports = {
  // transactions
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  // calendar
  getCalendarTransactions,
  addCalendarTransaction,
  editCalendarTransaction,
  deleteCalendarTransaction,
  // users
  registerUser,
  verifyLogin,
  editEmail,
  editPassword,
  deleteUser,
  // categories
  getCategories,
  getCategoryTypes,
  getCategoryDurations,
  loadChartByCategory,
  addCategory,
  editCategory,
  deleteCategory,
}