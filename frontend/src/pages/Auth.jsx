import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState("")
    const token = localStorage.getItem("AntiVidosToken");

    const submitLogin = async () => {
      const requestOptions = {
        method: "POST",
        headers: {"accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
        body: 'grant_type=&username='+email+'&password='+password+'&scope=&client_id=&client_secret='
      };
        const response = await fetch("/auth/jwt/login", requestOptions);
        const data = await response.json();

        if (!response.ok) {
          console.log(requestOptions)
          setErrorMessage(data.detail);
        } else if (response.status === 200) {
          setLogin(true)
        }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      submitLogin();
    };


    return(
    <body>
      {login ? 
      <div className="box" style={{margin: "70px"}}>
        <h1>Вы успешно зашли под собой!</h1>
        <Link className="button" to='/'>На главную страницу</Link>
      </div>
      :
        <div className="container" style={{margin: "70px"}}>
            <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input" type="email" placeholder="@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  </div>
                </div>
            
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  </div>
                </div>
            
                <button className="button is-link is-outlined" type='submit'>Войти</button>
                <NavLink to="/register">
                  <button className="button is-link is-outlined" >Регистрация</button>
                </NavLink>
            </form>
        </div>
      }     
    </body>
    );
};

export default Auth