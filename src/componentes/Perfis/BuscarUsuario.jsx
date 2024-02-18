import React from "react";
import styles from "./BuscarUsuario.module.css"

const BuscarUsuario = (
    onNomeCompletoChange,
    onNomeUsuarioChange,
    onEmailChange) =>{
    return(
        
        <article className={styles.fundoDeUsuario}>
            <div className={styles.tituloDeUsuario}><h1>Buscar Usuario</h1></div>
            <div className={styles.formularioPesquisa}>
                <label >Nome Completo<input className={styles.usuarioNome} id="nomeCompleto" 
                onChange={(e) => onNomeCompletoChange(e.target.value)}></input></label>
                <label >Nome de Usuario<input className={styles.usuarioNomeCompleto} id="nomeUsuario" 
                onChange={(e) => onNomeUsuarioChange(e.target.value)}></input></label>
                <label >Email<input className={styles.usuarioPerfil} id="email" 
                onChange={(e) => onEmailChange(e.target.value)}></input></label>
            </div>
        </article>
        
    )
}

export default BuscarUsuario;