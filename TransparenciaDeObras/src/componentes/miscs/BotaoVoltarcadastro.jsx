import React from "react";
import styles from "./BotaoVoltarCadastro.module.css";
import { Link } from "react-router-dom";

const BotaoVoltarcadastro = () => {

    return(
        <>
        <Link className={styles.botaoVoltar} to={"/procurarObra"}></Link>
        </>
    )
}

export default BotaoVoltarcadastro;