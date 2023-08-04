const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashpassword,
    });

    req.session.user = newUser;

    res.status(201).json({
      status: "Success: Create user",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail: Create user",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: "Fail: User not found",
        message: "User not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;

      res.status(200).json({
        status: "Success: Password match",
      });
    } else {
      res.status(400).json({
        status: "Fail: Password mismatch",
        message: "Incorrect username or password",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Fail: Login user",
    });
  }
};
