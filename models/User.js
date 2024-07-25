const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true } // Ensure password is required
})

// Password hash middleware.
UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }

  bcryptjs.genSalt(10, (err, salt) => {
    if (err) { return next(err) }

    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err)
      resolve(isMatch)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)

