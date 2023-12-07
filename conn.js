const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const conn = () => {
   mongoose.connect(process.env.DB_URL, {
      dbName: 'blog'
   })
      .then(() => {
         console.log('Veri tabanına başarılı bir şekilde bağlanıldı')
      })
      .catch((err) => {
         console.log(err)
      })
}

module.exports = conn