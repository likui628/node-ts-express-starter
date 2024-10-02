import express from 'express'

import { userController } from '../../controllers'
import { validate, verifyJwt, verifyRoles } from '../../middlewares'
import { getUsersSchema } from '../../validations/user'

const router = express.Router()

router
  .route('/')
  .get(
    verifyJwt,
    verifyRoles('getUsers'),
    validate(getUsersSchema),
    userController.getUsers,
  )

export default router
