const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "erasmus"
});

connection.connect((err) => {
    if (err) {
        console.error('Veritabanına baglanirken hata olustu: ', err);
        return;
    }
    console.log('Veritabanina baglanildi');
});


app.post('/register', (req, res) => {
    const { kayitemail, password } = req.body;

    const query = "INSERT INTO hesap (KullaniciMail,sifre) VALUE (?,?)";

    connection.query(query, [kayitemail, password], (err, result) => {
        if (err) {
            console.error("Veritabanina bilgi girerken hata: ", err);
            res.status(500).send({ error: " Kayit olusturulurken bir hata olustu." });
            return;
        }
        res.status(200).send({ message: "Kayit basarili" });
    })
});


app.post('/', (req, res) => {

    const { girisEmail, password } = req.body;

    const query = "SELECT * FROM hesap WHERE KullaniciMail=? AND sifre=?";

    connection.query(query, [girisEmail, password], (err, result) => {
        if (err) {
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({ error: 'Bilgilerin kontrolunde hata olustu.' });
            return;
        }
        if (result.length > 0) {
            const id = result[0].HesapID;

            const isLoginQuery = "UPDATE hesap SET isLogin = 1 WHERE HesapID=?";

            connection.query(isLoginQuery, id, (err, result) => {
                if (err) {
                    console.error("Login bilgisi guncellenirken hata olustu. ", err);
                    res.status(500).send({ error: 'Login guncellenemedi.' });
                }
            });

            res.status(200).send({ message: '1', id: id });
        } else {
            res.status(200).send({ message: '0' });
        }


    })



});






app.post('/signout', (req, res) => {
    const { id } = req.body;
    const query = "UPDATE hesap SET isLogin = 0 WHERE HesapID=?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error("isLogin guncellemede hata olustu", err);
            res.status(500).send({ error: "isLogin guncellemede hata olustu" });
            return;
        }
        res.status(200).send({ message: "kullanici cikisi güncellendi." })
    })
})



app.post('/kayit', async (req, res) => {
    const { id,
        ad,
        soyad,
        milliyet,
        milliyet2,
        Kimlikno,
        Dgmtarihi,
        englAciklama,
        Email,
        telefon,
        sehir,
        ilce,
        mahalle,
        sokak,
        ulke,
        posta,
        universite,
        bolum,
        mezunTarih,
        gpa,
        egitim,
        cinsiyet,
        CvName,
        nmName,
        pasName,
        ikaName,
        dipName,
        ingName,
    } = req.body;

    const kntOgrQuery = "SELECT * FROM ogrenci WHERE HesapId=?";

    try {
        const result = await connection.query(kntOgrQuery, [id]);
        console.log("result deneme" + result)
        if (result.length > 0) {
        
            res.status(201).send({ error: "Aynı hesaptan yalnızca bir başvuru yapılabilir." })
            
          
            return;
           
        } else {
            const ogrenciquery = "INSERT INTO ogrenci (HesapId, ad, soyad, milliyet,milliyet2,ID_NO,Cinsiyet, DogumTarihi) VALUES (?,?,?,?,?,?,?,?)";
            await connection.query(ogrenciquery, [id, ad, soyad, milliyet, milliyet2, Kimlikno, cinsiyet, Dgmtarihi]);

            const iletisimquery = "INSERT INTO iletisimbilgisi (HesapId, Email,Telefon,Sehir,Ilce,Mahalle,Sokak,Ulke,PostaKodu) VALUES (?,?,?,?,?,?,?,?,?)";
            await connection.query(iletisimquery, [id, Email, telefon, sehir, ilce, mahalle, sokak, ulke, posta]);

            const egitimquery = "INSERT INTO egitim (HesapId, MezunOlunanUni, Bolum, MezuniyetDurumu,MezuniyetTarihi,Gpa) VALUES (?,?,?,?,?,?)";
            await connection.query(egitimquery, [id, universite, bolum, egitim, mezunTarih, gpa]);

            const engelquery = "INSERT INTO engellilik (HesapId,EngellilikAciklamasi ) VALUES (?,?)";
            await connection.query(engelquery, [id, englAciklama]);

            const dokquery = "INSERT INTO dokuman (HesapId,Cv,NiyetMektubu,Pasaport,Ikametgah,Diploma,IngilizceBelge ) VALUES (?,?,?,?,?,?,?)";
            await connection.query(dokquery, [id, CvName, nmName, pasName, ikaName, dipName, ingName]);

            res.status(200).send({ message: "kayıt basarılı" });




        }
    } catch (error) {
        console.error("Varitabanına bağlanırken hata oldu", error);

    }
}
)




