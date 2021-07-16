import express from 'express'
import { config } from 'dotenv'

config()

const app = express()

app.get('/', (req, res) => {
  res.json({ data: 'hello' })
})

app.listen(process.env.PORT, () => {
  console.log(`App started at port ${process.env.PORT}`)
})
