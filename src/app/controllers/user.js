'use strict'

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
    signIn:(req, res) => {},
    signUp:(req, res) => {},
}
module.exports = controller