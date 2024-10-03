import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerDef } from '../../docs/swaggerDef'

const swaggerSpec = swaggerJSDoc(swaggerDef)

const router = express.Router()
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router
