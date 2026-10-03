import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { insertCompetitionEntry, getDbPool } from "@/lib/db";
import {
  sendCompetitionNotificationEmail,
  EmailAttachment,
  CompetitionEmailData,
} from "@/lib/email";

// SA Phone Validation helper
const validateSAPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^(0|\+27)[6-8][0-9]{8}$/.test(cleaned);
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fullName = (formData.get("fullName") as string)?.trim();
    const relationship = (formData.get("relationship") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const residentAge18 = (formData.get("residentAge18") as string)?.trim();

    const instagramHandle = (formData.get("instagramHandle") as string)?.trim() || "";
    const noInstagram = formData.get("noInstagram") === "true";
    const facebookHandle = (formData.get("facebookHandle") as string)?.trim() || "";
    const noFacebook = formData.get("noFacebook") === "true";
    const tiktokHandle = (formData.get("tiktokHandle") as string)?.trim() || "";
    const noTikTok = formData.get("noTikTok") === "true";

    const coupleNames = (formData.get("coupleNames") as string)?.trim() || fullName;
    const weddingDate = (formData.get("weddingDate") as string)?.trim();
    const weddingHashtag = (formData.get("weddingHashtag") as string)?.trim();
    const coupleEmail = (formData.get("coupleEmail") as string)?.trim() || "";
    const couplePhone = (formData.get("couplePhone") as string)?.trim() || "";

    const commentLink = (formData.get("commentLink") as string)?.trim() || "";
    const confirmFollow = formData.get("confirmFollow") === "true";
    const termsAccepted = formData.get("termsAccepted") === "true";
    const marketingConsent = formData.get("marketingConsent") === "true";

    // 1. Validate Entrant Details
    if (!fullName || !relationship || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "All required entrant fields must be completed." },
        { status: 400 }
      );
    }

    // 2. Validate Eligibility (Hard gate)
    if (residentAge18 !== "yes") {
      return NextResponse.json(
        {
          success: false,
          error: "You must be a South African resident aged 18 or older to enter.",
        },
        { status: 400 }
      );
    }

    // 3. Validate SA Phone Format
    if (!validateSAPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid South African phone number format. Please provide a valid 10-digit SA number.",
        },
        { status: 400 }
      );
    }

    // 4. Validate Social Platform 2-of-3 Rule
    const validSocialCount = [
      !noInstagram && instagramHandle.length > 0,
      !noFacebook && facebookHandle.length > 0,
      !noTikTok && tiktokHandle.length > 0,
    ].filter(Boolean).length;

    if (validSocialCount < 2) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Platform rule violation: You must provide your handle for at least 2 platforms (Instagram, Facebook, or TikTok).",
        },
        { status: 400 }
      );
    }

    // 5. Validate Wedding Information (2027 requirement per clause 2.8 & 5.2)
    if (!weddingDate || !weddingHashtag) {
      return NextResponse.json(
        {
          success: false,
          error: "Confirmed wedding date and unique wedding hashtag are required.",
        },
        { status: 400 }
      );
    }

    const weddingYear = new Date(weddingDate).getFullYear();
    if (weddingYear !== 2027) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Eligibility restriction: Only weddings scheduled within the 2027 calendar year are eligible for this prize (Clause 2.8 & 5.2 of Terms & Conditions).",
        },
        { status: 400 }
      );
    }

    // 6. Validate Verification & Consents (Comment proof: link OR screenshot)
    const commentScreenshotFile = formData.get("commentScreenshot") as File | null;
    const hasCommentLink = commentLink.length > 0;
    const hasCommentScreenshotUpload = Boolean(
      commentScreenshotFile &&
      typeof commentScreenshotFile === "object" &&
      commentScreenshotFile.size > 0
    );

    if (!hasCommentLink && !hasCommentScreenshotUpload) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment verification is required: Please provide either a link to your comment or upload a screenshot of your comment tagging 3 friends.",
        },
        { status: 400 }
      );
    }

    if (!confirmFollow) {
      return NextResponse.json(
        {
          success: false,
          error: "Please confirm that you follow Creative Forge Digital on at least 2 platforms.",
        },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        {
          success: false,
          error: "You must accept the competition terms and conditions.",
        },
        { status: 400 }
      );
    }

    // Generate unique entry ID
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    const entryId = `CFD-WED-${randomHex}`;

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "competition");
    await fs.mkdir(uploadDir, { recursive: true });

    const emailAttachments: EmailAttachment[] = [];

    // Enforce 2.5MB per item upload limit
    const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

    const followProof1File = formData.get("followProof1") as File | null;
    const followProof2File = formData.get("followProof2") as File | null;
    const storyFile = formData.get("storyScreenshot") as File | null;

    if (commentScreenshotFile && typeof commentScreenshotFile === "object" && commentScreenshotFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Comment screenshot exceeds the 2.5MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    if (followProof1File && typeof followProof1File === "object" && followProof1File.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Follow proof photo 1 exceeds the 2.5MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    if (followProof2File && typeof followProof2File === "object" && followProof2File.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Follow proof photo 2 exceeds the 2.5MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    if (storyFile && typeof storyFile === "object" && storyFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Story screenshot exceeds the 2.5MB limit. Please upload a smaller image." },
        { status: 400 }
      );
    }

    // Helper to safely save uploaded image and prepare email attachment
    const processUploadedFile = async (
      file: File | null,
      prefix: string
    ): Promise<string | null> => {
      if (!file || typeof file !== "object" || file.size === 0) {
        return null;
      }
      try {
        const ext = path.extname(file.name) || ".jpg";
        const savedFilename = `${entryId}-${prefix}${ext}`;
        const filePath = path.join(uploadDir, savedFilename);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        // Add to email attachments (within 2.5MB limit)
        if (file.size <= MAX_FILE_SIZE) {
          emailAttachments.push({
            filename: `${entryId}-${prefix}${ext}`,
            content: buffer,
            contentType: file.type || "image/jpeg",
          });
        }

        return `/uploads/competition/${savedFilename}`;
      } catch (err) {
        console.error(`Error saving ${prefix} upload:`, err);
        return null;
      }
    };

    // 1. Process Comment Screenshot (Optional if link provided)
    const commentScreenshotPath = await processUploadedFile(commentScreenshotFile, "comment");

    // 2. Process Follow Proof Photo 1 (Optional)
    const followProof1Path = await processUploadedFile(followProof1File, "follow-1");

    // 3. Process Follow Proof Photo 2 (Optional)
    const followProof2Path = await processUploadedFile(followProof2File, "follow-2");

    // 4. Process Story Screenshot (Optional - unlocks bonus entry)
    let entriesCount = 1;
    let storyScreenshotPath: string | null = null;

    if (storyFile && typeof storyFile === "object" && storyFile.size > 0) {
      entriesCount = 2; // Bonus entry unlocked!
      storyScreenshotPath = await processUploadedFile(storyFile, "story-bonus");
    }

    const timestamp = new Date().toISOString();
    const clientIp =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;
    const userAgent = req.headers.get("user-agent") || null;

    // Record entry object for backup JSON
    const entryRecord = {
      entryId,
      entriesCount,
      timestamp,
      entrant: {
        fullName,
        relationship,
        email,
        phone,
        residentAge18: true,
      },
      socialProfiles: {
        instagram: noInstagram ? null : instagramHandle,
        facebook: noFacebook ? null : facebookHandle,
        tiktok: noTikTok ? null : tiktokHandle,
      },
      wedding: {
        coupleNames,
        weddingDate,
        weddingHashtag,
        coupleEmail,
        couplePhone,
      },
      verification: {
        commentLink: commentLink || null,
        hasCommentScreenshot: Boolean(commentScreenshotPath),
        commentScreenshotPath,
        confirmFollow,
        hasFollowProof1: Boolean(followProof1Path),
        followProof1Path,
        hasFollowProof2: Boolean(followProof2Path),
        followProof2Path,
        hasStoryScreenshot: entriesCount === 2,
        storyScreenshotPath,
      },
      legal: {
        termsAccepted,
        marketingConsent,
      },
      clientIp,
      userAgent,
    };

    // 1. Persist to MariaDB / MySQL Database
    try {
      await insertCompetitionEntry({
        entryId,
        entriesCount,
        fullName,
        relationship,
        email,
        phone,
        residentAge18: true,
        instagramHandle: noInstagram ? null : instagramHandle,
        noInstagram,
        facebookHandle: noFacebook ? null : facebookHandle,
        noFacebook,
        tiktokHandle: noTikTok ? null : tiktokHandle,
        noTikTok,
        coupleNames,
        weddingDate,
        weddingHashtag,
        coupleEmail: coupleEmail || null,
        couplePhone: couplePhone || null,
        commentLink: commentLink || null,
        commentScreenshotPath,
        confirmFollow,
        followProof1Path,
        followProof2Path,
        storyScreenshotPath,
        termsAccepted,
        marketingConsent,
        clientIp,
        userAgent,
      });
    } catch (dbErr) {
      console.error("Warning: MariaDB insert error (fallback active):", dbErr);
    }

    // 2. Persist to data/competition-entries.json (as backup & audit trail)
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });

      const dataFilePath = path.join(dataDir, "competition-entries.json");
      let entries: unknown[] = [];

      try {
        const fileContent = await fs.readFile(dataFilePath, "utf8");
        entries = JSON.parse(fileContent);
      } catch {
        entries = [];
      }

      entries.push(entryRecord);
      await fs.writeFile(dataFilePath, JSON.stringify(entries, null, 2), "utf8");
    } catch (saveErr) {
      console.error("Error writing entry to JSON file backup:", saveErr);
    }

    // 3. Dispatch Email via Resend to admin & danielle
    try {
      const emailPayload: CompetitionEmailData = {
        entryId,
        entriesCount,
        timestamp,
        fullName,
        relationship,
        email,
        phone,
        residentAge18: true,
        instagramHandle: noInstagram ? null : instagramHandle,
        noInstagram,
        facebookHandle: noFacebook ? null : facebookHandle,
        noFacebook,
        tiktokHandle: noTikTok ? null : tiktokHandle,
        noTikTok,
        coupleNames,
        weddingDate,
        weddingHashtag,
        coupleEmail: coupleEmail || null,
        couplePhone: couplePhone || null,
        commentLink: commentLink || null,
        hasCommentScreenshot: Boolean(commentScreenshotPath),
        confirmFollow,
        hasFollowProof1: Boolean(followProof1Path),
        hasFollowProof2: Boolean(followProof2Path),
        hasStoryScreenshot: Boolean(storyScreenshotPath),
        termsAccepted,
        marketingConsent,
        clientIp,
        userAgent,
      };

      const emailResult = await sendCompetitionNotificationEmail(
        emailPayload,
        emailAttachments
      );

      if (emailResult.success) {
        console.log(`Competition entry email notification dispatched: ID ${emailResult.id}`);
      } else {
        console.warn("Notice: Competition email notification could not be sent:", emailResult.error);
      }
    } catch (emailErr) {
      console.error("Error triggering Resend email notification:", emailErr);
    }

    return NextResponse.json({
      success: true,
      entryId,
      entriesCount,
      coupleNames,
      entrantName: fullName,
    });
  } catch (err: unknown) {
    console.error("Error processing competition entry:", err);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred while recording your entry." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("key");

    // Optional admin security check if ADMIN_SECRET is set
    if (process.env.ADMIN_SECRET && secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDbPool();
    if (!db) {
      throw new Error("Database pool not available");
    }
    const [rows] = await db.query(
      "SELECT id, entry_id, entries_count, full_name, relationship, email, phone, couple_names, wedding_date, wedding_hashtag, comment_link, comment_screenshot_path, follow_proof_1_path, follow_proof_2_path, story_screenshot_path, is_drawn_winner, created_at FROM competition_entries ORDER BY created_at DESC"
    );

    return NextResponse.json({
      success: true,
      count: Array.isArray(rows) ? rows.length : 0,
      entries: rows,
    });
  } catch {
    // If DB is unreachable, return fallback from JSON file
    try {
      const dataFilePath = path.join(process.cwd(), "data", "competition-entries.json");
      const fileContent = await fs.readFile(dataFilePath, "utf8");
      const entries = JSON.parse(fileContent);
      return NextResponse.json({
        success: true,
        source: "json_fallback",
        count: entries.length,
        entries,
      });
    } catch {
      return NextResponse.json(
        { success: false, error: "Could not retrieve entries." },
        { status: 500 }
      );
    }
  }
}
