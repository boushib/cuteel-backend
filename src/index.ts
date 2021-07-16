import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ data: 'hello' })
})

const PORT = 8080

app.listen(PORT, () => {
  console.log(`App started at port ${PORT}`)
})
