import User from '../models/user'
import { Request, Response } from 'express'
import { formatMongoError } from '../utils'

export const signup = (req: Request, res: Response) => {
  const user = new User(req.body)
  user.save((error: any, user: any) => {
    if (error) {
      return res.status(400).json({ error: formatMongoError(error) })
    }
    res.status(201).json({ user })
  })
}
