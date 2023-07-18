import { Link } from "react-router-dom";
import "../homepage.css";
import Header from "../header";
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import { RUTA_BACKEND } from "../../conf";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const Revision = () => {
    let credentials = localStorage.getItem("FULL_CREDENTIALS")
    const navigate = useNavigate();
    if(credentials == null){
        navigate("/")
    }else{
        credentials = JSON.parse(credentials)
        const admin = credentials.admin;
        if(admin == false){
            navigate("/")
        }

    }
    const [listadoSolicitud, setListadoSolicitud] = useState([])
    const [listadoContaminante, setListadoContaminante] = useState([])
    const [listadoAnimal, setListadoAnimal] = useState([])
    const [resolvedImages, setResolvedImages] = useState([]);

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
        await eliminarSolicitud(SolicitudID)

        afectados.map(async (afecta) => {
            await AgregarAfectados(afecta.value, dataResp.ContaminanteID);
        })

        setAfectados([])

    }

    const modificarContaminante = async (Nombre, ContaminanteID, SolicitudID, Descripcion) => {
        console.log(Nombre);
        console.log(ContaminanteID);

        if(nuevaDescripcion == false){
            for(let i=0; i<listadoContaminante.length; i++){
                if(listadoContaminante[i].ContaminanteID == ContaminanteID){
                    Descripcion = listadoContaminante[i].Descripcion;
                }
            }
        }

        
        const data = {
            Nombre: Nombre,
            ContaminanteID: ContaminanteID,
            Descripcion: Descripcion
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
        //console.log(data)
        setListadoAnimal(data)
    }

    const AgregarAfectados = async (AnimalID, ContaminanteID) => {
        const data = {
            AnimalID: AnimalID,
            ContaminanteID: ContaminanteID
        }
        const resp = await fetch(`${RUTA_BACKEND}/Afecta`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataResp = await resp.json();
    }

    async function decodeBase64FromBytea(byteaData) {
        const bytes = byteaData.data;
        const uint8Array = new Uint8Array(bytes);
        const buffer = Buffer.from(uint8Array);
        const base64String = buffer.toString('base64');
        return base64String;
    }

    const [selectedOption, setSelectedOption] = useState("");
    const [nuevaDescripcion, setnuevaDescripcion] = useState(false);
    const [profundidadInt, setProfundidadInt] = useState(1);
    
    const [afectados, setAfectados] = useState([]);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        obtenerAnimal()
        obtenerSolicitud()
        obtenerContaminantes()
        
    }, [])

    useEffect(() => {
        const resolveImages = async () => {
            const promises = listadoSolicitud.map((solicitud) =>
                decodeBase64FromBytea(solicitud.Imagen)
            );

            const resolvedImages = await Promise.all(promises);
            setResolvedImages(resolvedImages);
        };

        resolveImages();
    }, [listadoSolicitud]);

    console.log(afectados)

    function aver(event, a) {
        console.log("Probandoooooo");
        console.log(a)
    }

    function validarProfundidad(intProf) {
        if (intProf <= 0) {
            return 1;
        }
        if (intProf > 500) {
            return 500;
        }
        return intProf;
    }

    return <div>
        <Header />
        
        {
            listadoSolicitud.map((solicitud, index) => {
                const base64 = resolvedImages[index];
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
                                        <div className="mb-3"><img id="imagenSolicitud" src={base64 == "" ? "../svgs/no-image.svg" : `data:image/jpeg;base64,${base64}`} /></div>
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
                                                <input min="1" max="500" type="number" value={profundidadInt} onChange={e => setProfundidadInt(validarProfundidad(e.target.value))} className="my-2 form-control" placeholder="Profundidad" />
                                                <label> Animales afectados </label>
                                                <Select
                                                    isMulti
                                                    name="animalesAfectados"
                                                    options={listadoAnimal.map(animal => ({ value: animal.AnimalID, label: animal.Nombre }))}
                                                    className="basic-multi-select py-2"
                                                    classNamePrefix="select"
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                    value={afectados}
                                                    onChange={animal => setAfectados(animal)}
                                                />
                                            </div> : null
                                        }
                                        {
                                            selectedOption != '' ? <> 
                                                <div className="form-check my-3">
                                                    <input className="form-check-input" type="checkbox" value={nuevaDescripcion} onChange={(e) => setnuevaDescripcion(e.target.value)} id="flexCheckDefault"/> 
                                                    <label class="form-check-label" for="flexCheckDefault">
                                                        Utilizar nueva descripcion
                                                    </label>
                                                </div>
                                            </> : null
                                        }
                                            </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setAfectados([]) }}>Cerrar</button>
                                            {
                                                selectedOption == '' ? <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { agregarContaminante(solicitud.Nombre, solicitud.Descripcion, base64, profundidadInt, 0, solicitud.SolicitudID) }}>Agregar</button>
                                                    : <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { modificarContaminante(solicitud.Nombre, selectedOption, solicitud.SolicitudID, solicitud.Descripcion) }}>Agregar</button>
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