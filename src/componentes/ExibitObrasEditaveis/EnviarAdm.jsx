import React from "react";
import styles from "./BotaoCriarObra.module.css"

import {Link} from "react-router-dom";

const EnviarAdm = (props) =>{
    return (<Link className={styles.botaoCriarObra}to={`/adm` }>IR PARA ADM</Link>
    );
}

export default EnviarAdm;