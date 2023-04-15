import { Link } from "react-router-dom";
import Header from "./header";
import "./homepage.css";


const Home = (props) => 
{
    return <div>
        <Header/>
        <div className="container">
            <div className="row">
                <div className="col left">
                    Animal A1
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/103__25052022_2121.jpg" alt="anchoveta" />
                </div>
                <div className="col"></div>
                <div className="col right">
                    Animal A2
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/103__25052022_2121.jpg" alt="anchoveta" />
                </div>
            </div>
            <div>

            </div>
            <div>
                <div className="left">
                    Animal B1
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/103__25052022_2121.jpg" alt="anchoveta" />
                </div>
                <div className="right">
                    Animal B2
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/103__25052022_2121.jpg" alt="anchoveta" />
                </div>
            </div>
        </div>
    </div>
}

export default Home;