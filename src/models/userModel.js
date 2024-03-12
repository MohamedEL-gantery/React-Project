const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      validate: [validator.isEmail, 'Enter A Valid Email'],
    },
    password: {
      type: String,
      validate: [
        validator.isStrongPassword,
        'Enter A Strong Password With minLength: 8,  minlowercase letter:1 ,minlowercase letter:1 min number:1, min symbol:1',
      ],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Password Are not the same',
      },
    },
    media: {
      type: String,
      required: [true, 'Please Upload Photo'],
      default: 'default.jpg',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
