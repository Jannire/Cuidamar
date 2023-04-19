import Header from "./header";
import { Link , useNavigate} from "react-router-dom";


const Perfil = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear("TOKEN")
        localStorage.clear("USUARIO_ID")
        navigate("/")
    }

    return <div>
        <Header/>
        Este es el perfil
        <button onClick={()=>(logout())}>log out</button>
    </div>
}


export default Perfil;