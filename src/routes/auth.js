import express from 'express'
import { register, login, logout, profile } from '../controllers/auth.js'
import { authRequired } from '../middlewares/checkToken.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router