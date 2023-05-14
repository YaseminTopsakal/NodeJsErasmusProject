import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [girisEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:3001/',
                {
                    girisEmail,
                    password
                }
            );

            if (response.status === 200) {
                if (response.data.message === "1") {
                    sessionStorage.setItem("id",response.data.id)
                    console.log(response.data.message); 
                    console.log("denemeLogin "+ response );
                    setSuccess('Giriş başarılı. Yönlendiriliyorsunuz...')
                    setTimeout(() => {

                        navigate('/portal');
                }, 2000);
                } else {
                    setError('Kullanıcı adı veya şifre hatalı');  
                }

            }

        } catch (err) {
            setError('Kullanıcı adı ve sifre kontrolünde hata oluştu.') 

        }


    }


    



    return (
        <>
            <div className='row d-flex align-content-center justify-content-center mt-5' >
                <div className='row d-flex align-item-center  justify-content-center mt-5'>


                    <div className="col-6 d-flex align-item-center text-center justify-content-center">
                        <form className="text-center" onSubmit={handleSubmit}>

                            <h1 className="h3 mb-3 fw-normal" style={{ color: "#0a50ad" }}> <i className="fa-solid fa-right-to-bracket " style={{ color: "#0a50ad" }}></i> Giriş Yap</h1>

                            <div className="form-floating">
                                <input type="email"
                                    className="form-control mb-2"
                                    id="girisKullaniciAdi"
                                    placeholder="mail"
                                    value={girisEmail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                <label for="floatingInput">Mail adresi</label>
                            </div>
                            <div className="form-floating">
                                <input type="password"
                                    className="form-control mb-2"
                                    id="girisSifre"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <label for="floatingPassword">Şifre</label>
                            </div>



                            <button className="w-100 btn btn-lg btn-primary" style={{ backgroundColor: "#0a50ad", color: "white" }} type="submit" id="btnGirisYap"   >Giriş Yap</button>
                        </form>
                    </div>

                </div>
                <div className="row d-flex align-item-center justify-content-center mt-3">
                    <div className="col-6 d-flex align-item-center   justify-content-center">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                    </div>
                </div>
                <div className='row d-flex align-item-center  justify-content-center mt-3'>
                    <div className='col-6 d-flex align-item-center text-center justify-content-center'>

                        <p>Hesabınız yok mu? <Link to="/register" style={{ color: "#0a50ad" }}>Kayıt ol!</Link> </p>
                    </div>

                </div>


            </div>

        </>

    );

} export default Login;