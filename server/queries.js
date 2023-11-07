const pool = require('./postgres')
const nodemailer = require('nodemailer')


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


const emailVerify   = async (email, request, response) =>{
  let testAccount = await nodemailer.createTestAccount();//creating a test account to use as the email hosting service as well to send the email to client
  const domain = email.split('@')[1]
  const realDomain = domain.split('.')[0] //this finds the domain name in case we need to change per email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", //  ethereal is a domain that shows the emails sending and i have it outputting once it sends
    port: 587, //465 = true, 587 = false
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: testAccount.user, // STORE IN ENV (where we would put our email domain)
      pass: testAccount.pass, //STORE IN ENV (if using gmail (only) we would need to 2fa our email)
    }
  });
  let mailOptions = {
    from: testAccount.user,//testing purposes STORE IN ENV
    to: email, //testing purposes would use variable email here for user email
    subject: 'Account Confirmation',
    text: 'Please confirm your account' //need to add a jwt with our local host address to confirm users email
  }
    await transporter.sendMail(mailOptions, (error, info) => {
    if (error){
      console.log(error);
      console.log('this is where there is an error ' + email)

    }else {
      console.log(email)
      console.log('email sent: ' + info.response);
      console.log('preview url: %s', nodemailer.getTestMessageUrl(info));
    }
  })
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
        //emailVerify(email)// testing purposes
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