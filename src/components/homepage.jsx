//import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./homepage.css";
import downarrow from "../images/downarrow.png"
import lenguado from "../images/peces/lenguado.png"
import pezespada from "../images/peces/pez_espada.png"
import plastico from "../images/peces/plastico1.png"
import lobomarino from "../images/peces/lobo_marino.png"
import { useEffect, useState } from "react";
import { RUTA_BACKEND } from "./../conf";


const Home = (props) => {

    const [listadoAnimal, setListadoAnimal] = useState([])

    const obtenerAnimal = async(AnimalID = null) =>{
        const ruta = AnimalID == null ? 
            `${RUTA_BACKEND}/Animal`: 
            `${RUTA_BACKEND}/Animal?AnimalID=${AnimalID}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        setListadoAnimal(data)
    }
    
    useEffect(()=>{
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
                            <div className="mb-4" id="tituloPez">{`${animal.Nombre} - ${animal.Profundidad}m`}</div>
                            <img id="imgPez" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${animal.AnimalID}`} src={`${animal.Imagen}`}/>

                            <div class="modal fade" id={`staticBackdrop${animal.AnimalID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5 mt-1" id="staticBackdropLabel">{`${animal.Nombre}`}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                    </div>
                })
            }
                        
            <div className="row"></div>
        </div>
    </div>
}

export default Home;