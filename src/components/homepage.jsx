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
    const [listadoContaminantes, setListadoContaminantes] = useState([])
    const [listadoFavoritos, setListadoFavoritos] = useState([])
    const [listadoTotalFavoritos, setListadoTotalFavoritos] = useState([])
    const [existe, setExiste] = useState(false)
    const profundidadHomepage = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500]
    const navigate = useNavigate()
    const [resolvedImages, setResolvedImages] = useState([]);

    const obtenerAnimal = async(AnimalID = null) =>{
        const ruta = AnimalID == null ? 
            `${RUTA_BACKEND}/Animal`: 
            `${RUTA_BACKEND}/Animal?AnimalID=${AnimalID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        data.sort((x,y)=>x.Profundidad - y.Profundidad);
        setListadoAnimal(data)
    }

    const obtenerContaminantes = async() =>{
        const ruta = `${RUTA_BACKEND}/Contaminante`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoContaminantes(data)
    }

    async function decodeBase64FromBytea(byteaData) {
        const bytes = byteaData.data;
        const uint8Array = new Uint8Array(bytes);
        const buffer = Buffer.from(uint8Array);
        const base64String = buffer.toString('base64');
        return base64String;
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
        obtenerContaminantes()
        obtenerAnimal()
        const resolveImages = async () => {
            const promises = listadoContaminantes.map((contaminante) =>
                decodeBase64FromBytea(contaminante.Imagen)
            );

            const resolvedImages = await Promise.all(promises);
            setResolvedImages(resolvedImages);
        };

        resolveImages();
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
            <div className="row">
                <div className="col mb-4" id="deslizaText">Solicita que se muestre tu contaminante aqui!</div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" style={{color:"white", fontSize:"20px", width:"150px", fontStyle:"bold"}} onClick={()=>{navigate("/Solicitar")}}>Solicitar</button>
                </div>
            </div>
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
            <div className="col">
                {
                    profundidadHomepage.map((profu)=>{
                        
                        return <div className="row mb-5">
                            <div className="col-md-1" style={{fontWeight:"bold", fontSize:"25px"}}>
                                {`${profu.valueOf()}m -`}
                            </div>
                            {
                                listadoAnimal.map((animal)=>{
                                    if(animal.Profundidad == profu.valueOf()){
                                        return <div className="col">
                            <div className="mb-3" id="tituloPez">{`${animal.Nombre}`}</div>
                            <img id="imgPez"  data-bs-toggle="modal" data-bs-target={`#staticBackdrop${animal.AnimalID}`} src={`${animal.Imagen}`} onClick={()=>{obtenerFavoritos(USUARIO_ID,animal.AnimalID)}}/>
                            
                            <div className="modal fade" id={`staticBackdrop${animal.AnimalID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5 mt-1" id="staticBackdropLabel" style={{marginRight:"15px", fontSize:"20px"}}>{`${animal.Nombre}`}</h1>
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
                                    
                                    <button type="button"data-bs-dismiss="modal" className="btn-close"  aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3"><img id="imagenDetalle" src={`${animal.Imagen}`}/></div>
                                    <div style={{fontSize:"17px", marginBottom:"10px", marginLeft:"7px", marginRight:"7px"}}><span style={{fontWeight:"bold"}}>Nombre Cientifico: </span>{`${animal.NombreCientifico}`}</div>
                                    <div style={{fontSize:"17px", marginBottom:"10px", marginLeft:"7px", marginRight:"7px"}}><span style={{fontWeight:"bold"}}>Profundidad: </span>{`${animal.Profundidad}m`}</div>
                                    <div style={{fontSize:"17px",fontWeight:"bold", marginLeft:"7px", marginRight:"7px"}}>Descripcion: </div>
                                    <div style={{fontSize:"17px", textAlign:"justify", marginLeft:"7px", marginRight:"7px"}}>{`${animal.Descripcion}`}</div>
                                </div>
                                <div className="modal-footer">      
                                </div>
                                </div>
                            </div>
                            </div>

                        </div>
                        
                    
                                    }
                                })
                            }
                            {
                                listadoContaminantes.map((contaminantes,index)=>{
                                    const base64 = resolvedImages[index];
                                    if(contaminantes.Profundidad === profu.valueOf()){
                                        return <div className="col">
                                        <div id="tituloContaminante">{`${contaminantes.Nombre}`}</div>
                                        <img src={base64 == "" ? "../svgs/no-image.svg" : `data:image/jpeg;base64,${base64}`} />
                                    </div>
                                    }
                                    
                                })
                            }
                        </div>
                        
                    })
                }
            </div>
                        
            <div className="row"></div>
        </div>
    </div>
}

export default Home;