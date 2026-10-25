import { ANDROID_LIVE, APP_STORE_URL, PLAY_STORE_URL } from "@/components/store-buttons";

// fahimna.app/get — the one link for social bios and posts. Phones go
// straight to their store; everything else (desktop, unknown) gets the
// landing page. Instagram, TikTok and Facebook in-app browsers keep the
// phone's OS in their user agent, so they route the same way.

export function GET(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";

  let target = "https://fahimna.app/";
  if (/android/i.test(ua)) {
    // Until Android is on Play, its visitors land on the Android signup.
    target = ANDROID_LIVE ? PLAY_STORE_URL : "https://fahimna.app/#android";
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    target = APP_STORE_URL;
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      // The answer depends on the device, so no shared cache may keep it.
      "Cache-Control": "private, no-store",
      Vary: "User-Agent",
    },
  });
}
