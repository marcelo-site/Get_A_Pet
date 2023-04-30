import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

import styles from './NavBar.module.css'

function Navbar () {
    return (
        <nav className={styles.NavBar}>
            <div className={styles.NavBar_logo}>
                <img src={Logo} />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar