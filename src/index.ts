import express from 'express'
import { config } from 'dotenv'
import { MongoClient } from 'mongodb'

config()

const app = express()

MongoClient.connect(process.env.DATABASE_URL!, (error, client) => {
  if (error) throw error
  const db = client?.db('cuteel')
  db?.collection('test')
    .find()
    .toArray((error, res) => {
      if (error) throw error
      console.log(res)
    })
})

app.get('/', (req, res) => {
  res.json({ data: 'hello' })
})

app.listen(process.env.PORT, () => {
  console.log(`App started at port ${process.env.PORT}`)
})
