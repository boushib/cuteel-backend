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
    res.json({ user: profile })
  })
}

export const getUsers = (req: Request, res: Response) => {
  User.find((error: any, usersDoc: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    const users = usersDoc.map((user: any) => ({
      ...user._doc,
      salt: undefined,
      hashedPassword: undefined,
    }))
    res.json({ users })
  })
}

export const getCustomers = (req: Request, res: Response) => {
  User.find({ roles: ['user'] }, (error: any, usersDoc: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    const users = usersDoc.map((user: any) => ({
      ...user._doc,
      salt: undefined,
      hashedPassword: undefined,
    }))
    res.json({ users })
  })
}

export const updateUser = (req: any, res: Response) => {
  const avatar = req.file?.location
  const fieldsToUpdate = { ...req.body }
  if (avatar) fieldsToUpdate.avatar = avatar
  Object.keys(fieldsToUpdate).map((k) => {
    if (!k) delete fieldsToUpdate[k]
  })
  User.findOneAndUpdate(
    { _id: req.params.id },
    fieldsToUpdate,
    { new: true },
    (error, user) => {
      if (error) {
        return res.status(400).json({ error })
      }
      return res.status(201).json({ user })
    }
  )
}

export const deleteUser = (req: any, res: Response) => {
  const { roles } = req.user as any
  if (!roles.includes('admin')) {
    return res
      .status(401)
      .json({ message: 'This action is only allowed for admin!' })
  }
  User.remove({ _id: req.params.id }, (error: any) => {
    if (error) {
      return res.status(400).json({ error })
    }
    res.status(201).json({ message: 'Product successfully deleted!' })
  })
}
