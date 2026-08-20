import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_REQUEST" },
      { status: 400 }
    );
  }

  const raw = payload as Record<string, unknown>;

  // Honeypot: pretend success without sending an email.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!process.env.RESEND_API_KEY || !from || !to) {
    console.error("Contact email is not configured (RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)");
    return NextResponse.json(
      { ok: false, error: "SEND_ERROR" },
      { status: 500 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "SEND_ERROR" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Resend send failed:", err);
    return NextResponse.json(
      { ok: false, error: "SEND_ERROR" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}