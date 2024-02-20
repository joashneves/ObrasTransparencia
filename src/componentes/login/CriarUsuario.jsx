import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CriarUsuario.module.css"
import BuscarLog from "../registroLog/BuscarLog";
import BuscarUsuario from "../Perfis/BuscarUsuario";
import ExibirUsuario from "./ExibirUsuario";
import ExcluirUsuario from "../Perfis/ExcluirUsuario";

const CriarUsuario = () => {

  const [idUser, setIdUser] = useState(0);

  const [nomeCompleto, setNomeCompleto] = useState();
  const [nomeUsuario, setNomeUSuario] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [isAdm, setIsAdm] = useState(false);
  const [isProjeto, setIsProjeto] = useState(false);
  const [isAnexo, setIsAnexo] = useState(false);
  const [isAditivo, setIsAditivo] = useState(false);
  const [isFiscalGestor, setIsFiscalGestor] = useState(false);
  const [isMedicao, setIsMedicao] = useState(false);
  const [isFoto, setIsFoto] = useState(false);
  const [isOpcao, setIsOpcao] = useState(false);
  // Achar ultimo ID de log e criar um mais novo

  const [excluir, setExcluir] = useState(false);
  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 10; // Defina a quantidade desejada de itens por página

  const [documentoSelecionado, setDocumentoSelecionado] = useState(null);

  const onEditarClick = (dadosDocumento) => {
    console.log("Usuario selecionado", dadosDocumento)
    setDocumentoSelecionado(dadosDocumento);
    console.log("dados user", documentoSelecionado);
    setIdUser(documentoSelecionado.id);
    setNomeCompleto(documentoSelecionado.nomeCompleto);
    setNomeUSuario(documentoSelecionado.nome);
    setEmail(documentoSelecionado.email);
    setIsAdm(Boolean(documentoSelecionado.isAdm));
    setIsProjeto(Boolean(documentoSelecionado.isCadastrarProjeto));
    setIsAnexo(Boolean(documentoSelecionado.isCadastrarAnexo));
    setIsAditivo(Boolean(documentoSelecionado.isCadastrarAditivo));
    setIsFiscalGestor(Boolean(documentoSelecionado.isCadastrarFiscalGestor));
    setIsMedicao(Boolean(documentoSelecionado.isCadastrarMedicao));
    setIsFoto(Boolean(documentoSelecionado.isCadastrarFoto));
    setIsOpcao(documentoSelecionado.isCadastrarOpcao);
    setExcluir(true);
    console.log(idUser);
  };



  const config = {
    headers: {
      'Accept': 'text/plain',
      'Authorization': `${import.meta.env.VITE_API_TOKEN}`,
    },
  };

  useEffect(() => {
    console.log("Valores atualizados:", {
      isAdm,
      isProjeto,
      isAnexo,
      isAditivo,
      isFiscalGestor,
      isMedicao,
      isFoto,
      isOpcao
    });
  }, [isAdm, isProjeto, isAnexo, isAditivo, isFiscalGestor, isMedicao, isFoto, isOpcao]);

  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER_PUBLICADAS}public?page=${paginaAtual}&pageSize=${itensPorPagina}`, config);
        const dadosRecebidos = response.data;
        // Verificar o ultimo ID da API e coloca mais um quando criar um objeto
        const dadosLog = dadosRecebidos.find((log) => log.id);

        console.log("log de dados encontrado", dadosLog);

        if (dadosLog) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdUser(ultimoObjeto.id + 1)

        }

      } catch (err) {
        console.log("Erro", err);

      }
    };

    Adquirirdados();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    //Criar um objeto em formato de json para Obras
    const dado = {
      "nome": nomeUsuario,
      "nomeCompleto": nomeCompleto,
      "email": email,
      "senha_hash": senha,
      "isAdm": isAdm,
      "isCadastrarProjeto": isProjeto,
      "isCadastrarAnexo": isAnexo,
      "isCadastrarAditivo": isAditivo,
      "isCadastrarFiscalGestor": isFiscalGestor,
      "isCadastrarMedicao": isMedicao,
      "isCadastrarFoto": isFoto,
      "isCadastrarOpcao": isOpcao
    };
    console.log(dado)
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_USER_PUBLICADAS}`);
      const dadosRecebidos = response.data;

      //Verificar se tem o usuario
      const existente = dadosRecebidos.find((user) => user.id == idUser);
      console.log("usuario existe", existente);
      if (existente) {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL_USER}/${existente.id}`, dado, config);

        window.alert('Atualizado!');
        window.location.reload();
      } else {
        // Enviar as credenciais para a sua API usando o axios
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL_USER}`, dado, config);

        window.alert('Cadastrado');
        window.location.reload();
      }

    } catch (error) {
      if(error.response && error.response.status === 409){
        window.alert("Usuario ja existe, escolha outro nome!");
      }else if(error.response && error.response.status == 500)
      {
        window.alert("erro no servidor!");
      }else{
        window.alert("erro!");
      }
      console.log('Erro ao enviar!', error);
    }

  };
  return (
    <>
      <article className={styles.fundoDePerfil} onSubmit={onSubmit}>
        <div className={styles.tituloDePerfil}><h1>Criar Usuario</h1></div>
        <form>
          <label>Nome completo<input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} /></label>
          <label>Nome Usuario<input type="text" value={nomeUsuario} onChange={(e) => setNomeUSuario(e.target.value)} /></label>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Senha<input type="password" onChange={(e) => setSenha(e.target.value)} /></label>
          <label>Aministrador?<input type="checkbox" checked={Boolean(isAdm)} onChange={(e) => setIsAdm(e.target.checked)} /></label>
          <label>Criar projeto?<input type="checkbox" checked={isProjeto} onChange={(e) => setIsProjeto(e.target.checked)} /></label>
          <label>Criar anexo?<input type="checkbox" checked={isAnexo} onChange={(e) => setIsAnexo(e.target.checked)} /></label>
          <label>Criar Aditivo?<input type="checkbox" checked={isAditivo} onChange={(e) => setIsAditivo(e.target.checked)} /></label>
          <label>Criar Fiscal Gestor?<input type="checkbox" checked={isFiscalGestor} onChange={(e) => setIsFiscalGestor(e.target.checked)} /></label>
          <label>Criar medição?<input type="checkbox" checked={isMedicao} onChange={(e) => setIsMedicao(e.target.checked)} /></label>
          <label>Criar Foto?<input type="checkbox" checked={isFoto} onChange={(e) => setIsFoto(e.target.checked)} /></label>
          <label>Criar senha?<input type="checkbox" checked={isOpcao} onChange={(e) => setIsOpcao(e.target.checked)} /></label>
          <input className={styles.botaoNormal} type="submit" value={"Cadastrar"} />
          {excluir ? (<ExcluirUsuario id={idUser}/>):(<></>)}
        </form>
      </article>
      <BuscarUsuario />
      <ExibirUsuario onEditarClick={onEditarClick} />
    </>
  )
}

export default CriarUsuario;