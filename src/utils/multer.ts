import multer from 'multer'

const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
  const { mimetype } = file
  if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
    return cb(new Error('Please upload a valid JPEG or PNG image!'), false)
  }
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    const name = new Date().toISOString() + file.originalname.split(' ').join('-')
    cb(null, name)
  },
})
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter })