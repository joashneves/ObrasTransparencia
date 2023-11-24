
import React, {useState} from "react";
import styles from "./FormularioBuscarObrasTransparencia.module.css";

function FormularioBuscarObrasTransparencia (props){
    const [situacaoSelecionada, setSituacaoSelecionada] = useState("");

    const filtrarBusca = async(event) =>{
        
        const buscar = event.target.Buscar.value;
        const situacao = situacaoSelecionada;
        const dataInicio = event.target.DataInicio.value;
        const dataFinal = event.target.DataFinal.value;
        const tipo = event.target.Tipo.value;
        const contratada = event.target.Contratada.value;
        const orgao = event.target.Orgao.value;
        
        props.realizarBuscaCallback(buscar, situacao,dataInicio, tipo, contratada, dataFinal, orgao);

        event.preventDefault();
    }
 

    return(
    <article className={styles.corDeFundoDosInputs}>
        <header className={styles.tituloDeFundo}><a>Buscar Obras</a></header>
        <form className={styles.organizarInputs} onSubmit={filtrarBusca}>
        
        <div><label>Buscar</label>
        <input className={styles.buscarInput} id="Buscar"></input></div>
        <div><label>Situação</label>
        <select className={styles.situacaoInput}
         id="Situacao"
         onChange={(e) => setSituacaoSelecionada(e.target.value)}
            value={situacaoSelecionada}>
            <option className={styles.situacaoInput}></option>
            <option className={styles.situacaoInput}>Concluída</option>
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