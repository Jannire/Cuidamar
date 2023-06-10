import Header from "../header";
import "../homepage.css";
import { RUTA_BACKEND } from "../../conf";
import { useState } from "react";
import { useEffect } from "react";

const ForoMain = () => {

    const USUARIO_ID = localStorage.getItem("USUARIO_ID")
    const [Titulo, setTitulo] = useState("")
    const [Cuerpo, setCuerpo] = useState("")
    const [listadoPost, setListadoPost] = useState([]);
    const [error,setError] = useState(false);
    const [errortxt,setErrortxt] = useState("");

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
            <div className="col-12">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Titulo</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" value={Titulo} onChange={(evt) => {setTitulo(evt.target.value);console.log(Titulo) }} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">De que quieres hablarnos?</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={Cuerpo} onChange={(evt) => { setCuerpo(evt.target.value);console.log(Cuerpo) }} ></textarea>
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
        </div>
        {
            listadoPost.map((post)=>{
                return <div className="container" id="contenedorPosteado">
                    <div className="col-12 mt-1">
                        <div class="mb-1">
                            <label class="form-label" style={{fontWeight:"bold"}}>{`${post.Titulo} - ${post.Usuario_ID}`}</label>
                        </div>
                        <div className="mb-2">{`${post.Cuerpo}`}</div>
                    </div>
                </div>
            })
        }            
        
    </div>
}

export default ForoMain;