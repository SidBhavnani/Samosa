import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { email } = body;

    const data = await resend.emails.send({
      from: "hello@playsamosa.com",
      // to: "hello@playsamosa.com",
      to: "siddhibhavnani@gmail.com",
      subject: `Samosa Email Subscription`,
      replyTo: email,
      text: `
${email} has requested to be added to our email list.
      `,
    });

    // console.log(data);
    const { error } = data;
    if (error) {
      // console.log(error);
      return NextResponse.json(error, { status: 500 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    // console.log(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
