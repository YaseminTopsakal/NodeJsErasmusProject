
import ReactDOM from 'react-dom';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';



function KayitBilgileri() {

    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [success, setSuccess] = useState('');
    const [success2, setSuccess2] = useState('');

    const [error, setError] = useState('');
    const [error2, setError2] = useState('');



    const id = sessionStorage.getItem('id');
    


    const handleSubmit = async(e) => {

        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3001/kullaniciKontrol',
                {
                  id,
                    email,
                    password,
                   
                }
            );

            if (response.status === 200) {
                if (response.data.message === "1") {
                    
                    document.getElementById("eskiDiv").style.display = "none";  
                    
                    document.getElementById("yeniDiv").style.display = "block";  
                    
                } else {
                    setError('Kullanıcı adı veya şifre hatalı');  
                }
                

            }

        } catch (err) {
            setError('Kullanıcı adı ve sifre kontrolünde hata oluştu.') 

        }
       
    }


    const updateUser = async (e) => {

        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:3001/updateuser", {
            id,    
            newEmail,
            newPassword

            });
            if (response.status === 200) {
                setSuccess2("Güncelleme başarı ile yapıldı");
                setNewEmail("");
                setNewPassword("");
             

                
            } else {
                setError2(response.data.error);
            }

        } catch {
            setError2('Veritabanına ekleme yapılırken hata oluştu.', error);
        }


    }


    

    return (
        <>
            <div className="row d-flex align-item-center text-center justify-content-center">
                <div className="col-12 d-flex align-item-center text-center justify-content-center">
                    <div className='row d-flex align-item-center text-center justify-content-center'>
                        <div className='col-12 d-flex align-item-center text-center justify-content-center'>
                            <form className="text-center" id="eskiDiv" onSubmit={handleSubmit}>
                                <div className="row my-3">
                                    <div className="col-12">

                                        <h1 style={{ color: "#0a50ad" }}>  Kullanıcı Bilgileri</h1>
                                        <p>Kullanıcı bilgilerini aşağıdaki formdan düzenleyebilirsiniz.</p>
                                    </div>
                                </div>
                                <div >
                                    <div className="form-floating">
                                        <input type="mail"
                                            className="form-control mb-2"
                                            id="eskiMail"
                                            value={email}
                                            placeholder="kullanıcıAdi"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                        <label for="floatingInput">Eski kullanıcı adı</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password"
                                            className="form-control mb-2"
                                            id="eskiSifre"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required />
                                        <label for="floatingPassword">Eski şifre</label>
                                    </div>
                                    <div className="col-12 d-flex align-item-center text-center justify-content-center'">
                                        {error && <p style={{ color: 'red' }}>{error}</p>}
                                    </div>
                                    <button className="w-100 btn btn-lg btn-primary" style={{ backgroundColor: "#0a50ad", color: "white" }} type="" id="btnDuzenle" onClick={handleSubmit}>Düzenle</button>
                                    <div className="col-12 d-flex align-item-center text-center justify-content-center'" id="successP" style={{display:"none"}}>
                                        {success && <p style={{ color: 'green' }}>{success}</p>}
                                        </div>
                                </div>
                            </form>
                                

                                <form className="text-center" id="yeniDiv" style={{display:"none"}} onSubmit={updateUser}>
                                <div className="row my-3">
                                    <div className="col-12">

                                        <h1 style={{ color: "#0a50ad" }}>  Kullanıcı Bilgileri</h1>
                                        <p>Kullanıcı bilgilerini aşağıdaki formdan düzenleyebilirsiniz.</p>
                                    </div>
                                </div>
                                <div  >
                                    <div className="form-floating" id='yeniMail' >
                                        <input type="mail"
                                            className="form-control mb-2"
                                            id="yeniMail"
                                            value={newEmail}
                                            placeholder="kullanıcıAdi"
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            required />
                                        <label for="floatingInput">Yeni kullanıcı adı</label>
                                    </div>
                                    <div className="form-floating" id='yeniSifre' >
                                        <input type="password"
                                            className="form-control mb-2"
                                            id="yeniSifre"
                                            value={newPassword}
                                            placeholder="Password"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required />
                                        <label for="floatingPassword">Yenişifre</label>
                                    </div>
                                    <div className="row d-flex align-item-center  justify-content-center mt-3'">
                                        
                                        <button className="w-100 btn btn-lg btn-primary" style={{ backgroundColor: "#0a50ad", color: "white" }} type="button"  onClick={updateUser}>Kaydet</button>
                                    </div>

                                </div>

                                <div className="col-12 d-flex align-item-center text-center justify-content-center'" id="success2" style={{display:"none"}}>
                                        {success2 && <p style={{ color: 'green' }}>{success2}</p>}
                                        </div>
                            </form>
                           
                        </div>
                    </div>
                </div>


            </div>
        

        </>
    );
}

export default KayitBilgileri;