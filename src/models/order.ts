import { model, Schema, Types } from 'mongoose'

const orderSchema = new Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    items: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'Category',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

export default model('Order', orderSchema)
