import styles from "./CriarPerfil.module.css";
import axios from "axios";

const ExcluirUsuario = (props) =>{

    const config = {
        headers: {
          'Accept': 'text/plain',
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIwIiwibmJmIjoxNzAzMTc3NTIxLCJleHAiOjI1MzQwMjMwMDgwMCwiaWF0IjoxNzAzMTc3NTIxfQ.7_rODWG4ERRJLKyISjI7VXSHdPlMBxZI9DCT5hBxhOs",
        },
      };

    const ExcluirUser = async () =>{
        try{
        const response = await axios.delete(`https://localhost:7067/User/${props.id}`,config);
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