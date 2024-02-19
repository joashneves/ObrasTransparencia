import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./ExibirFoto.module.css";

function ExibirFoto({ fotoId }) {
  const [idImagem, setIdImagem] = useState();
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const carregarImagem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL_FOTO}/Download/${fotoId}`, { 
          responseType: 'arraybuffer',
        });

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

  const excluir =  async () =>
  {
    console.log("Nops")
    try{
      const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL_FOTO}/${fotoId}`);
      window.alert('Apagado');
      window.location.reload();
    } catch (error){
      console.error('Erro ao apagar a imagem', error);
    }
  }
  return (
    <div className={styles.imagemContainer}>
      {imagem && (
        <div className={styles.imagemComBotao}>
          <img src={imagem} alt="Imagem" />
          <button className={styles.botaoSobreImagem} onClick={excluir}>excluir</button>
        </div>
      )}
    </div>
  );
}

export default ExibirFoto;
