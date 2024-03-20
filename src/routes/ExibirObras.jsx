import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InformacaoDaObra from "../componentes/detalheExibir/InformacaoDaObra";
import DetalheAditivosObras from "../componentes/detalheExibir/DetalheAditivosObras";
import DetalheGestoresFiscaisObras from "../componentes/detalheExibir/DetalheGestoresFiscaisObras";
import DetalheMedicaoObras from "../componentes/detalheExibir/DetalheMedicaoObras";
import DetalheAnexoObras from "../componentes/detalheExibir/DetalheAnexoObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import DetalheHistoricoObras from "../componentes/detalheExibir/DetalheHistoricoObras";
import DetalheFotoObras from "../componentes/detalheExibir/DetalheFotoObras";


import axios from "axios";

const ExibirOBras = () => {

  const { id } = useParams();

  const history = useNavigate();

  const [jsonData, setJsonData] = useState([]);
  const [obraSelecionada, setObraSelecionada] = useState({});
  const [medicaoSelecionada, setMedicaoLiquido] = useState();
  const [aditivioSelecionado, setAditivoSelecionado] = useState();

  const [aditivioPrazoInicial, setAditivoPrazoInicial] = useState();
  const [aditivioPrazoTotal, setAditivoPrazoTotal] = useState();

  const [numeroDetalhe, setNumeroDetalhe] = useState();
  const [valorEmpenhado, setValorEmpenhado] = useState();
  const [valorLiquidado, setValorLiquidado] = useState();

  const [responseAPI, setResponseAPI] = useState({}); // verifica se o status da Api foi sucesso 

  let chamado = 0;
  useEffect(() => {
    if (responseAPI.status != 200){
    const Adquirirdados = async () => {
      try {

            const verificarLogin = `${import.meta.env.VITE_REACT_APP_API_URL_USER}/login`
            const response = await axios.get(urlApiObras);
            const validar = await axios.put(verificarLogin, dadosUser);
            const dataUser = response.data;

        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const obraEncontrada = dadosRecebidos.find((obra) => obra.id == id);

        setResponseAPI(response);
        if (obraEncontrada) {
          setObraSelecionada(obraEncontrada);

        }
        if (!obraEncontrada.publicadoDetalhe) {
          history("/");
        }
      } catch (err) {
        console.log("OPS");

      }
    };

    Adquirirdados();


  } // Fim da verificação de Status
  
  }, [id]); // Adiciona título da obra como dependência

  function converterDataFormato(dataISO) {
    const dataObj = new Date(dataISO);

    // Obtém o dia, mês e ano da data
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
    const ano = dataObj.getFullYear();

    // Monta a string no formato desejado
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada;
  }

  return (
    <>

      <DetalheSobreObras numeroDetalhes={obraSelecionada.numeroDetalhe}
        situacaoDetalhes={obraSelecionada.situacaoDetalhe}
        dataPublicacaoDetalhes={converterDataFormato(obraSelecionada.publicacaoData)}
        prefeituraObrasDetalhes={obraSelecionada.orgaoPublicoDetalhe}
        tipoObraDetalhes={obraSelecionada.tipoObraDetalhe}
        valorPagoObraDetalhes={obraSelecionada.valorEmpenhado}
        contratadaObraDetalhes={obraSelecionada.nomeContratadaDetalhe}

        localizacaoObraDetalhes={obraSelecionada.localizacaoobraDetalhe}
        nomeContratadaObraDetalhes={obraSelecionada.nomeContratadaDetalhe}
        cnpjContratadaObraDetalhes={obraSelecionada.cnpjContratadaObraDetalhe}
        licitacaoObraDetalhes={obraSelecionada.licitacao}
        contratoObraDetalhes={obraSelecionada.contrato}
        prazoInicialObraDetalhes={obraSelecionada.prazoInicial}
        
        prazoTotalObraDetalhes={obraSelecionada.prazoFinal}
        valorEmpenhadoObraDetalhes={obraSelecionada.valorEmpenhado}
        valorLiquidadoObraDetalhes={obraSelecionada.valorLiquidado}
      />

      <DetalheGestoresFiscaisObras />
      <DetalheAnexoObras />
      <DetalheMedicaoObras />
      <DetalheAditivosObras />
      <DetalheFotoObras />

    </>
  )
}

export default ExibirOBras;