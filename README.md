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


# New News 
### Result:  
- I was able to pinpoint exactly what the real reason was for the files being deleted. The reason is fully explained in the free web services structure in the [docs](https://render.com/docs/free#free-web-services). In short, the reason is that if there is no request 15 minutes after the free services become operational, then their task is terminated. In other words, they do not wait in constant operation.
- Of course, to overcome this situation, requests can be made at certain intervals with the setInterval() loop from a frontend application. Or, instead of following a fraudulent method, the solution is to pay a certain amount of money and make it a permanent application.
Of course, to overcome this situation, requests can be made at certain intervals with the setInterval() loop from a frontend application. Or, instead of following a fraudulent method, the solution is to pay a certain amount of money and make it a permanent application.

### Cevap: 
- Silinen dosyaların asıl sebebinin tam olarak ne olduğunu tespit edebildim. Bunun nedeni [dokümanlardaki](https://render.com/docs/free#free-web-services) ücretsiz web servisleri yapısında tam olarak açıklanmaktadır. Kısaca nedeni, ücretsiz servisler devreye girdikten 15 dakika sonra herhangi bir talepte bulunulmaması durumunda görevlerine son verilmesidir. Yani sürekli çalışma halinde beklemezler.
- Elbette bu durumu aşmak için bir frontend uygulamasından setInterval() döngüsü ile belirli aralıklarla isteklerde bulunulabilir. Veya dolandırıcılık yöntemi izlemek yerine belli bir miktar para ödeyip kalıcı bir uygulama haline getirmek çözümdür.




