import imagemNaoEncontrada from '../assets/images.png';
import styles from "./ExibirProjetoDeObras.module.css";
function ExibirProjetoDeObras(){
    return(
        <article className={styles.projecaoDeObraInicial}>
        <img src={imagemNaoEncontrada} 
            alt="imagem_nao_encontrada" 
                className={styles.fotoDaObra}/>
        <h1>TP Nº 09/2020 - CONTRATO Nº 110/2022 - CONTRATAÇÃO DE EMPRESA PARA EXECUÇÃO DE OBRAS DE IMPLANTAÇÃO DE INFRA-ESTRUTURA BÁSICA E PAVIMENTAÇÃO COM BLOCOS DE CONCRETO NAS LOCALIDADES DE CANCELAS</h1>
        <div>
            <p>Medicção Any%</p>
            <div>
            <ul>
            <p>Situação</p>
                <li>andamento </li>
            <p>Data de publicação</p>
                <li>17/07/2023</li>
            <p>Orgão publico</p>
                <li>Prefeitura</li>
            <p>Tipo de Obra</p>
                <li>Rua</li>
            <p>Valor Pago</p>
                <li>R$ 1.320.980,71</li>
            <p>Contratada</p>
                <li>W.m vasconcelos</li>
            </ul>
            </div>
        </div>
        </article>
    )
}

export default ExibirProjetoDeObras;