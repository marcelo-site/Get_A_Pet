import api from '../../../utils/api'

import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm'

import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet() {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {

        api.get(`pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => {
            setPet(response.data.pet)
        })
    }, [token, id])

    async function updatePet (pet) {
        let msgType = 'sucess'

        const formData = new FormData()

        await Object.keys(pet).forEach(key => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })
        const data = await api.patch(`pets/edit/${pet._id}`, formData, {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
        })
        .then(response => {
            return response.data
        })
        .catch( err => {
            msgType = 'error'
            console.log(err)
            return err.response.data
        })

        console.log(pet)
        console.log(data.message)
        setFlashMessage(data.message, msgType)
    }
    return (
        <section>
           <div>
           <h1>Editando Pet: {pet.name}</h1>
           <p>depois da edição os dados serão atualizados no sistema</p>
           </div>
           {pet.name && (
            <PetForm 
            handleSubmit={updatePet}
            btnText='Atualizar'
            petData={pet}
            />
           )}
        </section>
    )
}

export default EditPet