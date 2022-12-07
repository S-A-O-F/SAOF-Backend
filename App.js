require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT

app.listen(port, () => {
  logger.info(`Server initialized, runnig at port ${port}`)
})