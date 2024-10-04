import packageJson from '../../package.json'
import env from '../config/env'

export const swaggerDef = {
  apis: ['src/docs/*.yml', 'src/routes/v1/*.ts'],
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      license: {
        name: packageJson.license,
        url: `${packageJson.repository.url}/blob/main/LICENSE`,
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/v1`,
      },
    ],
  },
}
