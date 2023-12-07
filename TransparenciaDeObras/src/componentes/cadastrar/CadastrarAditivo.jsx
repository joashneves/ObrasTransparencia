import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import styles from "./CadastrarAditivo.module.css";
import ButtonSalvar from "../ButtonSalvar";
import TabelaAditivo from "./tabela/TabelaAditivo";

import axios from "axios";

function CadastrarAditivo(){

    const {id} = useParams(); // Captura o paramentro da pagina
    const [idAditivo, setIdAditivo] = useState(); // Id do Aditivo

    const [nomeAditivo, setNomeAditivo] = useState();
    const [descricaoAditivo, setDescricaoAditivo] = useState();
    const [anoAditivo, setAnoAditivo] = useState();
    const [dataDocumento, setDataDocumetno] = useState();
    const [tipoAditivo, setTipoAditivo ] = useState();
    const [tipoCaso, setTipoCaso] = useState();
    const [arquivo, setArquivo] = useState(null); // Adiciona um estado para o arquivo

    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [listarAditivo, setListaAditivo] = useState();

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const dados =  {
          "id": parseInt(idAditivo, 0),
          "id_obras": parseInt(id),
          "nome": nomeAditivo,
          "ano": parseInt(anoAditivo),
          "dataAssinatura": dataDocumento,
          "tipo": tipoCaso,
          "arquivo": "string"
        }
        console.log("Id do advito",dados);
    try {
      // Enviar as credenciais para a sua API usando o axios
      const response = await axios.post('https://localhost:7031/api/Adtivoes/', dados, {
        headers: {
          'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo como 'multipart/form-data'
        },
      });
            window.alert('Cadastrado');
            window.location.reload();
        } catch (error) {
            console.log('Erro ao enviar!', error);
        }
    }

    const handleFileChange = (event) => {
      // Atualiza o estado do arquivo quando o usuário seleciona um novo arquivo
      setArquivo(event.target.files[0]);
    }

     // Adiquirir dados da API dos Aditivos e filtra
     useEffect(() => {
        const Adquirirdados = async () => {
          try {
            const response = await axios.get('https://localhost:7031/api/Adtivoes/');
            const dadosRecebidos = response.data;
            setJsonData(dadosRecebidos);
  
            const dadosAditivo = dadosRecebidos.find((obra) => obra.id_obra == id);
            // Obtém o índice do último elemento
            const lastIndex = dadosRecebidos.length - 1;
  
            // Acessa o último objeto
            const ultimoObjeto = dadosRecebidos[lastIndex];
  
              setIdAditivo(ultimoObjeto.id+1) //Pega o ultimo item e coloca como mais um e coloca na variavel idAditivo
              console.log("id do ultimo",ultimoObjeto.id)
              setListaAditivo(dadosAditivo);
              setLoading(false);
            
          } catch (err) {
            console.log("Erro", err);
            
          }
        };
    
        Adquirirdados();
      }, [id]); // Adiciona título da obra como dependência
      
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Aditivo</h1></div>
            <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
            <label>Nome* <input type="text" id="User" 
            name="Name" 
            onChange={(e) => setNomeAditivo(e.target.value)}
            className={styles.cadastrarNomeAditivo} /></label>
            <label>Ano<input type="text" id="User" 
            name="Ano" 
            onChange={(e) => setAnoAditivo(e.target.value)}
            className={styles.cadastrarAnoAditivo} /></label>
            <label>Data da Assinatura <input type="text" id="User" 
            name="DataAssinatura" 
            onChange={(e) => setDataDocumetno(e.target.value)}
            className={styles.cadastrarDataAssinaturaAditivo} /></label>
            <label>Tipo* <input type="text" id="User" 
            name="Tipo" 
            onChange={(e) => setTipoAditivo(e.target.value)}
            className={styles.cadastrarTipoAditivo} /></label>
            <label>Tipo (caso aditivo) *<input type="text" id="User" 
            name="Aditivo" 
            onChange={(e) => setTipoCaso(e.target.value)}
            className={styles.cadastrarTipoDoAditivoAditivo} /></label>

            <div className={styles.enviarFormulario}>
            <label for="file" className={styles.enviarDocumento}>Enviar Aquivo</label>
            <input type="file" id="file" name="file" accept=".pdf" className={styles.esconderBotao} />

            <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button>
            </div>
            </form>
            <TabelaAditivo/>
        </article>
    )
}

export default CadastrarAditivo;