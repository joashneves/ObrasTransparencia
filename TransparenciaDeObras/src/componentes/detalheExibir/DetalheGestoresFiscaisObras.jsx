import styles from "./DetalheGestoresFiscaisObras.module.css";

import DetalheGestoresFiscaisListaObras from "./DetalheGestoresFiscaisListaObras";

const DetalheGestoresFiscaisObras = (props) => {
    return (
        <article className={styles.obrasDetalhePrincipal}>
        <div className={styles.gestoresFiscaisTituloAzul}><h1>Gestores e Fiscais</h1></div>
        <table>
                <tr >
                    <th className={styles.tabelaFiscalGestorTopoEsquerdo}>Papel</th>
                    <th className={styles.tabelaFiscalGestorTopo}>Nome</th>
                    <th className={styles.tabelaFiscalGestorTopo}>Secretaria</th>
                    <th className={styles.tabelaFiscalGestorTopoDireito}>E-mail</th>
                </tr>
                <DetalheGestoresFiscaisListaObras papel={props.papel}
                    nome={props.nome}
                    setor={props.setor}
                    email={props.email} />
            </table>
        </article>
    )
}

export default DetalheGestoresFiscaisObras;