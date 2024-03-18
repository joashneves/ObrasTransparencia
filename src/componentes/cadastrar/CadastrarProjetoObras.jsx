import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./CadastrarProjetoObras.module.css";
import axios from "axios";



function CadastrarProjetoObras() {
  const history = useNavigate();
  const { id } = useParams();


  const [idObra, setIdObra] = useState();
  const [jsonData, setJsonData] = useState({});

  const [nomeDetalhe, setNomeDetalhe] = useState();
  const [situcaoDetalhe, setSitucaoDetalhe] = useState();
  const [numeroDetalhe, setNumeroDetalhe] = useState();
  const [publicadoDetalhe, setPublicadoDetalhe] = useState(false);
  const [orgaoPublicoDetalhe, setOrgaoPublicoDetalhe] = useState();
  const [contrato, setContrato] = useState();
  const [licitacao, setLicitacao] = useState();
  const [valorPagoDetalhe, setValorPagoDetalhe] = useState();
  const [anoDetalhe, setAnoDetalhe] = useState();
  const [tipoObraDetalhe, setTipoObraDetalhe] = useState();
  const [localDetalhe, setLocalDetalhe] = useState();
  const [nomeContratadaDetalhe, setNomeContratadaDetalhe] = useState();
  const [cnpjContratadaDetalhe, setCnpjContratadaDetalhe] = useState();

  const [idLog, setIdLog] = useState(); // Id para config de log

  // Adiquirir dados da API de obras 
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_OBRA}`);
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        // Verificar o ultimo ID da API e coloca mais um quanod criar um objeto
        const dadosObras = dadosRecebidos.find((obra) => obra.id);

        console.log(dadosObras);

        if (dadosObras) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdObra(ultimoObjeto.id + 1)
          console.log(ultimoObjeto.id)
        }

        // Verifica se o id da pagina ja existe na lista
        const obraExistente = dadosRecebidos.find((obra) => obra.id == id);
        console.log("Id da pagina", id)
        console.log("Id da test", dadosRecebidos.find((obra) => obra.id == id))
        // Se a obra ja existe
        if (obraExistente) {
          // Definir o ID da obra com base nos dados recebidos
          setIdObra(obraExistente.id);

          console.log("Essa obra existe", obraExistente)
          setNomeDetalhe(obraExistente.nomeDetalhe);
          setSitucaoDetalhe(obraExistente.situacaoDetalhe);
          setNumeroDetalhe(obraExistente.numeroDetalhe);
          setOrgaoPublicoDetalhe(obraExistente.orgaoPublicoDetalhe);
          setAnoDetalhe(obraExistente.anoDetalhe);
          setValorPagoDetalhe(obraExistente.valorLiquidado)
          setTipoObraDetalhe(obraExistente.tipoObraDetalhe);
          setLocalDetalhe(obraExistente.localizacaoobraDetalhe);
          setPublicadoDetalhe(obraExistente.publicadoDetalhe)
          setNomeContratadaDetalhe(obraExistente.nomeContratadaDetalhe);
          setCnpjContratadaDetalhe(obraExistente.cnpjContratadaObraDetalhe);
          setContrato(obraExistente.contrato);
          setLicitacao(obraExistente.licitacao);
        }

      } catch (err) {
        console.log("Erro", err);

      }
    };

    Adquirirdados();
  }, [idObra]); // Adiciona título da obra como dependência

  // Achar ultimo ID de log e criar um mais novo
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`); // Historico
        const dadosRecebidos = response.data;

        // Verificar o ultimo ID da API e coloca mais um quando criar um objeto
        const dadosLog = dadosRecebidos.find((log) => log.id);

        console.log("log de dados encontrado", dadosLog);

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    // Obtém a data atual
    const now = new Date();

    // Formata a data como string no formato "dd/mm/aaaa"
    const publicacaoData = now.toISOString();;

    // Envie a `formattedDate` para onde você precisar
    console.log(publicacaoData);
    //Criar um objeto em formato de json para Obras
    const dado = {
      "nomeDetalhe": nomeDetalhe,
      "numeroDetalhe": numeroDetalhe,
      "situacaoDetalhe": situcaoDetalhe,
      "publicadoDetalhe": publicadoDetalhe,
      "publicacaoData": publicacaoData,
      "orgaoPublicoDetalhe": orgaoPublicoDetalhe,
      "tipoObraDetalhe": tipoObraDetalhe,
      "nomeContratadaDetalhe": nomeContratadaDetalhe,
      "prazoInicial":0,
      "prazoFinal": 0,
      "valorEmpenhado": 0,
      "valorLiquidado": valorPagoDetalhe,
      "cnpjContratadaObraDetalhe": cnpjContratadaDetalhe,
      "anoDetalhe": anoDetalhe,
      "contrato": contrato,
      "licitacao": licitacao,
      "localizacaoobraDetalhe": localDetalhe
    };
    // Recebe os dados do nome do usuario
    const nomeUsuario = window.sessionStorage.getItem('username');
    console.log("Nome de usuario é", nomeUsuario);
    try {
      
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_OBRA}`); // Url Obra
      const dadosRecebidos = response.data;

      //Verificar se tem a obra
      const obraExistente = dadosRecebidos.find((obra) => obra.id == id);

      if (obraExistente) {

        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_OBRA}/${obraExistente.id}`, dado); // UrlObra


        //Criar um objeto em formato de json para a ação de atualizar do usuario logado
        const dadosUsuario = {
          "id": idLog,
          "id_obras": idObra,
          "nomeObra": nomeDetalhe,
          "nome": "Atualizado Obra",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // urlHistorico

        window.alert('Atualizado!');
        setIdLog(idLog + 1);
        
      
      } else {
        try{
        // Enviar as credenciais para a sua API usando o axios

        console.log("ENVIAR USER", dado)
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_OBRA}`, dado); // UrlObra

        //Criar um objeto em formato de json para a ação de criar do usuario logado
        const dadosUsuario = {
          "id": idLog,
          "id_obras": idObra,
          "nomeObra": nomeDetalhe,
          "nome": "Criado Obra",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_HISTORICO}`, dadosUsuario); // UrlHistorico

        window.alert('Cadastrado');
        history('/procurarObra');
      }catch (err){
        if(err.response.status == 400){
        window.alert('Preencha todas as informações');
        }
        else if (err.response.message == 'Network Error') {
          window.alert('Erro com servidor');
        }
        console.log('Erro ao enviar!', error);

      }

      }

    } catch (error) {
      console.log('Erro ao enviar!', error);
    }

  };

  const handleAnoChange = (e) => {
    // Remove caracteres não numéricos
    const numericValue = e.target.value.replace(/\D/g, '');
  
    // Limita o comprimento para 4 dígitos
    const truncatedValue = numericValue.slice(0, 4);
  
    // Garante que o valor seja um número positivo
    const positiveValue = Math.abs(parseInt(truncatedValue, 10));
  
    // Atualiza o estado
    setAnoDetalhe(positiveValue);
  };

  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Cadastrar Obra</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text"
          id="User"
          name="Name"
          className={styles.cadastrarNome}
          value={nomeDetalhe}
          onChange={(e) => setNomeDetalhe(e.target.value)} /></label>
        <label >Situação *
          <select className={styles.situacaoInput}
            id="Situacao"
            name="Situacao"
            value={situcaoDetalhe}
            onChange={(e) => setSitucaoDetalhe(e.target.value)}>
            <option value="">Selecione...</option>
            <option value="Não iniciada">Não iniciada</option>
            <option value="Inicio">Inicio</option>
            <option value="Paralisada">Paralisada</option>
            <option value="Reinicio">Reinicio</option>
            <option value="Paralisada por recisão contratual">Paralisada por rescisão contratual</option>
            <option value="Concluída">Concluída</option>
            <option value="Concluída e recebida provisoriamente">Concluída e recebida provisoriamente</option></select>
        </label>
        <label>Numero <input type="number"
          id="User"
          name="Numero"
          className={styles.cadastrarNumero}
          value={numeroDetalhe}
          onChange={(e) => setNumeroDetalhe(e.target.value)} /></label>
        <label>Tipo da Obra <input type="text" maxlength="255"
          id="User"
          name="TipoDaObra"
          className={styles.cadastrarTipoObra}
          value={tipoObraDetalhe}
          onChange={(e) => setTipoObraDetalhe(e.target.value)} /></label>
        <label>Local <input type="text" maxlength="255"
          id="User"
          name="Local"
          className={styles.cadastrarLocal}
          value={localDetalhe}
          onChange={(e) => setLocalDetalhe(e.target.value)} /></label>
        <label>Ano <input type="number"
          id="User"
          name="Ano"
          className={styles.cadastrarAno}
          value={anoDetalhe}
          onChange={handleAnoChange} /></label>
        <label>Orgão Publico <input type="text" maxlength="255"
          id="User"
          name="OrgaoPublico"
          className={styles.cadastrarOrgãoPublico}
          value={orgaoPublicoDetalhe}
          onChange={(e) => setOrgaoPublicoDetalhe(e.target.value)} /></label>
        <label>Nome da Contratada *<input type="text" maxlength="255"
          id="User"
          name="NomeContratada"
          className={styles.cadastrarNomeContratada}
          value={nomeContratadaDetalhe}
          onChange={(e) => setNomeContratadaDetalhe(e.target.value)} /></label>
        <label>CNPJ da Contratada * <input type="text" maxlength="255"
          id="User"
          name="CNPJContratada"
          className={styles.cadastrarCNPJContratada}
          value={cnpjContratadaDetalhe}
          onChange={(e) => setCnpjContratadaDetalhe(e.target.value)} /></label>
        <label>Contrato <input type="text" maxlength="255"
          id="Contrato"
          name="Contrato"
          className={styles.cadastrarCNPJContratada}
          value={contrato}
          onChange={(e) => setContrato(e.target.value)} /></label>
        <label>Licitação <input type="text" maxlength="255"
          id="Licitação"
          name="Licitação"
          className={styles.cadastrarCNPJContratada}
          value={licitacao}
          onChange={(e) => setLicitacao(e.target.value)} /></label>
        <label>Valor Liquidado <input type="number"
          id="User"
          name="valor pago"
          className={styles.cadastrarNumero}
          value={valorPagoDetalhe}
          onChange={(e) => setValorPagoDetalhe(e.target.value)} /></label>
        <div>
          <label>Publicado?</label> <input type="checkbox"
            id="User"
            name="Name"
            className={styles.cadastrarStatus}
            checked={publicadoDetalhe}
            onChange={(e) => setPublicadoDetalhe(e.target.checked)} /></div>
        <button type="submit" className={styles.salvarFormulario} >Cadastrar</button>
      </form>
    </article>
  )
}

export default CadastrarProjetoObras;