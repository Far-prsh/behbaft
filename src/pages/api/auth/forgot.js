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

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    // const {  email } = JSON.parse(req.body);
    const { email } = req.body;

    const user = await User.findOne({email})
    if(!user){
      res.status(400).json({message: "email does not exist."})
    }
    const userId = createResetToken({
      id: user._id.toString(),
    });


    const url = `${baseURL}/auth/reset/${userId}`;
    sendEmail(email, url, "", "Reset Password", resetEmailTemplate);
    await db.disconnectDb();
    res.json({ message: "Password reset link is sent to your email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
