
import React, {useEffect, useState} from "react";
import styles from "./FormularioBuscarObrasTransparencia.module.css";

function FormularioBuscarObrasTransparencia ({
    onBuscarChange,
    onSituacaoChange,
    onTipoChange,
    onContratadaChange,
    onOrgaoChange
}){

    return(
    <article className={styles.corDeFundoDosInputs}>
        <header className={styles.tituloDeFundo}><a>Buscar Obras</a></header>
        <form className={styles.organizarInputs}>
        
        <div><label>Buscar</label>
        <input className={styles.buscarInput} id="Buscar" onChange={(e) => onBuscarChange(e.target.value)}></input></div>
        <div><label>Situação</label>
        <select className={styles.situacaoInput}
         id="Situacao"
         onChange={(e) => onSituacaoChange(e.target.value)}>
            <option value=""></option>
            <option value="Não iniciada">Não iniciada</option>
            <option value="Inicio">Inicio</option>
            <option value="Paralisada">Paralisada</option>
            <option value="Reinicio">Reinicio</option>
            <option value="Paralisada por recisão contratual">Paralisada por recisão contratual</option>
            <option value="Concluída">Concluída</option>
            <option value="Concluída e recebida provisoriamente">Concluída e recebida provisoriamente</option></select>
            </div>
        <div><label>Data Inicio</label>
        <input type="date" className={styles.dataInicioInput} id="DataInicio" onChange={(e) => onDataChange(e.target.value)}></input></div>
        <div><label>Tipo de Obra</label>
        <input className={styles.tipoDeObraInput} id="Tipo" onChange={(e) => onTipoChange(e.target.value)}></input></div>
        <div><label>Contratada</label>
        <input className={styles.contratadaInput} id="Contratada" onChange={(e) => onContratadaChange(e.target.value)}></input></div>
        <div><label>Data Final</label>
        <input type="date" className={styles.dataFInalInput} id="DataFinal"></input></div>
        <div><label>Orgão Publico</label>
        <input className={styles.orgaoPublicoInput} id="Orgao" onChange={(e) => onOrgaoChange(e.target.value)}></input></div>

        </form>
        
    </article>)
}

export default FormularioBuscarObrasTransparencia;