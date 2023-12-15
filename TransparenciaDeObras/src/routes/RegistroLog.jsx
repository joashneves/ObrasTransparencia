import React from "react";
import BuscarLog from "../componentes/registroLog/BuscarLog";
import ListaLog from "../componentes/registroLog/ListaLog";
import CriarPerfil from "../componentes/Perfis/CriarPerfil";
import CriarUsuario from "../componentes/login/CriarUsuario";

const RegistroLog = () =>{
    return (
        <>
        <BuscarLog/>
        <CriarUsuario/>
        <CriarPerfil/>
        <ListaLog/>
        </>
    )
}

export default RegistroLog;