import React from "react";
import styles from "./BotaoCriarObra.module.css"

import {Link} from "react-router-dom";

const BotaoCriarObra = (props) =>{
    return (<Link className={styles.projecaoDeObraInicial} to={`/cadastrar/${props.id}` }>
        <input type="button" value="CADASTRAR OBRA" className={styles.botaoCriarObra}></input>
        </Link>
    );
}

export default BotaoCriarObra;