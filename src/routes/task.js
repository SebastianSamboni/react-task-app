import { Router } from 'express'
import {authRequired} from '../middlewares/checkToken.js'

const router = Router()

router.get('/tasks', authRequired, )
router.get('/tasks/:id', authRequired, )
router.post('/tasks/:id', authRequired, )
router.delete('/tasks/:id', authRequired, )
router.put('/tasks/:id', authRequired, )

export default router