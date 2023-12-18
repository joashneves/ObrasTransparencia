import React, { useState, useEffect } from "react";
import FormularioBuscarObrasTransparencia from "../componentes/detalheExibir/FormularioBuscarObrasTransparencia";
import ExibirProjetoDeObras from "../componentes/detalheExibir/ExibirProjetoDeObras";
import DetalheSobreObras from "../componentes/detalheExibir/DetalhesSobreObras";
import axios from "axios";


const Home = () => {
  // Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const [buscar, setBuscar] = useState();
  const [situacao , setSituacao] = useState();
  const [dataInicio, setDataInicio] = useState();
  const [tipo, setTipo] = useState();
  const [contratada, setContratada] = useState();
  const [dataFinal, setDataFinal] = useState();
  const [orgao, setOrgao]= useState();

  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get('https://localhost:7067/Obra/');
      const obrasData = response.data;
      const dadosRecebidos = obrasData.filter((o) => o.publicadoDetalhe == true);

      setJsonData(dadosRecebidos);
      setLoading(false); // Indica que os dados foram carregados
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {
    if (
      (buscar && buscar.trim() !== "") ||
      (contratada && contratada.trim() !== "") ||
      (situacao && situacao.trim() !== "") ||
      (tipo && tipo.trim() !== "") 
      
    ) {
      const filtradoJson = jsonData.filter((obra) => {
        const nomeDetalheLowerCase = obra.nomeDetalhe ? obra.nomeDetalhe.toLowerCase() : "";
        const empresaContratadaLowerCase = obra.nomeContratadaDetalhe
          ? obra.nomeContratadaDetalhe.toLowerCase()
          : "";
        const situacaoDetalhe = obra.situacaoDetalhe ? obra.situacaoDetalhe.toString().toLowerCase() : "";
        const tipoObraDetalhe = obra.tipoObraDetalhe ? obra.tipoObraDetalhe.toLowerCase() : "";
        
  
        return (
          (buscar && nomeDetalheLowerCase.includes(buscar.toLowerCase())) ||
          (contratada &&
            empresaContratadaLowerCase.includes(contratada.toLowerCase())) ||
          (situacao && situacaoDetalhe.includes(situacao.toLowerCase())) ||
          (tipo && tipoObraDetalhe.includes(tipo.toLowerCase())) 
          
        );
      });
      setJsonData(filtradoJson);
    } else {
      // Se os campos estiverem vazios, carrega todos os dados novamente
      Adquirirdados();
    }
  }, [
    buscar,
    situacao,
    dataInicio,
    tipo,
    contratada,
    orgao,
    jsonData,
  ]); 

  function converterDataFormato(dataISO) {
    const dataObj = new Date(dataISO);
  
    // Obtém o dia, mês e ano da data
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
    const ano = dataObj.getFullYear();
  
    // Monta a string no formato desejado
    const dataFormatada = `${dia}/${mes}/${ano}`;
  
    return dataFormatada;
  }

  return (
    <>
      <FormularioBuscarObrasTransparencia  
      onBuscarChange={setBuscar}
      onSituacaoChange={setSituacao}
      onTipoChange={setTipo}
      onContratadaChange={setContratada}
      onOrgaoChange={setOrgao}
      />

      {loading ? (
        // Exibe um componente de carregamento enquanto os dados estão sendo carregados
        <p>Carregando...</p>
      ) : (
        // Renderiza os dados quando eles estiverem prontos
        Object.values(jsonData).map((data)=>{
          return (
            <ExibirProjetoDeObras
              key={data.id} // Certifique-se de ter uma chave única
              id={data.id}
              tituloObra={data.nomeDetalhe}
              porcentagemMedicao={data.Percentual}
              situacaoObra={data.situacaoDetalhe}
              dataPublicacao={converterDataFormato(data.publicacaoData)}
              prefeituraObras={data.orgaoPublicoDetalhe}
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