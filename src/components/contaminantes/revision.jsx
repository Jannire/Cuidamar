import { Link } from "react-router-dom";
import "../homepage.css";
import Header from "../header";
import { useEffect, useState } from "react";
import { RUTA_BACKEND } from "../../conf";
import { useNavigate } from "react-router-dom";

const Revision = () => {
    const [listadoSolicitud, setListadoSolicitud] = useState([])
    const [listadoContaminante, setListadoContaminante] = useState([])

    const obtenerSolicitud = async (SolicitudID = null) => {
        const ruta = SolicitudID == null ?
            `${RUTA_BACKEND}/Solicitud` :
            `${RUTA_BACKEND}/Solicitud?SolicitudID=${SolicitudID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoSolicitud(data)
        console.log(data)
    }

    const eliminarSolicitud = async (SolicitudID = null) => {
        const data = {
            SolicitudID: SolicitudID,
        }
        await fetch(`${RUTA_BACKEND}/Solicitud?SolicitudID=${SolicitudID}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        obtenerSolicitud()
    }

    const obtenerContaminantes = async (ContaminanteID = null) => {
        const ruta = ContaminanteID == null ?
            `${RUTA_BACKEND}/Contaminante` :
            `${RUTA_BACKEND}/Contaminante?ContaminanteID=${ContaminanteID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoContaminante(data)
        console.log("Contaminantes: ")
        console.log(data)
    }

    const agregarContaminante = async (Nombre, Descripcion, Imagen, Profundidad, Contador, SolicitudID) => {
        const data = {
            Nombre : Nombre,
            Descripcion : Descripcion,
            Imagen: Imagen,
            Profundidad: Profundidad,
            Contador: Contador            
        }
        const resp = await fetch(`${RUTA_BACKEND}/Contaminante`, {
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        console.log(resp.status);
        const dataResp = await resp.json()
        obtenerContaminantes()
        eliminarSolicitud(SolicitudID)
    }

    const [selectedOption, setSelectedOption] = useState("");
    const [profundidadInt, setProfundidadInt] = useState(0);

    useEffect(() => {
        obtenerSolicitud()
        obtenerContaminantes()
    }, [])
    console.log(profundidadInt)
    function aver(event) {
        console.log("Probandoooooo")
    }
    return <div>
        <Header />
        {
            listadoSolicitud.map((solicitud) => {
                return <div className="m-5 card">
                    <div className="card-body">
                        <h5 className="card-title"> {solicitud.Nombre} </h5>
                        <p className="card-text"> {solicitud.Descripcion} </p>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdropsolicitudCard" onClick={aver}>Revisar</button>

                        <div class="modal fade" id="staticBackdropsolicitudCard" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{solicitud.Nombre}</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div>
                                            "Imagen"
                                        </div>
                                        <div className="py-3">
                                            Profundidad
                                            <input min="0" max="1000000" type="number" value={profundidadInt} onChange={e => setProfundidadInt(e.target.value)} className="my-2 form-control" placeholder="Profundidad" />
                                        </div>
                                        <div className="dropdown">
                                            <label for="contaminanteSelect">Contaminante</label>
                                            <select id="contaminanteSelect" className="form-control form-select" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                                {
                                                    listadoContaminante.map((contaminante) => {
                                                        return <option value={contaminante.ContaminanteID} > {contaminante.Nombre} </option>
                                                    })

                                                }
                                                <option value="" className="nuevo">Nuevo contaminante</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{agregarContaminante(solicitud.Nombre, solicitud.Descripcion, solicitud.Imagen, profundidadInt, 0, solicitud.SolicitudID)}}>Agregar</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="mx-2 btn btn-danger" onClick={() => { eliminarSolicitud(solicitud.SolicitudID) }}>Eliminar</button>
                    </div>

                </div>
            })
        }


    </div>
}

export default Revision;