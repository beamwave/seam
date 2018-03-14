import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    verifiedToken: {
      type: String,
      default: ''
    },
    stripe: {
      type: String,
      defualt: ''
    }
  },
  {
    timestamps: true
  }
)

// helper functions available for use when models imported

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10)
}

schema.methods.setVerificationToken = function setVerificationToken() {
  this.verifiedToken = this.generateJWT()
}

// schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
//   return `${process.env.HOST}/verification/${this.verifiedToken}`
// }

schema.plugin(uniqueValidator, { message: 'This email is already taken.' })

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET
  )
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.verified,
    token: this.generateJWT()
  }
}

export default mongoose.model('User', schema)
