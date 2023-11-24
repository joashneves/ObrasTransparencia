import React, {useState} from "react";
import FormularioBuscarObrasTransparencia from "../componentes/detalheExibir/FormularioBuscarObrasTransparencia";
import ExibirProjetoDeObras from "../componentes/detalheExibir/ExibirProjetoDeObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";

import jsonData from "./Dados.json"

const Home = () =>{


  const [dadosFiltrados, setDadosFiltrados] = useState(null); // Estado para armazenar os dados filtrados

  const realizarBusca = (buscar, situacao,dataInicio, tipo, contratada, dataFinal, orgao ) => {

        // Dados a serem filtrados na pesquisa
        const dadosFiltrados = jsonData.filter((data) => {
        
          return (
            data.Descricao.toLowerCase().includes(buscar.toLowerCase()) &&
            data.Situacao.toLowerCase().includes(situacao.toLowerCase()) &&
            data.Inicio.toLowerCase().includes(dataInicio.toLowerCase()) &&
            data.Tipo.toLowerCase().includes(tipo.toLowerCase()) &&
            data.Contrato.toLowerCase().includes(contratada.toLowerCase()) &&
            data.Final.toLowerCase().includes(dataFinal.toLowerCase()) &&
            data.Secretaria.toLowerCase().includes(orgao.toLowerCase())
          );
        });
        
          setDadosFiltrados(dadosFiltrados.length > 0 ? dadosFiltrados : null);
         console.log("Dados do formulário:",buscar, situacao,dataInicio, tipo, contratada, dataFinal, orgao);
  };
  return (
    <>
      <FormularioBuscarObrasTransparencia realizarBuscaCallback={realizarBusca} />

      {dadosFiltrados ? (
        // Renderiza os dados filtrados
        dadosFiltrados.map((data) => {
          return (
            <ExibirProjetoDeObras
            key={data.Contrato} // Certifique-se de ter uma chave única
            tituloObra={data.Descricao}
            porcentagemMedicao={data.Percentual}
            situacaoObra={data.Situacao}
            dataPublicacao={data.Inicio}
            prefeituraObras={data.Secretaria}
            tipoObra={data.Tipo}
            valorPagoObra={data.ValorPago}
            contratadaObra={data.Contrato}
            />
            );
          })
          ) : (
            // Se não houver dados filtrados, renderiza todos os dados do JSON
            jsonData.map((data) => {
              return (
                <ExibirProjetoDeObras
                key={data.Contrato} // Certifique-se de ter uma chave única
                tituloObra={data.Descricao}
                porcentagemMedicao={data.Percentual}
                situacaoObra={data.Situacao}
                dataPublicacao={data.Inicio}
                prefeituraObras={data.Secretaria}
                tipoObra={data.Tipo}
                valorPagoObra={data.ValorPago}
                contratadaObra={data.Contrato}
                />
                );
              })
              )}
        
    </>
  );
}

export default Home;