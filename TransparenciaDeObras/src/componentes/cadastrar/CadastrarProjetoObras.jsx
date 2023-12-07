import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./CadastrarProjetoObras.module.css";
import axios from "axios";



function CadastrarProjetoObras() {
  const history = useNavigate();

  const [idObra, setIdObra] = useState();
  const [jsonData, setJsonData] = useState({});

  const [nomeDetalhe, setNomeDetalhe] = useState();
  const [situcaoDetalhe, setSitucaoDetalhe] = useState();
  const [numeroDetalhe, setNumeroDetalhe] = useState();
  const [publicadoDetalhe, setPublicadoDetalhe] = useState();
  const [publicacaoData, setPublicacaoData] = useState(null);
  const [orgaoPublicoDetalhe, setOrgaoPublicoDetalhe] = useState();
  const [anoDetalhe, setAnoDetalhe] = useState();
  const [tipoObraDetalhe, setTipoObraDetalhe] = useState();
  const [localDetalhe, setLocalDetalhe] = useState();
  const [valorPagoDetalhe, setValorPagoDetalhe] = useState();
  const [nomeContratadaDetalhe, setNomeContratadaDetalhe] = useState();
  const [cnpjContratadaDetalhe, setCnpjContratadaDetalhe] = useState();

      // Adiquirir dados da API dos Gestores ou fiscais
      useEffect(() => {
        const Adquirirdados = async () => {
          try {
            const response = await axios.get('https://localhost:7031/api/Obras/');
            const dadosRecebidos = response.data;
            setJsonData(dadosRecebidos);
  
            const dadosObras = dadosRecebidos.find((obra) => obra.id);
            
            console.log(dadosObras);
            if (dadosObras) {
            // Obtém o índice do último elemento
            const lastIndex = dadosRecebidos.length - 1;
  
            // Acessa o último objeto
            const ultimoObjeto = dadosRecebidos[lastIndex];
  
            setIdObra(ultimoObjeto.id+1)
            console.log(ultimoObjeto.id)
            } 
          } catch (err) {
            console.log("Erro", err);
            
          }
        };
    
        Adquirirdados();
      }, [idObra]); // Adiciona título da obra como dependência
  
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    // Obtém a data atual
    const now = new Date();

    // Obtém o dia, mês e ano
    const dia = now.getDate().toString().padStart(2, '0'); // adiciona zero à esquerda se for menor que 10
    const mes = (now.getMonth() + 1).toString().padStart(2, '0'); // o mês é baseado em zero, por isso é necessário adicionar 1
    const ano = now.getFullYear();

    // Formata a data como string no formato "dd/mm/aaaa"
    const publicacaoData = `${dia}/${mes}/${ano}`;

    // Envie a `formattedDate` para onde você precisar
    console.log(publicacaoData);

    const dado = {
      "id": idObra,
      "nomeDetalhe": nomeDetalhe,
      "numeroDetalhe": numeroDetalhe,
      "situacaoDetalhe": situcaoDetalhe,
      "publicadoDetalhe": false,
      "publicacaoData": publicacaoData,
      "orgaoPulicoDetalhe": orgaoPublicoDetalhe,
      "tipoObraDetalhe": tipoObraDetalhe,
      "valorPagoDetalhe": valorPagoDetalhe,
      "nomeContratadaDetalhe": nomeContratadaDetalhe,
      "inicioObraDetalhe": 0,
      "previsaoConclusaoDetalhe": 0,
      "formaExecucaoDetalhe": "string",
      "localizacaoobraDetalhe": localDetalhe,
      "cnpjContratadaObraDetalhe": cnpjContratadaDetalhe,
      "prazoInicialObraDetalhe": 0,
      "prazoTotalObraDetalhe": 0,
      "valorEmpenhadoObraDetalhe": 0,
      "valorLiquidadoObraDetalhe": 0
    };

    try {
      // Enviar as credenciais para a sua API usando o axios
      const response = await axios.post('https://localhost:7031/api/Obras/', dado);
      window.alert('Cadastrado');
      history('/procurarObra');

    } catch (error) {
      console.log('Erro ao enviar!', error);
    }

  };

  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Cadastrar Obra</h1></div>
      <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
        <label>Nome* <input type="text"
          id="User"
          name="Name"
          className={styles.cadastrarNome}
          onChange={(e) => setNomeDetalhe(e.target.value)} /></label>
        <div >
          <label >Situação *</label>
          <select className={styles.situacaoInput}
            id="Situacao"
            name="Situacao"
            onChange={(e) => setSitucaoDetalhe(e.target.value)}>
            <option className={styles.situacaoInput}></option>
            <option className={styles.situacaoInput}>Concluída</option>
            <option className={styles.situacaoInput}>Parado</option>
            <option className={styles.situacaoInput}>Em andamento</option>
            <option className={styles.situacaoInput}>Execução</option></select>
        </div>
        <label>Numero <input type="text"
          id="User"
          name="Numero"
          className={styles.cadastrarNumero}
          onChange={(e) => setNumeroDetalhe(e.target.value)} /></label>
        <label>Tipo da Obra <input type="text"
          id="User"
          name="TipoDaObra"
          className={styles.cadastrarTipoObra}
          onChange={(e) => setTipoObraDetalhe(e.target.value)} /></label>
        <label>Ano <input type="text"
          id="User"
          name="Ano"
          className={styles.cadastrarAno}
          onChange={(e) => setAnoDetalhe(e.target.value)} /></label>
        <div></div>
        <label>Orgão Publico <input type="text"
          id="User"
          name="OrgaoPublico"
          className={styles.cadastrarOrgãoPublico}
          onChange={(e) => setOrgaoPublicoDetalhe(e.target.value)} /></label>
        <label>Local <input type="text"
          id="User"
          name="Local"
          className={styles.cadastrarLocal}
          onChange={(e) => setLocalDetalhe(e.target.value)} /></label>
        <div></div>
        <label>Nome da Contratada *<input type="text"
          id="User"
          name="NomeContratada"
          className={styles.cadastrarNomeContratada}
          onChange={(e) => setNomeContratadaDetalhe(e.target.value)} /></label>
        <label>CNPJ da Contratada * <input type="text"
          id="User"
          name="CNPJContratada"
          className={styles.cadastrarCNPJContratada}
          onChange={(e) => setCnpjContratadaDetalhe(e.target.value)} /></label>

        <button type="submit" className={styles.salvarFormulario} >Cadastrar</button>
      </form>
    </article>
  )
}

export default CadastrarProjetoObras;