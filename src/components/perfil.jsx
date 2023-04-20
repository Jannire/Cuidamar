import { RUTA_BACKEND } from "./../conf";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./header";
import './perfil.css'

const Perfil = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");

    const [usuarioLogueado, setUsuarioLogueado] = useState([]);
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorLlenar, setErrorLlenar] = useState(false);
    const [updateSucess, setUpdateSucess] = useState(false);

    const LogOut = () => {
        localStorage.clear("TOKEN");
        localStorage.clear("USUARIO_ID");
        localStorage.clear("FULL_CREDENTIALS");
        navigate("/");
    }

    const getCredentials = () => {
        const json = localStorage.getItem("FULL_CREDENTIALS");
        const usuarioLog = JSON.parse(json);
        setUsuarioLogueado(usuarioLog)
    }

    useEffect(() => {
        getCredentials()
    }, [])

    const updateLocalStorage = (Usuario_ID) => {
        const object = {};
        if (email.length > 0) { object["Correo"] = email } else { object["Correo"] = usuarioLogueado.Correo }
        if (password.length > 0) { object["Password"] = password } else { object["Password"] = usuarioLogueado.Password }
        object["Usuario_ID"] = Usuario_ID;
        if (username.length > 0) { object["Username"] = username } else { object["Username"] = usuarioLogueado.Username }
        if (apellidoP.length > 0) { object["Apellido_Paterno"] = apellidoP } else { object["Apellido_Paterno"] = usuarioLogueado.Apellido_Paterno }
        if (apellidoM.length > 0) { object["Apellido_Materno"] = apellidoM } else { object["Apellido_Materno"] = usuarioLogueado.Apellido_Materno }
        if (nombre.length > 0) { object["Nombre"] = nombre } else { object["Nombre"] = usuarioLogueado.Nombre }
        return object;
    }

    const httpModificar = async (usuario_id, usern, em, pass, nom, apellido_p, apellido_m) => {
        const object = {
            Correo: em,
            Password: pass,
            Usuario_ID: usuario_id,
            Username: usern,
            Apellido_Paterno: apellido_p,
            Apellido_Materno: apellido_m,
            Nombre: nom
        }
        console.log(object)
        const resp = await fetch(`${RUTA_BACKEND}/Modificar`, {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resp.json()
        console.log(data)
        if (data.error === "") {
            setErrorCorreo(false);
            setErrorUsername(false);
            setErrorLlenar(false);
            setUpdateSucess(true);

            const newCredentials = updateLocalStorage(usuario_id);
            localStorage.setItem("TOKEN", newCredentials.Correo);
            localStorage.setItem("USUARIO_ID", newCredentials.Usuario_ID);
            localStorage.setItem("FULL_CREDENTIALS", JSON.stringify(newCredentials));
            setUsuarioLogueado(newCredentials);
        } else {
            setUpdateSucess(false);
            if (data.error === "Correo_Username") { setErrorCorreo(true); setErrorUsername(true) }
            else if (data.error === "Correo") { setErrorCorreo(true); setErrorUsername(false) }
            else if (data.error === "Username") { setErrorUsername(true); setErrorCorreo(false) }
            else if (data.error === "Llenar") { setErrorLlenar(true); setErrorCorreo(false); setErrorUsername(false) }
        }
    }


    return (
        <div>
            <Header />
            <div className="container">
                <div className="row" id="content-user">
                    <div id="content-buttons" className="col-2">
                        <div className="row"><button id="content-user-buttons" className="content-user-button-selected">Gestión de Perfil</button></div>
                        <div className="row"><button id="content-user-buttons" onClick={() => { LogOut() }}>Cerrar sesión</button></div>
                    </div>
                    <div id="content-user-info" className="col-7">
                        <div className="row">
                            <div className="col col-alt">
                                <h3 className="mb-4">Gestión de Perfil</h3>
                                <div className="row">
                                    <div className="col">Nombre de usuario<input className="mt-3 mb-3" placeholder={usuarioLogueado.Username} value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                                    <div className="col">Nombre<input className="mt-3 mb-3" placeholder={usuarioLogueado.Nombre} value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
                                </div>
                                <div className="row">
                                    <div className="col">Apellido Paterno<input className="mt-3 mb-3" placeholder={usuarioLogueado.Apellido_Paterno} value={apellidoP} onChange={(e) => setApellidoP(e.target.value)} /></div>
                                    <div className="col">Apellido Materno<input className="mt-3 mb-3" placeholder={usuarioLogueado.Apellido_Materno} value={apellidoM} onChange={(e) => setApellidoM(e.target.value)} /></div>
                                </div>
                                <p>Correo</p><input style={{ width: "100%" }} className="mb-3" placeholder={usuarioLogueado.Correo} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <p>Contraseña</p><input type="password" style={{ width: "100%" }} className="mb-3" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="col text-center"><button id="content-user-profile" onClick={() => { httpModificar(usuarioLogueado.Usuario_ID, username, email, password, nombre, apellidoP, apellidoM) }}>Actualizar Información</button>{(() => {
                                    if (errorCorreo && errorUsername) {
                                        return (
                                            <div>
                                                <div className="alert alert-danger">Error: El correo ingresado ya se encuentra registrado.</div>
                                                <div className="alert alert-danger">Error: El nombre de usuario ingresado ya se encuentra registrado.</div>
                                            </div>
                                        )
                                    } else if (errorCorreo) {
                                        return <div className="alert alert-danger">Error: El correo ingresado ya se encuentra registrado.</div>
                                    }
                                    else if (errorUsername) {
                                        return <div className="alert alert-danger">Error: El nombre de usuario ingresado ya se encuentra registrado.</div>
                                    } else if (errorLlenar) {
                                        return <div className="alert alert-danger">Error: Necesita llenar al menos un campo para actualizar información.</div>
                                    }
                                    else if (updateSucess) {
                                        return <div className="alert alert-success">Información actualizada satisfactoriamente!</div>
                                    }
                                    else {
                                        return <div></div>
                                    }
                                })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Perfil;