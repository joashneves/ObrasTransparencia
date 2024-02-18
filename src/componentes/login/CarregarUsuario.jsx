import styles from "./User.module.css";

const CarregarUsuario = (props) =>{

    const handleEditarClick = () => {
       
        props.onEditarClick({
          id: props.id,
          nomeCompleto: props.nomeCompleto,
          nome: props.nome,
          email: props.email,
          isAdm : props.isAdm,
          isCadastrarProjeto : props.isCadastrarProjeto,
          isCadastrarAnexo : props.isCadastrarAnexo,
          isCadastrarAditivo : props.isCadastrarAditivo,
          isCadastrarFiscalGestor : props.isCadastrarFiscalGestor,
          isCadastrarMedicao : props.isCadastrarMedicao,
          isCadastrarFoto : props.isCadastrarFoto,
          isCadastrarOpcao : props.isCadastrarOpcao
        });
      };

    return (
        <>
          <tr>
            <td className={styles.tabelaUserMeio}>{props.nomeCompleto}</td>
            <td className={styles.tabelaUserMeio}>{props.nome}</td>
            <td className={styles.tabelaUserMeio}>{props.email}</td>
            <td className={styles.tabelaUserMeioLink} onClick={handleEditarClick} >Editar</td>
          </tr>
        </>
      );

}

export default CarregarUsuario;