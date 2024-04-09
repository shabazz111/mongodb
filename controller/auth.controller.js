const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma.js");
const jwtToken = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any required field is missing
    if (!username || !email || !password) {
      throw new Error("Please fill all the required fields.");
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    // Send success response with the created user data
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    // Handle errors
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during user registration.",
      error: error.message,
    });
  }
};

// Placeholder for login function
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Your login logic here
    // check the user exists //
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not found",
        error: error.message,
      });
    // check the password //
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
        error: error.message,
      });
    // generate cookie token //
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwtToken.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true
        maxAge: age,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully.",
        user: user,
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "User logged out successfully." });
};
