import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'
import styles from './NavBar.module.css'
import { BsList } from "react-icons/bs";

// context
import { Context } from '../../context/UserContext'
import { useContext, useState } from 'react'

function Navbar() {
    const deviceSmall = window.innerWidth < 720 ? true : false
    const { authenticated, logout } = useContext(Context)
    const [mobile, setMobile] = useState(deviceSmall)
    const [btnMenu] = useState(deviceSmall)
    const [back, setBack] = useState(deviceSmall)

    function toggle() {
        if (deviceSmall) {
            setBack(!back)
            setMobile(!mobile)
            document.querySelector('body').classList.toggle('over-hidden')
        }
    }
    return (
        <nav className={styles.NavBar}>
            <div className={styles.NavBar_logo}>
                <img src={Logo} alt='logo' />
                <h2>Pet Feliz</h2>
            </div>
            <div>
                {!back && <div onClick={toggle} className={styles.back}></div>}
                <div className={styles.btn_menu}>
                    <ul>
                        <li>
                            <Link to="/">Adotar</Link>
                        </li>
                        {!mobile &&
                            <div onClick={toggle}>
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
                                        <li onClick={logout}><p>Sair</p></li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Cadastrar</Link>
                                        </li>
                                    </>)
                                }
                            </div>
                        }</ul>
                </div>
                {btnMenu && (<div className={styles.btn_menu} style={{ fontWeight: 'bold' }} onClick={toggle}>Menu <span>{mobile ? (<BsList />) : (<span>x</span>)}</span></div>)}
            </div>
        </nav>
    )
}

export default Navbar