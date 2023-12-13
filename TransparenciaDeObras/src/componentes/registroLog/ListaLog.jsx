import { useState, useEffect } from "react";
import styles from "./ListaLog.module.css";

import CarregarLog from "./CarregarLog.jsx";
import axios from "axios";

const ListaLog = (props) => {

  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);

  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get('https://localhost:7031/api/Acoes/');

      const dadosRecebidos = response.data;

      console.log("Dados acessados", dadosRecebidos)
      setJsonData(dadosRecebidos);
      setLoading(false); // Indica que os dados foram carregados
    } catch (err) {
      console.log("Erro", err);
      setLoading(false); // Indica que ocorreu um erro ao carregar os dados
    }
  }

  useEffect(() => {
    Adquirirdados();
  }, [])

  return (
    <div>
      <table>
        <tr>
          <th className={styles.tabelaLogTopoEsquerda}>Data/Horario</th>
          <th className={styles.tabelaLogTopo}>Nome</th>
          <th className={styles.tabelaLogTopo}>Ação</th>
          <th className={styles.tabelaLogTopoDireita}>Em/Arquivo</th>
        </tr>
        {loading ? (
          <tr>
            <td colSpan="4">Carregando...</td>
          </tr>
        ) : (
          Object.values(jsonData)
            .reverse() // Reverte a ordem do array
            .map((data) => (
              <CarregarLog
                key={data.id}
                horario={data.dataHora}
                nome={data.nomePerfil}
                acao={data.nome}
                obra={data.nomeObra}
              />
            ))
        )}
      </table>
    </div>
  )
}


export default ListaLog;