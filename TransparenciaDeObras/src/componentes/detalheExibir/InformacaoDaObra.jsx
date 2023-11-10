import styles from "./DetalheSobreObras.module.css";

const InformacaoDaObra = (props) => {
    return (
        <article >
            <div className={styles.detalhesSobreObraIntroducao}>
            <div className={styles.detalhesSobreObraIntroducaoTitulo}><h2>Informações</h2></div>
            <div className={styles.informacaoDetalheSobreObraListaIntroducao}>
            <div className={styles.detalhesFundo}>Inicio da Obra</div> <div className={styles.detalhesFundo}>{props.inicioObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Previsão de Conclusão</div> <div className={styles.detalhesFundo}>{props.previsaoConclusaoDetalhes}</div>
            <div className={styles.detalhesFundo}>Forma de execução</div> <div className={styles.detalhesFundo}>{props.formaExecucaoDetalhes}</div>
            <div className={styles.detalhesFundo}>Descrição da Obra</div> <div className={styles.detalhesFundo}>{props.descricaoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Localização da Obra</div> <div className={styles.detalhesFundo}>{props.localizacaoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Nome da Contratada</div> <div className={styles.detalhesFundo}>{props.nomeContratadaObraDetalhes}</div>
            <div className={styles.detalhesFundo}>CNPJ da Contratada</div> <div className={styles.detalhesFundo}>{props.cnpjContratadaObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Licitação</div> <div className={styles.detalhesFundo}>{props.licitacaoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Contrato</div> <div className={styles.detalhesFundo}>{props.contratoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Prazo Incial</div> <div className={styles.detalhesFundo}>{props.prazoInicialObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Prazo Total</div> <div className={styles.detalhesFundo}>{props.prazoTotalObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Valor Empenhado</div> <div className={styles.detalhesFundo}>{props.valorEmpenhadoObraDetalhes}</div>
            <div className={styles.detalhesFundo}>Valor Liquidado</div> <div className={styles.detalhesFundo}>{props.valorLiquidadoObraDetalhes}</div>
            <div className={styles.detalhesFundoFinalEsquerdo}>Valor pago</div> <div className={styles.detalhesFundoFinalDireito}>{props.valorPagoObraDetalhes}</div>
            </div>
            </div>
        </article>
    )
}

export default InformacaoDaObra;