import { useState, useEffect } from 'react'
import bus from '../../utils/bus'

import styles from './Message.module.css'

function Message() {
    const [visibillity, setVisibillity] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        bus.addListener('flash', ({message, type}) => {
            setVisibillity(true)
            setMessage(message)
            setType(type)

            setTimeout(()=> {
                setVisibillity(false)
            }, 3 * 1000)
        })
    }, [])

    return (
        visibillity && (
            <div className={`${styles.message} ${styles[type]}`}>
            {message}
        </div>
        )
    )
}

export default Message