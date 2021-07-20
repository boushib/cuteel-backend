import { model, Schema, Types } from 'mongoose'

const productSchema = new Schema(
  {
    name: {
      type: String,
      tim: true,
      required: true,
    },
    description: {
      type: String,
      tim: true,
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
    },
    image: {
      contentType: String,
      data: Buffer,
    },
  },
  { timestamps: true }
)

export default model('Product', productSchema)
