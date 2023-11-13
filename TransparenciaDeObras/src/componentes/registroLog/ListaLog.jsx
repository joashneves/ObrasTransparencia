import React from "react";
import styles from "./ListaLog.module.css"

const ListaLog = (props) =>{
    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaLogTopoEsquerda}>Horario</th>
                    <th className={styles.tabelaLogTopo}>Nome Completo</th>
                    <th className={styles.tabelaLogTopo}>Ação</th>
                    <th className={styles.tabelaLogTopo}>Em/Arquivo</th>
                    
                </tr>
                <tr>
                    <td className={styles.tabelaLogMeio}>{props.nomeLog}</td>
                    <td className={styles.tabelaLogMeio}>{props.nomeLog}</td>
                    <td className={styles.tabelaLogMeio}>{props.nomeLog}</td>
                    <td className={styles.tabelaLogMeio}>{props.nomeLog}</td>
                    
                </tr>
            </table>
        </div>
    )
}


export default ListaLog;