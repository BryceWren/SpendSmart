//#region DEPENDENCIES
const pool = require('./postgres')
const smtp = require('./emails')
const bcrypt = require('bcrypt')

// #endregion

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
      'SELECT * FROM "repeatTransactions" t left outer join category c on t."categoryID" = c."categoryID" WHERE t."userID" = $1 ORDER BY date desc',
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
  const amount = request.body.amount ? parseInt(request.body.amount) : 0
  const date = request.body.date
  const repeat = request.body.repeat ? parseInt(request.body.repeat) : 0
  const category = request.body.category ? parseInt(request.body.category) : 0
  const notes = request.body.note


  const client = await pool.connect()
  try {
    const result = await client.query(
      'INSERT INTO "repeatTransactions" (description, amount, date, repeat, "categoryID", notes, "userID") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "recurringID"',
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
  const amount = request.body.amount ? parseInt(request.body.amount) : 0
  const date = request.body.date
  const repeat = request.body.repeat ? parseInt(request.body.repeat) : 0
  const category = request.body.category ? parseInt(request.body.category) : 0
  const notes = request.body.note

  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE "repeatTransactions" SET description=$1, amount=$2, date=$3, "categoryID"=$4, notes=$5, repeat=$6 WHERE "recurringID"=$7',
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
      'DELETE FROM "repeatTransactions" WHERE "recurringID"=$1',
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

const registerUser = async (request, response) => {
  const first = request.body.backFirst
  const last = request.body.backLast
  const email = request.body.backEmail
  const password = request.body.backPassword

  // hashing the password to store in db
  let pass = ""
  bcrypt
  .hash(password, 10)
  .then(hash => {
    pass = hash
    console.log('Hash ', hash)
  })
  .catch(err => console.error(err.message))

  const client = await pool.connect()
  try {
    // check if email is already in our db
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email])

    if (result.rows.length > 0) {
      console.log("email [" + email + "] already registered")
      response.status(401).json(result.rows) // 401: unauthorized
    } else { 
      // create new user in db
      client.query(
        'CALL register_user($1, $2, $3, $4)',
        [first, last, email, pass])
      // return results of new user
      const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email])
      
      // send verification email
      smtp.sendMail(email, "Account Registration", result.rows[0].id);

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

const resendVerify = async (request, response) => {
  const email = request.body.email
  console.log(email)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email])

      console.log(result.rows)
    smtp.sendMail(email, "Account Registration", result.rows[0].id);
    console.log('resent verification email')
    response.status(200).send('resent verification email')
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const forgotpassword = async (request, response) => {
  const email = request.body.email
  console.log(email)

  const client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email])

      //console.log(result.rows)
    smtp.emailPassReset(email, "Password Reset");
    //console.log('resent verification email')
    response.status(200).send('resent verification email')
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const resetPassFromEmail = async (request, response) => {
  const userEmail = request.body.email;
  const newPass = request.body.pass;
  let pass = newPass
  bcrypt
  .hash(newPass, 10)
  .then(hash => {
    pass = hash
    console.log('Hash ', hash)
  })
  .catch(err => console.error(err.message))
  client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE  email = $1', [userEmail]
    )
    console.log(result.rows[0].email)

    if (result.rows[0].email == userEmail) {
      await client.query(
        'UPDATE users SET password = $1 WHERE email = $2', [pass, userEmail]
      )
      console.log("email for user [" + result.rows[0].email + "] has been confirmed ")
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
      'SELECT * FROM users WHERE email = $1',
      [email])

    if (result.rows.length > 0 && bcrypt.compare(pass, result.rows[0].password)) { // aka valid credentials
      
      if (result.rows[0].verified) { // user validated

        userid = result.rows[0].id;
        console.log("you are logged in :)")
        response.status(200).json(result.rows[0])
      } else { // user not validated
        console.log("unverified")
        response.status(423).json({ message: 'Email Verification Required' }) // 423: locked (user needs to verify email first)        
      }
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


const confirmUser = async (request, response) => {
  const urlToken = request.params.token;
  console.log(urlToken)

  client = await pool.connect()
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE  id = $1', [urlToken]
    )
    console.log(result.rows[0].verified)

    if (result.rows[0].id == urlToken) {
      await client.query(
        'UPDATE users SET verified = true WHERE id = $1', [urlToken]
      )
      console.log("email for user [" + result.rows[0].id + "] has been confirmed ")
      }
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const editEmail = async (request, response) => {
  const userID = parseInt(request.body.userID)
  const email = request.body.email

  console.log("editing email")
    console.log("userID = " + userID)
    console.log("email = " + email)

  const client = await pool.connect()
  try {
    await client.query(
      'UPDATE users SET email=$1 WHERE "id"=$2',
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
  const pass = request.body.pass
  const newPlain = request.body.new

  let newHashed = ""
  bcrypt
  .hash(newPlain, 10)
  .then(hash => {
    newHashed = hash
    console.log('Hash ', hash)
  })
  .catch(err => console.error(err.message))

  const client = await pool.connect()
  try {
    await client.query(
      'UPDATE users SET password=$1 WHERE "id"=$2 AND password=$3',
      [newHashed, userID, pass])
    console.log('updated pass for user ' + userID)
    response.status(200).json(newHashed)
  } catch (error) {
    console.error(error)
    response.status(500).json(error) // 500: internal server error
  } finally {
    client.release()
  }
}

const resetPassword = async (request, response) => {
  const email = parseInt(request.body.email)
  const passPlain = request.body.pass

  let newPass = ""
  bcrypt
  .hash(passPlain, 10)
  .then(hash => {
    newPass = hash
    console.log('Hash ', hash)
  })
  .catch(err => console.error(err.message))

  const client = await pool.connect()
  try {
    await client.query(
      'UPDATE users SET password=$1 WHERE "email"=$2',
      [newPass, email])
    console.log('updated pass for ' + email)
    response.status(200).send('updated pass for ' + email)
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
    await client.query(
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
  console.log(request.body)
  const userID = parseInt(request.body.userID)
  const categoryName = request.body.categoryName
  const type = parseInt(request.body.type)
  // possible values: 1=income, 2=needs, 3=wants, 4=debts, 5=savings
  const duration = request.body.duration ? parseInt(request.body.duration) : 1
  // possible values: 1=monthly, 2=weekly, 3=bi-weekly, 4=bi=monthly, 5=quarterly, 6=semester, 7=yearly, 8=until date
  const amount = request.body.amount ? parseFloat(request.body.amount) : 0

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
  console.log(request.body)
  const categoryID = parseInt(request.body.categoryID)
  const categoryName = request.body.categoryName
  const type = parseInt(request.body.type)
  // possible values: 1=income, 2=needs, 3=wants, 4=debts, 5=savings
  const duration = request.body.duration ? parseInt(request.body.duration) : 1
  // possible values: 1=monthly, 2=weekly, 3=bi-weekly, 4=bi=monthly, 5=quarterly, 6=semester, 7=yearly, 8=until date
  const amount = request.body.amount ? parseFloat(request.body.amount) : 0

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
  console.log(request.body)
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
  resendVerify,
  resetPassword,
  editEmail,
  editPassword,
  deleteUser,
  confirmUser,
  forgotpassword, //password reset link
  resetPassFromEmail, //actually change the password
  // categories
  getCategories,
  getCategoryTypes,
  getCategoryDurations,
  loadChartByCategory,
  addCategory,
  editCategory,
  deleteCategory,
}