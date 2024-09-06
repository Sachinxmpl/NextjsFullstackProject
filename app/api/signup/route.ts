import { connectDb } from "../../../lib/conectDb";
import UserModel from "@/models/models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../lib/resend";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  try {
    await connectDb();
    const Verifieduser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (Verifieduser) {
      return (
        NextResponse.json({
          success: false,
          message: "Username already taken",
        }),
        {
          status: 401,
        }
      );
    }

    const unverifiedUser = await UserModel.findOne({ username });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (unverifiedUser) {
        
        const hashedPassword = await bcrypt.hash(password, 10)
        unverifiedUser.password = hashedPassword 
        unverifiedUser.verifyCode = verifyCode
        unverifiedUser.verifyCodeExpiry  = expiryDate
        await unverifiedUser.save()
    } else {

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
    }

    //send email to verify
    const resendEmailResponse = await sendEmail(email, username, verifyCode);

    if (!resendEmailResponse.success) {
      return (
        NextResponse.json({
          success: false,
          message: resendEmailResponse.message,
        }),
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Please verify your email ",
    });
  } catch (e) {
    console.log("Error found in signup route ");
    return NextResponse.json({
      success: false,
      message: "something went wrong ",
    });
  }
}
