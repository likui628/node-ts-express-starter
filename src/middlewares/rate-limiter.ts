import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skipSuccessfulRequests: true,
  handler: (_req, res, _next) => {
    res.jsonFail(429, 'Too many requests, please try again later.')
  },
})
