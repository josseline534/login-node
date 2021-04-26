'use strict'
const passport = require('../../config/passport')

let controller ={
    init: (req, res) => {
        res.render('index')
    },
    login:(req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        })
    },
    register:(req, res) => {
        res.render('register', {
            message: req.flash('registerMessage')
        })
    },
    signIn:passport.authenticate('local-login', {
        successRedirect: '/profile',
        failuredRedirect: '/login',
        failuredFlash: true
    }),
    signUp:passport.authenticate('local-registro', {
        successRedirect: '/profile',
        failuredRedirect: '/register',
        failuredFlash: true
    }),
    profile: (req, res) => {
        if(req.isAuthenticated()){
            res.render('profile', {
                user: req.user
            })
        }else{
            res.redirect('/')
        }
    },
    logout: (req, res)=>{
        req.logout()
        res.redirect('/')
    }
}

module.exports = controller