import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "@/utils/validation";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmail";
import activateEmailTemplate from "@/emails/activateEmailTemplate";

const baseURL = "http://localhost:3000";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    // const { name, email, password } = JSON.parse(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });
    const addedUser = await newUser.save();

    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });

    const url = `${baseURL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your email", activateEmailTemplate);
    await db.disconnectDb();
    res.json({ message: "Register success, Please activate your email" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
