import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { insertCompetitionEntry, getDbPool } from "@/lib/db";

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

    const commentLink = (formData.get("commentLink") as string)?.trim();
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

    // 6. Validate Verification & Consents
    if (!commentLink || !confirmFollow) {
      return NextResponse.json(
        {
          success: false,
          error: "Comment verification link and follow confirmation are required.",
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

    // Handle optional Story screenshot file
    let savedScreenshotFilename: string | null = null;
    const storyFile = formData.get("storyScreenshot") as File | null;
    let entriesCount = 1;

    if (storyFile && typeof storyFile === "object" && storyFile.size > 0) {
      entriesCount = 2; // Bonus entry unlocked!

      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "competition");
        await fs.mkdir(uploadDir, { recursive: true });

        const ext = path.extname(storyFile.name) || ".jpg";
        savedScreenshotFilename = `${entryId}-story${ext}`;
        const filePath = path.join(uploadDir, savedScreenshotFilename);

        const bytes = await storyFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);
      } catch (fileErr) {
        console.error("Error saving story screenshot:", fileErr);
        // Continue recording entry even if file save encounters an issue
      }
    }

    // Record entry object
    const entryRecord = {
      entryId,
      entriesCount,
      timestamp: new Date().toISOString(),
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
        commentLink,
        confirmFollow,
        hasStoryScreenshot: entriesCount === 2,
        storyScreenshotPath: savedScreenshotFilename
          ? `/uploads/competition/${savedScreenshotFilename}`
          : null,
      },
      legal: {
        termsAccepted,
        marketingConsent,
      },
      clientIp: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
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
        commentLink,
        confirmFollow,
        storyScreenshotPath: savedScreenshotFilename
          ? `/uploads/competition/${savedScreenshotFilename}`
          : null,
        termsAccepted,
        marketingConsent,
        clientIp: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null,
        userAgent: req.headers.get("user-agent") || null,
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
      "SELECT id, entry_id, entries_count, full_name, relationship, email, phone, couple_names, wedding_date, wedding_hashtag, is_drawn_winner, created_at FROM competition_entries ORDER BY created_at DESC"
    );

    return NextResponse.json({
      success: true,
      count: Array.isArray(rows) ? rows.length : 0,
      entries: rows,
    });
  } catch (err: unknown) {
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
