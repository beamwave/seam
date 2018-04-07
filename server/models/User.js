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
      default: ''
    },
    images: {
      // place in wants & needs
      type: Array,
      default: []
    },
    wants: {},
    needs: {}
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

// YOU HAVE TO STORE DECODABLE STATE PROPERTIES IN HERE!
schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      images: this.images
    },
    process.env.JWT_SECRET
  )
}

// this function determines what is saved in localstorage
schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.verified,
    images: this.images,
    token: this.generateJWT()
  }
}

export default mongoose.model('User', schema)
