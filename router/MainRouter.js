// Project for necessary package including area
const path = require('path')
const express = require('express')
const Content = require(path.join(__dirname, '..', 'model', 'content.js'))

// Starting Time Default Variables
const router = express.Router()





router.get('/', (req, res) => {
   Content.find().then((datas) => {
      res.render('site/index', {
         datas: datas.map(item => item.toJSON())
      })
   })
})


module.exports = router