import {useState} from "react";
import styles from "./CadastrarFiscaisGestores.module.css";
import TabelaGestoresFiscais from "./tabela/TabelaGestoresFiscais";

function CadastrarFiscaisGestores (){

    const [nome, setNome] = useState('');
    const [papel,setPapel] = useState('');
    const [secretaria, setSecretaria] = useState('');
    const [email, setEmail] = useState('');

    const enviarDadosGestoresFiscais = async (event) =>{
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    }

    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Gestores e Fiscais</h1></div>
            <div className={styles.formularioDeCadastro}>
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
            <label>E-mail <input type="text" 
            id="email" 
            name="Email" 
            className={styles.cadastrarEmailPapelFiscalGestor} 
            onChange={(e) => setEmail(e.target.value)} /></label>
            <div>
                <input type="submit" />
            </div>
            </div>
            <div><TabelaGestoresFiscais
                    nomeGestorFiscal={nome}
                    papelGestorFiscal={papel}
                    secretariaGestorFiscal={secretaria}
                    emailGestorFiscal={email}/></div>
        </article>
    )
}

export default CadastrarFiscaisGestores;