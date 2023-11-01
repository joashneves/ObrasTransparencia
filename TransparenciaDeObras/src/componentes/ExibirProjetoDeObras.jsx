import imagemNaoEncontrada from '../assets/images.png';
import styles from "./ExibirProjetoDeObras.module.css";
function ExibirProjetoDeObras(){
    return(
        <article className={styles.projecaoDeObraInicial}>
        <img src={imagemNaoEncontrada} 
            alt="imagem_nao_encontrada" 
                className={styles.fotoDaObra}/>
        <h1 className={styles.textoTitulo}>TP Nº 09/2020 - CONTRATO Nº 110/2022 - CONTRATAÇÃO DE EMPRESA PARA EXECUÇÃO DE OBRAS DE IMPLANTAÇÃO DE INFRA-ESTRUTURA BÁSICA E PAVIMENTAÇÃO COM BLOCOS DE CONCRETO NAS LOCALIDADES DE CANCELAS</h1>
        <div className={styles.informacaoPreviasObras}>
            <p className={styles.medicaoObras}>Medicção Any%</p>
            <div className={styles.informacaoFixasObras}>
            <p className={styles.informacaoFixasObrasFixo}>Situação :
                <a className={styles.informacaoFixasObrasStatus}> andamento </a></p>
            <p className={styles.informacaoFixasObrasFixo}>Data de pubacação :
                <a className={styles.informacaoFixasObrasStatus}> 17/07/2023</a></p>
            <p className={styles.informacaoFixasObrasFixo}>Orgão pubaco :
                <a className={styles.informacaoFixasObrasStatus}> Prefeitura</a></p>
            <p className={styles.informacaoFixasObrasFixo}>Tipo de Obra :
                <a className={styles.informacaoFixasObrasStatus}> Rua</a></p>
            <p className={styles.informacaoFixasObrasFixo}>Valor Pago : 
                <a className={styles.informacaoFixasObrasStatus}> R$ 1.320.980,71</a></p>
            <p className={styles.informacaoFixasObrasFixo}>Contratada :
                <a className={styles.informacaoFixasObrasStatus}> W.m vasconcelos</a></p>
            
            </div>
        </div>
        </article>
    )
}

export default ExibirProjetoDeObras;