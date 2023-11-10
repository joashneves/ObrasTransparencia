import React from "react";
import styles from "./TabelaAditivo.module.css";

const TabelaAditivo = (props) =>{
    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaAditivoTopoEsquerdo}>Nome</th>
                    <th className={styles.tabelaAditivoTopo}>Data da assinatura</th>
                    <th className={styles.tabelaAditivoTopo}>Tipo</th>
                    <th className={styles.tabelaAditivoTopo}>Ano</th>
                    <th className={styles.tabelaAditivoTopo}>Tipo(aditivo)</th>
                    <th className={styles.tabelaAditivoTopoDireito}></th>
                </tr>
                <tr>
                    <td className={styles.tabelaAditivoMeio}>{props.nomeAditivo}</td>
                    <td className={styles.tabelaAditivoMeio}>{props.dataAssinaturaAditivo}</td>
                    <td className={styles.tabelaAditivoMeio}>{props.tipoAditivo}</td>
                    <td className={styles.tabelaAditivoMeio}>{props.anoAditivo}</td>
                    <td className={styles.tabelaAditivoMeio}>{props.tipoCasoAditivo}</td>
                    <td className={styles.tabelaAditivoMeio}>Editar</td>
                </tr>
            </table>
        </div>
    )
}

export default TabelaAditivo;