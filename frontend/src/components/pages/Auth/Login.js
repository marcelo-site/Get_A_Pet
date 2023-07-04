import { useContext, useState } from 'react'
import Input from '../../form/Input'
import styles from '../../form/form.module.css'

import { Context } from '../../../context/UserContext'
import { Link } from 'react-router-dom'

function Login() {
    const [user, seTuser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e) {
        console.log(user)
        seTuser({ ...user, [e.target.name]: e.target.value })
    }
    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }
    return (
        <section className={styles.form_container}>
        <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type='email'
                    text='E-mail'
                    name='email'
                    placeholder='Digite seu email'
                    handleOnChange={handleChange}
                />

                <Input
                    type='password'
                    text='Senha'
                    name='password'
                    placeholder='Digite sua senha'
                    handleOnChange={handleChange}
                />

                <input type="submit" value="Entrar" />
            </form>
            <p>
                Não tem uma conta? <Link to='/register'>Clique aqui.</Link>
            </p>
        </section>
    )
}

export default Login