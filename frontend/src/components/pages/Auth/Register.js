import Input from '../../form/Input'

function Register() {
    function handleChange() {
        return
    }

    return (
        <div>
            <h1>Registrar</h1>
            <form>
                <Input
                    text="Nome"
                    type="text"
                    name="nome"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange} />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange} />

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange} />

                <Input
                    text="Senha"
                    type="password"
                    name="pássword"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange} />

                <Input
                    text="Confirmação de senha"
                    type="passowrd"
                    name="confirmpassord"
                    placeholder="Digite sua senha novamente"
                    handleOnChange={handleChange} />

                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    )
}

export default Register