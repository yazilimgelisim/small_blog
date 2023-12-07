const express = require('express')
const router = express()



router.post('/', (req, res) => {
   const { adminLink } = res.locals
   if (adminLink) {
      res.status(200).json({message:'good job brother'})
      req.session.destroy()
   }
   else {
      res.redirect('/')
   }
})




module.exports = router