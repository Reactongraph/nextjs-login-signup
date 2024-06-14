import { NextRequest, NextResponse } from "next/server";
import dbConnect from "~/db/db";
import { decode } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { sessionToken } = data;
    const tokenData: any = await decode({
      token: sessionToken,
      secret: process.env.NEXT_PUBLIC_JWT_KEY || "",
    });

    if (!tokenData || !tokenData?._id) {
      return NextResponse.json({ status: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        status: true,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
