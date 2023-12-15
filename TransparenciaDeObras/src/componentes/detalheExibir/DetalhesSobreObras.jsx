import styles from "./DetalheSobreObras.module.css";
import InformacaoDaObra from "./InformacaoDaObra";


const DetalheSobreObras = (props) => {
    return (
        <article className={styles.obrasDetalhePrincipal}>
            <div className={styles.tituloPrincipalDetalheObras}><h1 >Detalhe da Obras</h1></div>
            <div className={styles.detalhesSobreObraIntroducao}>
            <div className={styles.detalhesSobreObraIntroducaoTitulo}><h2>Detalhes</h2></div>
            <div className={styles.informacaoDetalheSobreObraListaIntroducao}>
            <div className={styles.detalhesFundo}>Numero</div> <div className={styles.detalhesFundo}>{props.numeroDetalhes}</div>
            <div className={styles.detalhesFundo}>Situação</div> <div className={styles.detalhesFundo}>{props.situacaoDetalhes}</div>
            <div className={styles.detalhesFundo}>Data de Publicação</div> <div className={styles.detalhesFundo}>{props.dataPublicacaoDetalhes}</div>
            <div className={styles.detalhesFundo}>Orgão publico</div> <div className={styles.detalhesFundo}>{props.prefeituraObrasDetalhes}</div>
            <div className={styles.detalhesFundo}>Tipo de obra</div> <div className={styles.detalhesFundo}>{props.tipoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Valor pago</div> <div className={styles.detalhesFundo}> R$ {props.valorPagoObraDetalhes}</div>
            <div className={styles.detalhesFundoFinalEsquerdo}>Nome da Contratada</div> <div className={styles.detalhesFundoFinalDireito}>{props.contratadaObraDetalhes}</div>
            </div>
            </div>
            <InformacaoDaObra 
            localizacaoObraDetalhes={props.localizacaoObraDetalhes}
            nomeContratadaObraDetalhes={props.nomeContratadaObraDetalhes}
            cnpjContratadaObraDetalhes={props.cnpjContratadaObraDetalhes}
            licitacaoObraDetalhes={props.licitacaoObraDetalhes}
            contratoObraDetalhes={props.contratoObraDetalhes}
            prazoInicialObraDetalhes={props.prazoInicialObraDetalhes}
            prazoTotalObraDetalhes={props.prazoTotalObraDetalhes}
            valorEmpenhadoObraDetalhes={props.valorEmpenhadoObraDetalhes}
            valorLiquidadoObraDetalhes={props.valorLiquidadoObraDetalhes}
            valorPagoObraDetalhes={props.valorPagoObraDetalhes} />
        </article>
    )
}

export default DetalheSobreObras;