import { Link } from "react-router-dom";
import "./homepage.css";

const Header = () => 
{
    return <div className="tabs sticky-top">
        <div className="container">
            <Link to={"/Perfil"}><img className="perfilIcon" src="../svgs/account-perfil.svg" alt="Perfil" /></Link>
            <img className="iconoCuidamar" src="../svgs/sea-icono.svg" alt="icono" />
            <Link to={"/"} className="tab"> <a className="head-title"> <h3> Cuidamar </h3> </a> </Link>
        </div>
    </div>
}

export default Header;