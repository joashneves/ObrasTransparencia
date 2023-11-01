import Button from "./Button";
import styles from "./FormularioBuscarObrasTransparencia.module.css";

function FormularioBuscarObrasTransparencia (){
    return(
    <article className={styles.corDeFundoDosInputs}>
        <header className={styles.tituloDeFundo}><a>Buscar Obras</a></header>
        <form className={styles.organizarInputs}>
        
        <div><label>Buscar</label>
        <input className={styles.buscarInput}></input></div>
        <div><label>Situação</label>
        <select className={styles.situacaoInput}>
            <option className={styles.situacaoInput}>Finalizado</option>
            <option className={styles.situacaoInput}>Parado</option>
            <option className={styles.situacaoInput}>Em andamento</option></select>
            </div>
        <div><label>Data Inicio</label>
        <input type="date" className={styles.dataInicioInput}></input></div>
        <div><label>Tipo de Obra</label>
        <input className={styles.tipoDeObraInput}></input></div>
        <div><label>Contratada</label>
        <input className={styles.contratadaInput}></input></div>
        <div><label>Data Final</label>
        <input type="date" className={styles.dataFInalInput}></input></div>
        <div><label>Orgão Publico</label>
        <input className={styles.orgaoPublicoInput}></input></div>

        <div><Button/></div>
        </form>
        
    </article>)
}

export default FormularioBuscarObrasTransparencia;