import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheGestoresFiscaisObras.module.css";
import axios from "axios";

import DetalheGestoresFiscaisListaObras from "./DetalheGestoresFiscaisListaObras";

const DetalheGestoresFiscaisObras = (props) => {

  const { id } = useParams();
  const [jsonData, setJsonData] = useState([]);
  const [obraSelecionada, setObraSelecionada] = useState({});
  const [loadig, setLoading] = useState(true);

  // Adiquirir dados da API dos Gestores ou fiscais
  const [listaFiscalGestor, setListaFiscalGestor] = useState({});
  useEffect(() => {
    const AdquirirdadosGestoresFiscais = async () => {
      try {
        const response = await axios.get('https://localhost:7067/FiscalGestor/');
        const dadosRecebidos = response.data;
        setJsonData(dadosRecebidos);

        const dadosGestorFiscal = dadosRecebidos.filter((obra) => obra.id_obras == id);

        console.log(dadosGestorFiscal);
        if (dadosGestorFiscal) {
          setListaFiscalGestor(dadosGestorFiscal);
          setLoading(false);
         
        }
      } catch (err) {
        console.log("Erro", err);
        setLoading(true);
      }
    };

    AdquirirdadosGestoresFiscais();
  }, [id]); // Adiciona título da obra como dependência

  return (
    <article className={styles.obrasDetalhePrincipal}>
      <div className={styles.gestoresFiscaisTituloAzul}><h1>Gestores e Fiscais</h1></div>
      <table>
        <tr >
          <th className={styles.tabelaFiscalGestorTopoEsquerdo}>Papel</th>
          <th className={styles.tabelaFiscalGestorTopo}>Nome</th>
          <th className={styles.tabelaFiscalGestorTopo}>Secretaria</th>
          <th className={styles.tabelaFiscalGestorTopoDireito}>E-mail</th>
        </tr>
        {loadig ? (<></>) : (Object.values(listaFiscalGestor).map((data) => {
          return (
            <DetalheGestoresFiscaisListaObras
              papel={data.papel}
              nome={data.nome}
              setor={data.secretaria}
              email={data.email} />
          );
        })
        )}
      </table>
    </article>
  )
}

export default DetalheGestoresFiscaisObras;