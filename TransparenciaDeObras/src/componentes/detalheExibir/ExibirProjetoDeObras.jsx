
import styles from "./ExibirProjetoDeObras.module.css";

import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';

import axios from "axios";

const ExibirProjetoDeObras = (props) =>{

    const [imagem, setImagem] = useState(null);
    const [fotoId, setFotoId] = useState();

    const [jsonData, setJsonData] = useState({});

    const Adquirirdados = async (event) => {
        try {
          const response = await axios.get('https://localhost:7031/api/Fotoes/');
    
          const dadosRecebidos = response.data;
    
          console.log("Dados acessados", dadosRecebidos)
          setJsonData(dadosRecebidos);
          
        } catch (err) {
          console.log("Erro", err);
        }
      }
      Adquirirdados();

    useEffect(() => {
      const carregarImagem = async () => {
        try {
           const fotolocalizada = jsonData.find((e) => e.id_obras == props.id);
    
          const response = await axios.get(`https://localhost:7031/api/Fotoes/${fotolocalizada.id}/download`, {
            responseType: 'arraybuffer', // Configura responseType para 'arraybuffer' para tratar a resposta como um buffer de bytes
          });
  
          // Cria uma URL de dados para a imagem e a define como a fonte da tag <img>
          const base64Image = btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          setImagem(`data:${response.headers['content-type'].toLowerCase()};base64,${base64Image}`);
          
        } catch (error) {
          console.error('Erro ao carregar a imagem', error);
        }
      };
  
      carregarImagem();
    }, [fotoId]);

    return(
           
        <Link className={styles.projecaoDeObraInicial} to={`/exibir/${props.id}` }>
        
        <img src={imagem} 
            alt="imagem" 
                className={styles.fotoDaObra}/>
        <h1 className={styles.textoTitulo}>{props.tituloObra}</h1>
        <div className={styles.informacaoPreviasObras}>
            <p className={styles.medicaoObras}>Medição {props.porcentagemMedicao}%</p>
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