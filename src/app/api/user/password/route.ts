import dbConnect from "~/db/db";
import User from "~/models/user";
import { NextResponse, NextRequest } from "next/server";
import { comparePassword, hashPassword, validateUser } from "~/utils/helper";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    let user = await validateUser();
    const data = await req.json();
    const { password, newPassword } = data;
    const isPasswordVerified = await comparePassword(password, user.password);
    if (!isPasswordVerified) {
      return NextResponse.json(
        { status: false, message: "Old password in not correct." },
        { status: 404 }
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    user = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Updated successfully.",
        status: true,
        data: { email: user.email },
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
