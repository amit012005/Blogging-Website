import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
async function authUser(req, res) {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required!" });
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
    res.status(500).json({ message: error.message });
  }
}
export { authUser };
