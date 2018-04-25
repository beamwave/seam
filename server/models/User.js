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
  progress: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  shared: {
    type: Array,
    default: []
  },
  wallpaper: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: []
  },
  completed: {
    type: Boolean,
    default: false
  },
  dateCompleted: {
    type: String,
    default: ''
  }
})

const Needs = new Schema({
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
  total: {
    type: Number,
    default: 0
  },
  payment: {
    type: Number,
    default: 0
  },
  method: {
    type: String,
    default: 'growth' // confirm this makes sense to do
  },
  description: {
    type: String,
    default: ''
  },
  shared: {
    type: Array,
    default: []
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
    username: {
      type: String,
      required: true
    },
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
    available: {
      type: Number,
      default: 4
    },
    photo: {
      type: String,
      default:
        'http://res.cloudinary.com/project-phantom/image/upload/v1523817544/global/blank-profile-picture.png'
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
    needs: [Needs]
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
      email: this.email
    },
    process.env.JWT_SECRET
    // { expiresIn: 15 * 60 } // fix check for expired tokens! (redux middleware)
  )
}

// this function determines what is saved in localstorage
schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    email: this.email,
    photo: this.photo,
    confirmed: this.verified,
    token: this.generateJWT()
  }
}

export default mongoose.model('User', schema)
