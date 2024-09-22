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

router.post(
  '/login',
  validate(authValidation.userLoginSchema),
  authController.login,
)

export default router
