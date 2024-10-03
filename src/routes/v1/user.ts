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

router
  .route('/:userId')
  .get(
    verifyJwt,
    verifyRoles('getUsers'),
    validate(userValidation.getUserSchema),
    userController.getUser,
  )
  .patch(
    verifyJwt,
    verifyRoles('manageUsers'),
    validate(userValidation.updateUserSchema),
    userController.updateUser,
  )
  .delete(
    verifyJwt,
    verifyRoles('manageUsers'),
    validate(userValidation.deleteUserSchema),
    userController.deleteUser,
  )

export default router
