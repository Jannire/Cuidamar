import { Link } from "react-router-dom";
import "../homepage.css";
import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import Header from "../header";

const Solicitar = () => {
    const [Nombre, setNombre] = useState("")
    const [Descripcion, setDescripcion] = useState("")
    const [Imagen, setImagen] = useState("");
    const [prevTarget, setPrevTarget] = useState("");

    const [error, setError] = useState(false);
    const [errortxt, setErrortxt] = useState("");

    const crearSolicitud = async (nom, desc, img) => {
        const data = {
            Nombre : nom,
            Descripcion : desc,
            Imagen : img
        }
        const resp = await fetch(`${RUTA_BACKEND}/enviarSolicitud`, {
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const dataResp = await resp.json()
        if(dataResp.error !== ""){
            console.error(dataResp.error)
            setError(true)
            setErrortxt(dataResp.error)
        }else{
            setError(false)
        }
    }

    const convertBase64 = (file) =>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = () => {
                reject(error);
            };
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files;
        if (file[0] != undefined) {
            const base64 = await convertBase64(file[0]);
            setImagen(base64);
            setPrevTarget(file)
        } else {
            e.target.files = prevTarget;
        }
    }

    return (
        <div>
            <Header />


            <div className="container mb-3">
                <div className="col-12">
                    <div className="row" style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
                        Solicita el registro de algún contaminante que hayas identificado!
                    </div>
                </div>
            </div>


            <div id="contenedorForoPost" className="container">
                {
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Nombre del Contaminante</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={Nombre} placeholder="Escribe aqui..." onChange={(evt) => { setNombre(evt.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={Descripcion} placeholder="Escribe aqui..." onChange={(evt) => { setDescripcion(evt.target.value) }} ></textarea>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Imagen</label>
                            <div><input type="file" onChange={(e) =>{handleImageChange(e)}} style={{ cursor: "pointer" }} /></div>
                            <img src={Imagen} height="200px"/>
                        </div>


                        <div className="d-grid gap-2 mb-3">
                            <button className="btn btn-primary" type="button" style={{ borderColor: "white", borderWidth: "3px", background: "lightblue", color: "black", fontWeight: "bold" }}
                                onClick={
                                    () => {
                                        crearSolicitud(Nombre, Descripcion, Imagen);
                                    }
                                }
                            >Enviar</button>
                            {
                                (() => {
                                    if (error === true) {
                                        return <div className='alert alert-danger'>{errortxt}</div>
                                    }
                                })()
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Solicitar;