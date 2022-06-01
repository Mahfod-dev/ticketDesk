const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

console.log(process.env.JWT_SECRET);

//@desc register user
//@route /api/users/register
//@acces public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please includes all fields');
  }

  //Find Users
  const userExists = await User.findOne({ email });
  console.log(userExists);
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password

  // const salt = await bcrypt.genSalt(10)

  // const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.createJWT();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc login user
//@route /api/users/login
//@acces public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const token = user.createJWT();

  const isMatchPassword = await user.comparePassword(password);

  if (isMatchPassword) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401).json({
      message: 'invalid credentials',
    });
    throw new Error('Invalid credentials');
  }
});

//@desc register user
//@route /api/users/me
//@acces private

const getMe = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };

  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
