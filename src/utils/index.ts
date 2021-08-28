export * from './multer'

export const formatMongoError = (error: any) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0]
    return `An account with this ${field} already exists!`
  }
  // return 'Error saving data to database'
  return error
}
