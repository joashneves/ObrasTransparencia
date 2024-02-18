import React from "react";
import styles from "./CriarPerfil.module.css"

const CriarPerfil = (props) =>{
    return(
        <article className={styles.fundoDePerfil}>
            <div className={styles.tituloDePerfil}><h1>Criar Perfil</h1></div>
            <div className={styles.formularioDePerfil}>
                <label>Nome do Perfil<input className={styles.perfilNome}></input></label>
                <label>Permissões<select className={styles.perfilPermissoes}>
                    <option>Tudo</option></select></label>
                <label>Hierarquia<input className={styles.perfilHierarquia} type="number"></input></label>
                <button className={styles.botaoNormal} >Salvar</button>
            </div>
            <div className={styles.centroPerfil}>
                <table className={styles.tabelaPerfisTopo} >
                <tr>
                    <th >Perfis</th>
                    </tr>
                    <tr>
                        <td className={styles.tabelaPerfisMeio}>{props.permissoesPerfil}</td>
                        <td className={styles.tabelaPerfisMeio}>a</td>
                    </tr>
                </table></div>
        </article>
    )
}

export default CriarPerfil;