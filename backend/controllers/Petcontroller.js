import { Pet } from "../models/pet.js";
import { getToken } from "../helpers/get-token.js";
import { getUserByToken } from "../helpers/get-user-by-token.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId

export class PetController {
    static async create(req, res) {
        const { name, age, weight, color } = req.body
        const available = true

        //upload de imagens
        const images = req.files

        if (images.length === 0) {
            return res.status(422).json({ message: "As imagens são obrigatorias!" })
        }
        // validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' })
        }
        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatória!' })
        }
        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatório!' })
        }
        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatório!' })
        }

        //
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name, age, weight, color, available, images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })
        images.map(image => pet.images.push(image.filename))
        try {
            const newPet = await pet.save()
            return res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet
            })
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')

        return res.status(200).json({ pets })
    }

    static async getAllUserPets(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        return res.status(200).json({ pets })
    }

    static async getAllUserAdoptions(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        return res.status(200).json({ pets })
    }

    static async getPetById(req, res) {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "ID inválido!" })
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) return res.status(404).json({ message: "Pet não existe!" })

        return res.status(200).json({ pet })
    }

    static async removePetById(req, res) {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: "ID inválido!" })
        }

        const pet = await Pet.findOne({ _id: id })

        if (!pet) return res.status(404).json({ message: "Pet não existe!" })

        // check if logged in user register the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({ message: "Houve um problema, tente mais tarde!" })
        }

        await Pet.findByIdAndRemove(id)
        return res.status(200).json({ message: "Pet removido!" })
    }

    static async editPet(req, res) {
        const id = req.params.id
        const { name, age, weight, color, available } = req.body


        const updatedData = {}

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) return res.status(404).json({ message: "Pet não encontrado!" })

        // check if logged in user register the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            return res.status(422).json({ message: "Houve um problema, tente mais tarde!" })
        }


        // validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' })
        } else {
            updatedData.name = name
        }
        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatória!' })
        } else {
            updatedData.age = age
        }
        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatório!' })
        } else {
            updatedData.weight = weight
        }
        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatório!' })
        } else {
            updatedData.color = color
        }

        //upload de imagens
        const images = req.files

        if (images.length === 0) {
            return res.status(422).json({ message: "As imagens são obrigatorias!" })
        } else {
            updatedData.images = []
            images.map(image => updatedData.images.push(image.filename))
        }

        await Pet.findByIdAndUpdate(id, updatedData)
        return res.status(200).json({ message: "Pet atualizado com sucesso!" })
    }

    static async schedule(req, res) {
        const id = req.params.id

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) return res.status(404).json({ messge: "Pet não existe!" })

        // check if user register the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.equals(user._id)) {
            return res.status(422).json({
                message: "Você não pode agendar um visita com seu próprio pet!"
            })
        }

        // check if user has already schedule
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                return res.status(422).json({
                    message: "Você já agendou um visita para esse pet!"
                })
            }
        }

        //add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        return res.status(201).json({ message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}` })
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id

        // check if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) return res.status(404).json({ messge: "Pet não existe!" })

        // check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (!pet.user._id.equals(user._id)) {
            return res.status(422).json({
                message: "Esse não é seu pet!"
            })
        }

        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)

        return res.status(200).json({ messge: "Parabéns! O ciclo de adoção foi concluido!"})

    }

}