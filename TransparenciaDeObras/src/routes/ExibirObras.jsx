import React from "react";
import InformacaoDaObra from "../componentes/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/DetalheHistoricoObras";

const ExibirOBras = () =>{
    return(
        <>
        <DetalheSobreObras/>
        <DetalheGestoresFiscaisObras/>
        <DetalheAnexoObras/>
        <DetalheMedicaoObras/>
        <DetalheAditivosObras/>
        <DetalheHistoricoObras/>
        </>
    )
}

export default ExibirOBras;