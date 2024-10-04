import app from './app'
import env from './config/env'
import { logger } from './config/logger'

import './types/custom-express'

const port = env.PORT || 5000
app.listen(port, () => {
  logger.info(`Listening to port ${port}`)
})
