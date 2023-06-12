import Header from "../header";
import "../homepage.css";
import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForoDetalle = () => {
    
    var today = new Date();
    
    var day = today.getDate();
    
    var month = today.getMonth() + 1;
    
    var year = today.getFullYear();
    
    const hoy = `${day}/${month}/${year}`;
    
    
    const USUARIO_ID = localStorage.getItem("USUARIO_ID")
    const [listadoPost, setListadoPost] = useState([])
    const [listadoComentarios, setListadoComentarios] = useState([])
    const POSTDETALLE = localStorage.getItem("detalleForo")
    const [comentario, setComentario] = useState("")
    const navigate = useNavigate();

    const obtenerPost = async (PostID = null) => {
        const ruta = `${RUTA_BACKEND}/Post?PostID=${PostID}` 
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoPost(data)
    }
    const obtenerComentarios = async (PostID = null) => {
        const ruta = `${RUTA_BACKEND}/Comentario2?PostID=${POSTDETALLE}` 
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoComentarios(data)
    }

    const crearComentario = async (PostID,Usuario_ID,Contenido,fecha) => {
        const data = {
            PostID : PostID,
            Usuario_ID : Usuario_ID,
            Contenido : Contenido,
            fecha : fecha
        }
        const resp = await fetch(`${RUTA_BACKEND}/Comentario`, {
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const dataResp = await resp.json()
        obtenerComentarios(PostID)
    }

    const eliminarForo = async (PostID = null) => {
        const data = {
            PostID : PostID
        }
        await fetch(`${RUTA_BACKEND}/Post?PostID=${PostID}`, {
            method : "DELETE",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        navigate("/ForoMain")
    }
    const eliminarComentarios = async (PostID = null) => {
        const data = {
            PostID : PostID
        }
        await fetch(`${RUTA_BACKEND}/Comentario2?PostID=${PostID}`, {
            method : "DELETE",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        navigate("/ForoMain")
    }
    useEffect(() => {
        obtenerPost(POSTDETALLE)
        obtenerComentarios(POSTDETALLE)
    }, [])

    return <div>
        <Header/>
        <div className="container">
            {
                listadoPost.map((post)=>{
                    return <>
                    
                    <div className="container" id="contenedorPosteado">
                        <div className="col-12 mt-1">
                            <div class="row mb-1" style={{fontWeight:"bold"}}>
                                <div className="col-11">
                                    {`${post.Titulo}`} - <Link to={"/DetallePerfil"} onClick={()=>{localStorage.setItem("detallePerfil",post.Usuario_ID)}}>{`${post.Usuario_ID}`}</Link>
                                </div>
                                {
                                    (()=>{
                                        if(USUARIO_ID === post.Usuario_ID){
                                            return <div className="col-1">
                                            
                                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eliminacionModal">
                                            Eliminar
                                            </button>
                                            
                                          
                                            <div class="modal fade" id="eliminacionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Seguro que quieres eliminar el Post?</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style={{marginLeft:"130px"}}>Cancelar</button>
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style={{marginLeft:"15px"}} onClick={()=>{eliminarComentarios(POSTDETALLE);eliminarForo(POSTDETALLE);navigate("/ForoMain")}}>Eliminar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            </div>
                                        }
                                    })()
                                }
                                
                            </div>
                            <div className="mb-2">{`${post.Cuerpo}`}</div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="col-12 mt-3">
                            Comentarios
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="col-12 mt-3">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Escribe aqui..." value={comentario} onChange={(evt) => {setComentario(evt.target.value);}}/>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1" onClick={()=>{crearComentario(POSTDETALLE,USUARIO_ID,comentario,hoy);}}>Comentar</button>
                            </div>
                            {
                                listadoComentarios.map((comentario)=>{
                                    return <div className="mt-3">
                                        <div className="row">
                                            {`${comentario.Usuario_ID} - ${comentario.fecha}`}
                                        </div>
                                        <div className="row">
                                            {`${comentario.Contenido}`}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                    </>
                })
            }
        </div>
    </div>
}

export default ForoDetalle;