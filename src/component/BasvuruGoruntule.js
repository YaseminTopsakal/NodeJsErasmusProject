import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BasvuruGoruntule() {


   

    const [bilgi, setBilgi] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

   

    useEffect(() => {

        const bilgiGetir = async () => {
            const id = sessionStorage.getItem("id");

            console.log(id);

            try {

                const response = await axios.post("http://localhost:3001/formGoster",
                    { id }
                );

                if (response.status === 200) {
                    setBilgi(response.data);
                }

            } catch (err) {
                setError("Kullanici bilgileri gosterilemedi.");
            }
        }


        bilgiGetir();

    }, []);


    const id = sessionStorage.getItem('id');

    const handleUpdate = async (e) => {
        e.preventDefault();

        var CvName = document.getElementById("cvid").value.split("\\").slice(-1);
        var nmName = document.getElementById("nytid").value.split("\\").slice(-1);
        var pasName = document.getElementById("pasid").value.split("\\").slice(-1);
        var ikaName = document.getElementById("ikaid").value.split("\\").slice(-1);
        var dipName = document.getElementById("dipid").value.split("\\").slice(-1);
        var ingName = document.getElementById("ingid").value.split("\\").slice(-1);

        try {

            
            const response = await axios.post("http://localhost:3001/kayit", {
                id
                

            });
            if (response.status === 200) {
                setSuccess("Başvuru başarı ile alındı");



            } else {
                setError(response.data.error);
            }

        } catch {
            setError('Veritabanına ekleme yapılırken hata oluştu.', error);
        }

    }



    


    const sayfa1 = () => {
        document.getElementById("divKisiselBiligler").style.display = "block";
        document.getElementById("divIletisim").style.display = "none";
        document.getElementById("divEgitim").style.display = "none";
        document.getElementById("divDokuman").style.display = "none";


    }
    const sayfa2 = () => {
        document.getElementById("divKisiselBiligler").style.display = "none";
        document.getElementById("divIletisim").style.display = "block";
        document.getElementById("divEgitim").style.display = "none";
        document.getElementById("divDokuman").style.display = "none";


    }
    const sayfa3 = () => {
        document.getElementById("divKisiselBiligler").style.display = "none";
        document.getElementById("divIletisim").style.display = "none";
        document.getElementById("divEgitim").style.display = "block";
        document.getElementById("divDokuman").style.display = "none";


    }
    const sayfa4 = () => {
        document.getElementById("divKisiselBiligler").style.display = "none";
        document.getElementById("divIletisim").style.display = "none";
        document.getElementById("divEgitim").style.display = "none";
        document.getElementById("divDokuman").style.display = "block";


    }

    return (
        <>
            <div className="col-9 mt-3" style={{ minWidth: "768px" }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 style={{ color: "#0a50ad" }}>Başvuru Bilgileri</h1>
                        <p>Başvuru bilgilerinizi aşağıdaki formdan görebilirsiniz.</p>

                    </div>

                </div>
                <form className="px-2 py-2" style={{ border: "solid", borderColor: "#0a50ad" }} onSubmit={handleUpdate}>

                    {/* KisiselBilgiler    */}
                    <div id="divKisiselBiligler" style={{ display: "block" }}>
                        <h5 className="text-center">Kişisel Bilgiler</h5>

                        <div className="row mb-3 mt-3">
                            <label for="bsvAd" className="col-sm-2 col-form-label">*Ad:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvAd" placeholder={bilgi.ad}  />

                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvSoyad" className="col-sm-2 col-form-label">*Soyad:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvSoyad" placeholder={bilgi.soyad} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMilliyet" className="col-sm-2 col-form-label">*Milliyet:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMilliyet" placeholder={bilgi.milliyet}   />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMilliyet2" className="col-sm-2 col-form-label">Milliyet 2:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMilliyet2" placeholder={bilgi.milliyet2}   />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvKimlikNo" className="col-sm-2 col-form-label">*Kimlik No:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvKimlikNo" placeholder={bilgi.Kimlikno}   />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label for="bsvCinsiyet" className="col-sm-2 col-form-label">*Kimlikteki Cinsiyet:</label>
                            <div className="col-sm-10">

                                <select className="mt-2" id="bsvCinsiyet" >
                                    {(() => {
                                        if (bilgi.cinsiyet == 1) {
                                            return (
                                                <option value="1" selected id="kadin">Kadın</option>
                                            )
                                        } else if (bilgi.cinsiyet == 2) {
                                            return (
                                                <option value="2" selected id='erkek'>Erkek</option>

                                            )
                                        } else {
                                            return (
                                                <option value="" selected >Cinsiyet</option>

                                            )
                                        }
                                    })()}
                                </select>
                                


                            </div>

                        </div>
                        <div className="row mb-3">
                            <label for="bsvDogumTarih" className="col-sm-2 col-form-label">*Doğum tarihi:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvDogumTarih" placeholder={bilgi.Dgmtarihi}  />

                            </div>

                        </div>


                        <div className="row mb-3">
                            <label for="bsvCinsiyet" className="col-sm-2 col-form-label">Engellilik:</label>
                            <div className="col-sm-10">

                                <select className="mt-2" id="bsvCinsiyet" >
                                    {(() => {
                                        if (bilgi.cinsiyet == 0) {
                                            return (
                                                <option value="0" selected id="hayir">Hayır</option>
                                            )
                                        } else if (bilgi.cinsiyet == 1) {
                                            return (
                                                <option value="1" selected id='evet'>Evet</option>

                                            )
                                        } else {
                                            return (
                                                <option value="" selected >Engellilik</option>

                                            )
                                        }
                                    })()}
                                </select>
                                


                            </div>
                            </div>





                        


                        <div className="row mb-3 " id="engelAciklamaDiv">
                            <label for="bsvAciklama" className="col-sm-2 col-form-label">*Açıklama:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvAciklama" placeholder={bilgi.englAciklama}   />
                            </div>
                        </div>


                    </div>
                    {/* KisiselBilgiler Son  */}


                    {/* Iletisim */}

                    <div id="divIletisim" style={{ display: "none" }}>
                        <h5 className="text-center">İletişim Bilgileri</h5>
                        <div className="row mb-3 mt-3">
                            <label for="bsvMail" className="col-sm-2 col-form-label">*Mail:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="bsvMail" placeholder={bilgi.Email} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvTelefon" className="col-sm-2 col-form-label">*Telefon:</label>
                            <div className="col-sm-10">
                                <input type="tel" className="form-control" id="bsvTelefon" placeholder={bilgi.telefon} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvSehir" className="col-sm-2 col-form-label">*Şehir:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvSehir" placeholder={bilgi.sehir} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvIlce" className="col-sm-2 col-form-label">*İlçe:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvIlce" placeholder={bilgi.ilce} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMahalle" className="col-sm-2 col-form-label">*Mahalle:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMahalle" placeholder={bilgi.mahalle} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvSokak" className="col-sm-2 col-form-label">*Sokak:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvSokak" placeholder={bilgi.sokak} />
                            </div>

                        </div>

                        <div className="row mb-3">
                            <label for="bsvUlke" className="col-sm-2 col-form-label">*Ülke:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvUlke" placeholder={bilgi.ulke} />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label for="bsvPostaKod" className="col-sm-2 col-form-label">*Posta Kodu:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvPostaKod" placeholder={bilgi.posta} />
                            </div>

                        </div>
                    </div>

                    {/* Iletisim Son */}

                    {/* Egitim */}
                    <div id="divEgitim" style={{ display: "none" }}>
                        <h5 className="text-center">Eğitim Bilgileri</h5>
                        <div className="row mb-3 mt-3">
                            <label for="bsvUni" className="col-sm-2 col-form-label">*Üniversite Adı:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvUni" placeholder={bilgi.universite} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvBolum" className="col-sm-2 col-form-label">*Bölüm:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvBolum" placeholder={bilgi.bolum} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvEgitimDurum" className="col-sm-2 col-form-label">*Eğitim Durumu:</label>
                            <div className="col-sm-10">
                                <select className="mt-2"  >
                                    {(() => {
                                        if (bilgi.egitimDurumu == 0) {
                                            return (
                                                <option value="0" selected>Mezun</option>

                                            )

                                        } else if (bilgi.egitimDurumu == "1") {
                                            <option value="1" selected>Öğrenci</option>
                                        }
                                        else {
                                            return (
                                                <option value="" selected>Egitim Durumu</option>

                                            )
                                        }
                                    })()}

                                </select>
                                



                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMezuniyetTarih" className="col-sm-2 col-form-label">*Mezuniyet tarihi:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMezuniyetTarih" placeholder={bilgi.mezunTarih} />

                            </div>

                        </div>
                        <div className="row mb-3">
                            <label for="bsvGPA" className="col-sm-2 col-form-label">*GPA:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvGPA" placeholder={bilgi.gpa} />
                            </div>
                        </div>
                    </div>


                    {/* Egitim Son */}


                    {/* Dokuman */}

                    <div id="divDokuman" style={{ display: "none" }}>

                        <h5 className="text-center">Doküman</h5>

                        <div className="row g-3">
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">CV</label>
                                <input className="form-control" type="text" id="formFileMultiple"  value={bilgi.cv}/>

                               


                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">Niyet Mektubu</label>
                                <input className="form-control" type="text" id="formFileMultiple" value={bilgi.nytmek} />


                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">Pasaport</label>
                                <input className="form-control" type="text" id="formFileMultiple" value={bilgi.pasapor}/>



                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">İkametgah Belgesi</label>
                                <input className="form-control" type="text" id="formFileMultiple" value={bilgi.ika} />



                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">Diploma</label>
                                <input className="form-control" type="text" id="formFileMultiple" value={bilgi.dip}/>



                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">İngilizce Yeterlilik Belgesi</label>
                                <input className="form-control" type="text" id="formFileMultiple" value={bilgi.ing} />



                            </div>
                        </div>
                    </div>


                    {/* Dokuman Son*/}




                </form >
                {error && <p style={{ color: 'red' }}> {error} </p>}

                <div className="row d-flex align-content-center justify-content-center mt-4">
                    <div className="col-12 d-flex align-content-center justify-content-center">


                        <nav aria-label="Page navigation example">
                            <ul class="pagination">

                                <li class="page-item" > <a class="page-link" onClick={sayfa1} style={{ color: "#0a50ad" }}>1</a></li>
                                <li class="page-item"><a class="page-link" onClick={sayfa2} style={{ color: "#0a50ad" }}>2</a></li>
                                <li class="page-item"><a class="page-link" onClick={sayfa3} style={{ color: "#0a50ad" }}>3</a></li>
                                <li class="page-item"><a class="page-link" onClick={sayfa4} style={{ color: "#0a50ad" }}>4</a></li>


                            </ul>
                        </nav>
                    </div>
                </div>
            </div >
        </>
    );
}
export default BasvuruGoruntule;