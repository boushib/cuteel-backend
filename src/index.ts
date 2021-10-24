import express from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import categoryRoutes from './routes/category'
import productRoutes from './routes/product'
import ordersRoutes from './routes/order'
import ticketRoutes from './routes/ticket'
import paymentRoutes from './routes/payment'

config()
const app = express()
connect(
  process.env.DATABASE_URL!,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log('Error connecting to MongoDB')
    } else {
      console.log('Connected  successfully to MongoDB!')
    }
  }
)

// middlewares
app.use('/uploads', express.static('uploads'))
app.use('/invoices', express.static('invoices'))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// route middleware
app.use('/auth', authRoutes)
app.use('/', [
  userRoutes,
  categoryRoutes,
  productRoutes,
  ordersRoutes,
  ticketRoutes,
  paymentRoutes,
])

app.listen(process.env.PORT, () => {
  console.log(`App started at port ${process.env.PORT}`)
})
