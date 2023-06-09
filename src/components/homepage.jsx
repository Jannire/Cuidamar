//import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./homepage.css";
import downarrow from "../images/downarrow.png"
import { useEffect, useState } from "react";
import { RUTA_BACKEND } from "./../conf";
import { useNavigate } from "react-router-dom";


const Home = (props) => {
    const USUARIO_ID = localStorage.getItem("USUARIO_ID")
    const [listadoAnimal, setListadoAnimal] = useState([])
    const [listadoFavoritos, setListadoFavoritos] = useState([])
    const [listadoTotalFavoritos, setListadoTotalFavoritos] = useState([])
    const [existe, setExiste] = useState(false)
    const navigate = useNavigate()
    const obtenerAnimal = async(AnimalID = null) =>{
        const ruta = AnimalID == null ? 
            `${RUTA_BACKEND}/Animal`: 
            `${RUTA_BACKEND}/Animal?AnimalID=${AnimalID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        data.sort((x,y)=>x.Profundidad - y.Profundidad);
        setListadoAnimal(data)
    }

    const obtenerFavoritos = async(Usuario_ID = null,AnimalID = null) =>{
        const ruta = `${RUTA_BACKEND}/Favoritos2?Usuario_ID=${Usuario_ID}&AnimalID=${AnimalID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoFavoritos(data)
    }
    const totalFavoritos = async(Usuario_ID = null) =>{
        const ruta = Usuario_ID == null ? 
            `${RUTA_BACKEND}/Favoritos`: 
            `${RUTA_BACKEND}/Favoritos?Usuario_ID=${Usuario_ID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoTotalFavoritos(data)
    }

    const agregarFavoritos = async (Usuario_ID,AnimalID) => {
        const data = {
            Usuario_ID : Usuario_ID,
            AnimalID : AnimalID
            
        }
        const resp = await fetch(`${RUTA_BACKEND}/Favoritos2`, {
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const dataResp = await resp.json()
        obtenerFavoritos(Usuario_ID,AnimalID)
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
        obtenerFavoritos(Usuario_ID,AnimalID)
    }
 
    useEffect(()=>{
        totalFavoritos(USUARIO_ID)
        obtenerAnimal()
    },[])

    return <div id="imagenMarFondo">
        <Header />
        
        <div className="container text-center">
            <div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>      
            </div>   
            <div className="row">
                <div className="col" id="deslizaText">¡Desliza para conocer el inmenso mar Peruano!</div>
            </div>
            <div className="row">&nbsp;</div>
            <div className="row">
                <div className="col">
                    <img src={downarrow} alt="" id="downarrow"/>
                </div>
            </div>
            <div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            <div className="row">&nbsp;</div>
            </div>
            {
                listadoAnimal.map((animal)=>{
                    return <div className="row">
                        <div className="col">
                            <div className="mb-3" id="tituloPez">{`${animal.Nombre} - ${animal.Profundidad}m`}</div>
                            <img id="imgPez"  data-bs-toggle="modal" data-bs-target={`#staticBackdrop${animal.AnimalID}`} src={`${animal.Imagen}`} onClick={()=>{obtenerFavoritos(USUARIO_ID,animal.AnimalID)}}/>
                            

                            <div class="modal fade" id={`staticBackdrop${animal.AnimalID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 mt-1" id="staticBackdropLabel" style={{marginRight:"15px", fontSize:"20px"}}>{`${animal.Nombre}`}</h1>
                                    {
                                        (()=>{
                                            if(USUARIO_ID === null){

                                            }else{
                                                if(listadoFavoritos.length > 0){
                                                    return <button type="button" className="btn btn-danger" data-bs-dismiss="modal" id="botonFav" onClick={()=>{eliminarFavoritos(USUARIO_ID,animal.AnimalID)}}>Eliminar Favoritos</button>
                                                }else{
                                                    return <button type="button" className="btn btn-warning" data-bs-dismiss="modal" id="botonFav" onClick={()=>{agregarFavoritos(USUARIO_ID,animal.AnimalID)}}>Añadir Favoritos</button>
                                                }
                                            }
                                        })()
                                        
                                    }
                                    
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
                    </div>
                })
            }
                        
            <div className="row"></div>
        </div>
    </div>
}

export default Home;