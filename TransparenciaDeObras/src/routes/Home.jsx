import React, {useEffect} from "react";
import FormularioBuscarObrasTransparencia from "../componentes/detalheExibir/FormularioBuscarObrasTransparencia";
import ExibirProjetoDeObras from "../componentes/detalheExibir/ExibirProjetoDeObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import jsonData from "./Dados.json"

const Home = () =>{
    const pesquisar = false;
    const filtrarObras = () =>{
      
    }
    return(<>
    
    <FormularioBuscarObrasTransparencia/>

    
    {jsonData.map((data) => {
      return <ExibirProjetoDeObras  
      tituloObra={data.Descricao}
      porcentagemMedicao={data.Percentual}
      situacaoObra={data.Situacao}
      dataPublicacao={data.Inicio}
      prefeituraObras={data.Secretaria}
      tipoObra={data.Tipo}
      valorPagoObra={data.ValorPago}
      contratadaObra={data.Contrato}
      />
    }) }

      
    </>)
}

export default Home;