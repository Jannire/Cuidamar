import Header from "./header";
import "./homepage.css";
import { RUTA_BACKEND } from "./../conf";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DetallePerfil = () => {

    const USUARIO_ID = localStorage.getItem("USUARIO_ID")
    const detallePerfil = localStorage.getItem("detallePerfil")
    const [listadoUsuarios, setListadoUsuarios] = useState([])
    const [listadoTotalFavoritos, setListadoTotalFavoritos] = useState([])
    const [listadoAnimal, setListadoAnimal] = useState([])

    const obtenerAnimal = async(AnimalID = null) =>{
        const ruta = AnimalID == null ? 
            `${RUTA_BACKEND}/Animal`: 
            `${RUTA_BACKEND}/Animal?AnimalID=${AnimalID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        data.sort((x,y)=>x.Profundidad - y.Profundidad);
        setListadoAnimal(data)
    }
    const httpObtenerUsuario = async (Usuario_ID = null) => {
        const ruta = Usuario_ID == null ?
            `${RUTA_BACKEND}/Usuarios` : 
            `${RUTA_BACKEND}/Usuarios?Usuario_ID=${Usuario_ID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoUsuarios(data)
    }
    const totalFavoritos = async(Usuario_ID = null) =>{
        const ruta = Usuario_ID == null ? 
            `${RUTA_BACKEND}/Favoritos`: 
            `${RUTA_BACKEND}/Favoritos?Usuario_ID=${Usuario_ID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoTotalFavoritos(data)
    }
    const eliminarFavoritos = async (Usuario_ID = null,AnimalID = null) => {
        const data = {
            Usuario_ID : Usuario_ID,
            AnimalID : AnimalID
        }
        await fetch(`${RUTA_BACKEND}/Favoritos2?Usuario_ID=${Usuario_ID}&AnimalID=${AnimalID}`, {
            method : "DELETE",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
    }
    useEffect(()=>{
        obtenerAnimal()
        httpObtenerUsuario(detallePerfil);
        totalFavoritos(detallePerfil)
    },[])

    const navigate = useNavigate()

    return <div>
        <Header/>

        {
            listadoUsuarios.map((usuario)=>{
                return <div className="container">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="row" style={{backgroundColor:"rgb(17, 52, 75,0.25)",borderRadius:"12px"}}>
                                <div className="col-10  mb-1" style={{marginLeft:"-5px", fontSize:"30px", fontWeight:"bold"}}>
                                    {`${usuario.Username}`}
                                </div>
                                {(()=>{
                                    if(USUARIO_ID === detallePerfil){
                                        return <div className="col-2" style={{marginTop:"6px"}}>
                                            <button className="btn btn-primary" style={{marginLeft:"15px",borderRadius:"12px",backgroundColor:"black"}} onClick={()=>{navigate("/Perfil")}}>Editar perfil</button>
                                        </div>
                                    }
                                })()}
                            </div>
                            <div className="row mb-3 mt-3" style={{backgroundColor:"rgb(17, 52, 75,0.1)",borderRadius:"5px"}}>
                                <div>Nombre : {`${usuario.Nombre}`}</div>
                            </div>
                            <div className="row mb-3" style={{backgroundColor:"rgb(17, 52, 75,0.1)",borderRadius:"5px"}}>
                                <div>Apellidos : {`${usuario.Apellido_Paterno} ${usuario.Apellido_Materno}`}</div>
                            </div>
                            <div className="row mb-2" style={{backgroundColor:"rgb(17, 52, 75,0.1)",borderRadius:"5px"}}>
                                <div>Correo Electronico : {`${usuario.Correo}`}</div>
                            </div>
                            <div className="row mt-4 mb-3" style={{fontSize:"20px", fontWeight:"bold",fontStyle:"italic"}}>Animales Favoritos de {`${usuario.Nombre}`} - {`${listadoTotalFavoritos.length}`}</div>
                            <div className="row">
                            {
                                listadoAnimal.map((animal)=>{
                                    return listadoTotalFavoritos.map((favorito)=>{
                                        if(animal.AnimalID === favorito.AnimalID){
                                            return <div className="col mb-4">
                                                    <span className="row" style={{marginRight:"15px", fontSize:"17px",fontStyle:"italic"}}>{`${animal.Nombre}`}</span>
                                                    <img className="row" src={`${animal.Imagen}`} style={{height:"120px",borderStyle:"groove",borderColor:"rgba(67, 176, 226, 1)",borderRadius:"15px"}} alt="" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${animal.AnimalID}`} />
                                                    <div class="modal fade" id={`staticBackdrop${animal.AnimalID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 mt-1" id="staticBackdropLabel" style={{marginRight:"15px"}}>{`${animal.Nombre}`}</h1>
                                    
                                    {(()=>{
                                        if(USUARIO_ID === detallePerfil){
                                            return <button type="button" className="btn btn-danger" id="botonFav" data-bs-dismiss="modal" onClick={()=>{eliminarFavoritos(USUARIO_ID,animal.AnimalID);window.location.reload()}}>Eliminar Favoritos</button>
                                        }
                                    })()}
                                    <button type="button"data-bs-dismiss="modal" class="btn-close"  aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="mb-3"><img id="imagenDetalle" src={`${animal.Imagen}`}/></div>
                                    <div style={{fontSize:"17px", marginBottom:"10px", marginLeft:"7px", marginRight:"7px"}}><span style={{fontWeight:"bold"}}>Nombre Cientifico: </span>{`${animal.NombreCientifico}`}</div>
                                    <div style={{fontSize:"17px", marginBottom:"10px", marginLeft:"7px", marginRight:"7px"}}><span style={{fontWeight:"bold"}}>Profundidad: </span>{`${animal.Profundidad}m`}</div>
                                    <div style={{fontSize:"17px",fontWeight:"bold", marginLeft:"7px", marginRight:"7px"}}>Descripcion: </div>
                                    <div style={{fontSize:"17px", textAlign:"justify", marginLeft:"7px", marginRight:"7px"}}>{`${animal.Descripcion}`}</div>
                                </div>
                                <div class="modal-footer">      
                                </div>
                                </div>
                            </div>
                            </div>
                                            </div>
                                            
                                        }
                                    })
                                })
                            }
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>              
            })
        }
     
    </div>
}
export default DetallePerfil;