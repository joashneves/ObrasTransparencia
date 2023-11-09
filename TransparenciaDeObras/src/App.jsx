import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './componentes/Button'
import FormularioBuscarObrasTransparencia from './componentes/detalheExibir/FormularioBuscarObrasTransparencia'
import ExibirProjetoDeObras from './componentes/detalheExibir/ExibirProjetoDeObras'
import DetalheSobreObras from './componentes/detalheExibir/DetalhesSobreObras'
import InformacaoDaObra from './componentes/detalheExibir/InformacaoDaObra'
import DetalheGestoresFiscaisObras from './componentes/detalheExibir/DetalheGestoresFiscaisObras'
import DetalheAnexoObras from './componentes/detalheExibir/DetalheAnexoObras'
import DetalheAditivosObras from './componentes/detalheExibir/DetalheAditivosObras'
import DetalheMedicaoObras from './componentes/detalheExibir/DetalheMedicaoObras'
import DetalheHistoricoObras from './componentes/detalheExibir/DetalheHistoricoObras'

function App() {

  return (
    <>
      <FormularioBuscarObrasTransparencia/>
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
      <DetalheSobreObras numeroDetalhes={"110"}
      situacaoDetalhes={"Andamento"}
      dataPublicacaoDetalhes={'17/11/2023'}
            prefeituraObrasDetalhes={'Prefeitura'}
              tipoObraDetalhes={'Rua'}
                valorPagoObraDetalhes={'1.350.31,00'}
                  contratadaObraDetalhes={'W.M VASCONCELOS - ME'}/>
      <InformacaoDaObra/>
      <DetalheGestoresFiscaisObras/>
      <DetalheAnexoObras/>
      <DetalheMedicaoObras/>
      <DetalheAditivosObras/>
      <DetalheHistoricoObras/>
    </>
  )
}

export default App;
