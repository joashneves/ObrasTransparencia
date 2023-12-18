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
    const [medicaoSelecionada, setMedicaoLiquido] = useState();
    const [aditivioSelecionado, setAditivoSelecionado] = useState();

    const [aditivioPrazoInicial, setAditivoPrazoInicial] = useState();
    const [aditivioPrazoTotal, setAditivoPrazoTotal] = useState();
   
    const [numeroDetalhe, setNumeroDetalhe] = useState();
    const [valorEmpenhado, setValorEmpenhado] = useState();
    const [valorLiquidado, setValorLiquidado] = useState();

    
    
    useEffect(() => {
      const Adquirirdados = async () => {
        try {
          const response = await axios.get('https://localhost:7067/Obra/');
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

      const SomarValores = async () =>{
        try {
          // Calcula valor
          const responseAditivo = await axios.get('https://localhost:7067/Aditivo/');
          const responseMecaoe = await axios.get('https://localhost:7067/Medicao/');
          const dataAditivo = responseAditivo.data;
          const dataMecaoe = responseMecaoe.data;
          
          const primeiraAditivo = dataAditivo.find((obra) => obra.id_obras == id && obra.prazo != 0) || 0;
          
          // calcula valor empenhado
          let valorEmpenhadoAditivos = 0;
          const AditivoEncontrada = dataAditivo.filter((obra) => obra.id_obras == id);
          AditivoEncontrada.forEach(element => {
            const valorContratual = parseFloat(element.valorContratual);
            if (!isNaN(valorContratual)) {
              valorEmpenhadoAditivos += valorContratual;
              console.log("Valor empenhado em aditivo é :", valorContratual);
            }
          });
          // calcula valor pago
          let valorEmpenhadoMecaoes = 0;
          const MecaoeEncontrada = dataMecaoe.filter((obra) => obra.id_obras == id);
          MecaoeEncontrada.forEach((element) => {
            const valorPago = parseFloat(element.valorPago);
            if (!isNaN(valorPago)) {
              valorEmpenhadoMecaoes += valorPago;
              console.log("Valor empenhado em Mecaoe é :", valorPago);
            }
          });

          // calcula valor liquidado 
          let valorMedidoMecaoes = 0;
        MecaoeEncontrada.forEach((element) => {
          const valorMedido = parseFloat(element.valorMedido);
          if (!isNaN(valorMedido)) {
            valorMedidoMecaoes += valorMedido;
            console.log("Valor liquidado em Mecaoe é :", valorMedido);
          }
        });
          // calcula prazos do dia 
          let prazoDiasAditivos = 0;
          // calcula valor empenhado
          AditivoEncontrada.forEach(element => {
              const Aditivodias = parseFloat(element.prazo);
              if (!isNaN(Aditivodias)) {
                prazoDiasAditivos += Aditivodias;
                console.log("Valor empenhado em aditivo é :", Aditivodias);
              }
            }); 

          // Valor Prazo
          setAditivoPrazoTotal(prazoDiasAditivos)
            
          // Valor pago
          setValorEmpenhado(valorEmpenhadoAditivos + valorEmpenhadoMecaoes);

          //Valor liquido
          setValorLiquidado(valorMedidoMecaoes);

          // Calcula prazo
          setAditivoPrazoInicial(primeiraAditivo.prazo);

        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      };
      SomarValores();
      

      Adquirirdados();
    }, [id]); // Adiciona título da obra como dependência

  return(
      <>
   
       <DetalheSobreObras numeroDetalhes={obraSelecionada.numeroDetalhe}
  situacaoDetalhes={obraSelecionada.situacaoDetalhe}
  dataPublicacaoDetalhes={obraSelecionada.publicacaoData}
    prefeituraObrasDetalhes={obraSelecionada.orgaoPublicoDetalhe}
          tipoObraDetalhes={obraSelecionada.tipoObraDetalhe}
            valorPagoObraDetalhes={valorEmpenhado}
              contratadaObraDetalhes={obraSelecionada.nomeContratadaDetalhe}
              
              localizacaoObraDetalhes={obraSelecionada.localizacaoobraDetalhe}
              nomeContratadaObraDetalhes={obraSelecionada.nomeContratadaDetalhe}
              cnpjContratadaObraDetalhes={obraSelecionada.cnpjContratadaObraDetalhe}
              licitacaoObraDetalhes={obraSelecionada.licitacao}
              contratoObraDetalhes={obraSelecionada.contrato}
              prazoInicialObraDetalhes={aditivioPrazoInicial}
              prazoTotalObraDetalhes={aditivioPrazoTotal}
              valorEmpenhadoObraDetalhes={valorEmpenhado}
              valorLiquidadoObraDetalhes={valorLiquidado}
              />
              
      <DetalheGestoresFiscaisObras/>
      <DetalheAnexoObras/>
      <DetalheMedicaoObras/>
      <DetalheAditivosObras/>
      <DetalheFotoObras/>
      
      </>
  )
}

export default ExibirOBras;