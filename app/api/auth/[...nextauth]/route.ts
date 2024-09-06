import { NextResponse } from "next/server";
import NextAuth from "next-auth";

const handler = NextAuth({

})

export {
    handler as GET , 
    handler as POST
}