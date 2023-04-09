import { Router } from "express";
const router = Router()
import { UserController } from "../controllers/UserContollers.js";

import { checkToken } from "../helpers/verify-token.js";

router.post('/register', UserController.register )
router.post('/login', UserController.login )
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', checkToken, UserController.editUser)

const UserRotes = router
export { UserRotes }
