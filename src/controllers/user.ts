import User from '../models/user'
import { Request, Response } from 'express'

export const signup = (req: Request, res: Response) => {
  const user = new User(req.body)
  user.save((error: any, user: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.status(201).json({ user })
  })
}
