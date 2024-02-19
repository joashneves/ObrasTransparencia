
import styles from "./ExibirProjetoDeObras.module.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import axios from "axios";

const ExibirProjetoDeObras = (props) => {

  const [imagem, setImagem] = useState(null);
  const [fotoId, setFotoId] = useState();

  const [jsonData, setJsonData] = useState({});
  
  useEffect(() => {
    const VerificarSeTemNaObra = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_FOTO}`); // conecta na api da foto
        const fotodata = response.data;
        const idFoto = fotodata.find((o) => o.id_obras == props.id);

        // Se a imagem existir na obra correspondente, carrega a imagem
        if (idFoto) {
          const responseImagem = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_FOTO}/Download/${idFoto.id}`, {
            responseType: 'arraybuffer',
          });

          const base64Image = btoa(
            new Uint8Array(responseImagem.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          setImagem(`data:${responseImagem.headers['content-type'].toLowerCase()};base64,${base64Image}`);
        }
      } catch (error) {
        console.error('Erro ao verificar e carregar a imagem', error);
      }
    };

    VerificarSeTemNaObra();
  }, [props.id]);

  return (

    <Link className={styles.projecaoDeObraInicial} to={`/exibir/${props.id}`}>

      <img src={imagem}
        alt="imagem"
        className={styles.fotoDaObra} />
      <h1 className={styles.textoTitulo}>{props.tituloObra}</h1>
      <div className={styles.informacaoPreviasObras}>
        <div className={styles.informacaoFixasObras}>
          <p className={styles.informacaoFixasObrasFixo}>Situação :
            <a className={styles.informacaoFixasObrasStatus}> {props.situacaoObra} </a></p>
          <p className={styles.informacaoFixasObrasFixo}>Data de publicacação :
            <a className={styles.informacaoFixasObrasStatus}> {props.dataPublicacao}</a></p>
          <p className={styles.informacaoFixasObrasFixo}>Orgão publico :
            <a className={styles.informacaoFixasObrasStatus}> {props.prefeituraObras}</a></p>
          <p className={styles.informacaoFixasObrasFixo}>Tipo de Obra :
            <a className={styles.informacaoFixasObrasStatus}> {props.tipoObra}</a></p>
          <p className={styles.informacaoFixasObrasFixo}>Valor Pago :
            <a className={styles.informacaoFixasObrasStatus}> R${props.valorPagoObra}</a></p>
          <p className={styles.informacaoFixasObrasFixo}>Contratada :
            <a className={styles.informacaoFixasObrasStatus}> {props.contratadaObra}</a></p>

        </div>
      </div>
    </Link>


  )
}

export default ExibirProjetoDeObras;