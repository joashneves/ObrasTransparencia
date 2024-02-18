import { useParams } from "react-router-dom";
import Button from "../Button";
import styles from "./CampoParaBuscarObrasEditaveis.module.css";
import { useState } from "react";

function CampoParaBuscarObrasEditaveis ({
    onBuscarChange,
    onNumeroChange,
    onTipoDeObraChange,
    onContratadaChange,
    onPublicadoChange,
  }){

    return(
    <article className={styles.corDeFundoDosInputs}>
        <header className={styles.tituloDeFundo}><a>Buscar Obras</a></header>
        <form className={styles.organizarInputs}>
        <div><label>Buscar</label>
        <input className={styles.buscarInput} onChange={(e) => onBuscarChange(e.target.value)}></input></div>
        <div><label>Numero</label>
        <input className={styles.dataFInalInput} onChange={(e) => onNumeroChange(e.target.value)}></input></div>
        <div><label>Tipo de Obra</label>
        <input className={styles.tipoDeObraInput}  onChange={(e) => onTipoDeObraChange(e.target.value)}></input></div>
        <div><label>Contratada</label>
        <input className={styles.contratadaInput} onChange={(e) => onContratadaChange(e.target.value)}></input></div>
        <div>
            </div>

        </form>
        
    </article>)
}

export default CampoParaBuscarObrasEditaveis;