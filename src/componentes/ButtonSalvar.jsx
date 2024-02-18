import styles from "./ButtonSalvar.module.css";

function ButtonSalvar(){
    return <input type="button" name="botaoSalvar" value="Salvar" className={styles.salvarFormulario}></input>
}

export default ButtonSalvar;