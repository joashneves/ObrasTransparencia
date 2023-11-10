import React from "react";
import styles from "./CadastrarFoto.module.css"


import imagemNaoEncontrada from 'C:\\Users\\joas.neves\\Documents\\Prefeitura\\Obras\\TransparenciaDeObras\\src\\assets\\images.png';

function CadastrarFoto(){
    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Fotos</h1></div>
            <div className={styles.organizacaoFoto}>
            <div><label for="file" className={styles.enviarDocumento}>Enviar Aquivo</label>
            <input type="file" id="file" name="file" accept=".png" className={styles.esconderBotao} /></div>
            </div>
            <div className={styles.fotosDisponiveis}>
            </div>
        </article>
    )
}

export default CadastrarFoto;