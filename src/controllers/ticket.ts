import { Request, Response } from 'express'
import Ticket from '../models/ticket'

export const createTicket = (req: Request, res: Response) => {
  const ticket = new Ticket(req.body)
  ticket.save((error: any, ticket: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.status(201).json({ ticket })
  })
}

export const closeTicket = (req: Request, res: Response) => {
  Ticket.findOneAndUpdate(
    { _id: req.params.id },
    { status: 'resolved' },
    { new: true },
    (error, ticket) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(201).json({ ticket })
    }
  )
}

export const getTickets = (req: Request, res: Response) => {
  Ticket.find((error: any, tickets: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ tickets })
  })
}

export const getUserTickets = (req: Request, res: Response) => {
  const { userId } = req.user as any
  Ticket.find({ userId }, (error: any, tickets: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.json({ tickets })
  })
}

export const getTicket = (req: Request, res: Response) => {
  const { id } = req.params
  Ticket.findById(id, (error: any, ticket: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (!ticket) {
      return res.status(404).json({ error: 'This ticket might not exist!' })
    }
    res.json({ ticket })
  })
}
