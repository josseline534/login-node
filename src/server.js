'use strict'

// modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('./config/dataBase')
const routes = require('./app/routes/routes')
const configPassport = require('./config/passport')

// settings
const app = express()
app.set('port', process.env.PORT || 3000)
let port = app.get('port')
app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'ejs')

// middlewares
app.use(morgan('dev')) // sms (respuestas del servidor) por consola
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false})) // procesar datos
app.use(bodyParser.json())
app.use(session({
    secret:'sdxcfvgbhuinjokm',
    resave:false,
    saveUninitialized: false
}))
//configPassport(passport)
app.use(passport.initialize()) // autenticación
app.use(passport.session()) // guarda la sesión
app.use(flash()) // pasar sms en html


// routes
app.use('/', routes)
// static files
app.use(express.static(path.join(__dirname, 'public')))
// conection
mongoose.connect(db.url, db.options)
.then(()=>{
    console.log("Conexión exitosa a la Base de datos!!!");
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    })
})
.catch((err) => console.log(err))