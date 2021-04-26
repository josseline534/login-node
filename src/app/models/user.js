'use strict'
let mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs')
let Schema = mongoose.Schema

let UserSchema = Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validatePassword = (password, paswordCompare) => {
    return bcrypt.compareSync(password, paswordCompare)
}
module.exports = mongoose.model('user', UserSchema)