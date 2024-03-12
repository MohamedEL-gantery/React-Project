const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const expressHandler = require('express-async-handler');
const User = require('../models/userModel');
const userValidation = require('../utils/validation/userValidation');
const createToken = require('../utils/createToken');
const uploadMedia = require('../utils/uploadMedia');
const AppError = require('../utils/appError');

exports.signup = expressHandler(async (req, res, next) => {
  const uploadRes = await uploadMedia(req.file.path);
  const { error, value } = userValidation.newUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    media: uploadRes.secure_url,
  });

  if (error) {
    console.log(error);
    return next(new AppError('Please Enter Valid Data', 400));
  }

  const existingUser = await User.findOne({ email: value.email });
  if (existingUser) {
    return next(new AppError('Email already exists', 400));
  }

  console.log(value);
  const newUser = await User.create(value);

  res.status(201).json({
    status: 'success',
  });
});

exports.login = expressHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email And Password Are Required', 400));
  }

  const user = await User.findOne({ email: email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email Or Password', 400));
  }

  createToken(user, 200, req, res);
});

exports.protected = expressHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You Are Not Logged In! Please Log In To Get Access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The User Belonging To This Token Does No Longer Exist', 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({ status: 'success' });
};
