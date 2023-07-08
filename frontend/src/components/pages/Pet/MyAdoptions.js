import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundImage from '../../layouts/RoundImage'

function Myadoptions(id) {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then(response => {
                setPets(response.data.pets)
            })
    }, [token])
    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Minahs adoções</h1>
            </div>
            <div className={styles.petslist_container}>
                {pets.length > 0 && pets.map(pet => (
                    <div key={pet._id} className={styles.petlist_row}>
                        <RoundImage
                            src={`${process.env.REACT_APP_API}img/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width='px75'
                        />
                        <span className="bold">{pet.name}</span>
                        <div className={styles.contacts}> 
                            <p>
                                <span className='bold'>Ligue para: </span> {pet.user.phone}
                            </p>
                            <p>
                                <span className='bold'>Fale com: </span> {pet.user.name}
                            </p>
                        </div>
                        <div className={styles.actions}>
                            {pet.available ? (
                                <p>Adoção em processo</p>
                            ) : (
                                <p>Parabéns</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {pets.length === 0 && <p>ainda não há adoções de Pets.</p>}
        </section>
    )
}

export default Myadoptions