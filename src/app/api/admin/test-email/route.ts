import { NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import { sendCompetitionNotificationEmail } from "@/lib/email";

export async function POST() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dummyData = {
      entryId: `CFD-TEST-${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
      entriesCount: 2,
      timestamp: new Date().toISOString(),
      fullName: "Danielle & Admin Test Entrant",
      relationship: "Partner (Getting Married)",
      email: "admin@creativeforgedigital.co.za",
      phone: "+27 82 123 4567",
      residentAge18: true,
      instagramHandle: "creativeforgedigital",
      noInstagram: false,
      facebookHandle: "Creative Forge Digital",
      noFacebook: false,
      tiktokHandle: "creativeforgedigital",
      noTikTok: false,
      coupleNames: "Danielle & Partner (Test Couple)",
      weddingDate: "2027-11-20",
      weddingHashtag: "#DanielleAndPartner2027",
      coupleEmail: "danielle@creativeforgedigital.co.za",
      couplePhone: "+27 82 123 4567",
      commentLink: "https://www.instagram.com/p/DAEXAMPLE123",
      hasCommentScreenshot: false,
      confirmFollow: true,
      hasFollowProof1: true,
      hasFollowProof2: false,
      hasStoryScreenshot: true,
      termsAccepted: true,
      marketingConsent: true,
      clientIp: "127.0.0.1",
      userAgent: "Admin Test Suite",
    };

    const result = await sendCompetitionNotificationEmail(dummyData, [
      {
        filename: "test-proof-sample.txt",
        content: Buffer.from("Creative Forge Digital Verification Sample"),
        contentType: "text/plain",
      },
    ]);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Resend failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Test email dispatched to admin@creativeforgedigital.co.za and danielle@creativeforgedigital.co.za",
      resendId: result.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
