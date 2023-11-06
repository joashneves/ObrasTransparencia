import styles from "./DetalheSobreObras.module.css";

const InformacaoDaObra = (props) => {
    return (
        <article >
            <div className={styles.detalhesSobreObraIntroducao}>
            <div className={styles.detalhesSobreObraIntroducaoTitulo}><h2>Informações</h2></div>
            <div className={styles.informacaoDetalheSobreObraListaIntroducao}>
            <div className={styles.detalhesFundo}>Inicio da Obra</div> <div className={styles.detalhesFundo}>{props.numeroDetalhes}</div>
            <div className={styles.detalhesFundo}>Previsão de Conclusão</div> <div className={styles.detalhesFundo}>{props.situacaoDetalhes}</div>
            <div className={styles.detalhesFundo}>Forma de execução</div> <div className={styles.detalhesFundo}>{props.dataPublicacaoDetalhes}</div>
            <div className={styles.detalhesFundo}>Descriação da Obra</div> <div className={styles.detalhesFundo}>{props.prefeituraObrasDetalhes}</div>
            <div className={styles.detalhesFundo}>Localização da Obra</div> <div className={styles.detalhesFundo}>{props.tipoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Nome da Contratada</div> <div className={styles.detalhesFundo}>{props.valorPagoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Localização da Obra</div> <div className={styles.detalhesFundo}>{props.tipoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>CNPJ da Contratada</div> <div className={styles.detalhesFundo}>{props.valorPagoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Licitação</div> <div className={styles.detalhesFundo}>{props.tipoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Contrato</div> <div className={styles.detalhesFundo}>{props.valorPagoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Prazo Incial</div> <div className={styles.detalhesFundo}>{props.tipoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Prazo Total</div> <div className={styles.detalhesFundo}>{props.valorPagoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Valor Empenhado</div> <div className={styles.detalhesFundo}>{props.tipoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Valor Liquidado</div> <div className={styles.detalhesFundo}>{props.valorPagoObraDetalhes}</div>
            <div className={styles.detalhesFundoFinalEsquerdo}>Valor pago</div> <div className={styles.detalhesFundoFinalDireito}>{props.contratadaObraDetalhes}</div>
            </div>
            </div>
        </article>
    )
}

export default InformacaoDaObra;