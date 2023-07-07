import styles from './Select.module.css'

function Select({text, name, options, handleChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name} >{text}</label>
            <select name={name} id={name} onChange={handleChange}
            defaultValue={value || ''} >
                <option>Selecione uma opção</option>
                {options.map(el => (
                    <option value={el} key={el}>{el}</option>
                ))}
            </select>
        </div>
    )
}

export default Select