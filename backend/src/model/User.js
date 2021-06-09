const {model, Schema} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: true}
})

module.exports = model('User', UserSchema)