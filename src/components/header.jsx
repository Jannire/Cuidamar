import { Link } from "react-router-dom";
import "./homepage.css";
import loginImage from "../images/LoginButton.png"
import registerImage from "../images/RegisterButton.png"
import { useEffect, useState } from 'react'
import { RUTA_BACKEND } from "../conf.js";

const Header = () => 
{
    const usuarioID = localStorage.getItem("USUARIO_ID")
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
        httpObtenerUsuario(usuarioID)
    },[])



    const token = localStorage.getItem("TOKEN")


    return <div className="tabs sticky-top mb-5">
        <div className="container">
            <img className="tab iconoCuidamar" src="../svgs/sea-icono.svg" alt="icono" />
            <Link to={"/"} className="tab cuidamarTitle">  Cuidamar  </Link>
            <img className="buscar" src="https://cdn-icons-png.flaticon.com/512/7018/7018972.png" alt="Search" />
            
            
            {
                (()=>{
                    if(token === null){
                        return <>
                            <Link to={"/Login"}><img src={loginImage} alt="" id="imagenLogin"/></Link>
                            <Link to={"/register"}><img src={registerImage} alt="" id="imagenLogin"/></Link>
                        </>
                    }else{
                        return <>
                            <Link to={"/Perfil"}><img className="perfilIcon" src="../svgs/account-perfil.svg" alt="Perfil" /></Link>
                        </>
                    }
                })()
            }
        </div>
    </div>
}

export default Header;