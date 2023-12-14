import { useParams } from "react-router-dom";
import styles from "./CadastrarMedicao.module.css";
import { useState, useEffect } from "react";
import ListarMedicao from "./tabela/ListarMedicao";
import TabelaMedicao from "./tabela/TabelaMedicao";

import axios from "axios";

const CadastrarMedicao = (props) => {
    const {id} = useParams();

    const [idMedicao, setIdMedicao]= useState(0);
    const [nomeMedicao, setNomeMedicao] = useState();
    const [dataInicio, setDataInicio]= useState();
    const [dataFinal, setDataFinal]= useState();
    const [porcentagem, setPorcentagem]= useState();
    const [valorPago, setValorPago]= useState();
    const [valorMedido, setValorMedido] = useState();

    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [listarMedicao, setListaMedicao] = useState();
  
    const [idLog, setIdLog] = useState(); // Id para config de log
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const now = new Date();  // Obtém a data atual
  
      const dataFormatadaInicio = formatarData(dataInicio);
      const dataFormatadaFinal = formatarData(dataFinal);
      // Recebe os dados do nome do usuario
      const nomeUsuario = window.sessionStorage.getItem('username');
      try {
          const dataMedicao =   {
              "id": idMedicao,
              "id_obras": id,
              "dataInicio": dataFormatadaInicio,
              "dataFinal": dataFormatadaFinal,
              "porcentagem": porcentagem,
              "valorPago": valorPago,
              "valorMedido": valorMedido,
              "nome": nomeMedicao
            }
            console.log("Valor do arquivo: Medicao", dataMedicao );
            
        const responseGet = await axios.get('https://localhost:7031/api/Medicaos/');
        const dadosRecebidos = responseGet.data // Pega os dado da api
  
        const dadosExistente = dadosRecebidos.find((dados) => dados.id == idMedicao); // Verifica se na lista possui um id parecido 
  
        if (dadosExistente) { // se existir atualiza
          
          // Enviar as credenciais para a sua API usando o axios
          const respondePut = await axios.put(`https://localhost:7031/api/Medicaos/${idMedicao}`, dataMedicao);
          
          //Criar um objeto em formato de json para a ação de atualizar do usuario logado
          const dadosUsuario = {
            "id": idLog,
            "id_obra": id,
            "nomeObra": nomeMedicao,
            "nome": "Atualizado Medição",
            "nomePerfil": nomeUsuario,
            "dataHora": now
          }
          const responseUser = await axios.post(`https://localhost:7031/api/Acoes/`, dadosUsuario);
  
          window.alert('Atualizado!');
          setIdLog(idLog + 1);
          window.location.reload();
        } else {
          const response = await axios.post('https://localhost:7031/api/Medicaos/', dataMedicao);
          const dadosUsuario = {
            "id": idLog,
            "id_obra": id,
            "nomeObra": nomeMedicao,
            "nome": "Criado medicção",
            "nomePerfil": nomeUsuario,
            "dataHora": now
          }
          const responseUser = await axios.post(`https://localhost:7031/api/Acoes/`, dadosUsuario);
  
          window.alert('Cadastrado');
          window.location.reload();
        }
      } catch (error) {
        console.log('Erro ao enviar!', error);
      }
    }
    const setEditarDocumento = (documentoSelecionado) => {
      const dataFormatadadataInicio = converterFormatoData(documentoSelecionado.dataInicio);
      const dataFormatadadataFinal = converterFormatoData(documentoSelecionado.dataFinal);

      setIdMedicao(documentoSelecionado.id);
      setNomeMedicao(documentoSelecionado.nomeMedicao);
      setDataInicio(dataFormatadadataInicio);
      setDataFinal(dataFormatadadataFinal);
      setPorcentagem(documentoSelecionado.porcentagem);
      setValorPago(documentoSelecionado.valorPago);
      setValorMedido(documentoSelecionado.valorMedido);
    }
  
    // Adiquirir dados da API das medições e filtra
    useEffect(() => {
      const Adquirirdados = async () => {
        try {
          const response = await axios.get('https://localhost:7031/api/Medicaos/');
          const dadosRecebidos = response.data;
          setJsonData(dadosRecebidos);
  
          const dadosMedicao = dadosRecebidos.find((obra) => obra.id_obra == id);
  
          console.log(dadosMedicao);
          if (dadosMedicao) {
            // Obtém o índice do último elemento
            const lastIndex = dadosRecebidos.length - 1;
  
            // Acessa o último objeto
            const ultimoObjeto = dadosRecebidos[lastIndex];
  
            setIdMedicao(ultimoObjeto.id + 1) //Pega o ultimo item e coloca como mais um e coloca na variavel idMedicao
            console.log("ultimo id do Medicao", ultimoObjeto.id)
            setListaMedicao(dadosMedicao);
            setLoading(false);
          }
        } catch (err) {
          console.log("Erro", err);
  
        }
      };
  
      Adquirirdados();
    }, [id]); // Adiciona título da obra como dependência
  
    
    // Achar ultimo ID de log e criar um mais novo
    useEffect(() => {
      const Adquirirdados = async () => {
        try {
          const response = await axios.get('https://localhost:7031/api/Acoes/');
          const dadosRecebidos = response.data;
  
          // Verificar o ultimo ID da API e coloca mais um quanod criar um objeto
          const dadosLog = dadosRecebidos.find((log) => log.id);
  
          if (dadosLog) {
            // Obtém o índice do último elemento
            const lastIndex = dadosRecebidos.length - 1;
  
            // Acessa o último objeto
            const ultimoObjeto = dadosRecebidos[lastIndex];
            setIdLog(ultimoObjeto.id + 1)
          }
  
        } catch (err) {
          console.log("Erro", err);
  
        }
      };
  
      Adquirirdados();
    }, [idLog]); // Adiciona título da obra como dependência
  
    
    const formatarData = (data) => {
      const dataObj = new Date(data);
      const dia = dataObj.getDate().toString().padStart(2, "0");
      const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
      const ano = dataObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
    };
  
    const converterFormatoData = (data) => {
      const [dia, mes, ano] = data.split("/");
      return `${ano}-${mes}-${dia}`;
    };
  
    return (
      <article className={styles.fundoDeCadastro}>
        <div className={styles.tituloDeCadastro}><h1>Medicao</h1></div>
        <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
          <label>Nome* <input type="text" id="Name" name="Name"
            className={styles.cadastrarNomeMedicao}
            value={nomeMedicao}
            onChange={(e) => setNomeMedicao(e.target.value)} /></label>
          <label>Data Inicial <input type="date" id="DataInicio" name="DataInicio"
            className={styles.cadastrarDataDocumentoMedicao}
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)} /></label>
        <label>Data Final <input type="date" id="DataFinal" name="DataFinal"
            className={styles.cadastrarDataDocumentoMedicao}
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)} /></label>
        <label>valor Pago* <input type="number" id="Name" name="Name"
            className={styles.cadastrarNomeMedicao}
            value={valorPago}
            onChange={(e) => setValorPago(e.target.value)} /></label>
        <label>valor Medido* <input type="number" id="Name" name="Name"
            className={styles.cadastrarNomeMedicao}
            value={valorMedido}
            onChange={(e) => setValorMedido(e.target.value)} /></label>
  
          <div className={styles.enviarFormulario}>
            
            <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button></div>
        </form>
        <TabelaMedicao
          onEditarClick={setEditarDocumento} />
      </article>
    )
  }
  
  export default CadastrarMedicao;