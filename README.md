# Small Blog

## Purpose of creation:
- The purpose of creating it is to test whether images can be uploaded to render.com page with express-fileupload.


### Results:
- For some reason, I don't know why render.com deletes files added as multipart/form-data after a certain period of time.
- The reason for this situation may be that render.com pulls the contents of the page from github when it is not available on the proxy server, and when it is run again, those contents are no longer available.
- Another reason is that since it provides a free service, it is also possible that the files were removed due to reasons such as the files added later taking up space.


## Output of the application:
- You can access the application from [small-blog.onrender.com](https://small-blog.onrender.com)
- When the page is examined, it will be seen that the texts in the database have been retrieved successfully, but there are no images in the part of the database where the file path of the file is known. For example, when the actual images were first added, they were saved as img/public/photo-543254325432.jpg, and the file path was recorded in the database as imageURL. But after a while, the images disappeared among render.com files.



# Küçük blog

## Oluşturulma amacı:
- Projenin amacı, görsellerin render.com sayfasına express-fileupload ile yüklenip yüklenemeceğini test etmektir.

### Sonuçlar:
- Nedenini bilmediğim şekilde render.com, multipart/form-data şeklindeki içerikleri belirli bir süre sonra siliyor ve nedenini bilmiyorum.
- Bu durumun ilk nedeni olarak render.com'un sayfa içeriğini proxy sunucuda bulundurmadığı durumlarda yeniden github'a istek atıp yeniden kurulum yapmasına bağlaya bilirim. Fakat emin değilim.
- İlk durum mantıklı geliyor zira içeriklerin resimleri sonradan render.com içerisine atılmıştır. Bu nedenle github üzerinde bulunmadığından dosyaları yeniden çekip kurulum yaptığında resim dosyalarının kaybolması oldukça normaldir.
- İkinci durum ise render.com sayfasının sonradan eklenen verileri güvenlik problemi olarak görmesi ve belirli bir süre sonra kaldırması şeklinde de olabilir.
- Fakat bana en mantıklı gelen birinci durumdur. Bu durum söz konusu ise [render.com](https://render.com/) projelerimizi aslında sürekli olarak çalıştırmadığı, uzun süreli bir bekleyiş sonucunda eğer bir istek gelirse bu durumda yeniden bir kurulum yaptığını öğrenmiş oluyoruz. Bu durum üzücü 🚬

## Song 
- [🚬🚬🚬](https://www.youtube.com/watch?v=7-_qRtGbCTE)
