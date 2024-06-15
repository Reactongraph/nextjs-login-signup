import dbConnect from "~/db/db";
import User from "~/models/user";
import { NextResponse, NextRequest } from "next/server";
import {
  deleteImageFromCloudinary,
  encryptText,
  getFileBuffer,
  hashPassword,
  selectFromObj,
  uploadImageToCloudinary,
  userPublicData,
  validateUser,
} from "~/utils/helper";
import { userEmailVerificationMail } from "~/utils/emailHandler/emailHandler";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { email, password, fullName } = data;

    // Checking is email already taken
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 409 }
      );
    }
    // Hashing password
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
    });
    await newUser.save();
    const linkToken = await encryptText({ id: newUser._id });

    // Verification mail
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

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    // Validation
    let user = await validateUser();
    const multipartData = await req.formData();

    const data: any = {};
    data.fullName = multipartData.get("fullName");
    data.phone = multipartData.get("phone");
    const avatar = multipartData.get("avatar");

    if (avatar) {
      const buffer = await getFileBuffer(avatar);

      // Saving image in cloudinary
      const avatarUrl = await uploadImageToCloudinary(
        buffer,
        `avatar_${Date.now()}`
      );
      if (avatarUrl) {
        data.avatar = avatarUrl;

        // deleting old image if image is given
        if (user.avatar) {
          await deleteImageFromCloudinary(user.avatar);
        }
      }
    }

    user = await User.findByIdAndUpdate(user._id, data, { new: true });

    return NextResponse.json(
      {
        message: "Updated successfully.",
        status: true,
        data: selectFromObj(user, userPublicData),
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
