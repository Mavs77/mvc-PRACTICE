const express = require('express')
const app = express()
//used to establish connection to the database
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//this section sets up the routes for the application. The first line specifies taht requests to the root URL ('/') should be handled by the 'homeRoutes' module. The second line specifies that requests to the '/todos' URL should be handled by the 'todoRoutes' module.
app.use('/', homeRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    