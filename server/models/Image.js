const {Schema, model} = require('mongoose')

const Image = new Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
})

module.exports = model('Image', Image)