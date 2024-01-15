import React, { useState, useEffect } from "react";
import FormularioBuscarObrasTransparencia from "../componentes/detalheExibir/FormularioBuscarObrasTransparencia";
import ExibirProjetoDeObras from "../componentes/detalheExibir/ExibirProjetoDeObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import axios from "axios";
import LeftCarret from "../assets/leftCarret.svg";
import RigthCarret from "../assets/rigthCarret.svg";
import styles from '../componentes/login/User.module.css';
import LoadingBar from "../componentes/miscs/LoadingBar";

let chamado = 0;

const Home = () => {
  // Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const [buscar, setBuscar] = useState();
  const [situacao , setSituacao] = useState();
  const [dataInicio, setDataInicio] = useState();
  const [tipo, setTipo] = useState();
  const [contratada, setContratada] = useState();
  const [dataFinal, setDataFinal] = useState();
  const [orgao, setOrgao]= useState();
  const [responseAPI, setResponseAPI] = useState({});

  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 15; // Defina a quantidade desejada de itens por página

  let UltimaPagina = paginaAtual;
 
  const Adquirirdados = async (event) => {
    try {
      const apiUrlObras = `${import.meta.env.VITE_REACT_APP_API_URL_OBRA_PUBLICADAS}?pageNumber=${paginaAtual}&pageQuantity=${itensPorPagina}`
      console.log(apiUrlObras);
      const response = await axios.get(apiUrlObras);
      const obrasData = response.data;
      console.log(obrasData);
      const dadosRecebidos = obrasData.filter((o) => o.publicadoDetalhe == true);
      setResponseAPI(response);
      setJsonData(dadosRecebidos);
      setLoading(false); // Indica que os dados foram carregados
      console.log("Status AXios", responseAPI.status);
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }



  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {

    if (
      (buscar && buscar.trim() !== "") ||
      (contratada && contratada.trim() !== "") ||
      (situacao && situacao.trim() !== "") ||
      (tipo && tipo.trim() !== "") 
      
    ) {
      const filtradoJson = jsonData.filter((obra) => {
        const nomeDetalheLowerCase = obra.nomeDetalhe ? obra.nomeDetalhe.toLowerCase() : "";
        const empresaContratadaLowerCase = obra.nomeContratadaDetalhe
          ? obra.nomeContratadaDetalhe.toLowerCase()
          : "";
        const situacaoDetalhe = obra.situacaoDetalhe ? obra.situacaoDetalhe.toString().toLowerCase() : "";
        const tipoObraDetalhe = obra.tipoObraDetalhe ? obra.tipoObraDetalhe.toLowerCase() : "";
        
  
        return (
          (buscar && nomeDetalheLowerCase.includes(buscar.toLowerCase())) ||
          (contratada &&
            empresaContratadaLowerCase.includes(contratada.toLowerCase())) ||
          (situacao && situacaoDetalhe.includes(situacao.toLowerCase())) ||
          (tipo && tipoObraDetalhe.includes(tipo.toLowerCase())) 
          
        );
      });
      setJsonData(filtradoJson);
    } else {
      // Se os campos estiverem vazios, carrega todos os dados novamente
    if(responseAPI.status != 200){
      Adquirirdados();
      } 
    }
  }, [
    buscar,
    situacao,
    dataInicio,
    tipo,
    contratada,
    orgao,
    jsonData,
  ]); 

    
  useEffect(() => {
    Adquirirdados();
  }, [paginaAtual])

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
      
      <FormularioBuscarObrasTransparencia  
      onBuscarChange={setBuscar}
      onSituacaoChange={setSituacao}
      onTipoChange={setTipo}
      onContratadaChange={setContratada}
      onOrgaoChange={setOrgao}
      />
      {loading ? (
        // Exibe um componente de carregamento enquanto os dados estão sendo carregados
        <LoadingBar/>
      ) : (
        // Renderiza os dados quando eles estiverem prontos
        Object.values(jsonData).map((data)=>{
          return (
            <ExibirProjetoDeObras
              key={data.id} // Certifique-se de ter uma chave única
              id={data.id}
              tituloObra={data.nomeDetalhe}
              porcentagemMedicao={data.Percentual}
              situacaoObra={data.situacaoDetalhe}
              dataPublicacao={converterDataFormato(data.publicacaoData)}
              prefeituraObras={data.orgaoPublicoDetalhe}
              tipoObra={data.tipoObraDetalhe}
              valorPagoObra={data.valorEmpenhado}
              contratadaObra={data.nomeContratadaDetalhe}
            />
          );
        })
      )}
              <div className={styles.botaoes}>            {/* Adicione controles de paginação, por exemplo: */}
            <img src={LeftCarret} alt="LeftCarret" className={styles.botao} onClick={() => setPaginaAtual((prevPage) => prevPage > 0 ? prevPage - 1 : prevPage)}/>
            <div className={styles.contador}>{paginaAtual}</div>
            <img src={RigthCarret} alt="RigthCarret" className={styles.botao} onClick={() => setPaginaAtual((prevPage) => prevPage + 1 )}/>
        </div>

    </>
  );
}

export default Home;