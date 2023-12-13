// Project for necessary package including area
const express = require('express')
const router = express.Router()
const path = require('path')
const Admin = require(path.join(__dirname, '..', 'model', 'admin.js'))



router.post('/', async (req, res) => {
   try {
      const adminLink = req.locals
      if (adminLink) {
         res.redirect('/')
      }
      else {
         if (!req.body) {
            res.json({ message: 'Veri gönderilemedi', type: false })
         }
         else {
            const { gmail, password, token } = req.body
            const gmailRGX = new RegExp(/@gmail.com/, 'g')

            if (!req.session.token || !token) {
               res.json({ message: 'Token bulunamadı', type: false })
            }
            else {
               if (req.session.token !== token) {
                  res.json({ message: 'Token değerleri eşleşemedi', type: false })
               }
               else {
                  if (!typeof (gmail) === 'string' || !typeof (password) === 'string') {
                     res.json({ message: 'Gönderilen içeriklerin türü "yazı" olmalıdır', type: false })
                  }
                  else {
                     if (gmail.length >= 80 || password.length >= 80) {
                        res.json({ message: 'Niye böyle şeyler yapısıyorsunuz beyefendi :)', type: false })
                     }
                     else {
                        if (!gmailRGX.test(gmail)) {
                           res.json({ message: 'Gmail, gmail değil ki la', type: false })
                        }
                        else {
                           const data = await Admin.find({ gmail: gmail });
                           if (data.length === 0) {
                              res.json({ message: 'Kullanıcı adı veya şifre hatalı', type: false })
                           }
                           else if (data.length === 1) {
                              if (data[0].password !== password) {
                                 res.json({ message: 'Kullanıcı adı veya şifre hatalı', type: false })
                              }
                              else {
                                 if(req.session.token){
                                    console.log('token var silmek gerek')
                                    delete req.session.token
                                 }
                                 req.session.adminID = await data[0]._id
                                 res.json({ message: 'Giriş başarılı yönlendiriliyorsunuz', type: true })
                              }
                           }
                           else {
                              res.json({ message: 'Beklenilmeyen bir durum söz konusu oldu pampa', type: false })
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   } catch (error) {
      console.log(error)
      res.redirect('/')
   }
})





module.exports = router
