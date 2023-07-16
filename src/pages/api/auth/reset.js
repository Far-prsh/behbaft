import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "@/utils/validation";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import { createResetToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmail";
import resetEmailTemplate from "@/emails/resetEmailTemplate";

const baseURL = "http://localhost:3000";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    // const {  email } = JSON.parse(req.body);
    const { user_id, password } = req.body;
    const user = User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This account does not exist." });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({ password: cryptedPassword });

    res.json({ email: user.email });

    await db.disconnectDb();
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
