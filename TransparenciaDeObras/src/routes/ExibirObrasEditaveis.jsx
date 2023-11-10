import React from "react";
import BotaoCriarObra from "../componentes/ExibitObrasEditaveis/botaoCriarObra";
import CampoParaBuscarObrasEditaveis from "../componentes/ExibitObrasEditaveis/CampoParaBuscarObrasEditaveis";
import SistemaListaDocumento from "../componentes/ExibitObrasEditaveis/SistemaListaDocumentos";

const ExibirObrasEditaveis = () =>{
    return (
        <>
        <BotaoCriarObra/>
        <CampoParaBuscarObrasEditaveis/>
        <SistemaListaDocumento/>
        </>
    )
}

export default ExibirObrasEditaveis;