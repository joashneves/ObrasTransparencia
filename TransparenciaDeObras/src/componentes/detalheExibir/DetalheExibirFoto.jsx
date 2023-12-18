import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./DetalheExibirFoto.module.css";

function DetalheExibirFoto({ fotoId }) {
  const [idImagem, setIdImagem] = useState();
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const carregarImagem = async () => {
      try {
        const response = await axios.get(`https://localhost:7067/Foto/Download/${fotoId}`, {
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

  return (
    <div className={styles.imagemContainer}>
      {imagem && (
          <img src={imagem} alt="Imagem" />
      )}
    </div>
  );
}

export default DetalheExibirFoto;
