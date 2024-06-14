import dbConnect from "~/db/db";
import User from "~/models/user";
export const dynamic = "force-dynamic";
import { NextResponse, NextRequest } from "next/server";
import { encryptText, hashPassword } from "~/utils/helper";
import { userEmailVerificationMail } from "~/utils/emailHandler/emailHandler";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { email, password, fullName } = data;

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 409 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
    });
    await newUser.save();
    const linkToken = await encryptText({ id: newUser._id });
    await userEmailVerificationMail(newUser.email, linkToken);
    return NextResponse.json(
      {
        status: true,
        message:
          "User created, email verification link is sent on registered emai ID.",
        email,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { status: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
