const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

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
