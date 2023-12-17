import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styles from "./CadastrarFoto.module.css"

import axios from "axios";
import ExibirFoto from "./tabela/ExibirFoto";
function CadastrarFoto() {

  const { id } = useParams(); // Captura o paramentro da pagina
  const [idFoto, setIdFoto] = useState(0); // Id do Foto

  const [nomeFoto, setNomeFoto] = useState();
  const [arquivo, setArquivo] = useState(); // Adiciona um estado para o arquivo
  const inputRef = useRef();

  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [listarFoto, setListaFoto] = useState([]);

  const [idLog, setIdLog] = useState(); // Id para config de log

  const handleSubmit = async (event) => {
    event.preventDefault();
    const now = new Date();  // Obtém a data atual

    const fileInput = inputRef.current;
    setArquivo(fileInput.files[0]);

      // Recebe os dados do nome do usuario
      const nomeUsuario = window.sessionStorage.getItem('username');
    try {
      console.log("Valor do arquivo:", arquivo);
      const formData = new FormData();
      formData.append("id", idFoto);
      formData.append("id_obras", id);
      formData.append("nome", nomeFoto);
      formData.append("FotoArquivo", arquivo);

      console.log("dados arquivo", [...formData]);
      // Enviar as credenciais para a sua API usando o axios
      const response = await axios.post('https://localhost:7067/Foto', formData);

              
        //Criar um objeto em formato de json para a ação de criar do usuario logado
        const dadosUsuario = {
          "id": idLog,
          "id_obra": id,
          "nomeObra": nomeFoto,
          "nome": "Atribuido Foto",
          "nomePerfil": nomeUsuario,
          "dataHora": now
        }
        const responseUser = await axios.post(`https://localhost:7067/Historico`, dadosUsuario);


      window.alert('Cadastrado');
      window.location.reload();
    } catch (error) {
      console.log('Erro ao enviar!', error);
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setArquivo(e.target.files[0]);
    }
  };

  // Adiquirir dados da API dos Fotos e filtra
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get('https://localhost:7067/Foto');
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const dadosFoto = dadosRecebidos.find((obra) => obra.id_obra == id);
        // Obtém o índice do último elemento
        const lastIndex = dadosRecebidos.length - 1;

        // Acessa o último objeto
        const ultimoObjeto = dadosRecebidos[lastIndex];

        setIdFoto(ultimoObjeto.id + 1) //Pega o ultimo item e coloca como mais um e coloca na variavel idFoto
        console.log("id do ultimo da foto", ultimoObjeto.id)
        setListaFoto(dadosFoto);
        setLoading(false);

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

  
  return (
    <article className={styles.fundoDeCadastro}>
      <div className={styles.tituloDeCadastro}><h1>Fotos</h1></div>
      <form onSubmit={handleSubmit} className={styles.organizacaoFoto}>
        <label>Nome* <input type="text" id="User"
          name="Name"
          onChange={(e) => setNomeFoto(e.target.value)}
          className={styles.cadastrarNomeFoto} /></label>
        <div>
          <input type="file"
            id="file"
            name="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange} /></div>
        <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button>
      </form>
      <div className={styles.fotosDisponiveis}>
      </div>
      {loading ? (<></>) : (Object.values(jsonData).map((data) => {
        return (
          <ExibirFoto fotoId={data.id} />
        );
      })
      )}
    </article>
  )
}

export default CadastrarFoto;