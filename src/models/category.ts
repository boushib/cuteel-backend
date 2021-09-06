import { model, Schema } from 'mongoose'

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 320,
    },
  },
  { timestamps: true }
)

export default model('Category', categorySchema)
