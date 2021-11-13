import { model, Schema, Types } from 'mongoose'

const getRating = (r: any) => {
  delete r._id
  const ratings: Array<Array<string>> = Object.entries(r)

  if (ratings === undefined) return { rating: 0, totalRatings: 0 }

  let rating = 0
  let sum = 0
  let totalRatings: number = 0

  for (let [key, value] of ratings) {
    const v = parseInt(value)
    totalRatings += v
    sum += parseInt(key) * v
  }

  if (totalRatings > 0) {
    rating = Math.round(sum / totalRatings)
  }

  if (totalRatings === 0) return 0
  return sum / totalRatings
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    image: {
      // contentType: String,
      // data: Buffer,
      type: String,
      trim: true,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: {
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
      },
      default: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      get: getRating,
    },
  },
  { timestamps: true }
)

export default model('Product', productSchema)