app.post("/formGoster", (req, res) => {
    const id = req.body.id;

    const query = "SELECT o.*, i.*, e.*, en.*, d.* FROM ogrenci o INNER JOIN iletisimbilgisi i ON o.HesapId = i.HesapId INNER JOIN egitim e ON o.HesapId = e.HesapId INNER JOIN engellilik en ON o.HesapId = en.HesapId INNER JOIN dokuman d ON o.HesapId = d.HesapId WHERE o.HesapId = ?";

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error("Veritabanından bilgi alırken hata oluştu", err);
            res.status(500).send({ error: "Veritabanından bilgi alırken hata oluştu" });
            return;
        }
        if (result.length === 0) {
            res.status(404).send({ message: "Başvuru bulunamadı" });
        } else {
            res.status(200).send({
                ad: result[0].Ad,
                soyad: result[0].Soyad,
                milliyet: result[0].Milliyet,
                milliyet2: result[0].Milliyet2,
                Kimlikno: result[0].ID_No,
                Dgmtarihi: result[0].DogumTarihi,
                cinsiyet: result[0].Cinsiyet,
                Email: result[0].Email,
                telefon: result[0].Telefon,
                sehir: result[0].Sehir,
                ilce: result[0].Ilce,
                mahalle: result[0].Mahalle,
                sokak: result[0].Sokak,
                ulke: result[0].Ulke,
                posta: result[0].PostaKodu,
                universite: result[0].MezunOlunanUni,
                bolum: result[0].Bolum,
                mezunTarih: result[0].MezuniyetTarihi,
                gpa: result[0].Gpa,
                egitimDurumu: result[0].MezuniyetDurumu,
                englAciklama: result[0].EngellilikAciklamasi,
                cv: result[0].Cv,
                nytmek: result[0].NiyetMektubu,
                pasapor: result[0].Pasaport,
                ika: result[0].Ikametgah,
                dip: result[0].Diploma,
                ing: result[0].IngilizceBelge,

            });
        }
    });
});


app.post("/kullaniciGoster", (req, res) => {
    const id = req.body.id;

    const query = "SELECT * FROM hesap  WHERE HesapId = ?";

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error("Veritabanından bilgi alırken hata oluştu", err);
            res.status(500).send({ error: "Veritabanından bilgi alırken hata oluştu" });
            return;
        }
        if (result.length === 0) {
            res.status(404).send({ message: "Başvuru bulunamadı" });
        } else {
            res.status(200).send({
                ad: result[0].KullaniciMail,
                

            });
        }
    });
});




app.post('/updateform', async (req, res) => {
    const { id,
        ad,
        soyad,
        milliyet,
        milliyet2,
        Kimlikno,
        Dgmtarihi,
        englAciklama,
        Email,
        telefon,
        sehir,
        ilce,
        mahalle,
        sokak,
        ulke,
        posta,
        universite,
        bolum,
        mezunTarih,
        gpa,
        egitim,
        cinsiyet,
        CvName,
        nmName,
        pasName,
        ikaName,
        dipName,
        ingName,
    } = req.body;

    const kntOgrQuery = "SELECT * FROM ogrenci WHERE HesapId=?";
    try {
        const result = await connection.query(kntOgrQuery, [id]);
        
            const ogrenciquery = "UPDATE ogrenci SET ad=?, soyad=?, milliyet=?,milliyet2=?,ID_NO=?,Cinsiyet=?, DogumTarihi=? WHERE HesapId=?";
            await connection.query(ogrenciquery, [ ad, soyad, milliyet, milliyet2, Kimlikno, cinsiyet, Dgmtarihi,id]);

            const iletisimquery = "UPDATE  iletisimbilgisi  SET  Email=?,Telefon=?,Sehir=?,Ilce=?,Mahalle=?,Sokak=?,Ulke=?,PostaKodu=? WHERE HesapId=?";
            await connection.query(iletisimquery, [ Email, telefon, sehir, ilce, mahalle, sokak, ulke, posta,id]);

            const egitimquery = "UPDATE egitim SET  MezunOlunanUni=?, Bolum=?, MezuniyetDurumu=?,MezuniyetTarihi=?,Gpa=? WHERE HesapId=?";
            await connection.query(egitimquery, [ universite, bolum, egitim, mezunTarih, gpa,id]);

            const engelquery = "UPDATE engellilik SET EngellilikAciklamasi=? WHERE HesapId=?";
            await connection.query(engelquery, [englAciklama,id]);

            const dokquery = "UPDATE dokuman SET Cv=?,NiyetMektubu=?,Pasaport=?,Ikametgah=?,Diploma=?,IngilizceBelge=?  WHERE HesapId=?";
            await connection.query(dokquery, [ CvName, nmName, pasName, ikaName, dipName, ingName,id]);

            res.status(200).send({ message: "Güncelleme basarılı" })

        
    } catch (error) {
        console.error("Varitabanına bağlanırken hata oldu", error);

    }
}
);



app.post('/kullaniciKontrol', (req, res) => {

    const { id,email, password } = req.body;

    const query = "SELECT * FROM hesap WHERE KullaniciMail=? AND sifre=?";

    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({ error: 'Bilgilerin kontrolunde hata olustu.' });
            return;
        }
        if (result.length > 0) {
            const id = result[0].HesapID;
            res.status(200).send({ message: '1', id: id });
        } else {
            res.status(200).send({ message: '0' });
        }

    })

});


app.post('/updateuser', async (req, res) => {
    const { id,newEmail,newPassword} = req.body;

    const kntOgrQuery = "SELECT * FROM hesap WHERE HesapID=?";
    try {
        const result = await connection.query(kntOgrQuery, [id]);
        
            const userquery = "UPDATE hesap SET KullaniciMail=?, Sifre=? WHERE HesapId=?";
            await connection.query(userquery, [newEmail,newPassword,id]);

           
            res.status(200).send({ message: "Güncelleme basarılı" })

        
    } catch (error) {
        console.error("Varitabanına bağlanırken hata oldu", error);

    }
}
);







 




 





const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server ${PORT} üzerinde dinliyor.`);
});