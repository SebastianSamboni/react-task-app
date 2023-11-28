import express from 'express'
import { register, login, logout, profile } from '../controllers/auth.js'
import { authRequired } from '../middlewares/checkToken.js'
import { validateSchema } from '../middlewares/validator.js'
import { registerSchema, loginSchema } from '../schemas/auth.js'

const router = express.Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router