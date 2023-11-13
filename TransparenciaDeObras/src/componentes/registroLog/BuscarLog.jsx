import React from "react";
import styles from "./BuscarLog.module.css"
import Button from "../Button";

const BuscarLog = () =>{
    return(
        <article className={styles.fundoDeLog}>
            <div className={styles.tituloDeLog}><h1>Buscar Log</h1></div>
            <div className={styles.formularioPesquisa}>
                <label >Nome<input className={styles.logNome}></input></label>
                <label >Ação<input className={styles.logAcao}></input></label>
                <label >Data<input className={styles.logData}></input></label>
                <label >Arquivo<input className={styles.logArquivo}></input></label>
                <Button/>
            </div>
        </article>
    )
}

export default BuscarLog;