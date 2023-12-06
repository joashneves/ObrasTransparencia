import React, { useState, useEffect } from "react";
import FormularioBuscarObrasTransparencia from "../componentes/detalheExibir/FormularioBuscarObrasTransparencia";
import ExibirProjetoDeObras from "../componentes/detalheExibir/ExibirProjetoDeObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import axios from "axios";


const Home = () => {
  // Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get('https://localhost:7031/api/Obras/');

      const dadosRecebidos = response.data;

      console.log("Dados acessados", dadosRecebidos)
      setJsonData(dadosRecebidos);
      setLoading(false); // Indica que os dados foram carregados
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {
    Adquirirdados();
  }, []); // O array de dependências vazio assegura que o efeito seja executado apenas uma vez, equivalente a componentDidMount



  const [dadosFiltrados, setDadosFiltrados] = useState(null); // Estado para armazenar os dados filtrados

  const realizarBusca = (buscar, situacao, dataInicio, tipo, contratada, dataFinal, orgao) => {

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
    console.log("Dados do formulário:", buscar, situacao, dataInicio, tipo, contratada, dataFinal, orgao);
  };
  return (
    <>
      <FormularioBuscarObrasTransparencia realizarBuscaCallback={realizarBusca} />

      {loading ? (
        // Exibe um componente de carregamento enquanto os dados estão sendo carregados
        <p>Carregando...</p>
      ) : (
        // Renderiza os dados quando eles estiverem prontos
        jsonData.map((data) => {
          return (
            <ExibirProjetoDeObras
              key={data.Contrato} // Certifique-se de ter uma chave única
              tituloObra={data.nomeDetalhe}
              porcentagemMedicao={data.Percentual}
              situacaoObra={data.situacaoDetalhe}
              dataPublicacao={data.publicacaoData}
              prefeituraObras={data.orgaoPulicoDetalhe}
              tipoObra={data.tipoObraDetalhe}
              valorPagoObra={data.valorPagoDetalhe}
              contratadaObra={data.nomeContratadaDetalhe}
            />
          );
        })

      )}

    </>
  );
}

export default Home;