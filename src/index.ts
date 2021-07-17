import express from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

// import routes
import userRoutes from './routes/user'

config()

const app = express()

connect(
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

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// route middleware
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ data: 'hello' })
})

app.listen(process.env.PORT, () => {
  console.log(`App started at port ${process.env.PORT}`)
})
