import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

import styles from './AddPet.module.css'

function AddPet() {
    return (
        <section className={styles.addpet_header}>
            <div>
            <h1>Cadastrar um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
            </div>
            <p>Formulário</p>
        </section>
    )
}

export default AddPet