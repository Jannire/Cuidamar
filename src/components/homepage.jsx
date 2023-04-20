//import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./homepage.css";
import downarrow from "../images/downarrow.png"
import lenguado from "../images/peces/lenguado.png"
import pezespada from "../images/peces/pez_espada.png"
import plastico from "../images/peces/plastico1.png"
import lobomarino from "../images/peces/lobo_marino.png"

const Home = (props) => {
    return <body id="imagenMarFondo">
        <Header />
        
        <div className="container text-center">
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
            <div className="row">
                <div className="col" id="deslizaText">¡Desliza para conocer el inmenso mar Peruano!</div>
            </div>
            <div className="row">&nbsp;</div>
            <div className="row">
                <div className="col">
                    <img src={downarrow} alt="" id="downarrow"/>
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

            <div className="row">
                <div className="col">
                    <div className="mb-4" id="tituloPez">Lenguado - 20mt</div>
                    <img className="imgPez" src={lenguado}/>
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <div className="mb-4" id="tituloPez">Atun de Aleta Amarilla - 25mt</div>
                    <img className="imgPez" src={pezespada}/>
                </div>

                <div className="col">
                    <div className="mb-1" id="tituloPez">Plastico</div>
                    <img className="imgPez" src={plastico}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="mb-4" id="tituloPez">Lobo Marino - 35mt</div>
                    <img className="imgPez" src={lobomarino}/>
                </div>
            </div>
            
            <div className="row"></div>
        </div>
    </body>
}

export default Home;