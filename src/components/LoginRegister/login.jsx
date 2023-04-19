import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../header";
import { Link, useNavigate } from "react-router-dom";
import './login.css'
import logo from "../../images/logo_cuidamar.png"

const Login = () => {

    const [error, setError] = useState(false)
    const [Usuario, setUsuario] = useState([])
    const [password, setPassword] = useState("")
    const [correo, setCorreo] = useState("")
    const navigate = useNavigate()

    const httpObtenerUsuarios = async (usuarioCorreo = null) => {
        const ruta = usuarioCorreo == null ?
            `${RUTA_BACKEND}/Usuarios` :
            `${RUTA_BACKEND}/Usuarios?Correo=${usuarioCorreo}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        console.log(data)
        setUsuario(data)
        const filter = data.filter(element => { if (element.Correo === correo) { return true } return false });
        if (filter.length > 0) {
            httpLogin(correo, password, filter[0].Usuario_ID);
        } else {
            setError(true);
        }
    }

    const onUsuarioDetected = (usuarioCorreo) => {
        console.log("se busca los datos de " + usuarioCorreo)
        httpObtenerUsuarios(usuarioCorreo);

    }

    const httpLogin = async (correo, password, Usuario_ID) => {
        const resp = await fetch(`${RUTA_BACKEND}/Login`, {
            method: "POST",
            body: JSON.stringify({
                Correo: correo,
                Password: password,
                Usuario_ID: Usuario_ID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resp.json()
        console.log(data)
        if (data.error === "") {
            localStorage.setItem("TOKEN", data.token)
            localStorage.setItem("USUARIO_ID", data.usuarioID)
            navigate("/")
        } else {
            setError(true)
        }
    }

    return <div>
        <Header />
        <div className='container mt-5'>

            <div className='row'>
                <div className='col'></div>
                <div className='col-4' id='contenedorR'>

                    <div id='tituloContenedorR' className="mt-3">Sign In</div>

                    <div id='textoContenedorR' className="mt-4"></div>

                    <input type="text" class="form-control mt-3" placeholder="Email" value={correo}
                        onChange={(evt) => { setCorreo(evt.target.value) }} />

                    <input type="password" class="form-control mt-3" placeholder="Password" value={password}
                        onChange={(evt) => { setPassword(evt.target.value) }} />


                    <div class="d-grid gap-2">
                        <button id='botonLogin' class="btn btn-primary mt-3" type="button" onClick={
                            async () => {
                                onUsuarioDetected(correo);
                            }
                        }>LOGIN</button>
                        {
                            (() => {
                                if (error === true) {
                                    return <div className='alert alert-danger'>The account does not exist. Check your credentials.</div>
                                }
                            })()
                        }
                    </div>


                    <Link to={"/Olvidada"}><div className="mt-2" id="forgotPassword"><a href=" ">Forgot your password?</a></div></Link>

                    <div className="mt-4" id='textoContenedorR'>Don't have an account?</div>

                <Link to={"/Register"}>
                    <div class="d-grid gap-2">
                        <button id='botonLogin' class="btn btn-primary mt-3 mb-4" type="button">SIGN UP</button>
                    </div>
                </Link>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <img src={logo} alt="" id="logoLogin"/>
                    </div>
                    <div className="col"></div>
                </div>
                
            </div>
            <div className='col'></div>
                  
        </div>
        </div>
    </div>
}

export default Login;