import styles from "./CriarPerfil.module.css";
import axios from "axios";

const ExcluirUsuario = (props) =>{

    const config = {
        headers: {
          'Accept': 'text/plain',
          'Authorization': `${import.meta.env.VITE_API_TOKEN}`,
        },
      };

    const ExcluirUser = async () =>{
        try{
        const urlApiUser = `${import.meta.env.VITE_REACT_APP_API_URL_USER}/${props.id}`
        const response = await axios.delete(urlApiUser,config);
        window.alert("usuario excluido");
        window.location.reload();
        }
        catch(err){
            console.log(err);
            window.alert("Ocorreu um erro ao excluir o usuario");
        }
    }
    return (<>
    <input type="button" className={styles.botaoExcluir} value="Excluir" onClick={ExcluirUser}/>
    </>)
} 

export default ExcluirUsuario;