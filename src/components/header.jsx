import { Link } from "react-router-dom";
import "./homepage.css";
import loginImage from "../images/LoginButton.png"
import registerImage from "../images/RegisterButton.png"
import { useEffect, useState } from 'react'
import { RUTA_BACKEND } from "../conf.js";
import logo from "../images/logo_cuidamar.png"

const Header = () => 
{
    const usuarioID = localStorage.getItem("USUARIO_ID")
    let eresAdmin = localStorage.getItem("FULL_CREDENTIALS")
    if(eresAdmin != null){
        eresAdmin = JSON.parse(eresAdmin)
        eresAdmin = eresAdmin.admin
    }
    const [listadoUsuarios, setListadoUsuarios] = useState([])
    const httpObtenerUsuario = async (Usuario_ID = null) => {
        const ruta = Usuario_ID == null ?
            `${RUTA_BACKEND}/Usuarios` : 
            `${RUTA_BACKEND}/Usuarios?Usuario_ID=${Usuario_ID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoUsuarios(data)
    }

    useEffect(()=>{
        httpObtenerUsuario(usuarioID);
    },[])
    const token = localStorage.getItem("TOKEN")
    
    return <div className="tabs sticky-top mb-5">
        <div className="container">
            <img className="tab iconoCuidamar" src={logo} alt="icono" />
            <Link to={"/"} className="tab cuidamarTitle">CuidaMar</Link>
            {
                (()=>{
                    if(eresAdmin == true){
                        return <span><Link to={"/Revision"} className="cuidamarForo" style={{marginRight:"30px"}}>Solicitudes</Link></span>
                    }
                })()
            }
            
            <span><Link to={"/ForoMain"} className="cuidamarForo" style={{marginRight:"30px"}}>Foro</Link></span>
            {
                (()=>{
                    if(token === null){
                        return <>
                            <Link to={"/login"}><img src={loginImage} alt="" id="imagenLogin"/></Link>
                            <Link to={"/register"}><img src={registerImage} alt="" id="imagenLogin"/></Link>
                        </>
                    }else{
                        return <>
                            <Link to={"/DetallePerfil"}><img className="perfilIcon" src="../svgs/account-perfil.svg" alt="Perfil" onClick={()=>{localStorage.setItem("detallePerfil",usuarioID);}}/></Link>
                        </>
                    }
                })()
            }
        </div>
    </div>
}

export default Header;