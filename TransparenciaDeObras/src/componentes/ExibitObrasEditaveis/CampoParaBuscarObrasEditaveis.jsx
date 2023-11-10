import Button from "../Button";
import styles from "./CampoParaBuscarObrasEditaveis.module.css";

function CampoParaBuscarObrasEditaveis (){
    return(
    <article className={styles.corDeFundoDosInputs}>
        <header className={styles.tituloDeFundo}><a>Buscar Obras</a></header>
        <form className={styles.organizarInputs}>
        
        <div><label>Buscar</label>
        <input className={styles.buscarInput}></input></div>
        
        <div><label>Numero</label>
        <input className={styles.dataFInalInput}></input></div>
       
        <div><label>Tipo de Obra</label>
        <input className={styles.tipoDeObraInput}></input></div>
        <div><label>Contratada</label>
        <input className={styles.contratadaInput}></input></div>
        <div><label>Publicado?</label>
        <select className={styles.situacaoInput}>
            <option className={styles.situacaoInput}>Sim</option>
            <option className={styles.situacaoInput}>Não</option>
           </select>
            </div>

        <div><Button/></div>
        </form>
        
    </article>)
}

export default CampoParaBuscarObrasEditaveis;