import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../header";
import { Link , useNavigate} from "react-router-dom";
import './login.css'
import logo from "../../images/logo_cuidamar.png"

const Login = () => {

    const [error,setError] = useState(false)
    const [listadoUsuarios,setListadoUsuarios] = useState([])
    const [password, setPassword] = useState("")
    const [correo, setCorreo] = useState("")
    const navigate = useNavigate()

    const httpObtenerUsuarios = async (usuarioCorreo = null) => {
        const ruta = usuarioCorreo == null ? 
            `${RUTA_BACKEND}/Usuarios`: 
            `${RUTA_BACKEND}/Usuarios?Correo=${usuarioCorreo}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        console.log(data)
        setListadoUsuarios(data)
    }

    const onUsuarioDetected = (usuarioCorreo) => {
        console.log("se busca los datos de "+ usuarioCorreo)
        httpObtenerUsuarios(usuarioCorreo)
    }

    const httpLogin = async (correo,password,Usuario_ID) => {
        const resp = await fetch(`${RUTA_BACKEND}/Login`, {
            method : "POST",
            body : JSON.stringify({
                Correo : correo,
                Password : password,
                Usuario_ID : Usuario_ID
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const data = await resp.json()
        console.log(data)
        if(data.error === ""){
            localStorage.setItem("TOKEN",data.token)
            localStorage.setItem("USUARIO_ID",data.usuarioID)
            navigate("/")
        }else{
            setError(true)
        }
    }

    useEffect(() => {
        httpObtenerUsuarios()
    },[])

    return <div> 
        <Header/>
        <div className='container mt-5'>
            

            <div className='row'>
            <div className='col'></div>
            <div  className='col-4'   id='contenedorR'>

                <div id='tituloContenedorR' className="mt-3">Sign In</div>

                <div id='textoContenedorR' className="mt-4"></div>

                <input type="text" class="form-control mt-3" id="floatingInput" placeholder="Email" value={correo}
                onChange={(evt)=>{setCorreo(evt.target.value); onUsuarioDetected(correo)}}/>

                <input type="password" class="form-control mt-3" id="floatingInput" placeholder="Password" value={password}
                onChange={(evt)=>{setPassword(evt.target.value); onUsuarioDetected(correo)}}/>

                
                <div class="d-grid gap-2">
                    <button id='botonLogin' class="btn btn-primary mt-3" type="button" onClick={
                        ()=>{
                            listadoUsuarios.map((usuario)=>{const usuarioID = usuario.Usuario_ID
                            httpLogin(correo,password,usuarioID)
                            })
                        }
                    }>LOGIN</button>
                    {
                       (()=>{
                        if(error === true){
                            return <div className='alert alert-danger'>The account does not exist. Check your credentials.</div>
                        }
                    })()
                    }
                </div>
                

                <Link to={"/Olvidada"}>
                <div className="mt-2" id="forgotPassword"><a href=" ">Forgot your password?</a></div>
                </Link>

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