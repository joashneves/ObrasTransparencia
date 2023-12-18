import React from "react";
import axios from "axios";
import styles from "./DetalheAditivosObras.module.css";


const DetalheAditivosListaObras = (props) =>{
    
    const Download = async () =>{
        try {
            const response = await axios.get(`https://localhost:7067/Aditivo/Download/${props.id}`, {
                responseType: 'arraybuffer', // Configura responseType para 'arraybuffer' para tratar a resposta como um buffer de bytes
            });
    
            const blob = new Blob([response.data], { type: 'application/pdf' }); // Substitua 'application/pdf' pelo tipo MIME correto se necessário
    
            const url = window.URL.createObjectURL(blob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = props.nomeAnexo; // Substitua 'arquivo.pdf' pelo nome desejado do arquivo
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    
            window.URL.revokeObjectURL(url); // Limpa a URL do objeto Blob para liberar memória
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    return(
        <tr>
        <td className={styles.tabelaAditivosMeio}>{props.dataAssinatura}</td>
        <td className={styles.tabelaAditivosMeio}>{props.nome}</td>
        <td className={styles.tabelaAditivosMeio}>{props.ano}</td>
        <td className={styles.tabelaAditivosMeio}>{props.tipo}</td>
        <td className={styles.tabelaAditivosMeioVisualizar} ><a onClick={Download}>download</a></td>
        </tr>
    )
}

export default DetalheAditivosListaObras;