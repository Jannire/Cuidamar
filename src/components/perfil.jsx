import Header from "./header";

const test = () => {
    const token = localStorage.getItem("TOKEN")
    const Usuario_ID = localStorage.getItem("USUARIO_ID")
    console.log(token + " y " + Usuario_ID)
}

const LogOut = () => {
    localStorage.setItem("TOKEN", "")
    localStorage.setItem("USUARIO_ID", "")
}


const Perfil = () => {
    test();
    //LogOut();
    return <div>
        <Header />

    </div>
}


export default Perfil;