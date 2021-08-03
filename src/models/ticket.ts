import { model, Schema, Types } from 'mongoose'

const ticketSchema = new Schema(
  {
    subject: {
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
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      trim: true,
      default: 'open',
    },
  },
  { timestamps: true }
)

export default model('Ticket', ticketSchema)
