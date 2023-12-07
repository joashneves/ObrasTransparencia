import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import styles from "./CadastrarFiscaisGestores.module.css";
import TabelaGestoresFiscais from "./tabela/TabelaGestoresFiscais";

import axios from "axios";

function CadastrarFiscaisGestores (){

    const {id} = useParams();
    const [idGestorFiscal, setIdGestorFiscal] = useState()

    const [nome, setNome] = useState();
    const [papel,setPapel] = useState();
    const [secretaria, setSecretaria] = useState();
    const [email, setEmail] = useState();

    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [listaFiscalGestor, setListaFiscalGestor] = useState({});

    const handleSubmit = async (event) =>{
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
        
        const dado = {
            "id": idGestorFiscal,
            "id_obra": id,
            "nome": nome,
            "papel": papel,
            "secretaria": secretaria,
            "email": email
          }
          try {
            // Enviar as credenciais para a sua API usando o axios
            const response = await axios.post('https://localhost:7031/api/GestorFiscals/', dado);        
            window.alert('Cadastrado');
            window.location.reload();
        } catch (error) {
            console.log('Erro ao enviar!', error);
        }
        
    }

    // Adiquirir dados da API dos Gestores ou fiscais
    useEffect(() => {
      const Adquirirdados = async () => {
        try {
          const response = await axios.get('https://localhost:7031/api/GestorFiscals/');
          const dadosRecebidos = response.data;
          setJsonData(dadosRecebidos);

          const dadosGestorFiscal = dadosRecebidos.find((obra) => obra.id_obra == id);
          
          console.log(dadosGestorFiscal);
          if (dadosGestorFiscal) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdGestorFiscal(ultimoObjeto.id+1)
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


    return(
        <article className={styles.fundoDeCadastro} >
            <div  className={styles.tituloDeCadastro}><h1>Gestores e Fiscais</h1></div>
            <form onSubmit={handleSubmit} className={styles.formularioDeCadastro}>
            <label>Nome* <input type="text" 
            id="nome" 
            name="Nome" 
            className={styles.cadastrarNomePapelFiscalGestor}
            onChange={(e) => setNome(e.target.value)}/></label>
            <label>Papel *<input type="text" 
            id="papel" 
            name="Papel" 
            className={styles.cadastrarPapelFiscalGestor} 
            onChange={(e) => setPapel(e.target.value)}/></label>
            <label>Secretaria <input type="text" 
            id="secretaria" 
            name="Secretaria" 
            className={styles.cadastrarSecretariaPapelFiscalGestor} 
            onChange={(e) => setSecretaria(e.target.value)} /></label>
            <label>E-mail <input type="email" 
            id="email" 
            name="Email" 
            className={styles.cadastrarEmailPapelFiscalGestor} 
            onChange={(e) => setEmail(e.target.value)} /></label>
            <div>
                <button type="submit" className={styles.salvarFormulario}>Salvar</button>
            </div>
            </form>
            <div>
             {loading ? (<p></p>):(<TabelaGestoresFiscais/>)} </div>
        </article>
    )
}

export default CadastrarFiscaisGestores;