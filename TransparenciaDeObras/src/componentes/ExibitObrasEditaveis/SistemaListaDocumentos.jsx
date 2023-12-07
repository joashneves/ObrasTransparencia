
import styles from "./SistemaListaDocumento.module.css"
import ListaDeDocumentosEditaveis from "./ListeDeDocumentosEditaveis";
import { useEffect, useState } from "react";

import axios from "axios";

const SistemaListaDocumento = (props) =>{

    const [jsonData, setJsonData] = useState([]);
    const [obraSelecionada, setObraSelecionada] = useState({});

    const [loadig, setLoading] = useState();

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



    return (
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Sistemas / Lista de Documentos</h1></div>
            <div >
                <table>
            <tr>
                    <th className={styles.tabelaObrasTopoEsquerdo}>Data</th>
                    <th className={styles.tabelaObrasTopo}>Nome</th>
                    <th className={styles.tabelaObrasTopo}>Numero</th>
                    <th className={styles.tabelaObrasTopo}>Tipo</th>
                    <th className={styles.tabelaObrasTopo}>Publicado?</th>
                    <th className={styles.tabelaObrasTopoDireito}></th>
                </tr>
                {loadig ? (<></>):(
                Object.values(jsonData).map((data)=>{
                    return(
                    <ListaDeDocumentosEditaveis
                    id={data.id}
                    dataObras={data.publicacaoData}
                    nomeObras={data.nomeDetalhe}
                    numeroObras={data.numeroDetalhe}
                    tipoObras={data.tipoObraDetalhe}
                    publicadoObras={data.publicadoDetalhe}/>
                );
                    })
                )}
            </table>
            </div>
        </article>
    )
}

export default SistemaListaDocumento;