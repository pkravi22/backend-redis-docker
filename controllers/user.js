import Todo from "../model/todo.js";
import user from "../model/user.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const { firstname, email, lastname, password } = req.body;
    console.log(firstname, lastname, email, password);

    const findUser = await user.findOne({ email });

    if (findUser) {
      return res.status(403).json({
        success: true,
        message: "User already registeed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
    const newUser = await user.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "user registered successfully", data: newUser });
  } catch (err) {
    console.log("error while registering user", err);
  }
};

export const loginUser = async (req, res) => {
  try {
    //const user=req.body;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill all feilds",
      });
    }

    const existingUser = await user.findOne({ email }); // ✅ Corrected
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const accessToken = await jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(accessToken);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken
    });
  } catch (e) {
    console.log("Error during login:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
