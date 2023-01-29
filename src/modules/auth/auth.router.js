import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { endPoints } from "./auth.endPoint.js";
import { signUpSchema, updateRoleSchema } from "./auth.validation.js";
import * as registerControl from './controller/registration.js'

const router = Router()


router.post('/signUp',validation(signUpSchema),registerControl.signUp)
router.get('/confirmEmail/:token',registerControl.confirmEmail)
router.get('/refreshToken/:token',registerControl.refreshToken)
router.post('/logIn',registerControl.logIn)
router.put('/updateRole',validation(updateRoleSchema),auth(endPoints.updateRole),registerControl.updateRole)

router.post('/sendCode',registerControl.sendCode)
router.post('/forgetPassword',registerControl.forgetPassword)




export default router