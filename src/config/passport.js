const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/user')

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user) =>{
        done(err, user)
    })
})

// registro
passport.use('local-registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    await User.findOne({'email': email}, (error, user) => {
        if (error){
            return done(error)
        }
        if (user){
            return done(null, false, req.flash('RegistroMessage', 'Email ya existe'))
        }else{
            let newUser = new User()
            newUser.email = email
            newUser.password = newUser.generateHash(password)
            newUser.save((error) => {
                if (error){
                    console.log(error);
                }else{
                    return done(null, newUser)
                }
            })
        }
    })
}))

// ingreso
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    await User.findOne({'email': email}, (err, user) => {
        console.log(user);
        if (err){
            return done(err)
        }
        if (!user){
            return done(null, false, req.flash('LoginMessage', 'Email no encontrado'))
        }else{
            if(!user.validatePassword(password, user.password)){
                return done(null, false, req.flash('LoginMessage', 'Contraseña incorrecta'))
            }else{
                return done(null, user)
            }
        }
    })
}))

module.exports = passport