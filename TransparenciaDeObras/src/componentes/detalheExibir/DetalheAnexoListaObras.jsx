import React from "react";

import styles from "./DetalheAnexoObras.module.css";
import axios from "axios";

import DetalheGestoresFiscaisListaObras from "./DetalheGestoresFiscaisListaObras";

const DetalheAnexoListaObras = (props) =>{

    const Download = async () =>{
        try {
            const response = await axios.get(`https://localhost:7067/Anexo/Download/${props.id}`, {
                responseType: 'arraybuffer', // Configura responseType para 'arraybuffer' para tratar a resposta como um buffer de bytes
            });
    
            const blob = new Blob([response.data], { type: 'application/pdf' }); // Substitua 'application/pdf' pelo tipo MIME correto se necessário
    
            const url = window.URL.createObjectURL(blob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = props.nomeAnexo; 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    
            window.URL.revokeObjectURL(url); // Limpa a URL do objeto Blob para liberar memória
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return (
        <tr>
            <td className={styles.tabelaAnexoMeio}>{props.dataPublicacao}</td>
            <td className={styles.tabelaAnexoMeio}>{props.nome}</td>
            <td className={styles.tabelaAnexoMeio}>{props.descricao}</td>
            <td className={styles.tabelaAnexoMeioVisualizar} ><a onClick={Download}>download</a></td>
        </tr>
    )
}

export default DetalheAnexoListaObras;