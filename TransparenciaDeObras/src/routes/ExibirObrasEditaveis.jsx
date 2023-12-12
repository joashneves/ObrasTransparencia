import React, { useEffect, useState } from "react";
import BotaoCriarObra from "../componentes/ExibitObrasEditaveis/botaoCriarObra";
import CampoParaBuscarObrasEditaveis from "../componentes/ExibitObrasEditaveis/CampoParaBuscarObrasEditaveis";
import SistemaListaDocumento from "../componentes/ExibitObrasEditaveis/SistemaListaDocumentos";

const ExibirObrasEditaveis = () => {
  const [buscar, setBuscar] = useState();
  const [numero, setNumero] = useState();
  const [tipoDeObra, setTipoDeObra] = useState();
  const [contratada, setContratada] = useState();
  const [publicado, setPublicado] = useState();
    console.log(publicado)

  return (
    <>
      <BotaoCriarObra />
      <CampoParaBuscarObrasEditaveis
        onBuscarChange={setBuscar}
        onNumeroChange={setNumero}
        onTipoDeObraChange={setTipoDeObra}
        onContratadaChange={setContratada}
        onPublicadoChange={setPublicado}
      />
      <SistemaListaDocumento nome={buscar}
      empresaContratada={contratada}
      numero={numero}
      tipoDeObra={tipoDeObra}
      publicado={publicado}/>
    </>
  );
};

export default ExibirObrasEditaveis;
