import React from "react";
import styles from "./TabelaAditivo.module.css";

import axios from "axios";
const ListarAditivo = (props) =>{

    const handleEditarClick = () => {
        // Aqui você pode chamar uma função para editar e passar os dados associados a esta linha
        props.onEditarClick({
          id: props.id,
          nomeAditivo: props.nomeAditivo,
          dataAssinaturaAditivo: props.dataAssinaturaAditivo,
          tipoAditivo: props.tipoAditivo,
          tipoCasoAditivo:props.tipoCasoAditivo,
          anoAditivo: props.anoAditivo,
          // ... outras props
        });
      };

    const Download = async () =>{
        try {
            const response = await axios.get(`${import.meta.url.VITE_REACT_APP_API_URL_ADITIVO}/Download/${props.id}`, { 
                responseType: 'arraybuffer', // Configura responseType para 'arraybuffer' para tratar a resposta como um buffer de bytes
            });

            const blob = new Blob([response.data], { type: 'application/pdf' }); //  'application/pdf' 

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

    return(
        <>
        <tr>
        <td className={styles.tabelaAditivoMeio}>{props.dataAssinaturaAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.nomeAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.tipoAditivo}</td>
        <td className={styles.tabelaAditivoMeio}>{props.tipoCasoAditivo}</td>
        <td className={styles.tabelaAditivoMeioDownload} onClick={Download}>Download</td>
        <td className={styles.tabelaAditivoMeioLink} onClick={handleEditarClick}>Editar</td>
        </tr>
        </>
    )
}

export default ListarAditivo;