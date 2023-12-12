import React from "react";
import styles from "./BotaoCriarObra.module.css"

import {Link} from "react-router-dom";

const BotaoCriarObra = (props) =>{
    return (<Link className={styles.botaoCriarObra}to={`/cadastrar/${props.id}` }>CADASTRAR OBRA</Link>
    );
}

export default BotaoCriarObra;