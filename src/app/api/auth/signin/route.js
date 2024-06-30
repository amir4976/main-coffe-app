import {
  genrateRefreshToken,
  genrateToken,
  validateEmail,
  validatePassword,
  verifyPassword,
  validatePhone
} from "@/utils/auth";
import { NextResponse } from "next/server";
import userModel from "../../../../models/User";
import ConnectToDb from "../../../../../configs/db";

export async function POST(req) {
   ConnectToDb()
  const { PhoneOrEmail, password } = await req.json();


  const isValidEmail = validateEmail(PhoneOrEmail);
    if (!isValidEmail) {
      const isValidatePhone = validatePhone(PhoneOrEmail);
        if(!isValidatePhone){
         return NextResponse.json(
        {
          message: "email or phone is not valid!!",
        },
        { status: 204 }
      );
    }
  }
  const isValidPassword = await validatePassword(password);


  if (!isValidEmail || !isValidPassword) {
    return NextResponse.json(
      {
        message: "email or password is wrong!!",
      },
      { status: 404 }
    );
  }


    const isUser =await userModel.findOne({
    $or: [{ email: PhoneOrEmail }, { phone: PhoneOrEmail }]
    });
    console.log(isUser)
  if (!isUser) {
    return NextResponse.json(
      {
        message: "email or password is not found",
      },
      { status: 422 }
    );
  }

  const isPasswordMatch = await verifyPassword(password, isUser.password);
  
  if (!isPasswordMatch) {
    return NextResponse.json(
      {
        message: "email or password is not found",
      },
      { status: 401 }
    );
  }


  const accessToken =await genrateToken({ email:PhoneOrEmail });
  const RefreshToken = await genrateRefreshToken({ email:PhoneOrEmail });
  await userModel.updateOne({ email:PhoneOrEmail }, { refreshToken: RefreshToken });
  
  return NextResponse.json(
    {
      message: "login success",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `Token=${accessToken};path=/;httpOnly;sameSite=strict;secure`,
      },
    }
  );
}
