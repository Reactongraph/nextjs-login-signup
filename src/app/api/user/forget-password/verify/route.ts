import { NextRequest, NextResponse } from "next/server";
import dbConnect from "~/db/db";
import User from "~/models/user";
import { decryptText } from "~/utils/helper";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { token } = data;

    if (!token) {
      return NextResponse.json({ status: false }, { status: 200 });
    }

    const tokenData: any = await decryptText(token);
    if (!tokenData || !tokenData?.id) {
      return NextResponse.json({ status: false }, { status: 200 });
    }

    const hasUser = await User.findOne({
      _id: tokenData.id,
      resetPasswordToken: token,
    });

    if (!hasUser) {
      return NextResponse.json({ status: false }, { status: 200 });
    }

    return NextResponse.json({ status: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { status: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
