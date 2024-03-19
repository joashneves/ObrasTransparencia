import styles from "./Logoff.module.css";
import logoutIcon from '../../assets/logout.svg';

const Logoff = () =>{
    const logout = () => {
        window.sessionStorage.setItem('username', "");
        window.sessionStorage.setItem('senha', "");

        const user = window.sessionStorage.setItem('username', "");
        const senha = window.sessionStorage.setItem('senha', "");

        window.location.reload();
    }
    return(
        <div>
        <img src={logoutIcon} alt="Download Icon" className={styles.logoff} onClick={logout} />
            </div>
    )
}

export default Logoff;