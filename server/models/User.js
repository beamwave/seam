import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import uniqueValidator from 'mongoose-unique-validator'

const Wants = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  percent: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  wallpaper: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: []
  }
})

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
    points: {
      type: Number,
      default: 100,
      min: 0,
      max: 100
    },
    undistributedCash: {
      type: Number,
      default: 0
    },
    wants: [Wants],
    needs: {
      type: Array,
      default: []
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

// YOU HAVE TO STORE DECODABLE STATE PROPERTIES IN HERE!
schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      wants: this.wants
      // images: this.images
    },
    process.env.JWT_SECRET,
    { expiresIn: 2 } // fix check for expired tokens! (redux middleware)
  )
}

// this function determines what is saved in localstorage
schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.verified,
    wants: this.wants,
    token: this.generateJWT()
  }
}

export default mongoose.model('User', schema)
