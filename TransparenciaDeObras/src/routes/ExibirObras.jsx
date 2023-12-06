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

    const { tituloObra } = useParams();
    const [jsonData, setJsonData] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState({});
   
    const [numeroDetalhe, setNumeroDetalhe] = useState();
    
    useEffect(() => {
      const Adquirirdados = async () => {
        try {
          const response = await axios.get('https://localhost:7031/api/Obras/');
          const dadosRecebidos = response.data;
          setJsonData(dadosRecebidos);
  
          const obraEncontrada = dadosRecebidos.find((obra) => obra.nomeDetalhe === tituloObra);
  
          if (obraEncontrada) {
            setObraSelecionada(obraEncontrada);

          } 
        } catch (err) {
          console.log("Erro", err);
          
        }
      };
  
      Adquirirdados();
    }, [tituloObra]); // Adiciona título da obra como dependência

     // Adiquirir dados da API dos Gestores ou fiscais
     const [listaFiscalGestor, setListaFiscalGestor] = useState({});
     useEffect(() => {
      const AdquirirdadosGestoresFiscais = async () => {
        try {
          const response = await axios.get('https://localhost:7031/api/GestorFiscals/');
          const dadosRecebidos = response.data;
          setJsonData(dadosRecebidos);
  
          const dadosGestorFiscal = dadosRecebidos.find((obra) => obra.id_obra == obraSelecionada.id);
          
          console.log(dadosGestorFiscal);
          if (dadosGestorFiscal) {
            setListaFiscalGestor(dadosGestorFiscal);
            setLoading(false);
          } 
        } catch (err) {
          console.log("Erro", err);
          
        }
      };
  
      AdquirirdadosGestoresFiscais();
    }, [obraSelecionada.id]); // Adiciona título da obra como dependência

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
              
      <DetalheGestoresFiscaisObras papel={listaFiscalGestor.papel}
        nome={listaFiscalGestor.nome}
          setor={listaFiscalGestor.secretaria}
            email={listaFiscalGestor.email}/>
      <DetalheAnexoObras/>
      <DetalheMedicaoObras
      porcentagemMedicao={obraSelecionada.Percentual}/>
      <DetalheAditivosObras/>
      <DetalheHistoricoObras/>
      
      </>
  )
}

export default ExibirOBras;