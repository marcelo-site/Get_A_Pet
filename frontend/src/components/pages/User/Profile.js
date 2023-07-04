import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Profile.module.css'
import formstyles from '../../form/form.module.css'

import Input from '../../form/Input'
import useFlashMessage from '../../../hooks/useFlashMessage'

function Profile() {
    const {setFlashMessage} = useFlashMessage()
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    console.log(user) 
    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(res => setUser(res.data))
    }, [token])
    function onFileChange (e) {
        
        setUser({...user, [e.target.name]: e.target.files[0]})
    }
    function handleChange (e) {
        console.log(user)        
        setUser({...user, [e.target.name]: e.target.value})

    }
    async function handleSubmit (e) {
        e.preventDefault()

        let msgType = 'sucess'

        const formData = new FormData()
        Object.keys(user).forEach(key => {
            formData.append(key, user[key])
        })
        
        const data = await api.patch(`/users/edit/${user._id}`, formData , {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            return res.data

        }).catch(error => {
            msgType= 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)

    }
    return (
        <section>
            <h1>Profile</h1>
                <div className={styles.profile_header}> 
                    <h1>Perfil</h1>
                    <p>Preview image</p>
                </div>
            <form onSubmit={handleSubmit} className={formstyles.form_container}>
                <Input
                text='Imagem'
                type='file'
                name='image'
                handleOnChange={onFileChange}
                />
                <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Digiute seu e-mail'
                handleOnChange={handleChange}
                value={user.email || ''}
                />
                <Input
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite seu nome'
                handleOnChange={handleChange}
                value={user.name || ''}
                />
                <Input
                text='Telefone'
                type='text'
                name='phone'
                placeholder='Digite seu telefone'
                handleOnChange={handleChange}
                value={user.phone || ''}
                />
                <Input
                text='Senha'
                type='password'
                name='password'
                placeholder='Digite sua senha'
                handleOnChange={handleChange}
                />
                <Input
                text='Confirmação de senha'
                type='password'
                name='confirmpassword'
                placeholder='Confirme sua senha'
                handleOnChange={handleChange}
                />
                <input type='submit' value='Editar'/>
            </form>
        </section>
    )
}

export default Profile