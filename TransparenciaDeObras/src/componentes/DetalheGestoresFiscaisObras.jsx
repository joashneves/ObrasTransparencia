import styles from "./DetalheGestoresFiscaisObras.module.css";

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
                <tr>
                    <td className={styles.tabelaFiscalGestorMeio}>Fiscal Titular</td>
                    <td className={styles.tabelaFiscalGestorMeio}>João Generico da Silva</td>
                    <td className={styles.tabelaFiscalGestorMeio}>SEMOB</td>
                    <td className={styles.tabelaFiscalGestorMeio}>joaosilva@mail.com</td>
                </tr>
                <tr> 
                    <td className={styles.tabelaFiscalGestorFinalEsquerdo}>Fiscal Substituto</td>
                    <td className={styles.tabelaFiscalGestorFinal}>Pedro Generico da Silva</td>
                    <td className={styles.tabelaFiscalGestorFinal}>SEMOB</td>
                    <td className={styles.tabelaFiscalGestorFinalDireito}>pedrosouza@mail.com</td>
                </tr>
            </table>
        </article>
    )
}

export default DetalheGestoresFiscaisObras;