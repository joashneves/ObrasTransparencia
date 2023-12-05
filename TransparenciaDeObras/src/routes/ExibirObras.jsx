import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import InformacaoDaObra from "../componentes/detalheExibir/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/detalheExibir/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/detalheExibir/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/detalheExibir/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/detalheExibir/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/detalheExibir/DetalheHistoricoObras";

import axios from "axios";

const ExibirOBras = () =>{
  const {tituloObra} = useParams();
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [obraSelecionada, setObraSelecionada] = useState({})
  const Adquirirdados = async (event) =>{
    try{
      const response = await axios.get('https://localhost:7031/api/Obras/');
      
      const dadosRecebidos = response.data;
      
      console.log("Dados acessados", dadosRecebidos)
      setJsonData(dadosRecebidos);
      setObraSelecionada(jsonData.find((obra) => obra.nomeDetalhe === tituloObra));
      setLoading(false); // Indica que os dados foram carregados
    }catch(err){
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {
    Adquirirdados();
  }, []); // O array de dependências vazio assegura que o efeito seja executado apenas uma vez, equivalente a componentDidMount


  return(
      <>
      
       <DetalheSobreObras numeroDetalhes={obraSelecionada.numeroDetalhe}
  situacaoDetalhes={obraSelecionada.situacaoDetalhe}
  dataPublicacaoDetalhes={obraSelecionada.publicacaoData}
        prefeituraObrasDetalhes={obraSelecionada.orgaoPulicoDetalhe}
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
      </>
  )
}

export default ExibirOBras;