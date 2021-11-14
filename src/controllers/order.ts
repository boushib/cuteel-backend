import { Request, Response } from 'express'
import Order from '../models/order'
import { generateOrder } from '../middlewares/order'
import { generateInvoice } from '../utils'
import io from 'socket.io-client'
import { ObjectId } from 'mongodb'

export const createOrder = async (req: Request, res: Response) => {
  const { currency, shipping, items } = req.body
  const orderId = new ObjectId()
  const _id = orderId.toHexString()
  const { userId } = req.user as any

  const orderObj = generateOrder({
    _id,
    userId,
    shipping,
    items,
    currency,
  })

  orderObj._id = _id

  const invoice = (await generateInvoice(orderObj)) as string
  orderObj.invoice = invoice
  const order = new Order(orderObj)
  order._id = orderId

  order.save((error: any, order: any) => {
    if (error) {
      return res.status(400).json({ error })
    }

    // send notification to the admin dashboard
    const socket = io(process.env.SOCKET_IO_URL!)
    socket.on('connect', () => {
      socket.emit('notification', {
        _id: new ObjectId().toHexString(),
        type: 'order',
        message: 'You got a new order!',
        date: new Date().toISOString(),
        url: `/dashboard/orders/${order._id}`,
        seen: false,
        acted: false,
      })
    })

    res.status(201).json({ order })
  })
}

export const getOrders = (req: Request, res: Response) => {
  Order.find()
    .sort('-createdAt')
    .exec((error: any, orders: any) => {
      if (error) {
        return res.status(400).json({ error })
      }
      res.json({ orders })
    })
}

export const getUserOrders = (req: Request, res: Response) => {
  const { userId } = req.user as any
  Order.find({ userId })
    .sort('-createdAt')
    .exec((error: any, orders: any) => {
      if (error) {
        return res.status(400).json({ error })
      }
      res.json({ orders })
    })
}

export const getOrder = (req: Request, res: Response) => {
  const { id } = req.params
  Order.findById(id, (error: any, order: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (!order) {
      return res.status(404).json({ error: 'This order might not exist!' })
    }
    res.json({ order })
  })
}
