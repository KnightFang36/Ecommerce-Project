import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Login request body:", reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }
    //compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    //crate token data
    const tokenData = {
        id: user._id,  
        email: user.email,
        username: user.username,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",    
    });

    const response= NextResponse.json(
      {
        message: "Login successful",
        success: true,     
      })         
    response.cookies.set("token",token,{
        httpOnly:true,
                
    })
    
    return response;

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
