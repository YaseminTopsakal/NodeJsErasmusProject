import React from 'react'
import { useState } from 'react';
import axios from 'axios';



function UpdateForm(props) {

    const [ad, setAd] = useState('');
    const [soyad, setSoyad] = useState('');
    const [milliyet, setMilliyet] = useState('');
    const [milliyet2, setMilliyet2] = useState('');
    const [Kimlikno, setKimlikno] = useState('');
    const [Dgmtarihi, setDgmtarihi] = useState('');
    const [englAciklama, setenglAciklama] = useState('');
    const [Email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [sehir, setSehir] = useState('');
    const [ilce, setIlce] = useState('');
    const [mahalle, setMahalle] = useState('');
    const [sokak, setSokak] = useState('');
    const [ulke, setUlke] = useState('');
    const [posta, setPosta] = useState('');
    const [universite, setUniversite] = useState('');
    const [bolum, setBolum] = useState('');
    const [mezunTarih, setMezunTarih] = useState('');
    const [gpa, setGpa] = useState('');
    const [egitim, setEgitim] = useState('');
    const [cinsiyet, setCinsiyet] = useState('');
    const [engel, setEngel] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    

    const id = sessionStorage.getItem('id');

    const handleSubmit = async (e) => {
        e.preventDefault();

        var CvName = document.getElementById("cvid").value.split("\\").slice(-1);
    var nmName = document.getElementById("nytid").value.split("\\").slice(-1);
    var pasName = document.getElementById("pasid").value.split("\\").slice(-1);
    var ikaName = document.getElementById("ikaid").value.split("\\").slice(-1);
    var dipName = document.getElementById("dipid").value.split("\\").slice(-1);
    var ingName = document.getElementById("ingid").value.split("\\").slice(-1);

        try {

            const response = await axios.post("http://localhost:3001/updateform", {
                id,
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


              

            });
            if (response.status === 200) {
                setSuccess("Güncelleme başarı ile yapıldı");
                setAd('');
                setSoyad('');
                setMilliyet('');
                setMilliyet2('');
                setKimlikno('');
                setDgmtarihi('');
                setenglAciklama('');
                setEmail('');
                setTelefon('');
                setSehir('');
                setIlce('');
                setMahalle('');
                setSokak('');
                setUlke('');
                setPosta('');
                setUniversite('');
                setBolum('');
                setMezunTarih('');
                setGpa('');
                setEgitim('');
                setCinsiyet('');
                 setEngel('');
             

                
            } else {
                setError(response.data.error);
            }

        } catch {
            setError('Veritabanına ekleme yapılırken hata oluştu.', error);
        }

    }


    


    const engellilik = () => {
        var engel = document.getElementById("bsvEngel");
        var engelDiv = document.getElementById("engelAciklamaDiv");
        if (engel != null && engel.value == 1) {
            engelDiv.hidden = '';
        }
        else {
            if (engelDiv != null) {
                engelDiv.hidden = 'hidden';

            }
        }
    }


    const sayfa1 = () => {
        document.getElementById("divKisiselBiligler").style.display = "block";
        document.getElementById("divIletisim").style.display = "none";
        document.getElementById("divEgitim").style.display = "none";
        document.getElementById("divDokuman").style.display = "none";
        document.getElementById("btnDivBsvKisiselBilgiKaydet").style.display="none";


    }
    const sayfa2 = () => {
        document.getElementById("divKisiselBiligler").style.display = "none";
        document.getElementById("divIletisim").style.display = "block";
        document.getElementById("divEgitim").style.display = "none";
        document.getElementById("divDokuman").style.display = "none";
        document.getElementById("btnDivBsvKisiselBilgiKaydet").style.display="none";


    }
    const sayfa3 = () => {
        document.getElementById("divKisiselBiligler").style.display = "none";
        document.getElementById("divIletisim").style.display = "none";
        document.getElementById("divEgitim").style.display = "block";
        document.getElementById("divDokuman").style.display = "none";
        document.getElementById("btnDivBsvKisiselBilgiKaydet").style.display="none";


    }
    const sayfa4 = () => {
        document.getElementById("divKisiselBiligler").style.display = "none";
        document.getElementById("divIletisim").style.display = "none";
        document.getElementById("divEgitim").style.display = "none";
        document.getElementById("divDokuman").style.display = "block";
        document.getElementById("btnDivBsvKisiselBilgiKaydet").style.display="block";

    }

    return (
        <>
            <div className="col-9 mt-3" style={{ minWidth: "768px" }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 style={{ color: "#0a50ad" }}>Formu Güncelleyin</h1>
                        <p>Formu güncellemek için formunu doldurunuz.</p>

                    </div>

                </div>
                <form className="px-2 py-2" style={{ border: "solid", borderColor: "#0a50ad" }} onSubmit={handleSubmit}>

                    {/* KisiselBilgiler    */}
                    <div id="divKisiselBiligler" style={{ display: "block" }}>
                        <h5 className="text-center">Kişisel Bilgiler</h5>
                        <div className="row mb-3 mt-3">
                            <label for="bsvAd" className="col-sm-2 col-form-label">*Ad:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvAd" value={ad} onChange={(e) => setAd(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvSoyad" className="col-sm-2 col-form-label">*Soyad:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvSoyad" value={soyad} onChange={(e) => setSoyad(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMilliyet" className="col-sm-2 col-form-label" >*Milliyet:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMilliyet" value={milliyet} onChange={(e) => setMilliyet(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMilliyet2" className="col-sm-2 col-form-label">Milliyet 2:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMilliyet2" value={milliyet2} onChange={(e) => setMilliyet2(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvKimlikNo" className="col-sm-2 col-form-label">*Kimlik No:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvKimlikNo" required value={Kimlikno} onChange={(e) => setKimlikno(e.target.value)} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label for="bsvCinsiyet" className="col-sm-2 col-form-label">*Kimlikteki Cinsiyet:</label>
                            <div className="col-sm-10">
                                <select className="mt-2" id="bsvCinsiyet" value={cinsiyet} onChange={(e) => setCinsiyet(e.target.value)} required>
                                    <option value="">Cinsiyet</option>
                                    <option value="1">Kadın</option>
                                    <option value="2">Erkek</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvDogumTarih" className="col-sm-2 col-form-label">*Doğum tarihi:</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control" id="bsvDogumTarih" value={Dgmtarihi} onChange={(e) => setDgmtarihi(e.target.value)} required />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label for="bsvEngel" className="col-sm-2 col-form-label">*Engellilik:</label>
                            <div className="col-sm-10">
                                <select className="mt-2" id="bsvEngel" value={engel} onClick={() => engellilik()} onChange={(e) => setEngel(e.target.value)} required>
                                    <option value="">Engellilik</option>
                                    <option value="0">Hayır</option>
                                    <option value="1">Evet</option>

                                </select>
                            </div>
                        </div>

                        <div className="row mb-3 " id="engelAciklamaDiv" hidden="hidden">
                            <label for="bsvAciklama" className="col-sm-2 col-form-label">*Açıklama:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvAciklama" value={englAciklama} onChange={(e) => setenglAciklama(e.target.value)}  />
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
                                <input type="email" className="form-control" id="bsvMail" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvTelefon" className="col-sm-2 col-form-label">*Telefon:</label>
                            <div className="col-sm-10">
                                <input type="tel" className="form-control" id="bsvTelefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvSehir" className="col-sm-2 col-form-label">*Şehir:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvSehir" value={sehir} onChange={(e) => setSehir(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvIlce" className="col-sm-2 col-form-label">*İlçe:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvIlce" value={ilce} onChange={(e) => setIlce(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMahalle" className="col-sm-2 col-form-label">*Mahalle:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvMahalle" value={mahalle} onChange={(e) => setMahalle(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvSokak" className="col-sm-2 col-form-label">*Sokak:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvSokak" value={sokak} onChange={(e) => setSokak(e.target.value)} required />
                            </div>

                        </div>

                        <div className="row mb-3">
                            <label for="bsvUlke" className="col-sm-2 col-form-label">*Ülke:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvUlke" value={ulke} onChange={(e) => setUlke(e.target.value)} required />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label for="bsvPostaKod" className="col-sm-2 col-form-label">*Posta Kodu:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvPostaKod" value={posta} onChange={(e) => setPosta(e.target.value)} required />
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
                                <input type="text" className="form-control" id="bsvUni" value={universite} onChange={(e) => setUniversite(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvBolum" className="col-sm-2 col-form-label">*Bölüm:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvBolum" value={bolum} onChange={(e) => setBolum(e.target.value)} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvEgitimDurum" className="col-sm-2 col-form-label">*Eğitim Durumu:</label>
                            <div className="col-sm-10">
                                <select className="mt-2" id="bsvEgitimDurum" value={egitim} onChange={(e) => setEgitim(e.target.value)} required>
                                    <option value="">Eğitim durumu</option>
                                    <option value="2">Mezun</option>
                                    <option value="1">Öğrenci</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label for="bsvMezuniyetTarih" className="col-sm-2 col-form-label">*Mezuniyet tarihi:</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control" id="bsvMezuniyetTarih" value={mezunTarih} onChange={(e) => setMezunTarih(e.target.value)} required />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <label for="bsvGPA" className="col-sm-2 col-form-label">*GPA:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="bsvGPA" value={gpa} onChange={(e) => setGpa(e.target.value)} required />
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
                                <input className="form-control" type="file" id="cvid" name="cv" required />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">Niyet Mektubu</label>
                                <input className="form-control" type="file" id="nytid" required />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">Pasaport</label>
                                <input className="form-control" type="file" id="pasid" required />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">İkametgah Belgesi</label>
                                <input className="form-control" type="file" id="ikaid" required />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">Diploma</label>
                                <input className="form-control" type="file" id="dipid" required />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label">İngilizce Yeterlilik Belgesi</label>
                                <input className="form-control" type="file" id="ingid" required />
                            </div>
                        </div>
                    </div>


                    {/* Dokuman Son */}

                    <div className="row text-center" id="btnDivBsvKisiselBilgiKaydet"   style={{ display: "none" }}>
                        <div className="col-12">
                            <button id="btnBsvKisiselBilgiKaydet" type="submit" className="btn btn-primary text-center" style={{ backgroundColor: "#0a50ad" }} value={props.btnDeger} >Gönder</button>
                        </div>
                    </div>
                </form>

                {error && <p style={{ color: 'red' }}> {error} </p>}
                {success && <p style={{ color: 'green' }}> {success} </p>}

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
            </div>
        </>
    );
}
export default UpdateForm;