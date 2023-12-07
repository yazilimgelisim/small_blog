const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
   gmail:{type:String, require},
   password:{type:String, require}
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin


