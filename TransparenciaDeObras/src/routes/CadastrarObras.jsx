import React from "react";
import CadastrarProjetoObras from "../componentes/cadastrar/CadastrarProjetoObras";
import CadastrarFiscaisGestores from "../componentes/cadastrar/CadastrarFiscaisGestores";
import CadastrarAnexo from "../componentes/cadastrar/CadastrarAnexo";
import CadastrarAditivo from "../componentes/cadastrar/CadastrarAditivo";
import CadastrarObraOpcao from "../componentes/cadastrar/CadastrarObraOpcao";

const CadastrarObras = () =>{
    return(
        <>
            <CadastrarProjetoObras/>
            <CadastrarFiscaisGestores/>
            <CadastrarAnexo/>
            <CadastrarAditivo/>
            <CadastrarObraOpcao/>
        </>
    )
}

export default CadastrarObras;