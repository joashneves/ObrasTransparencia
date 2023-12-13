import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import InformacaoDaObra from "../componentes/detalheExibir/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/detalheExibir/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/detalheExibir/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/detalheExibir/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/detalheExibir/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/detalheExibir/DetalheHistoricoObras";
import DetalheFotoObras from "../componentes/detalheExibir/DetalheFotoObras";


import axios from "axios";

const ExibirOBras = () =>{

    const { id } = useParams();
    const [jsonData, setJsonData] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState({});
   
    const [numeroDetalhe, setNumeroDetalhe] = useState();
    
    useEffect(() => {
      const Adquirirdados = async () => {
        try {
          const response = await axios.get('https://localhost:7031/api/Obras/');
          const dadosRecebidos = response.data;
          setJsonData(dadosRecebidos);
  
          const obraEncontrada = dadosRecebidos.find((obra) => obra.id == id);
  
          if (obraEncontrada) {
            setObraSelecionada(obraEncontrada);

          } 
        } catch (err) {
          console.log("Erro", err);
          
        }
      };
  
      Adquirirdados();
    }, [id]); // Adiciona título da obra como dependência

  return(
      <>
   
       <DetalheSobreObras numeroDetalhes={obraSelecionada.numeroDetalhe}
  situacaoDetalhes={obraSelecionada.situacaoDetalhe}
  dataPublicacaoDetalhes={obraSelecionada.publicacaoData}
    prefeituraObrasDetalhes={obraSelecionada.orgaoPublicoDetalhe}
          tipoObraDetalhes={obraSelecionada.tipoObraDetalhe}
            valorPagoObraDetalhes={obraSelecionada.valorPagoDetalhe}
              contratadaObraDetalhes={obraSelecionada.nomeContratadaDetalhe}
              
              inicioObraDetalhes={obraSelecionada.Inicio}
              previsaoConclusaoDetalhes={obraSelecionada.previsaoConclusaoDetalhe}
              formaExecucaoDetalhes={obraSelecionada.formaExecucaoDetalhe}
              descricaoObraDetalhes={obraSelecionada.Inicio}
              localizacaoObraDetalhes={obraSelecionada.localizacaoobraDetalhe}
              nomeContratadaObraDetalhes={obraSelecionada.nomeContratadaDetalhe}
              cnpjContratadaObraDetalhes={obraSelecionada.cnpjContratadaObraDetalhe}
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
      <DetalheFotoObras/>
      
      </>
  )
}

export default ExibirOBras;