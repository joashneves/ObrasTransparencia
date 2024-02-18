
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetalheFotoObras.module.css";
import ExibirFoto from "../cadastrar/tabela/ExibirFoto";
import axios from "axios";
import DetalheExibirFoto from "./DetalheExibirFoto";

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
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_FOTO}`); // url foto
                const dadosRecebidos = response.data;
                console.log("Foto", dadosRecebidos)
                setJsonData(dadosRecebidos);
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
                    {loading ? (
                        <></>
                    ) : (
                        Object.values(jsonData).map((data) => {
                            // Verifica se o id_obras é igual ao parâmetro
                            if (data.id_obras == id) {
                                return <DetalheExibirFoto key={data.id} fotoId={data.id} />;
                            } else {
                                return null; // Se não corresponder, retorna null para não renderizar nada
                            }
                        })
                    )}
                </div>
            </article>
        </>
    )
}

export default DetalheFotoObras;