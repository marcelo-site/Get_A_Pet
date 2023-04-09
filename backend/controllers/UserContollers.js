import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import { createUserToken } from '../helpers/create-user-token.js'
import { getToken } from '../helpers/get-token.js'
import { getUserByToken } from '../helpers/get-user-by-token.js'
import jwt from 'jsonwebtoken'

export class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if (!name) {
            return res.status(422).json({ message: "O nome é obrigratório" })
        }
        if (!email) {
            return res.status(422).json({ message: "O email é obrigratório" })
        }
        if (!phone) {
            return res.status(422).json({ message: "O phone é obrigratório" })
        }
        if (!password) {
            return res.status(422).json({ message: "O password é obrigratório" })
        }
        if (!confirmpassword) {
            return res.status(422).json({ message: "O confirmpassword é obrigratório" })
        }
        if (password != confirmpassword) {
            return res.status(422).json({ message: "A comfirmação de senha não confere!" })
        }

        //check if user exists 
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            return res.status(422).json({ message: "Por favor, utilize outro email" })
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name, email, phone, password: passwordHash
        })

        try {
            const newUser = await user.save()
            // return res.status(201).json({ message: "Usuário criado com sucesso!", newUser })
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        //validations
        if (!email) {
            return res.status(422).json({ message: "O email é obrigratório" })
        }
        if (!password) {
            return res.status(422).json({ message: "O password é obrigratório" })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({
                message: 'Não há usuario cadasrtrado com esse email'
            })
        }

        // check password
        const checkPass = await bcrypt.compare(password, user.password)

        if (!checkPass) {
            return res.status(422).json({
                message: 'Senha inválida!'
            })
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nosso-secret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = null
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id
        if (id.length != 24) {
            return res.status(422).json({
                message: "ID inválido!"
            })
        }

        const user = await User.findById(id).select(['-password', '-phone'])

        if (!user) {
            return res.status(422).json({
                message: "Usuário não encontrado!"
            })
        }

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id
        if (id.length !== 24) return res.status(422).json({
            message: "ID inválido!"
        })

        // check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)
        console.log(user)

        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if (!name) {
            return res.status(422).json({ message: "O nome é obrigratório" })
        }
        if (!email) {
            return res.status(422).json({ message: "O email é obrigratório" })
        }

         // check if user exists
         const userExists = await User.findOne({email: email})

         if (user.email !== email && userExists) return res.status(422).json({
             message: "Por favor, utilize outro email!"
         })

        if (!phone) {
            return res.status(422).json({ message: "O phone é obrigratório" })
        }
        if (!password) {
            return res.status(422).json({ message: "O password é obrigratório" })
        }
        if (!confirmpassword) {
            return res.status(422).json({ message: "O confirmpassword é obrigratório" })
        }
        if (password != confirmpassword) {
            return res.status(422).json({ message: "A comfirmação de senha não confere!" })
        }

        let image = ''
       
    }
}