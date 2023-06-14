import Header from "../header";
import "../homepage.css";
import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ForoMain = () => {

    const USUARIO_ID = localStorage.getItem("USUARIO_ID")
    const [Titulo, setTitulo] = useState("")
    const [Cuerpo, setCuerpo] = useState("")
    const [listadoPost, setListadoPost] = useState([]);
    const [error,setError] = useState(false);
    const [errortxt,setErrortxt] = useState("");
    const [listadoUsuarios, setListadoUsuarios] = useState([])
    const navigate = useNavigate()

    const httpObtenerUsuario = async (Usuario_ID = null) => {
        const ruta = Usuario_ID == null ?
            `${RUTA_BACKEND}/Usuarios` : 
            `${RUTA_BACKEND}/Usuarios?Usuario_ID=${Usuario_ID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoUsuarios(data)
    }

    const crearPost = async (Usuario_ID,Cuerpo,Titulo) => {
        const data = {
            Usuario_ID : Usuario_ID,
            Cuerpo : Cuerpo,
            Titulo : Titulo
        }
        const resp = await fetch(`${RUTA_BACKEND}/Post`, {
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
        obtenerPost()
    }

    const obtenerPost = async (PostID = null) => {
        const ruta = `${RUTA_BACKEND}/Post` 
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoPost(data)
    }

    useEffect(() => {
        obtenerPost()
        httpObtenerUsuario()
    }, [])

    return <div>
        
        <Header/>
        <div className="container mb-3">
            <div className="col-12">
                <div className="row" style={{color:"white",fontSize:"20px",fontWeight:"bold"}}>
                    ¿Quieres compartir algo con la comunidad? ¡Crea un post!
                </div>
            </div>
        </div>

        <div id="contenedorForoPost" className="container">
            {
                (()=>{
                    if(USUARIO_ID !== null){
                        return <div className="col-12">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Titulo</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={Titulo} placeholder="Escribe aqui..." onChange={(evt) => {setTitulo(evt.target.value);console.log(Titulo) }} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">De que quieres hablarnos?</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={Cuerpo} placeholder="Escribe aqui..." onChange={(evt) => { setCuerpo(evt.target.value);console.log(Cuerpo) }} ></textarea>
                        </div>
                        <div class="d-grid gap-2 mb-3">
                            <button class="btn btn-primary" type="button" style={{borderColor:"white",borderWidth:"3px",background:"lightblue",color:"black",fontWeight:"bold"}}
                            onClick = {
                                ()=>{
                                    crearPost(USUARIO_ID,Cuerpo,Titulo);
                                    obtenerPost();
                                }
                            }
                        >Post</button>
                            {
                                (()=>{
                                    if(error === true){
                                        return <div className='alert alert-danger'>{errortxt}</div>
                                    }
                                })()
                            }
                        </div>
                    </div>
                    }else{
                        return <div className="mt-2 mb-2">Inicia sesion para poder participar en el Foro!</div>
                    }
                })()
            }
            
        </div>
        {
            listadoPost.map((post)=>{
                return <div className="container mb-2" id="contenedorPosteado">
                    <div className="col-12 mt-1 mb-1">
                        <div class="mb-1">
                            {
                                listadoUsuarios.map((usuario)=>{
                                    if(usuario.Usuario_ID === post.Usuario_ID){
                                        return <label class="form-label" style={{fontWeight:"bold",fontSize:"22px",marginTop:"5px",marginBottom:"15px"}}>{`${post.Titulo}`} - <Link to={"/DetallePerfil"} style={{color:"white"}} onClick={()=>{localStorage.setItem("detallePerfil",post.Usuario_ID)}}>{`${usuario.Username}`}</Link></label>
                                    }
                                })
                            }
                            
                        </div>
                        <div style={{marginBottom:"15px",fontSize:"16px"}} className="mb-2">{`${post.Cuerpo}`}</div>
                        <div className="row">
                            <span onClick={()=>{localStorage.setItem("detalleForo",post.PostID)}}><Link to={"/ForoDetalle"}>{`ver discusion ->`}</Link></span>
                        </div>
                    </div>
                </div>
            })
        }            
        
    </div>
}

export default ForoMain;