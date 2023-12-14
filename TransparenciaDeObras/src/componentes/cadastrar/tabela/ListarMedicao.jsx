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
  
  return (
    <>
      <tr>
        <td className={styles.tabelaMedicaoMeio}>{props.dataInicio}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.dataFinal}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.nomeMedicao}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorPago}</td>
        <td className={styles.tabelaMedicaoMeio}>{props.valorMedido}</td>
        <td className={styles.tabelaMedicaoMeioLink} onClick={handleEditarClick} >Editar</td>
      </tr>
    </>
  );
};

export default ListarMedicao;
