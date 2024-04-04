const bcrypt = require("bcrypt");
// const prisma = require("../lib/prisma");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("<<>>",req.body);

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
    console.log("new User", newUser);
    console.log("new", newUser);
  } catch (error) {
    console.log("error", error);
  }
};

// exports.login = async (req, res) => {
//   try {
//     // Your login logic here
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// exports.logout = async (req, res) => {
//   try {
//     // Your logout logic here
//   } catch (error) {
//     console.log("error", error);
//   }
// };
