import express from 'express'
import authRoute from './auth'
import userRoute from './user'
import docsRoute from './docs'

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

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
]

if (process.env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export default router
