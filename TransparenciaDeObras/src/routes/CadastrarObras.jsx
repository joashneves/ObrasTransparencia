import React from "react";
import CadastrarProjetoObras from "../componentes/cadastrar/CadastrarProjetoObras";
import CadastrarFiscaisGestores from "../componentes/cadastrar/CadastrarFiscaisGestores";
import CadastrarAnexo from "../componentes/cadastrar/CadastrarAnexo";
import CadastrarAditivo from "../componentes/cadastrar/CadastrarAditivo";
import CadastrarObraOpcao from "../componentes/cadastrar/CadastrarObraOpcao";
import CadastrarFoto from "../componentes/cadastrar/CadastrarFoto";

const CadastrarObras = () =>{
    return(
        <>
            <CadastrarProjetoObras/>
            <CadastrarFiscaisGestores/>
            <CadastrarAnexo/>
            <CadastrarAditivo/>
            <CadastrarFoto/>
            <CadastrarObraOpcao/>
        </>
    )
}

export default CadastrarObras;