const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contentSchema = new Schema({
   title:{type:String, require},
   filePath:{type:String, require},
   content:{type:String, require},
   author:{type:String, require}
})


const Content = mongoose.model('Content', contentSchema);
module.exports = Content