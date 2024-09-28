import morgan from 'morgan'
import { logger } from './logger'

const getIpFormat = () =>
  process.env.NODE_ENV === 'production' ? ':remote-addr - ' : ''
const successResponseFormat = `${getIpFormat()} :method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()} :method :url :status - :response-time ms`

const successHandler = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: {
    write: (message) => logger.info(message),
  },
})

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: {
    write: (message) => logger.error(message),
  },
})

export default { successHandler, errorHandler }
