import { useState, useEffect } from "react";
import styles from "./ListaLog.module.css";
import LeftCarret from "../../assets/leftCarret.svg";
import RigthCarret from "../../assets/rigthCarret.svg";
import CarregarLog from "./CarregarLog.jsx";
import axios from "axios";

const ListaLog = (props) => {

  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dados, setDados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 30; // Defina a quantidade desejada de itens por página

  const Adquirirdados = async (event) => {
    try {
      const response = await axios.get(`https://localhost:7067/Historico?pageNumber=${paginaAtual}&pageQuantity=${itensPorPagina}`, config);

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
  }, [paginaAtual])

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
      <div className={styles.botaoes}>            {/* Adicione controles de paginação, por exemplo: */}
            <img src={LeftCarret} alt="LeftCarret" className={styles.botao} onClick={() => setPaginaAtual((prevPage) => prevPage > 0 ? prevPage - 1 : prevPage)}/>
            <div className={styles.contador}>{paginaAtual}</div>
            <img src={RigthCarret} alt="RigthCarret" className={styles.botao} onClick={() => setPaginaAtual((prevPage) => prevPage + 1)}/>
        </div>
    </div>
  )
}

export default ListaLog;