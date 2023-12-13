const express = require('express')
const router = express.Router()



router.post('/',async (req, res) => {
   try {
      console.log('request catching')
      const token = `${Date.now()}${Math.round(Math.random()*1E8)}${Math.round(Math.random()*1E5)}`
      req.session.token = token
      res.json({
         message:token 
      })
   } catch (error) {
      console.log(error)
   }
})



module.exports = router


