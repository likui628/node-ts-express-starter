import app from './app'
import config from './config/config'

const port = config.PORT || 5000
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`)
  /* eslint-enable no-console */
})
