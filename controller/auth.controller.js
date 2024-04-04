const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma.js");




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

     console.log(newUser);

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
  try {
    // Your login logic here
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};
