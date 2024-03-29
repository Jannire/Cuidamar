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
    
    const [listadoUsuarios, setListadoUsuarios] = useState([])
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

    const httpObtenerUsuario = async (Usuario_ID = null) => {
        const ruta = Usuario_ID == null ?
            `${RUTA_BACKEND}/Usuarios` : 
            `${RUTA_BACKEND}/Usuarios?Usuario_ID=${Usuario_ID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoUsuarios(data)
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

    const eliminarComentarioUnico = async (ComentarioID = null) => {
        const data = {
            ComentarioID : ComentarioID
        }
        await fetch(`${RUTA_BACKEND}/Comentario?ComentarioID=${ComentarioID}`, {
            method : "DELETE",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        
    }

    useEffect(() => {
        obtenerPost(POSTDETALLE)
        obtenerComentarios(POSTDETALLE)
        httpObtenerUsuario()
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
                                
                                    {listadoUsuarios.map((usuario)=>{if(usuario.Usuario_ID === post.Usuario_ID){
                                        return <div className="col-11 mt-1">{`${post.Titulo}`} - <Link to={"/DetallePerfil"} style={{color:"white"}} onClick={()=>{localStorage.setItem("detallePerfil",post.Usuario_ID)}}>{`${usuario.Username}`}</Link></div>
                                    }})}
                                    
                                
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
                            <div className="mb-2 mt-2">{`${post.Cuerpo}`}</div>
                        </div>
                    </div>

                    <div className="container">
                        <div style={{marginLeft:"-15px", fontSize:"20px", fontWeight:"bold", fontStyle:"italic"}} className="col-12 mt-4">
                            Comentarios
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="col-12 mt-2">
                            
                                {(()=>{
                                    if(USUARIO_ID===null){
                                        return <div style={{color:"white",fontWeight:"bold",fontSize:"25px"}}>Inicie sesion para comentar!</div>
                                    }else{
                                        return <div class="input-group mb-3">
                                            <input style={{marginLeft:"-15px"}} type="text" class="form-control" placeholder="Escribe aqui..." value={comentario} onChange={(evt) => {setComentario(evt.target.value);}}/>
                                            <button style={{width:"100px",marginRight:"-10px",backgroundColor:"black"}} class="btn btn-primary" type="button" id="button-addon1" onClick={()=>{crearComentario(POSTDETALLE,USUARIO_ID,comentario,hoy);}}>Comentar</button>  
                                        </div>
                                    }
                                })()}
                                
                            {
                                listadoComentarios.map((comentario)=>{
                                    return <div className="row mt-3" style={{background:"rgb(17, 52, 75,0.08)",borderRadius:"10px"}}>
                                        <div className="mt-1"></div>
                                        {
                                        listadoUsuarios.map((usuario)=>{
                                            if(usuario.Usuario_ID===comentario.Usuario_ID){
                                                if(comentario.Usuario_ID === USUARIO_ID){
                                                    return <div className="row mb-1" style={{fontSize:"17px", fontWeight:"bold",marginLeft:"1px"}}>
                                                    {`${usuario.Username} - ${comentario.fecha}`}<button className="btn btn-danger" style={{width:"60px",height:"25px", fontSize:"10px",marginLeft:"10px"}} onClick={()=>{eliminarComentarioUnico(comentario.ComentarioID);window.location.reload()}}>Eliminar</button>
                                                </div>
                                                }else{
                                                    return <div className="row mb-1" style={{fontSize:"17px", fontWeight:"bold",marginLeft:"1px"}}>
                                                    {`${usuario.Username} - ${comentario.fecha}`}
                                                </div>
                                                }
                                            
                                        }}
                                        )}
                                        <div className="row mb-1" id="cuerpoComentario" style={{marginLeft:"1px"}}>
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