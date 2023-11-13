import Button from "../Button";
import styles from "./FormularioBuscarObrasTransparencia.module.css";

function FormularioBuscarObrasTransparencia (props){
    
    const filtrarBusca = async(event) =>{
        event.preventDefault();
        const situcao = event.target.Situacao.value;
        const dataInicio = event.target.DataInicio.value;
        const tipo = event.target.Tipo.value;
        const contratada = event.target.Contratada.value;
        
        
        return(situcao,dataInicio,tipo,contratada)
        
    }
 

    return(
    <article className={styles.corDeFundoDosInputs}>
        <header className={styles.tituloDeFundo}><a>Buscar Obras</a></header>
        <form className={styles.organizarInputs} onSubmit={filtrarBusca}>
        
        <div><label>Buscar</label>
        <input className={styles.buscarInput} id="Buscar"></input></div>
        <div><label>Situação</label>
        <select className={styles.situacaoInput} id="Situacao">
            <option className={styles.situacaoInput}>Finalizado</option>
            <option className={styles.situacaoInput}>Parado</option>
            <option className={styles.situacaoInput}>Em andamento</option>
            <option className={styles.situacaoInput}>Execução</option></select>
            </div>
        <div><label>Data Inicio</label>
        <input type="date" className={styles.dataInicioInput} id="DataInicio"></input></div>
        <div><label>Tipo de Obra</label>
        <input className={styles.tipoDeObraInput} id="Tipo"></input></div>
        <div><label>Contratada</label>
        <input className={styles.contratadaInput} id="Contratada"></input></div>
        <div><label>Data Final</label>
        <input type="date" className={styles.dataFInalInput} id="DataFinal"></input></div>
        <div><label>Orgão Publico</label>
        <input className={styles.orgaoPublicoInput} id="Orgao"></input></div>

        <div><button value="BUSCAR" className={styles.botaoNormal}/></div>
        </form>
        
    </article>)
}

export default FormularioBuscarObrasTransparencia;