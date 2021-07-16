import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
// import routes
import userRoutes from './routes/users'

config()

const app = express()

mongoose.connect(
  process.env.DATABASE_URL!,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log('Error connecting to MongoDB')
    } else {
      console.log('Connected  successfully to MongoDB!')
    }
  }
)

// route middleware
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ data: 'hello' })
})

app.listen(process.env.PORT, () => {
  console.log(`App started at port ${process.env.PORT}`)
})
