import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./ExibirFoto.module.css";

function ExibirFoto({ fotoId }) {
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const carregarImagem = async () => {
      try {
        const response = await axios.get(`https://localhost:7031/api/Fotoes/${fotoId}/download`, {
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

  return (
    <div>
      {imagem && <img src={imagem} alt="Imagem" />}
    </div>
  );
}

export default ExibirFoto;
