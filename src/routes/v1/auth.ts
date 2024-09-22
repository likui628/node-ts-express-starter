import express from 'express'
import { validate } from '../../middlewares'
import { authValidation } from '../../validations'
import { authController } from '../../controllers'

const router = express.Router()

router.post(
  '/register',
  validate(authValidation.userRegisterSchema),
  authController.register,
)

export default router
