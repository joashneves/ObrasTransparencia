import React from "react";
import BotaoVoltarcadastro from "../componentes/miscs/BotaoVoltarcadastro";
import CadastrarProjetoObras from "../componentes/cadastrar/CadastrarProjetoObras";
import CadastrarFiscaisGestores from "../componentes/cadastrar/CadastrarFiscaisGestores";
import CadastrarAnexo from "../componentes/cadastrar/CadastrarAnexo";
import CadastrarAditivo from "../componentes/cadastrar/CadastrarAditivo";
import CadastrarObraOpcao from "../componentes/cadastrar/CadastrarObraOpcao";
import CadastrarFoto from "../componentes/cadastrar/CadastrarFoto";
import CadastrarMedicao from "../componentes/cadastrar/CadastrarMedicao";

const CadastrarObras = () =>{
    return(
        <>
            <BotaoVoltarcadastro/>
            <CadastrarProjetoObras/>
            <CadastrarFiscaisGestores/>
            <CadastrarAnexo/>
            <CadastrarAditivo/>
            <CadastrarMedicao/>
            <CadastrarFoto/>
            <CadastrarObraOpcao/>
        </>
    )
}

export default CadastrarObras;