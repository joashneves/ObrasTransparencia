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
                        <div>PREFEITURA MUNICIPAL DE PRESIDENTE KENNEDY - <strong>PORTAL DE OBRAS</strong></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PortalDaTransparenciaDiv;