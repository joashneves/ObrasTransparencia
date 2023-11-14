import React from "react";
import { useParams } from "react-router-dom";

import InformacaoDaObra from "../componentes/detalheExibir/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/detalheExibir/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/detalheExibir/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/detalheExibir/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/detalheExibir/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/detalheExibir/DetalheHistoricoObras";

const ExibirOBras = () =>{
  const {situacao, dataPublicacao, orgaoPublico, tipoObra, valorPago, nomeContratada} = useParams();



  return(
      <>
       <DetalheSobreObras numeroDetalhes={situacao}
  situacaoDetalhes={situacao}
  dataPublicacaoDetalhes={dataPublicacao}
        prefeituraObrasDetalhes={orgaoPublico}
          tipoObraDetalhes={tipoObra}
            valorPagoObraDetalhes={valorPago}
              contratadaObraDetalhes={nomeContratada}/>
              
      <DetalheGestoresFiscaisObras/>
      <DetalheAnexoObras/>
      <DetalheMedicaoObras/>
      <DetalheAditivosObras/>
      <DetalheHistoricoObras/>
      </>
  )
}

export default ExibirOBras;