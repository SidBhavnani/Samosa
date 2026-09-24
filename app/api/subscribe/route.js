import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { email } = body;

    const now = new Date().toISOString();

    const response = await fetch("https://api.omnisend.com/api/contacts", {
      method: "POST",
      headers: {
        Authorization: `Omnisend-API-Key ${process.env.OMNISEND_API_KEY}`,
        "Omnisend-Version": "2026-03-15",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifiers: [
          {
            type: "email",
            id: email,
            channels: {
              email: {
                status: "subscribed",
                statusChangedAt: now,
              },
            },
            consent: {
              source: "playsamosa.com newsletter form",
              createdAt: now,
              ip:
                req.headers.get("x-forwarded-for") ||
                req.headers.get("x-real-ip") ||
                undefined,
              userAgent: req.headers.get("user-agent") || undefined,
            },
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Omnisend error:", data);

      return Response.json(
        {
          success: false,
          error: "Unable to subscribe. Please try again.",
        },
        { status: response.status },
      );
    }

    //     const data = await resend.emails.send({
    //       from: "hello@playsamosa.com",
    //       to: "hello@playsamosa.com",
    //       // to: "siddhibhavnani@gmail.com",
    //       subject: `Samosa Email Subscription`,
    //       replyTo: email,
    //       text: `
    // ${email} has requested to be added to our email list.
    //       `,
    //     });

    // console.log(data);
    // const { error } = data;
    // if (error) {
    //   // console.log(error);
    //   return NextResponse.json(error, { status: 500 });
    // }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
