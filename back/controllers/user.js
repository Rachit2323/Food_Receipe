const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "djbjdbjdsb233";

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirm password do not match",
      });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: false,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      data: firstName,
      token: token,
      message: "Signup Done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while registering the user",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      token: token,
      message: "User signed in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in the user",
    });
  }
};
