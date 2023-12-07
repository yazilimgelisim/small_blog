const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const Content = require(path.join(__dirname, '..', 'model', 'content.js'))


router.get('/:id', async (req, res) => {
   try {
      const id = req.params.id
      if (id.length != 24) {
         res.json({ message: 'id uzunluğu istenilen aralıkta değil' })
      }
      else {
         const data = await Content.findById(id)
         if (data === null) {
            res.json({ message: 'Veri bulunamadı' })
         }
         else {
            res.json({ data })
         }
      }
   } catch (error) {
      console.log(error)
      res.json({ message: 'Beklenilmeyen bir hata oluştu' })
   }
})



// Add Content Area
router.post('/', async (req, res) => {
   try {
      const { adminLink } = res.locals
      if (!adminLink) {
         res.redirect('/')
      }
      else {
         if (!req.body || !req.files) {
            return res.status(200).json({ message: 'Created a problem', type: false })
         }
         else {
            const { title, content, author } = req.body
            const { file } = req.files

            if (typeof (title) !== 'string' || typeof (content) !== 'string' || typeof (author) !== 'string') {
               return res.status(200).json({ message: 'Yazı içeriklerinin türü string olmalıdır', type: false })
            }
            else {
               if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
                  if (file.size <= (1024 * 1024 * 5)) {
                     let uniqueName = `${Date.now()}${(Math.round(Math.random() * 1E8))}`
                     let extension = file.mimetype.split('/')
                     extension = extension[1]
                     let fileName = `photo-${uniqueName}.${extension}`

                     await file.mv(path.join(__dirname, '..', 'public', 'img', fileName), (err)=>{
                        console.log(err)
                     })


                     const DB = new Content({
                        title: title,
                        filePath: fileName,
                        content: content,
                        author: author
                     })
                     DB.save()
                        .then(() => {
                           return res.status(200).json({ message: `İçerik başarılı bir şekilde oluşturuldu`, type: true })
                        })
                        .catch((err) => {
                           console.log(err)
                           return res.status(200).json({ message: `İçerik veri tabanına kayıt edilemedi`, type: false })
                        })
                  }
                  else {
                     return res.status(200).json({ message: `Dosyanın boyutu 5Mb'dan büyük olamaz`, type: false })
                  }
               }
               else {
                  return res.status(200).json({ message: 'Resmin türü resim türünde değildir.', type: false })
               }
            }
         }

      }
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message: 'Beklenilmeyen bir hata oluştu',
         type: false
      })
   }
})




// Edit process 
router.put('/', async (req, res) => {
   try {
      const { adminLink } = res.locals
      if (!adminLink) {
         res.status(500).json({
            message: 'Beklenilmeyen bir hata oluştu',
            type: false
         })
      }
      else {
         if (!req.body || !req.files) {
            res.status(200).json({
               message: 'Dosya gönderilemedi',
               type: false
            })
         }
         else {
            const { _id, title, author, content } = req.body
            const { file } = req.files


            if (typeof (title) !== 'string' || typeof (author) !== 'string' || typeof (content) !== 'string') {
               res.status(200).json({
                  message: 'Yazıların türü string olmalıdır',
                  type: false
               })
            }
            else {
               if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
                  if (file.size >= (1024 * 1024 * 5)) {
                     res.status(200).json({
                        message: `Resmin boyutu 5MB'den büyük olamaz.`,
                        type: false
                     })
                  }
                  else {
                     if (_id.length !== 24) {
                        res.status(200).json({
                           message: `Geçersiz ID`,
                           type: false
                        })
                     }
                     else {
                        const data = await Content.findById(_id);
                        if (!data) {
                           res.status(200).json({
                              message: `içerik bulunamadı`,
                              type: false
                           })
                        }
                        else {
                           const filePath = await data.filePath;
                           fs.unlink(path.join(__dirname, '..', 'public', 'img', filePath), (err) => {
                              console.log(err)
                           })
                           let extension = file.name.split('/');
                           extension = extension[1];
                           const uniqueName = `photo-${Date.now()}${Math.round(Math.random() * 1E8)}`
                           const newName = `${uniqueName}.${extension}`;

                           file.mv(path.join(__dirname, '..', 'public', 'img', newName))
                           Content.findByIdAndUpdate(_id, {
                              title: title,
                              filePath: newName,
                              content: content,
                              author: author
                           })
                              .then(() => {
                                 res.status(200).json({
                                    message: `İçerik başarılı bir şekilde güncellendi`,
                                    type: true
                                 })
                              })
                              .catch((err) => {
                                 console.log(err)
                                 res.status(400).json({
                                    message: `işlem başarısız oldu`,
                                    type: false
                                 })
                              })
                        }
                     }
                  }
               }
               else {
                  res.status(200).json({
                     message: 'Gönderilen dosya resim değildir',
                     type: false
                  })
               }
            }
         }
      }
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message: 'Beklenilmeyen bir hata oluştu',
         type: false
      })
   }
})


// Delete Process 
router.delete('/:id', async (req, res) => {
   try {
      const { adminLink } = res.locals
      if (!adminLink) {
         res.status(400).json(({ message: 'Beklenilmeyen bir hata oluştu', type: false }))
      }
      else {
         const { id } = req.params
         if (!id) {
            res.status(400).json(({ message: 'ID yok', type: false }))
         }
         else {
            if (id.length !== 24) {
               res.status(400).json(({ message: 'ID uzunluğu yeterli değil', type: false }))
            }
            else {
               const data = await Content.findById(id);
               if (!data) {
                  res.status(400).json(({ message: 'İçerik bulunamadı', type: false }))
               }
               else {
                  const filePath = await data.filePath;
                  fs.unlink(path.join(__dirname, '..', 'public', 'img', filePath), (err)=>{
                     console.log(err)
                  })
                  await Content.findByIdAndDelete(id).then(()=>{
                     res.status(200).json(({ message:'İçerik başarılı bir şekilde silindi', type: true }))
                  })
                  .catch((err)=>{
                     console.log(err)
                     res.status(400).json(({ message: 'Silme işlemi başarız oldu', type: false }))
                  })
               }
            }
         }
      }
   } catch (error) {
      console.log(error)
      res.status(400).json(({ message: 'Beklenilmeyen bir hata oluştu', type: true }))
   }
})
module.exports = router