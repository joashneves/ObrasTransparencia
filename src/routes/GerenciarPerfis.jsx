import React from "react";
import CriarPerfil from "../componentes/Perfis/CriarPerfil";
import BuscarUsuario from "../componentes/Perfis/BuscarUsuario";
import ListarPerfis from "../componentes/Perfis/ListarPerfis";
import BotaoVoltarcadastro from "../componentes/miscs/BotaoVoltarcadastro";

// Componente para gerencia de perfil dos usuarios
const GerenciarPerfis = () =>{
    return(
        <>
        <BotaoVoltarcadastro/>
        <CriarPerfil/>
        <BuscarUsuario/>
        <ListarPerfis/>
        </>
    )
}

export default GerenciarPerfis;