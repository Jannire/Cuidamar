import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../header";
import { Link, useNavigate } from "react-router-dom";
import './login.css'

const Register = () => {
    const [error, setError] = useState(false);

    const [errortxt, setErrortxt] = useState("");
    const [listadoUsuarios, setListadoUsuarios] = useState([]);
    const [Correo, setCorreo] = useState("");
    const [Usuario_ID, setUsuario_ID] = useState("");
    const [Password, setPassword] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Apellido_Paterno, setApellido_Paterno] = useState("");
    const [Apellido_Materno, setApellido_Materno] = useState("");

    const [Username, setUsername] = useState("");
    const navigate = useNavigate();

    const httpObtenerUsuarios = async (Correo = null) => {
        const ruta = Usuario_ID.length <= 0 ?
            `${RUTA_BACKEND}/Usuarios` :
            `${RUTA_BACKEND}/Usuarios?Correo=${Correo}`;
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoUsuarios(data)
    }

    const usuarioRegister = async (Username, Correo, Password, Nombre, Apellido_Paterno, Apellido_Materno) => {
        const data = {
            Username: Username,
            Correo: Correo,
            Password: Password,
            Nombre: Nombre,
            Apellido_Materno: Apellido_Materno,
            Apellido_Paterno: Apellido_Paterno
        }
        const resp = await fetch(`${RUTA_BACKEND}/Usuarios`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataResp = await resp.json()
        if (dataResp.error !== "") {
            console.error(dataResp.error)
            setError(true)
            setErrortxt(dataResp.error)
        } else {
            setError(false)
            navigate("/")

        }
        httpObtenerUsuarios(Correo)
    }

    const registrar = (Username, Correo, Password, Nombre, Apellido_Paterno, Apellido_Materno) => {
        usuarioRegister(Username, Correo, Password, Nombre, Apellido_Paterno, Apellido_Materno)
    }

    useEffect(() => {
        httpObtenerUsuarios()
    }, [Correo])


    return <div>
        <Header />
        <div className='container mt-5'>


            <div className='row'>
                <div className='col'></div>
                <div className='col-4' id='contenedorR'>

                    <div id='tituloContenedorR' className="mt-3">Create Account</div>

                    <input type="text" className="form-control mt-3" placeholder="Username" value={Username}
                        onChange={(evt) => { setUsername(evt.target.value) }} />

                    <input type="text" className="form-control mt-3" placeholder="Email" value={Correo}
                        onChange={(evt) => { setCorreo(evt.target.value) }} />

                    <input type="password" className="form-control mt-3" placeholder="Password" value={Password}
                        onChange={(evt) => { setPassword(evt.target.value) }} />

                    <input type="text" className="form-control mt-3" placeholder="Nombre" value={Nombre}
                        onChange={(evt) => { setNombre(evt.target.value) }} />

                    <input type="text" className="form-control mt-3" placeholder="Apellido Paterno" value={Apellido_Paterno}
                        onChange={(evt) => { setApellido_Paterno(evt.target.value) }} />

                    <input type="text" className="form-control mt-3" placeholder="Apellido Materno" value={Apellido_Materno}
                        onChange={(evt) => { setApellido_Materno(evt.target.value) }} />



                    <div className="d-grid gap-2">
                        <button id='botonLogin' className="btn btn-primary mt-3 mb-3" type="button"
                            onClick={
                                () => {
                                    registrar(Username, Correo, Password, Nombre, Apellido_Paterno, Apellido_Materno)
                                }
                            }
                        >REGISTER</button>


                        {
                            (() => {
                                if (error === true) {
                                    return <div className='alert alert-danger'>{errortxt}</div>
                                }
                            })()
                        }
                    </div>

                    <div className="mt-2 mb-3" id="forgotPassword"><Link to={"/Login"}>Already registered? Try signing in</Link></div>

                    <div className="row">
                        <div className="col"></div>
                        <div className="col"></div>
                    </div>

                </div>
                <div className='col'></div>

            </div>
        </div>
    </div>
}

export default Register;