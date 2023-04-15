import { Link } from "react-router-dom";
import "./homepage.css";

const Header = () => 
{
    return <div className="tabs sticky-top mb-5">
        <div className="container">
            <img className="tab iconoCuidamar" src="../svgs/sea-icono.svg" alt="icono" />
            <Link to={"/"} className="tab cuidamarTitle">  Cuidamar  </Link>
            <img className="buscar" src="https://cdn-icons-png.flaticon.com/512/7018/7018972.png" alt="Search" />
            <Link to={"/Perfil"}><img className="perfilIcon" src="../svgs/account-perfil.svg" alt="Perfil" /></Link>
        </div>
    </div>
}

export default Header;