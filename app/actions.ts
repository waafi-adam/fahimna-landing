"use server";

import { Resend } from "resend";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("Waitlist not configured: missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
    return {
      status: "error",
      message: "Waitlist isn't live yet — try again shortly.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    // Resend returns 200 even for already-existing contacts with no error;
    // the only real failures are network or auth issues.
    if (error) {
      console.error("Resend contacts.create error:", error);
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      status: "success",
      message: "You're on the list. JazakAllah khayran — we'll be in touch.",
    };
  } catch (err) {
    console.error("joinWaitlist threw:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
