import { useState } from "react";
import styles from "./CadastrarProjetoObras.module.css";
import axios from "axios";

function CadastrarProjetoObras (){

    let id = 0;

    const [nomeDetalhe, setNomeDetalhe] = useState();
    const [situcaoDetalhe, setSitucaoDetalhe] = useState();
    const [numeroDetalhe, setNumeroDetalhe] = useState();
    const [publicadoDetalhe, setPublicadoDetalhe] = useState();
    const [publicacaoData, setPublicacaoData] = useState(null);
    const [orgaoPublicoDetalhe, setOrgaoPublicoDetalhe] = useState();
    const [anoDetalhe, setAnoDetalhe] = useState();
    const [tipoObraDetalhe, setTipoObraDetalhe] = useState();
    const [localDetalhe, setLocalDetalhe] = useState();
    const [valorPagoDetalhe, setValorPagoDetalhe] = useState();
    const [nomeContratadaDetalhe, setNomeContratadaDetalhe] = useState();
    const [cnpjContratadaDetalhe, setCnpjContratadaDetalhe] = useState();

    const cadastrarObras = () => {
        // Chame a função passada como prop
        props.onClick();
        id++;
      };

      const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
        // Obtém a data atual
        const now = new Date();

        // Formata a data como string (pode ajustar o formato conforme necessário)
        const formattedDate = now.toISOString();

        // Atualiza o estado com a data atual
        setPublicacaoData(formattedDate);

        const dado =  {
            "id": id,
            "nomeDetalhe": nomeDetalhe,
            "numeroDetalhe": numeroDetalhe,
            "situacaoDetalhe": situcaoDetalhe,
            "publicadoDetalhe": false,
            "publicacaoData": publicacaoData,
            "orgaoPulicoDetalhe": orgaoPublicoDetalhe,
            "tipoObraDetalhe": tipoObraDetalhe,
            "valorPagoDetalhe": valorPagoDetalhe,
            "nomeContratadaDetalhe": nomeContratadaDetalhe,
            "inicioObraDetalhe": 0,
            "previsaoConclusaoDetalhe": 0,
            "formaExecucaoDetalhe": "string",
            "localizacaoobraDetalhe": localDetalhe,
            "cnpjContratadaObraDetalhe": cnpjContratadaDetalhe,
            "prazoInicialObraDetalhe": 0,
            "prazoTotalObraDetalhe": 0,
            "valorEmpenhadoObraDetalhe": 0,
            "valorLiquidadoObraDetalhe": 0
          };
    
        try {
            // Enviar as credenciais para a sua API usando o axios
            const response = await axios.post('https://localhost:7031/api/Obras/', dado);        
            window.alert('Cadastrado');
                
        } catch (error) {
            console.log('Erro ao enviar!', error);
        }
        
    };

    return(
        <article className={styles.fundoDeCadastro}>
            <div className={styles.tituloDeCadastro}><h1>Cadastrar Obra</h1></div>
            <form className={styles.formularioDeCadastro} onSubmit={handleSubmit}>
            <label>Nome* <input type="text"
             id="User"
              name="Name"
               className={styles.cadastrarNome}
                onChange={(e) => setNomeDetalhe(e.target.value)} /></label>
            <div >
            <label >Situação *</label>
            <select className={styles.situacaoInput}
            id="Situacao"
            name="Situacao"
            onChange={(e) => setSitucaoDetalhe(e.target.value)}>
            <option className={styles.situacaoInput}></option>
            <option className={styles.situacaoInput}>Concluída</option>
            <option className={styles.situacaoInput}>Parado</option>
            <option className={styles.situacaoInput}>Em andamento</option>
            <option className={styles.situacaoInput}>Execução</option></select>
            </div>
            <label>Numero <input type="text"
             id="User"
              name="Numero"
               className={styles.cadastrarNumero}
               onChange={(e) => setNumeroDetalhe(e.target.value)} /></label>
            <label>Tipo da Obra <input type="text"
             id="User"
              name="TipoDaObra"
               className={styles.cadastrarTipoObra}
               onChange={(e) => setTipoObraDetalhe(e.target.value)} /></label>
            <label>Ano <input type="text" 
            id="User"
             name="Ano"
              className={styles.cadastrarAno}
              onChange={(e) => setAnoDetalhe(e.target.value)} /></label>
            <div></div>
            <label>Orgão Publico <input type="text"
             id="User"
              name="OrgaoPublico"
               className={styles.cadastrarOrgãoPublico} 
               onChange={(e) => setOrgaoPublicoDetalhe(e.target.value)}/></label>
            <label>Local <input type="text" 
            id="User"
             name="Local"
              className={styles.cadastrarLocal}
              onChange={(e) => setLocalDetalhe(e.target.value)} /></label>
            <div></div>
            <label>Nome da Contratada *<input type="text"
             id="User"
              name="NomeContratada" 
              className={styles.cadastrarNomeContratada} 
              onChange={(e) => setNomeContratadaDetalhe(e.target.value)}/></label>
            <label>CNPJ da Contratada * <input type="text"
             id="User"
              name="CNPJContratada"
               className={styles.cadastrarCNPJContratada} 
               onChange={(e) => setCnpjContratadaDetalhe(e.target.value)}/></label>

            <button type="submit" onClick={cadastrarObras}>Buscar</button>
            </form>
        </article>
    )
}

export default CadastrarProjetoObras;