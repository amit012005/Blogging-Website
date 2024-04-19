import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
async function registerUser(req, res, next) {
  const { username, email, password } = req.body;
  console.log(req.body);
  // if (
  //   !username ||
  //   !email ||
  //   !password ||
  //   username === "" ||
  //   email === "" ||
  //   password === ""
  // ) {
  //   next(errorHandler(400, "All fields are required!"));
  // }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(200).json(`Registered Successfully`);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required!"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log(validPassword);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id ,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET);
    console.log("token", token); // Log the token here

    // console.log(res);
    const { password: pass, ...rest } = validUser._doc;
    const responsePayload = { token, ...rest };
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(responsePayload);
  } catch (error) {
    next(error);
  }
}

async function google(req, res, next) {
  const { email, name, googlePhotoUrl } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id ,isAdmin:user.isAdmin}, process.env.JWT_SECRET);
      // console.log(token);
      const { password, ...rest } = user._doc;
      const responsePayload = { token, ...rest };
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(responsePayload);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id ,isAdmin:newUser.isAdmin}, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      const responsePayload = { token, ...rest };
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(responsePayload);
    }
    console.log();
    // res.status(200).json({ message: "all is ok" });
  } catch (error) {
    next(error);
  }
}

export { registerUser, loginUser, google };