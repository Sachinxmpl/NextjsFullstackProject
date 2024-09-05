
import { Resend } from "resend";
import resendEmailTemplate from "../components/resendEmail_Template"

import * as React from "react";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.R_API);

export async function sendEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ["sachinxmpl6@gmail.com"],
      subject : "Hello world from resend email.com" , 
      react  : resendEmailTemplate({userFirstname : "Hi is Scachin"}) as React.ReactElement
    });
    if(error){
        return NextResponse.json({error} , {status : 500})
    }
    return NextResponse.json({data} ,{status : 200})
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
