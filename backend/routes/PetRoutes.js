import { Router } from "express";
const router = Router()
import { PetController } from "../controllers/Petcontroller.js";
import { checkToken } from "../helpers/verify-token.js";
import { imageUpload } from "../helpers/image-upload.js";

router.post('/create', checkToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', checkToken, PetController.getAllUserPets)
router.get('/myadoptions', checkToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/delete/:id', checkToken, PetController.removePetById)
router.patch('/edit/:id', imageUpload.array('images'), PetController.editPet)
router.patch('/schedule/:id', checkToken, PetController.schedule)
router.patch('/conclude/:id', checkToken, PetController.concludeAdoption)

const PetRoutes = router

export { PetRoutes }