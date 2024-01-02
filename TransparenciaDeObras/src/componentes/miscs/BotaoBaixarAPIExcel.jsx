import React from "react";
import DownloadIcon from '../../assets/downloadexcel.svg';
import styles from "./BotaoBaixarAPI.module.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from "axios";

const BotaoBaixarAPIExcel = () => {
    const baixarExcel = async () => {
        try {
            // Faz a solicitação GET à API
            const response = await axios.get('https://localhost:7067/Obra/');

            // Obtém os dados da resposta
            const data = response.data;

            const exportToExcel = () => {
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            
                // Buffer to store the generated Excel file
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            
                saveAs(blob, "data.xlsx");
            };
            exportToExcel();
            // Limpa a URL do objeto Blob para liberar memória
            window.URL.revokeObjectURL(url);
            console.log('Arquivo Excel gerado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer a solicitação ou gerar o arquivo Excel:', error.message);
        }
    }
    return (
        <>
        <div>
        <img src={DownloadIcon} alt="Download Icon" className={styles.botaoBaixarAPI} onClick={baixarExcel} />
            </div>
        </>
    )
}

export default BotaoBaixarAPIExcel;