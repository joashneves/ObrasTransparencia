import React from "react";
import axios from "axios";

const BotaoBaixarAPI = () => {
    const baixarJSON = async () => {
        try {
            // Faz a solicitação GET à API
            const response = await axios.get('https://localhost:7067/Obra/');

            // Obtém os dados da resposta
            const data = response.data;

            // Gera o arquivo JSON
            const jsonString = JSON.stringify(data, null, 2);

            // Cria um Blob com o conteúdo JSON
            const blob = new Blob([jsonString], { type: 'application/json' });

            // Cria um URL temporário para o Blob
            const url = window.URL.createObjectURL(blob);

            // Cria um link <a> temporário para o download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';

            // Adiciona o link ao DOM
            document.body.appendChild(a);

            // Simula um clique no link para iniciar o download
            a.click();

            // Remove o link do DOM
            document.body.removeChild(a);

            // Limpa a URL do objeto Blob para liberar memória
            window.URL.revokeObjectURL(url);
            console.log('Arquivo JSON gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer a solicitação ou gerar o arquivo JSON:', error.message);
        }
    }
    return (
        <>
            <input type="button" onClick={baixarJSON} />
        </>
    )
}

export default BotaoBaixarAPI;