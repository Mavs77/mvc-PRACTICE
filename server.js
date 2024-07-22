const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const DB_STRING = process.env.DB_STRING
const flash = require('express-flash')
const logger = require('morgan')
//used to establish connection to the database
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

//effectively imports mongoose
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

app.use(
    session({
        secret: 'keyboard cat', 
        resave: false, 
        saveUninitialized: false, 
        store: MongoStore.create({ mongoUrl: DB_STRING})
    })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//this section sets up the routes for the application. The first line specifies taht requests to the root URL ('/') should be handled by the 'homeRoutes' module. The second line specifies that requests to the '/todos' URL should be handled by the 'todoRoutes' module.
app.use('/', homeRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    