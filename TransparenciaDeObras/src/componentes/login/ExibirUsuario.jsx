import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./User.module.css";
import CarregarUsuario from "./CarregarUsuario";

const ExibirUsuario = (props) =>{

    const [jsonData, setJsonData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [documentoSelecionado, setDocumentoSelecionado] = useState(null);

    const [dados, setDados] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const itensPorPagina = 10; // Defina a quantidade desejada de itens por página

    const onEditarClick = (dadosDocumento) => {
        setDocumentoSelecionado(dadosDocumento);
        props.onEditarClick(documentoSelecionado);
        console.log("dados user", documentoSelecionado);
      };

    const Adquirirdados = async (event) => {
      try {
        const config = {
          headers: {
            'Accept': 'text/plain',
           'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwIiwibmJmIjoxNzAzMTc3NTIxLCJleHAiOjI1MzQwMjMwMDgwMCwiaWF0IjoxNzAzMTc3NTIxfQ.7_rODWG4ERRJLKyISjI7VXSHdPlMBxZI9DCT5hBxhOs",
          },
        };
  
        const response = await axios.get(`https://localhost:7067/User?pageNumber=${paginaAtual}&pageQuantity=${itensPorPagina}`, config);
  
        const dadosRecebidos = response.data;
        setDados(dadosRecebidos);
  
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
            <th className={styles.tabelaUserTopoEsquerdo}>Nome Completo</th>
            <th className={styles.tabelaUserTopo}>Nome do Usuario</th>
            <th className={styles.tabelaUserTopo}>Email</th>
            <th className={styles.tabelaUserTopoDireito}></th>
          </tr>
          {loading ? (
            <tr>
              <td colSpan="4">Carregando...</td>
            </tr>
          ) : (
            Object.values(jsonData)
              .reverse() // Reverte a ordem do array
              .map((data) => (
                <CarregarUsuario
                  nomeCompleto={data.nomeCompleto}
                  nome={data.nome}
                  email={data.email}
                  onEditarClick={onEditarClick}
                />
              ))
          )}
        </table>
        <div>            {/* Adicione controles de paginação, por exemplo: */}
            <button onClick={() => setPaginaAtual((prevPage) => prevPage - 1)}>Página Anterior</button>
            <span>Página {paginaAtual}</span>
            <button onClick={() => setPaginaAtual((prevPage) => prevPage + 1)}>Próxima Página</button>
        </div>
      </div>
    )
  }




export default ExibirUsuario;