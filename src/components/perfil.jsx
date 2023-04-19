import { useState } from "react";
import Header from "./header";
import { Navigate } from "react-router-dom";

const test = () => {
    const token = localStorage.getItem("TOKEN")
    const Usuario_ID = localStorage.getItem("USUARIO_ID")
    console.log(token + " y " + Usuario_ID)
}

const LogOut = () => {
    localStorage.clear("TOKEN")
    localStorage.clear("USUARIO_ID")
    
}


const Perfil = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");

    const [usuarioLogueado, setUsuarioLogueado] = useState([])
    const [errorCorreo, setErrorCorreo] = useState(false);

    test();
    //LogOut();
    return (
        <div>
            <Header />
            <div className="container">
            <div className="row" id="content-user">
                <div id="content-buttons" className="col-2">
                    <div className="row"><button id="content-user-buttons" className="content-user-button-selected">Gestión de Perfil</button></div>
                    <div className="row"><button id="content-user-buttons">Log Out</button></div>
                </div>
                <div id="content-user-info" className="col-7">
                    <div className="row">
                        <div className="col col-alt">
                            <h3 className="mb-4">Información de Perfil</h3>
                            <div className="row">
                                <div className="col">Username<input className="mt-3 mb-3" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                                <div className="col">Nombre<input className="mt-3 mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
                            </div>
                            <div className="row">
                                <div className="col">Apellido Paterno<input className="mt-3 mb-3" value={apellidoP} onChange={(e) => setApellidoP(e.target.value)} /></div>
                                <div className="col">Apellido Materno<input className="mt-3 mb-3" value={apellidoM} onChange={(e) => setApellidoM(e.target.value)} /></div>
                            </div>
                            <p>Email</p><input style={{ width: "100%" }} className="mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <p>Password</p><input style={{ width: "100%" }} className="mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="row mt-3">
                                <div className="col text-center"><button id="content-user-profile" onClick={() => { }}>Actualizar Información</button>{(() => {
                                    if (errorCorreo) {
                                        return <div className="alert alert-danger">Error. El correo ya se encuentra registrado.</div>
                                    } else {
                                        return <div></div>
                                    }
                                })()
                                }</div>
                                <div className="col text-center"><button id="content-user-profile">Cancelar</button></div>
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