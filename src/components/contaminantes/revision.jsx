import { Link } from "react-router-dom";
import "../homepage.css";
import Header from "../header";
import { useEffect, useState } from "react";
import { RUTA_BACKEND } from "../../conf";
import { useNavigate } from "react-router-dom";

const Revision = () => 
{
    const [listadoSolicitud, setListadoSolicitud] = useState([])

    const obtenerSolicitud = async(SolicitudID = null) =>{
        const ruta = SolicitudID == null ? 
            `${RUTA_BACKEND}/Solicitud`: 
            `${RUTA_BACKEND}/Solicitud?SolicitudID=${SolicitudID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoSolicitud(data)
        console.log(data)
    }
    
    const eliminarSolicitud = async (SolicitudID = null) => {
        const data = {
            SolicitudID : SolicitudID,
        }
        await fetch(`${RUTA_BACKEND}/Solicitud?SolicitudID=${SolicitudID}`, {
            method : "DELETE",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        obtenerSolicitud()
    }

    useEffect(()=>{
        obtenerSolicitud()
    },[])

    return <div>
        <Header/>
        {
            listadoSolicitud.map((solicitud)=>{
                return <div className="m-5 card">
                    <div className="card-body">
                        <h5 className="card-title"> {solicitud.Nombre} </h5>
                        <p className="card-text"> {solicitud.Descripcion} </p>
                        <button type="button" className="btn btn-success">Agregar</button>
                        <button type="button" className="mx-2 btn btn-danger" onClick={()=>{eliminarSolicitud(solicitud.SolicitudID)}}>Eliminar</button>
                    </div>
                </div>
            })
        }
    </div>
}

export default Revision;