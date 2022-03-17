const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '75b5268c629e4a9b8d0b1d711ac472aa',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
console.log('hello world')
app.get('/', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
          console.log(error)
        rollbar.log(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 5050

app.listen(port, () =>{
    console.log(`docked at port ${port}`)
})