import { Request, Response } from 'express'
import { ObjectID } from 'mongodb'
import Order from '../models/order'
import { generateOrder } from '../middlewares/order'
import { generateInvoice } from '../utils'

export const createOrder = async (req: Request, res: Response) => {
  const { currency, shipping, items } = req.body
  const orderId = new ObjectID()
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
    res.status(201).json({ order })
  })
}

export const getOrders = (req: Request, res: Response) => {
  Order.find((error: any, orders: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ orders })
  })
}

export const getUserOrders = (req: Request, res: Response) => {
  const { userId } = req.user as any
  Order.find({ userId }, (error: any, orders: any) => {
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
