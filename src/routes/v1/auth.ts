import express from 'express'
import { validate } from '../../middlewares'
import { authValidation } from '../../validations'
import { authController } from '../../controllers'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *             - name
 *             - email
 *             - password
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *                description: must be unique
 *              password:
 *                type: string
 *                format: password
 *                minLength: 8
 *                description: at least one uppercase letter, one lowercase letter, one number, and one special character
 *          example:
 *            name: fake name
 *            email: fake@example.com
 *            password: Aa123123@
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
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

router.get('/logout', authController.logout)

router.get('/refresh', authController.refresh)

export default router
