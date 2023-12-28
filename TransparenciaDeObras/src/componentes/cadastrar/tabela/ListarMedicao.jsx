import { useEffect, useState } from "react";
import styles from "./TabelaMedicao.module.css";
import axios from "axios";

const ListarMedicao = (props) => {
  
  const handleEditarClick = () => {
    // Aqui você pode chamar uma função para editar e passar os dados associados a esta linha
    props.onEditarClick({
      id: props.idMedicao,
      nomeMedicao: props.nomeMedicao,
      dataInicio: props.dataInicio,
      dataFinal: props.dataFinal,
      porcentagem: props.porcentagem,
      valorPago: props.valorPago,
      valorMedido: props.valorMedido
      // ... outras props
    });
  };

  const Download = async () =>{
    try {
        const response = await axios.get(`https://localhost:7067/Medicao/Download/${props.idMedicao}`, {
            responseType: 'arraybuffer', // Configura responseType para 'arraybuffer' para tratar a resposta como um buffer de bytes
        });

        const blob = new Blob([response.data], { type: 'application/pdf' }); // Substitua 'application/pdf' pelo tipo MIME correto se necessário

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = props.Anexo; 
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
        <td className={styles.tabelaMedicaoMeio}>{props.dataInicio}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.dataFinal}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.nomeMedicao}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorPago}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorMedido}</td>
        <td className={styles.tabelaMedicaoMeioDownload} onClick={Download}>Download</td>
        <td className={styles.tabelaMedicaoMeioLink} onClick={handleEditarClick} >Editar</td>
      </tr>
    </>
  );
};

export default ListarMedicao;
