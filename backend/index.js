import express from 'express'
import cors from 'cors'
const app = express()

// Config json
app.use(express.json())

// Solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

// Public folders for image
app.use(express.static('public'))

// Routes
import { UserRotes } from './routes/UserRotes.js'
import { PetRoutes } from './routes/PetRoutes.js'
app.use('/users', UserRotes)
app.use('/pets', PetRoutes )


app.listen(5000)