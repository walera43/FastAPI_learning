import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";


const Register = () => {
    const [registerSucc, setRegisterSucc] = useState(false)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
        const submitRegistation = async() => {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json",
                "Access-Control-Allow-Origin":  "http://127.0.0.1:3000",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"},
                
                body: JSON.stringify({"email": email, "username": username, "password": password}),
            };

            const response = await fetch("/auth/register", requestOptions);
            const data = await response.json();
            

            if (!response.ok) {
                setErrorMessage(data.detail);
            } else if (response.status === 201){ setRegisterSucc(true) }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (password === confirmationPassword) {
                submitRegistation()
            } else {
                setErrorMessage(
                    "Проверь, что пароли совпадают"
                );
            }
        };

    return(
    <body>
      {registerSucc ?
        <Link className="box" to={'/'}>Вернуться на главную</Link>
        :
        <div className="container" style={{margin: "70px"}}>
            <form className="box" onSubmit={handleSubmit}>
            <div className="field">
                  <label className="label">Никнейм</label>
                  <div className="control">
                    <input className="input" type="username" placeholder="MegaKekus1337" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Электронная почта</label>
                  <div className="control">
                    <input className="input" type="email" placeholder="@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  </div>
                </div>
            
                <div className="field">
                  <label className="label">Пароль</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Повторите пароль</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="********" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} required/>
                  </div>
                <ErrorMessage message={errorMessage} />
                </div>
            
                <button className="button is-link is-outlined" type="submit">Зарегистрироваться</button>
            </form>
        </div>
      }</body>
    );
}

export default Register