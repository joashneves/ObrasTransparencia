import React from "react";
import FormularioBuscarObrasTransparencia from "../componentes/detalheExibir/FormularioBuscarObrasTransparencia";
import ExibirProjetoDeObras from "../componentes/detalheExibir/ExibirProjetoDeObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";

const Home = () =>{
    return(<><FormularioBuscarObrasTransparencia/>
    <ExibirProjetoDeObras tituloObra={'TP Nº 09/2020 - CONTRATO Nº 110/2022 - CONTRATAÇÃO DE EMPRESA PARA EXECUÇÃO DE OBRAS DE IMPLANTAÇÃO DE INFRA-ESTRUTURA BÁSICA E PAVIMENTAÇÃO COM BLOCOS DE CONCRETO NAS LOCALIDADES DE CANCELAS'}
      porcentagemMedicao={'10'}
        situacaoObra={'Andamento'}
          dataPublicacao={'17/11/2023'}
          prefeituraObras={'Prefeitura'}
            tipoObra={'Rua'}
              valorPagoObra={'1.350.31,00'}
                contratadaObra={'W.M VASCONCELOS - ME'}
           />
    <ExibirProjetoDeObras tituloObra={'TP Nº 09/2020 - CONTRATO Nº 110/2022 - CONTRATAÇÃO DE EMPRESA PARA EXECUÇÃO DE OBRAS DE IMPLANTAÇÃO DE INFRA-ESTRUTURA BÁSICA E PAVIMENTAÇÃO COM BLOCOS DE CONCRETO NAS LOCALIDADES DE CANCELAS'}
      porcentagemMedicao={'10'}
        situacaoObra={'Andamento'}
          dataPublicacao={'17/11/2023'}
          prefeituraObras={'Prefeitura'}
            tipoObra={'Rua'}
              valorPagoObra={'1.350.31,00'}
                contratadaObra={'W.M VASCONCELOS - ME'}
           />
   
    </>)
}

export default Home;