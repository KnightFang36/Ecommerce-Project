import {connect} from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import{NextRequest,NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody;

        console.log("Signup request body:", reqBody);

        // Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"},
            {status:400});
        }

        // Hash password
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword= await bcrypt.hash(password,salt)

        // Create new user
        const newUser=new User({
            username,
            email,
            password:hashedPassword,
        });

        

        const savedUser=await newUser.save();
        console.log("New user created:", savedUser);
        
        return NextResponse.json(
            {message:"User created successfully",
            success:true,
            savedUser
            }
            );

        
    } catch (error:any) {
        return NextResponse.json({message:error.message},
            {status:500});
    }

}
