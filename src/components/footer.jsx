import { Link } from "react-router-dom";
import "./homepage.css";

const Footer = () => 
{
    return <div className="footer">
        <div className="container text-center">
            <Link to={"/"} className="tab cuidamarTitle">  Cuidamar  </Link>
            <img className="tab iconoCuidamar" src="../svgs/sea-icono.svg" alt="icono" />
        </div>
    </div>
}

export default Footer;