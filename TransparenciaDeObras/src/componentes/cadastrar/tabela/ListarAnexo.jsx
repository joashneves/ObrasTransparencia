import { useEffect, useState } from "react";
import styles from "./TabelaAnexo.module.css";
import axios from "axios";

const ListarAnexo = (props) => {
  
  const handleEditarClick = () => {
    // Aqui você pode chamar uma função para editar e passar os dados associados a esta linha
    props.onEditarClick({
      id: props.id,
      nome: props.nomeAnexo,
      descricao: props.descricaonexo,
      dataDocumento: props.dataAnexo,
      // ... outras props
    });
  };
  
    const Download = async () =>{
        try {
            const response = await axios.get(`https://localhost:7031/api/Adtivoes/${props.id}/download`, {
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
    <>
      <tr>
        <td className={styles.tabelaAnexoMeio}>{props.dataAnexo}</td>
        <td className={styles.tabelaAnexoMeio}>{props.nomeAnexo}</td>
        <td className={styles.tabelaAnexoMeio}>{props.descricaonexo}</td>
        <td className={styles.tabelaAnexoMeioDownload} onClick={Download}>Download</td>
        <td className={styles.tabelaAnexoMeioLink} onClick={handleEditarClick} >Editar</td>
      </tr>
    </>
  );
};

export default ListarAnexo;
