import { check } from 'express-validator'

export const signupValidator = [
  check('name').notEmpty().withMessage('Name is required!'),
  check('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please provide a valid email!'),
  check('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 6 })
    .withMessage('Password should at least 6 characters long!'),
]
