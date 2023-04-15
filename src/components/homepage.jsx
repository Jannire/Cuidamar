//import { Link } from "react-router-dom";
import Header from "./header";
import "./homepage.css";


const Home = (props) => {
    return <div>
        <Header />
        <div className="container">
            <div className="row row-flora">
                <div className="col-4 left">
                    <p>Animal A1</p>
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/103__25052022_2121.jpg" alt="anchoveta" />
                </div>
                <div className="col"></div>
                <div className="col-4"></div>
            </div>
            <div className="row row-flora">
                <div className="col-4 right">
                </div>
                <div className="col"></div>
                <div className="col-4">
                    <p> Animal A2 </p>
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/122__25052022_2125.jpg" alt="anchoveta" />
                </div>
            </div>
            <div className="row row-flora">
                <div className="col-4 left">
                    <p>Animal B1</p>
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/797__25052022_2146.jpg" alt="anchoveta" />
                </div>
                <div className="col"></div>
                <div className="col-4"></div>
            </div>
            <div className="row row-flora">
                <div className="col-4 right">
                </div>
                <div className="col"></div>
                <div className="col-4">
                    <p> Animal B2 </p>
                    <img className="imgPez" src="https://biodiversidadacuatica.imarpe.gob.pe/ImagenEspecies/Catalogo/107__26042019_1553.jpg" alt="anchoveta" />
                </div>
            </div>
        </div>

    </div>
}

export default Home;