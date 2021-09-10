import { S3 } from 'aws-sdk'
import { randomBytes } from 'crypto'
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const getStorage = (path: string) =>
  multerS3({
    s3,
    acl: 'public-read',
    bucket: 'cuteel',
    metadata: (req: Express.Request, file: Express.Multer.File, cb: any) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req: Express.Request, file: Express.Multer.File, cb: any) => {
      const ext = file.mimetype.split('/')[1]
      const filePath = `${path}${randomBytes(16).toString('hex')}.${ext}`
      cb(null, filePath)
    },
  })

export const uploadToS3 = (path: string) =>
  multer({ storage: getStorage(path) })
