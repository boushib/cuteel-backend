import User from '../models/user'
import { Request, Response } from 'express'

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params
  User.findById(id, (error: any, user: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (!user) {
      return res.status(404).json({ error: 'Cannot find a user with this id' })
    }
    const profile = { ...user._doc, salt: undefined, hashedPassword: undefined }
    res.json({ profile })
  })
}
