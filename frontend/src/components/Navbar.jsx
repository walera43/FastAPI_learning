import logo from "./../img/logo.jpg"
import { NavLink} from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar has-shadow is-white">
        <div className="navbar-brand">
            <img src={logo} href="/" alt='Grizzly' className="logo-icon" style={{height: '70px'}}/>
        </div>
        <a href="!#" className="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </a>


        <div className="navbar-menu" id="nav-links">
            <div className="navbar-start">
                <NavLink to="/users" className="navbar-item">Пользователи</NavLink>
                <NavLink to="/upload_video" className="navbar-item">Загрузить видео</NavLink>
            </div>
            <div className="navbar-end">
                <NavLink to="/login"  className="navbar-item">Войти</NavLink>
            </div>
        </div>
      </nav>
    );
}

export default Navbar;