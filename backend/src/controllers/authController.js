import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import { sendOtpEmail } from "../utils/nodemailer.js";

const saltRounds = 10;
const JWT_SECRET = "anakinskywalker";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const Otp = Math.floor(100000 + Math.random() * 900000).toString();
    const OtpExpireAt = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
      Otp,
      OtpExpireAt,
    });
    await sendOtpEmail(email, Otp);

    res
      .status(201)
      .json({
        status: "success",
        message: "User registered! Please verify OTP to continue",
        email,
      });
  } catch (error) {
    next(error);
  }
};

export const verifyotp = async (req, res, next) => {
  try {
    const { email, Otp } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    if (user.Otp !== Otp || user.otpExpires < new Date()) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or expired OTP" });
    }
    user.Otp = null;
    user.OtpExpireAt = null;
    user.isAccountVerified = true;
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || !user.isAccountVerified) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password." });
    }

    if (!(user.role === role)) {
      return res
        .status(400)
        .json({ status: "error", message: "Your role doesn't match." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ status: "success", message: "Logged in successfully!"});
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const _id = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: "error", message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  const _id = req.user.id;
  const user = await Users.findById(_id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  const {name,email,address,phone,role} = user
  res.status(200).json({ status: "success", user: { name,email,address,phone,role } });
};
