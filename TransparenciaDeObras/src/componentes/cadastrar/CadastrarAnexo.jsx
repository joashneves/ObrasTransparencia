import {useState, useEffect} from "react";
import styles from "./CadastrarAnexo.module.css"
import EnviarDocumento from "../EnviarDocumento";
import ButtonSalvar from "../ButtonSalvar";
import TabelaAnexo from "./tabela/TabelaAnexo";
import { useParams } from "react-router-dom";
import axios from "axios";


function CadastrarAnexo (){

    const {id} = useParams(); // Captura o paramentro da pagina
    const [idAnexo, setIdAnexo] = useState(); // Id do anexo

    const [nomeAnexo, setNomeAnexo] = useState();
    const [descricaoAnexo, setDescricaoAnexo] = useState();
    const [dataDocumento, setDataDocumetno] = useState();

    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [listarAnexo, setListaAnexo] = useState();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        console.log("dados: ", nomeAnexo, descricaoAnexo, dataDocumento)

        const dados = {
            "id": idAnexo,
            "id_obras": id,
            "nome": nomeAnexo,
            "descricao": descricaoAnexo,
            "dataDocumento": dataDocumento,
            "arquivo": "string",
            "caminhoDoArquivo": "string"
          }
          try {
            // Enviar as credenciais para a sua API usando o axios
            const response = await axios.post('https://localhost:7031/api/Anexoes/', dados);        
            window.alert('Cadastrado');
            window.location.reload();
        } catch (error) {
            console.log('Erro ao enviar!', error);
        }
    }

     // Adiquirir dados da API dos Anexos e filtra
     useEffect(() => {
        const Adquirirdados = async () => {
          try {
            const response = await axios.get('https://localhost:7031/api/Anexoes/');
            const dadosRecebidos = response.data;
            setJsonData(dadosRecebidos);
  
            const dadosAnexo = dadosRecebidos.find((obra) => obra.id_obra == id);
            
            console.log(dadosAnexo);
            if (dadosAnexo) {
            // Obtém o índice do último elemento
            const lastIndex = dadosRecebidos.length - 1;
  
            // Acessa o último objeto
            const ultimoObjeto = dadosRecebidos[lastIndex];
  
              setIdAnexo(ultimoObjeto.id+1) //Pega o ultimo item e coloca como mais um e coloca na variavel idAnexo
              console.log(ultimoObjeto.id)
              setListaAnexo(dadosAnexo);
              setLoading(false);
            } 
          } catch (err) {
            console.log("Erro", err);
            
          }
        };
    
        Adquirirdados();
      }, [id]); // Adiciona título da obra como dependência

    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Anexo</h1></div>
            <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
            <label>Nome* <input type="text" id="Name" name="Name" 
            className={styles.cadastrarNomeAnexo} 
            onChange={(e) => setNomeAnexo(e.target.value)}/></label>
            <label>Descrição *<input type="text" id="Descicao" name="Descicao" 
            className={styles.cadastrarDescricaoAnexo} 
            onChange={(e) => setDescricaoAnexo(e.target.value)} /></label>
            <label>Data Documento <input type="date" id="DataDocumento" name="DataDocumento" 
            className={styles.cadastrarDataDocumentoAnexo} 
            onChange={(e) => setDataDocumetno(e.target.value)} /></label>

            <div className={styles.enviarFormulario}>
            <EnviarDocumento/>
            <button type="submit" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}>Salvar</button></div>
            </form>
            <TabelaAnexo/>
        </article>
    )
}

export default CadastrarAnexo;