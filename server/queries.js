const pool = require('./postgres')


// TRANSACTIONS

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


// USERS

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
    if (result.rows.length > 0) {
      console.log("email already registered")
      response.status(401).json(result.rows) // 401: unauthorized
    } else {
      const result = client.query(
        'CALL register_user($1, $2, $3, $4)', 
        [first, last, email, pass])
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



// categories

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


// EXPORT
module.exports = {
  getTransactions,
  addTransaction,
  editTransaction,
  deleteTransaction,
  registerUser,
  verifyLogin,
  getCategories,
  loadChartByCategory,
  deleteUser,
}