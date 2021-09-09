import { S3 } from 'aws-sdk'
import { randomBytes } from 'crypto'
import multer from 'multer'
import multerS3 from 'multer-s3'

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

const storage = multerS3({
  s3,
  acl: 'public-read',
  bucket: 'cuteel',
  metadata: (req: Express.Request, file: Express.Multer.File, cb: any) => {
    cb(null, { fieldName: file.fieldname })
  },
  key: (req: Express.Request, file: Express.Multer.File, cb: any) => {
    const ext = file.mimetype.split('/')[1]
    const filePath = `images/products/${randomBytes(16).toString('hex')}.${ext}`
    cb(null, filePath)
  },
})

export const uploadToS3 = multer({ storage })

//AWS.config.update({ region: 'us-west-2' })
