import User from '../models/user'
import { Request, Response } from 'express'
import { formatMongoError } from '../utils'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken' // generate signed token
import expressJwt from 'express-jwt' // authorization check

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

export const signin = (req: Request, res: Response) => {
  const { email, password } = req.body
  User.findOne({ email }, (err: any, user: any) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'User with this email does not exist' })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email & password do not match!' })
    }

    // generate signed token with user id and secret
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: 14 * 24 * 3600 } // 14 days
    )
    res.cookie('token', token, {
      expires: new Date(Date.now() + 10800),
      httpOnly: true,
      // secure: true // https
    })
    const { _id, name, email, roles, avatar, createdAt, updatedAt } = user
    res.json({
      user: { _id, name, email, avatar, roles, createdAt, updatedAt },
      token,
    })
  })
}

export const signout = (req: Request, res: Response) => {
  res.clearCookie('token')
  res.json({ message: 'Signed Out Successfully!' })
}

export const requireAuthentication = expressJwt({
  secret: `${process.env.JWT_SECRET!}`,
  userProperty: 'auth',
  algorithms: [],
})
