import React from "react";
import { useParams } from "react-router-dom";

import InformacaoDaObra from "../componentes/detalheExibir/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/detalheExibir/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/detalheExibir/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/detalheExibir/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/detalheExibir/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/detalheExibir/DetalheHistoricoObras";

import jsonData from "./Dados.json"

const ExibirOBras = () =>{
  const {tituloObra} = useParams();

  const obraSelecionada = jsonData.find((obra) => obra.Descricao === tituloObra);

  return(
      <>
       <DetalheSobreObras numeroDetalhes={obraSelecionada.Situacao}
  situacaoDetalhes={obraSelecionada.Situacao}
  dataPublicacaoDetalhes={obraSelecionada.Inicio}
        prefeituraObrasDetalhes={obraSelecionada.Secretaria}
          tipoObraDetalhes={obraSelecionada.Tipo}
            valorPagoObraDetalhes={obraSelecionada.ValorPago}
              contratadaObraDetalhes={obraSelecionada.Contrato}
              
              inicioObraDetalhes={obraSelecionada.Inicio}
              previsaoConclusaoDetalhes={obraSelecionada.Final}
              formaExecucaoDetalhes={obraSelecionada.Inicio}
              descricaoObraDetalhes={obraSelecionada.Inicio}
              localizacaoObraDetalhes={obraSelecionada.Inicio}
              nomeContratadaObraDetalhes={obraSelecionada.Inicio}
              cnpjContratadaObraDetalhes={obraSelecionada.Inicio}
              licitacaoObraDetalhes={obraSelecionada.Inicio}
              contratoObraDetalhes={obraSelecionada.Contrato}
              prazoInicialObraDetalhes={obraSelecionada.Inicio}
              prazoTotalObraDetalhes={obraSelecionada.Inicio}
              valorEmpenhadoObraDetalhes={obraSelecionada.ValorEmpenhado}
              valorLiquidadoObraDetalhes={obraSelecionada.ValorLiquidado}
              />
              
      <DetalheGestoresFiscaisObras/>
      <DetalheAnexoObras/>
      <DetalheMedicaoObras
      porcentagemMedicao={obraSelecionada.Percentual}/>
      <DetalheAditivosObras/>
      <DetalheHistoricoObras/>
      </>
  )
}

export default ExibirOBras;