import React from "react";
import style from "./EnviarDocumento.module.css"

function EnviarDocumento(){
    return(<><label for="file" className={style.enviarDocumento}>Enviar Aquivo</label>
    <input type="file" id="file" name="file" accept=".pdf" className={style.esconderBotao} /></>)
}

export default EnviarDocumento;