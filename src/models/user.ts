import { Schema, model, Types } from 'mongoose'
import { createHmac } from 'crypto'
import { v4 as uuid } from 'uuid'

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    roles: {
      type: [String],
      default: ['user'],
    },
    products: [
      {
        type: Types.ObjectId,
        ref: 'Product',
      },
    ],
    orders: [
      {
        type: Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true }
)

// virtual fields
userSchema
  .virtual('password')
  .set(function (this: any, password: string) {
    this._password = password
    this.salt = uuid()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function (this: any) {
    return this._password
  })

userSchema.methods = {
  encryptPassword: function (this: any, password) {
    if (!password) return ''
    try {
      return createHmac('sha1', this.salt as string)
        .update(password)
        .digest('hex')
    } catch (error) {
      return ''
    }
  },
  authenticate: function (this: any, password) {
    return this.encryptPassword(password) === this.hashedPassword
  },
}

export default model('User', userSchema)
