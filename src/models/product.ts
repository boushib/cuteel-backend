import { model, Schema, Types } from 'mongoose'

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
  },
  { timestamps: true }
)

export default model('Product', productSchema)
