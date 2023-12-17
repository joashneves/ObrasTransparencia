import React, {useEffect, useState } from "react";
import styles from "./TabelaGestoresFiscais.module.css";
import ListarGestoresFiscais from "./ListarGestoresFiscais";

import axios from "axios";
import { useParams } from "react-router-dom";

const TabelaGestoresFiscais = (props) =>{

    const {id} = useParams();
// Estado para armazenar os dados recebidos
  const [jsonData, setJsonData] = useState({});
  const [loading, setLoading] = useState(true);

  const [gestorSelecionado, setGestorSelecionado] = useState(null);

  const onEditarClick = (dados) => {
    setGestorSelecionado(dados);
    props.onEditarClick(gestorSelecionado)
    
  };

  
  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get('https://localhost:7067/FiscalGestor/');

      const dadosRecebidos = response.data;

      console.log("Dados acessados", dadosRecebidos)
      const dadosFiltrados = dadosRecebidos.filter((item) => item.id_obra == id);
      setJsonData(dadosFiltrados);
      setLoading(false); // Indica que os dados foram carregados
      console.log("Dados filtrados:", dadosFiltrados);
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  // Efeito para carregar os dados ao montar o componente
  useEffect(() => {
    Adquirirdados();
  }, []); // O array de dependências vazio assegura que o efeito seja executado apenas uma vez, equivalente a componentDidMount

    return(
        <div>
            <table>
            <tr>
                    <th className={styles.tabelaGestorFiscalTopoEsquerdo}>Nome</th>
                    <th className={styles.tabelaGestorFiscalTopo}>Papel</th>
                    <th className={styles.tabelaGestorFiscalTopo}>Secretaria</th>
                    <th className={styles.tabelaGestorFiscalTopo}>Email</th>
                    <th className={styles.tabelaGestorFiscalTopoDireito}></th>
                </tr>
                {loading ? (<p></p>):(Object.values(jsonData).map((data) =>{
                    return(
                        <ListarGestoresFiscais
                        id={data.id}
                        nomeGestorFiscal={data.nome}
                        papelGestorFiscal={data.papel}
                        secretariaGestorFiscal={data.secretaria}
                        emailGestorFiscal={data.email}
                        onEditarClick={onEditarClick}/>
                    );
                })
                    )}
                
            </table>
        </div>
    )
}

export default TabelaGestoresFiscais;