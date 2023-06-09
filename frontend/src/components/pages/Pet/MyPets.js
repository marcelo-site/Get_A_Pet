import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import RoundImage from "../../layouts/RoundImage"

import useFlashMessage from "../../../hooks/useFlashMessage"
import api from "../../../utils/api"

import styles from './Dashboard.module.css'

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then(response => {
                setPets(response.data.pets)
            })
            .catch()

    }, [token])

    async function removePet(id) {
        let msgType = 'sucess'

        const data = await api.delete(`/pets/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => {
            const updatedPets = pets.filter(pet => pet._id !== id)
            setPets(updatedPets)
            return response.data
        })
        .catch(err => {

            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    async function concludeAdoption (id) {
        let msgType = 'sucess'

        const data = await api.patch(`pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => response.data)
        .catch(err => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>MyPets</h1>
                <Link to='/pet/add'>Cadastrar Pet</Link>
            </div>
            <div className={styles.petslist_container}>
                {pets.length > 0 &&
                    pets.map(pet => (
                        <div key={pet._id} className={styles.petlist_row}>
                            <div style={{display: 'flex',alignItems: 'center'}}>
                            <RoundImage
                                src={`${process.env.REACT_APP_API}img/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width='px75'
                            />
                            <span className="bold">{pet.name}</span>
                            </div>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && (
                                            <button
                                            onClick={() => concludeAdoption(pet._id)}
                                            className={styles.conclude_btn}
                                            >Concluir adoção</button>
                                        )}
                                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                        <button onClick={() => {removePet(pet._id)}}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Já adotado</p>
                                )}
                            </div>
                        </div>
                    )
                    )}
                {pets.length === 0 && <p>Não há pets Cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets