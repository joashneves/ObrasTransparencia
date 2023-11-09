import React from "react";
import InformacaoDaObra from "../componentes/detalheExibir/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/detalheExibir/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/detalheExibir/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/detalheExibir/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/detalheExibir/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/detalheExibir/DetalheHistoricoObras";

const ExibirOBras = () =>{
    return(
        <>
         <DetalheSobreObras numeroDetalhes={"110"}
    situacaoDetalhes={"Andamento"}
    dataPublicacaoDetalhes={'17/11/2023'}
          prefeituraObrasDetalhes={'Prefeitura'}
            tipoObraDetalhes={'Rua'}
              valorPagoObraDetalhes={'1.350.31,00'}
                contratadaObraDetalhes={'W.M VASCONCELOS - ME'}/>
                
        <DetalheGestoresFiscaisObras/>
        <DetalheAnexoObras/>
        <DetalheMedicaoObras/>
        <DetalheAditivosObras/>
        <DetalheHistoricoObras/>
        </>
    )
}

export default ExibirOBras;