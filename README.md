Bu projede Erasmus programına başvuracak öğrencilerin, başvuru için gerekli olan bilgilerinin alınabilmesi için bir portal yapılması amaçlanmıştır.
Proje, React.js ve Node.js kullanılarak yapılmıştır.
Kullanıcı kayıt oluşturarak portal sayfasına giriş yapabilir. Kullanıcının hesap bilgisi veri tabanında hesap adlı bir tabloda tutulmaktadır.  Kayıt oluşturulurken mail ve 6 karakterli şifre girildiğine dair kontrol yapılmaktadır. Ayrıca kullanıcıya şifresini tekrar ettirerek doğru şifre ile hesap oluşturulması sağlanmaktadır. 
Kayıt formu oluşturulduktan sonra giriş sayfasından yapılacak login işlemi esnasında kullanıcının hesap tablosundaki hesap bilgileri kontrol edilmekte, bilgilerin örtüşmesi halinde portal sayfasına giriş yapılabilmektedir. 
Portal sayfasına giriş yapıldığında kullanıcının veri tabanında tutulan kullanıcı adı sağ üst köşede çıkmaktadır.
Portal sayfasından kullanıcı Erasmus programına başvururken kendisinden istenen bilgileri başvuru formunu doldurarak veri tabanına gönderebilir. Veri tabanında öğrencinin hesap, öğrenci, iletişim, engellilik,eğitim ve dokuman bilgilerini tutan 6 tane farklı tablo bulunmaktadır. Bu tablolar hesap tablosundaki Id’ye göre ilişkilendirilmiştir. Böylece veri tabanında normalizasyon sağlanmış bulunmaktadır.
 Veri tabanına gönderilen bilgiler tek bir form aracılığıyla ve tek bir post işlemi ile gönderilmektedir. Bu aşamada birden fazla tabloya tek bir post işlemi ile veri gönderilirken hata alınmaması için async- await yapısı kullanılmıştır. 
Kullanıcı başvuru bilgilerini başvuru görüntüle kısmından görüntüleyebilmektedir. Bu aşamada da tek bir post işlemi ile birden fazla tablodan veri çekilmeye çalışıldığı için tablolar join’lenerek tek bir tabloya indirilmiş bulunmaktadır. 
Kullanıcı girdiği bilgileri başvuru bilgilerini düzenle kısmından güncelleyebilmektedir.  
Son olarak kullanıcı hesap kullanıcı adını ve şifresini kayıt bilgilerini düzenle kısmından güncelleyebilmektedir. Bu aşama ilk olarak kullanıcıdan eski bilgilerinin girilmesi istenmektedir. Girdiği bilgiler doğruysa yeni bilgilerin istediği sayfa açılmaktadır. 

------------------------------
Veri tabanı adı: erasmus
Hesap tablosundaki HesapID ile diğer tablolardaki HesapId’ler ilişkilendilirmiştir.
Create TABLE Ogrenci (OgrenciID int, HesapId int,Ad varchar(50), Soyad varchar(50),Milliyet varchar(50),Milliyet2 varchar(50),ID_No char(20), Cinsiyet char(1),DogumTarihi date)

CREATE TABLE Hesap(HesapID int,KullaniciMail varchar(100),Sifre varchar(10),isLogin boolean )

CREATE TABLE Dokuman(DokumanID int,HesapId int, Cv varchar(1000),NiyetMektubu varchar(1000),Pasaport varchar(1000),Ikametgah varchar(1000),Diploma varchar(1000),IngilizceBelge varchar(1000))

Create TABLE IletisimBilgisi (IletisimID int, HesapId int, Email varchar(100),Telefon varchar(20),Sehir varchar(20),Ilce varchar(20),Mahalle varchar(50),Sokak varchar(50),Ulke varchar(30),PostaKodu varchar(30))

CREATE TABLE Egitim (EgitimID int, HesapId int, MezunOlunanUni varchar(100),Bolum varchar(30),MezuniyetDurumu char(1), MezuniyetTarihi date, Gpa decimal(3,2))

CREATE TABLE Engellilik (EngelID int, HesapId int, EngellilikAciklamasi varchar(100))
--------------
nmp install
nmp start
