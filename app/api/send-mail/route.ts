import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const { to, subject, message } = await request.json();

  try {
    const data = await resend.emails.send({
      from: "PureHive <onboarding@resend.dev>", // or your verified sender domain
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}
