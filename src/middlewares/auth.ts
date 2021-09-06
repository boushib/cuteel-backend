import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const useAuth = (req: Request, res: Response, next: Function) => {
  const header = req.get('Authorization')
  if (!header) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }
  const token = header.split(' ')[1]
  if (!token) return
  const decodedToken: any = verify(token, process.env.JWT_SECRET!)
  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  req.user = decodedToken.userId
  next()
}
