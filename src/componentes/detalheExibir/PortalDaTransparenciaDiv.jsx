import styles from "./PortalDaTransparenciaDiv.module.css";

const PortalDaTransparenciaDiv = () => {
    function irPrefeitura(){
        window.location.href = "https://www.presidentekennedy.es.gov.br/"
    }

    return (
        <>
            <div id="menutpdesktop" className={styles.menu}>
                <div className={styles.container}>

                    <div className={styles.logo} onClick={irPrefeitura}>
                        <img src="https://www.presidentekennedy.es.gov.br/assets/img/logotipo-min.png?v=2" alt="PREFEITURA MUNICIPAL DE PRESIDENTE KENNEDY - ES" className={styles.imagem_prefeitura} />
                        <div>PREFEITURA MUNICIPAL DE PRESIDENTE KENNEDY - ES<strong>PORTAL DA TRANSPARÊNCIA</strong></div>
                    </div>

                    <ul className={styles.menu_links}>
                        <li><a href="https://www.presidentekennedy.es.gov.br/controladoria">Portal da Controladoria</a></li>
                        <li><a href="https://www.presidentekennedy.es.gov.br/ouvidoria">Portal da Ouvidoria</a></li>
                        <li><a href="https://www.presidentekennedy.es.gov.br/pagina/ler/1013/perguntas-e-respostas-transparencia" >Perguntas Frequentes</a></li>
                        <li><a href="https://www.presidentekennedy.es.gov.br/controladoria/pagina/popup/5" >Glossário</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PortalDaTransparenciaDiv;