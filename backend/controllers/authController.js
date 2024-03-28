import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
async function authUser(req, res, next) {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

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
export { authUser };
