import dbConnect from "~/db/db";
import User from "~/models/user";
import { NextResponse, NextRequest } from "next/server";
import { validateUser } from "~/utils/helper";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    let user = await validateUser();
    const data = await req.json();
    const { email } = data;

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 409 }
      );
    }

    user = await User.findByIdAndUpdate(user._id, { email }, { new: true });

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
