import React from "react";
import CriarPerfil from "../componentes/Perfis/CriarPerfil";
import BuscarUsuario from "../componentes/Perfis/BuscarUsuario";
import ListarPerfis from "../componentes/Perfis/ListarPerfis";

const GerenciarPerfis = () =>{
    return(
        <>
        <CriarPerfil/>
        <BuscarUsuario/>
        <ListarPerfis/>
        </>
    )
}

export default GerenciarPerfis;