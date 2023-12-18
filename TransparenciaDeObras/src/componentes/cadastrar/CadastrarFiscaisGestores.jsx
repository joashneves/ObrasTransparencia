import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CadastrarFiscaisGestores.module.css";
import TabelaGestoresFiscais from "./tabela/TabelaGestoresFiscais";

import axios from "axios";

function CadastrarFiscaisGestores() {

  const { id } = useParams();
  const [idGestorFiscal, setIdGestorFiscal] = useState()

  const [nome, setNome] = useState();
  const [papel, setPapel] = useState();
  const [secretaria, setSecretaria] = useState();
  const [email, setEmail] = useState();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listaFiscalGestor, setListaFiscalGestor] = useState({});

  const [idLog, setIdLog] = useState(); // Id para config de log

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    const now = new Date();  // Obtém a data atual

    const dado = {
      "id": idGestorFiscal,
      "id_obras": id,
      "nome": nome,
      "papel": papel,
      "secretaria": secretaria,
      "email": email
    }
    // Recebe os dados do nome do usuario
    const nomeUsuario = window.sessionStorage.getItem('username');
    try {
      const responseGet = await axios.get('https://localhost:7067/FiscalGestor/');
      const dadosRecebidos = responseGet.data // Pega os dado da api

      const dadosExistente = dadosRecebidos.find((dados) => dados.id == idGestorFiscal); // Verifica se na lista possui um id parecido 

      if (dadosExistente) { // se existir atualiza
        const respondePut = await axios.put(`https://localhost:7067/FiscalGestor/${idGestorFiscal}`, dado);

        //Criar um objeto em formato de json para a ação de atualizar do usuario logado
        const dadosUsuario = {
          "id_obras": id,
          "nomeObra": nome,
          "nome": "Atualizado Gestor ou fiscal",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`https://localhost:7067/Historico`, dadosUsuario);

        window.alert('Atualizado!');
        setIdLog(idLog + 1);
        window.location.reload();
      } else {
        // Enviar as credenciais para a sua API usando o axios
        const responsePost = await axios.post('https://localhost:7067/FiscalGestor/', dado);
        
        //Criar um objeto em formato de json para a ação de criar do usuario logado
        const dadosUsuario = {
          "id_obras": id,
          "nomeObra": nome,
          "nome": "Criado Gestor ou fiscal",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`https://localhost:7067/Historico`, dadosUsuario);

        window.alert('Cadastrado');
        window.location.reload();
      }
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }

  }

  // Adiquirir dados da API dos Gestores ou fiscais
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get('https://localhost:7067/FiscalGestor/');
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const dadosGestorFiscal = dadosRecebidos.find((obra) => obra.id_obras == id);

        console.log(dadosGestorFiscal);
        if (dadosGestorFiscal) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdGestorFiscal(ultimoObjeto.id + 1)
          console.log(ultimoObjeto.id)
          setListaFiscalGestor(dadosGestorFiscal);
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
        const response = await axios.get('https://localhost:7067/Historico');
        const dadosRecebidos = response.data;

        // Verificar o ultimo ID da API e coloca mais um quanod criar um objeto
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

  // Ao clicar coloca os dados do que foi clicado
  const editarValoresDoGestorFiscal = (dados) => {
    console.log("esse é ", dados);
    setIdGestorFiscal(dados.id);
    setNome(dados.nome);
    setSecretaria(dados.secretaria);
    setPapel(dados.papel);
    setEmail(dados.email);
  }
  return (
    <article className={styles.fundoDeCadastro} >
      <div className={styles.tituloDeCadastro}><h1>Gestores e Fiscais</h1></div>
      <form onSubmit={handleSubmit} className={styles.formularioDeCadastro}>
        <input type="hidden" value={idGestorFiscal}></input>
        <label>Nome* <input type="text"
          id="nome"
          name="Nome"
          className={styles.cadastrarNomePapelFiscalGestor}
          value={nome}
          onChange={(e) => setNome(e.target.value)} /></label>
        <label>Papel *<select type="text"
          id="papel"
          name="Papel"
          className={styles.cadastrarPapelFiscalGestor}
          value={papel}
          onChange={(e) => setPapel(e.target.value)}>
          <option></option>
          <option>Fiscal Titular</option>
          <option>Fiscal Substituto</option>
          <option>Fiscal Técnico</option>
          <option>Fiscal Administrativo</option>
          <option>Fiscal Requisitante</option>
          <option>Outro Fiscal</option>
          <option>Gestor Titular</option>
          <option>Gestor Substituto</option>
          <option>Outro Gestor</option></select></label>
        <label>Secretaria <input type="text"
          id="secretaria"
          name="Secretaria"
          className={styles.cadastrarSecretariaPapelFiscalGestor}
          value={secretaria}
          onChange={(e) => setSecretaria(e.target.value)} /></label>
        <label>E-mail <input type="email"
          id="email"
          name="Email"
          className={styles.cadastrarEmailPapelFiscalGestor}
          value={email}
          onChange={(e) => setEmail(e.target.value)} /></label>
        <div>
          <button type="submit" className={styles.salvarFormulario}>Salvar</button>
        </div>
      </form>
      <div>
        {loading ? (<p></p>) : (<TabelaGestoresFiscais
          onEditarClick={editarValoresDoGestorFiscal} />)} </div>
    </article>
  )
}

export default CadastrarFiscaisGestores;