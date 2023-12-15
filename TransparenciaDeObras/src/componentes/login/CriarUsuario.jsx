import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CriarUsuario.module.css"

const CriarUsuario = () =>{

    const [idUser, setIdUser] = useState(0);

    const [nomeCompleto, setNomeCompleto] = useState();
    const [nomeUsuario, setNomeUSuario] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
      // Achar ultimo ID de log e criar um mais novo
  useEffect(() => {
    const Adquirirdados = async () => {
      try {
        const response = await axios.get('https://localhost:7031/api/Users/');
        const dadosRecebidos = response.data;

        // Verificar o ultimo ID da API e coloca mais um quanod criar um objeto
        const dadosLog = dadosRecebidos.find((log) => log.id);

        console.log("log de dados encontrado", dadosLog);

        if (dadosLog) {
          // Obtém o índice do último elemento
          const lastIndex = dadosRecebidos.length - 1;

          // Acessa o último objeto
          const ultimoObjeto = dadosRecebidos[lastIndex];

          setIdUser(ultimoObjeto.id + 1)

        }

      } catch (err) {
        console.log("Erro", err);

      }
    };

    Adquirirdados();
  }, [idUser]);

    const onSubmit = async(event) => {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        //Criar um objeto em formato de json para Obras
        const dado = {
            "id": idUser,
            "nome": nomeUsuario,
            "password": senha,
            "nomeComplete": nomeCompleto,
            "email": email
        };

        try {
          const response = await axios.get('https://localhost:7031/api/Users/');
          const dadosRecebidos = response.data;
    
          //Verificar se tem a obra
          const existente = dadosRecebidos.find((obra) => obra.id == idUser);
    
          if (existente) {
            const response = await axios.put(`https://localhost:7031/api/Users/${existente.id}`, dado);
    
            window.alert('Atualizado!');
            setIdUser(idUser+1);
          } else {
            // Enviar as credenciais para a sua API usando o axios
            const response = await axios.post('https://localhost:7031/api/Users/', dado);
    
            window.alert('Cadastrado');
            window.location.reload();
          }
    
        } catch (error) {
          console.log('Erro ao enviar!', error);
        }
    
      };
    return(
        <>
        <article className={styles.fundoDePerfil} onSubmit={onSubmit}>
            <div className={styles.tituloDePerfil}><h1>Criar Usuario</h1></div>
            <form>
                <label>Nome completo<input type="text" onChange={(e) => setNomeCompleto(e.target.value)}/></label>
                <label>Nome Usuario<input type="text" onChange={(e) => setNomeUSuario(e.target.value)}/></label>
                <label>Email<input type="email" onChange={(e) => setEmail(e.target.value)}/></label>
                <label>Senha<input type="password" onChange={(e) => setSenha(e.target.value)}/></label>
                <input className={styles.botaoNormal} type="submit" value={"Cadastrar"}/>
            </form>
        </article>
        </>
    )
}

export default CriarUsuario;