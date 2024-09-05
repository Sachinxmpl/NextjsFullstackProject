import { Resend } from "resend";
import resendEmailTemplate from "../components/resendEmail_Template";

import * as React from "react";

import { ApiResonseInterface } from "@/types/apiresponse";
const resend = new Resend(process.env.R_API);

export async function sendEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResonseInterface> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: `Hello ${username} from sachins dev platform` , 
      react: resendEmailTemplate({
        userFirstname: "Welcome sachin app , Please verify to continue",
        verifyCode
      }) as React.ReactElement,
    });

    return {
      success: true,
      message: "Email send successfully ",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to send email ",
    };
  }
}
