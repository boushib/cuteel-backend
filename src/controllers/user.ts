import User from '../models/user'
import { Request, Response } from 'express'
import { formatMongoError } from '../utils'
import { validationResult } from 'express-validator'

export const signup = (req: Request, res: Response) => {
  const user = new User(req.body)
  user.save((err: any, user: any) => {
    const errors = validationResult(req)
      .array()
      .map((err) => err.msg)

    if (err || errors.length) {
      let error = ''
      if (errors?.length) error = errors[0]
      if (err) error = formatMongoError(err)
      return res.status(400).json({ error })
    }

    res.status(201).json({ user })
  })
}
