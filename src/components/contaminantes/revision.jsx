import { Link } from "react-router-dom";
import "../homepage.css";
import Header from "../header";
import { useEffect, useState } from "react";
import { RUTA_BACKEND } from "../../conf";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const Revision = () => {
    const [listadoSolicitud, setListadoSolicitud] = useState([])
    const [listadoContaminante, setListadoContaminante] = useState([])
    const [listadoAnimal, setListadoAnimal] = useState([])

    const obtenerSolicitud = async (SolicitudID = null) => {
        const ruta = SolicitudID == null ?
            `${RUTA_BACKEND}/Solicitud` :
            `${RUTA_BACKEND}/Solicitud?SolicitudID=${SolicitudID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoSolicitud(data)
        console.log("Solicitudes")
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
            Nombre: Nombre,
            Descripcion: Descripcion,
            Imagen: Imagen,
            Profundidad: Profundidad,
            Contador: Contador
        }
        const resp = await fetch(`${RUTA_BACKEND}/Contaminante`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(resp.status);
        const dataResp = await resp.json()
        obtenerContaminantes()
        eliminarSolicitud(SolicitudID)
    }

    const modificarContaminante = async (Nombre, ContaminanteID, SolicitudID) => {
        console.log(Nombre);
        console.log(ContaminanteID);
        const data = {
            Nombre: Nombre,
            ContaminanteID: ContaminanteID,
        }
        const resp = await fetch(`${RUTA_BACKEND}/Contaminante`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        obtenerContaminantes()
        eliminarSolicitud(SolicitudID)
    }

    const obtenerAnimal = async (AnimalID = null) => {
        const ruta = AnimalID == null ?
            `${RUTA_BACKEND}/Animal` :
            `${RUTA_BACKEND}/Animal?AnimalID=${AnimalID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        console.log("Animales: ")
        console.log(data)
        setListadoAnimal(data)
    }

    const [selectedOption, setSelectedOption] = useState("");
    const [profundidadInt, setProfundidadInt] = useState(0);
    const [afectados, setAfectados] = useState([]);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        obtenerAnimal()
        obtenerSolicitud()
        obtenerContaminantes()
    }, [])

    console.log("Afectados: ")
    console.log(afectados)
    
    function aver(event, a) {
        console.log("Probandoooooo");
        console.log(a)
    }
    return <div>
        <Header />
        {
            listadoSolicitud.map((solicitud) => {
                return <div className="m-5 card">
                    <div className="card-body">
                        <h5 className="card-title"> {solicitud.Nombre} </h5>
                        <p className="card-text"> {solicitud.Descripcion} </p>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${solicitud.SolicitudID}`} onClick={aver(solicitud.SolicitudID)}>Revisar</button>

                        <div class="modal fade" id={`staticBackdrop${solicitud.SolicitudID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby={`staticBackdrop${solicitud.SolicitudID}`} aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id={`staticBackdrop${solicitud.SolicitudID}`}>{solicitud.Nombre}</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div className="mb-3"><img id="imagenDetalle" src={solicitud.Imagen} height="200px"/></div>
                                        <div>
                                            {solicitud.Descripcion}
                                        </div>
                                        <div className="dropdown">
                                            <label for="contaminanteSelect" className="py-2">Contaminante</label>
                                            <select id="contaminanteSelect" className="form-control form-select" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                                {
                                                    listadoContaminante.map((contaminante) => {
                                                        return <option value={contaminante.ContaminanteID} > {contaminante.Nombre} </option>
                                                    })

                                                }
                                                <option value="" className="nuevo">Nuevo contaminante</option>

                                            </select>
                                        </div>
                                        {
                                            selectedOption == '' ? <div className="py-3">
                                                Profundidad
                                                <input min="0" max="1000000" type="number" value={profundidadInt} onChange={e => setProfundidadInt(e.target.value)} className="my-2 form-control" placeholder="Profundidad" />
                                                <label> Animales afectados </label>
                                                <Select
                                                    isMulti
                                                    name="animalesAfectados"
                                                    options={listadoAnimal.map(animal => ({value: animal.AnimalID,  label: animal.Nombre}))}
                                                    className="basic-multi-select py-2"
                                                    classNamePrefix="select"
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                    value={afectados}
                                                    onChange={animal => setAfectados(animal)}
                                                />
                                            </div> : null
                                        }
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        {
                                            selectedOption == '' ? <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { agregarContaminante(solicitud.Nombre, solicitud.Descripcion, solicitud.Imagen, profundidadInt, 0, solicitud.SolicitudID) }}>Agregar</button>
                                                : <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { modificarContaminante(solicitud.Nombre, selectedOption, solicitud.SolicitudID) }}>Agregar</button>
                                        }

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