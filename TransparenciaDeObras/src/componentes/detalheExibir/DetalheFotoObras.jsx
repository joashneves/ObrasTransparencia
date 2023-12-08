
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheFotoObras.module.css";
import ExibirFoto from "../cadastrar/tabela/ExibirFoto";
import axios from "axios";

const DetalheFotoObras = () => {

    const { id } = useParams(); // Captura o paramentro da pagina
    const [idFoto, setIdFoto] = useState(0); // Id do Foto
  
    const inputRef = useRef();
  
    const [jsonData, setJsonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [listarFoto, setListaFoto] = useState([]);

    // Adiquirir dados da API dos Fotos e filtra
    useEffect(() => {
        const Adquirirdados = async () => {
            try {
                const response = await axios.get('https://localhost:7031/api/Fotoes/');
                const dadosRecebidos = response.data;
                setJsonData(dadosRecebidos);

                const dadosFoto = dadosRecebidos.find((obra) => obra.id_obra == id);
                // Obtém o índice do último elemento
                const lastIndex = dadosRecebidos.length - 1;

                // Acessa o último objeto
                const ultimoObjeto = dadosRecebidos[lastIndex];

                console.log("id do ultimo da foto", ultimoObjeto.id)
                setListaFoto(dadosFoto);
                setLoading(false);

            } catch (err) {
                console.log("Erro", err);

            }
        };

        Adquirirdados();
    }, [id]); // Adiciona título da obra como dependência

    return (
        <>
            <article className={styles.obrasDetalhePrincipal}>
                <div className={styles.gestoresFiscaisTituloAzul}><h1>Fotos</h1></div>
                <div className={styles.fotoLista}>
                {loading ? (<></>) : (Object.values(jsonData).map((data) => {
                    return (
                        <ExibirFoto fotoId={data.id} />
                    );
                })
                )}
                </div>
            </article>
        </>
    )
}

export default DetalheFotoObras;