import { Router } from 'express'
import { auth } from '../helper/auth.js'
import { getTasks, postTask, deleteTaskController } from '../controllers/TaskController.js'

const router = Router()

router.get('/', getTasks)
router.post('/create', auth, postTask)
router.delete('/delete/:id', auth, deleteTaskController)

export default router
