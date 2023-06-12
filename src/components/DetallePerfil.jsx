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
                            <div className="row">
                                <div className="col-10  mb-3" style={{marginLeft:"-13px"}}>
                                    {`${usuario.Username}`}
                                </div>
                                {(()=>{
                                    if(USUARIO_ID === detallePerfil){
                                        return <div className="col-2">
                                            <button onClick={()=>{navigate("/Perfil")}}>Editar</button>
                                        </div>
                                    }
                                })()}
                            </div>
                            <div className="row mb-3">
                                Nombre : {`${usuario.Nombre}`}
                            </div>
                            <div className="row mb-3">
                                Apellidos : {`${usuario.Apellido_Paterno} ${usuario.Apellido_Materno}`}
                            </div>
                            <div className="row mb-3">
                                Correo Electronico : {`${usuario.Correo}`}
                            </div>
                            <div className="row mt-5 mb-4">Animales Favoritos de {`${usuario.Nombre}`} - {`${listadoTotalFavoritos.length}`}</div>
                            <div className="row">
                            {
                                listadoAnimal.map((animal)=>{
                                    return listadoTotalFavoritos.map((favorito)=>{
                                        if(animal.AnimalID === favorito.AnimalID){
                                            return <div className="col mb-4">
                                                    <span className="row">{`${animal.Nombre}`}</span>
                                                    <img className="row" src={`${animal.Imagen}`} style={{height:"130px"}} alt="" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${animal.AnimalID}`} />
                                                    <div class="modal fade" id={`staticBackdrop${animal.AnimalID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 mt-1" id="staticBackdropLabel" style={{marginRight:"15px"}}>{`${animal.Nombre}`}</h1>
                                    
                                    {(()=>{
                                        if(USUARIO_ID === detallePerfil){
                                            return <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{eliminarFavoritos(USUARIO_ID,animal.AnimalID);window.location.reload()}}>Eliminar Favoritos</button>
                                        }
                                    })()}
                                    <button type="button"data-bs-dismiss="modal" class="btn-close"  aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className="mb-3"><img id="imagenDetalle" src={`${animal.Imagen}`}/></div>
                                    <div>Nombre Cientifico: {`${animal.NombreCientifico}`}</div>
                                    <div>&nbsp;</div>
                                    <div>Descripcion: </div>
                                    <div>{`${animal.Descripcion}`}</div>
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