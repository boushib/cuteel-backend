import { S3 } from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { randomBytes } from 'crypto'
import { createReadStream } from 'fs'
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3',
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

export const uploadInvoiceToS3 = async (localPath: string) => {
  const path = `invoices/${randomBytes(16).toString('hex')}.pdf`
  const reqParams: PutObjectRequest = {
    Key: path,
    Body: createReadStream(localPath),
    Bucket: 'cuteel',
    ContentType: 'application/pdf',
    ACL: 'public-read',
  }

  return new Promise((resolve, reject) => {
    s3.putObject(reqParams, (error, res) => {
      if (error) {
        reject(error)
      } else {
        resolve('https://cuteel.s3.eu-west-3.amazonaws.com/' + path)
      }
    })
  })
}

export const uploadImageToS3 = multer({ storage })
