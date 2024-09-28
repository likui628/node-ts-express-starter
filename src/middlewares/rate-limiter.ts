import rateLimit from 'express-rate-limit'
import { errorResponse } from '../utils'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skipSuccessfulRequests: true,
  handler: (_req, res, _next) => {
    return errorResponse(
      res,
      'rate-limit',
      429,
      'Too many requests, please try again later.',
    )
  },
})
