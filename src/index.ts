import app from './app'
import env from './config/env'

const port = env.PORT || 5000
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`)
  /* eslint-enable no-console */
})
