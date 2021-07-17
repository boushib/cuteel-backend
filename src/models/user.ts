import { Schema, model } from 'mongoose'
import { createHmac } from 'crypto'
import { v4 as uuid } from 'uuid'

// interface IUser extends Document {
//   name: {
//     type: String
//     trim: true
//     required: true
//     maxlength: 32
//   }
//   email: {
//     type: String
//     trim: true
//     required: true
//     unique: true
//   }
//   hashedPassword: {
//     type: String
//     required: true
//   }
//   _password: String
//   about: {
//     type: String
//     trim: true
//   }
//   salt: String
//   roles: {
//     type: [String]
//     default: ['user']
//   }
//   history: {
//     type: Array<any>
//     default: []
//   }
//   // encryptPassword: (password: String) => String
//   encryptPassword: (password: String) => {
//     type: String
//     required: true
//   }
// }

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
    history: {
      type: Array,
      default: [],
    },
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
}

export default model('User', userSchema)
