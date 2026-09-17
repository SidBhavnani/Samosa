import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, message, subject, turnstileToken } = body;

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          error: "Turnstile verification failed",
        },
        { status: 403 },
      );
    }

    const data = await resend.emails.send({
      from: "hello@playsamosa.com",
      to: "hello@playsamosa.com",
      // to: "siddhibhavnani@gmail.com",
      subject: `Samosa Contact - ${name}`,
      replyTo: email,
      text: `
Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
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
