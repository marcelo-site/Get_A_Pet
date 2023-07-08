import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import styles from './NavBar.module.css'

// context
import { Context } from '../../context/UserContext'
import { useContext } from 'react'

function Navbar() {
    const { authenticated, logout } = useContext(Context)
    return (
        <nav className={styles.NavBar}>
            <div className={styles.NavBar_logo}>
                <img src={Logo} alt='logo' />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to='/pet/mypets'>Meus Pets</Link>
                        </li>
                        <li>
                            <Link to='/user/profile'>Perfil</Link>
                        </li>
                        <li>
                            <Link to='/pet/myadoptions'>Adoções</Link>
                        </li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>)}

            </ul>
        </nav>
    )
}

export default Navbar