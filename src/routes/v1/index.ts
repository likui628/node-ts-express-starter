import express, { Request, Response, NextFunction } from 'express'
import authRoute from './auth'
import userRoute from './user'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

if (process.env.NODE_ENV === 'development') {
  const devRoutes = [
    {
      path: '/docs',
      route: async (req: Request, res: Response, next: NextFunction) => {
        const docsRoute = await import('./docs')
        return docsRoute.default(req, res, next)
      },
    },
  ]

  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
