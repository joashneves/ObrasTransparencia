import React from "react";
import styles from "./DetalheMedicaoObras.module.css";
import axios from "axios";

const DetalheMedicaoListaObras = (props) =>{

    const Download = async () =>{
        try {
            const response = await axios.get(`https://localhost:7067/Medicao/Download/${props.id}`, {
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

    return( <tr>
        <td className={styles.tabelaMedicaoMeio}>{props.dataInicio}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.dataFinal}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.nome}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorPago}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorMedido}</td>
        <td className={styles.tabelaMedicaoMeioVisualizar}><a onClick={Download}>download</a></td>
    </tr>)
}

export default DetalheMedicaoListaObras;