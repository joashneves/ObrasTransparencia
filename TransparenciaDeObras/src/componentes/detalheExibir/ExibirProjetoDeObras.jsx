import imagemNaoEncontrada from 'C:\\Users\\joas.neves\\Documents\\Prefeitura\\Obras\\TransparenciaDeObras\\src\\assets\\images.png';
import styles from "./ExibirProjetoDeObras.module.css";

import {Link} from "react-router-dom";



const ExibirProjetoDeObras = (props) =>{
    return(
           
        <Link to={`/exibir/${props.situacaoObra}/${props.dataPublicacao}/${props.prefeituraObras}/${props.valorPagoObra}/${props.contratadaObra}`}>
        <article className={styles.projecaoDeObraInicial}>
        <img src={imagemNaoEncontrada} 
            alt="imagem_nao_encontrada" 
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
        </article>
        </Link>
        

    )
}

export default ExibirProjetoDeObras;