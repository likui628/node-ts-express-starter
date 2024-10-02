import express from 'express'

import { userController } from '../../controllers'
import { validate, verifyJwt, verifyRoles } from '../../middlewares'
import { userValidation } from '../../validations'

const router = express.Router()

router
  .route('/')
  .get(
    verifyJwt,
    verifyRoles('getUsers'),
    validate(userValidation.getUsersSchema),
    userController.getUsers,
  )
  .post(
    verifyJwt,
    verifyRoles('manageUsers'),
    validate(userValidation.createUserSchema),
    userController.createUser,
  )

export default router
