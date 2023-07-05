import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function MyPets () {
    const [pets, setPets] = useState([])
    return (
        <section>
            <dvi>
            <h1>MyPets</h1>
            <Link to='/pet/add'>Cadastrar Pet</Link>
            </dvi>
            <div>
                {pets.length > 0 && <p>Meus pets Cadastrados</p>}
                {pets.length === 0 && <p>Não há pets Cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets