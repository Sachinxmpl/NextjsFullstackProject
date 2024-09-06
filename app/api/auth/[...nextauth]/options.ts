import { NextRequest , NextResponse } from "next/server";


export async function GET(){
    console.log("Inside the get function")
    return NextResponse.json({message : "heelow world "})
}