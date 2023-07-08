import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './PetDetails.module.css'

function PetDetails() {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`pets/${id}`).then(res => {
            setPet(res.data.pet)
        })
    }, [id])

    async function schedule() {
        let msgType = 'sucess'

        const data = await api.patch(`pets/schedule/${pet._id}`, {
            headres: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then(response => {
                return response.data
            })
            .catch(err => {
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.petdetails_header}>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>se tiver desejo em conhecê-lo, marque uma visita para conhecê-lo</p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((img, index) => (
                            <img

                                src={`${process.env.REACT_APP_API}img/pets/${img}`}
                                alt={pet.name}
                                key={`${pet.name}+${index}`}
                            />
                        ))}
                    </div>
                    <p>
                        <span className='bold'>Peso:</span> {pet.weight} kg
                    </p>
                    <p>
                        <span className='bold'>Idade:</span> {pet.age} anos
                    </p>
                    {token ? (
                        <button onClick={schedule}>Solicitar visita</button>
                    ) : (
                        <p>Você precisa <Link to='/register'>criar uma conta</Link> para solictar a visita</p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetails