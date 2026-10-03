// Database helper with safe dynamic resolution for MariaDB / MySQL
import fs from "fs/promises";
import path from "path";

type PoolType = any;
let pool: PoolType = null;
let isInitialized = false;

declare const __non_webpack_require__: any;

function getMysqlDriver() {
  try {
    const req =
      typeof __non_webpack_require__ !== "undefined"
        ? __non_webpack_require__
        : eval("require");
    const pkg = ["mysql2", "promise"].join("/");
    const mod = req(pkg);
    return mod.default || mod;
  } catch (err) {
    console.warn("Notice: 'mysql2' package is not yet loaded in node_modules.", err);
    return null;
  }
}

export async function getDbPool(): Promise<PoolType> {
  if (pool) return pool;

  const mysql = await getMysqlDriver();
  if (!mysql) return null;

  const host = process.env.DB_HOST || "localhost";
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || "Date";
  const password = process.env.DB_PASSWORD || "DyGi9P5qo_l0nm%a";
  const database = process.env.DB_NAME || "bonthuyz_Wedding";

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
  });

  return pool;
}

export async function initDatabase(): Promise<boolean> {
  if (isInitialized) return true;

  const db = await getDbPool();
  if (!db) return false;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS competition_entries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      entry_id VARCHAR(64) NOT NULL UNIQUE,
      entries_count INT NOT NULL DEFAULT 1,
      full_name VARCHAR(150) NOT NULL,
      relationship VARCHAR(64) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      resident_age_18 BOOLEAN NOT NULL DEFAULT 1,
      instagram_handle VARCHAR(100) NULL,
      no_instagram BOOLEAN NOT NULL DEFAULT 0,
      facebook_handle VARCHAR(150) NULL,
      no_facebook BOOLEAN NOT NULL DEFAULT 0,
      tiktok_handle VARCHAR(100) NULL,
      no_tiktok BOOLEAN NOT NULL DEFAULT 0,
      couple_names VARCHAR(200) NOT NULL,
      wedding_date DATE NOT NULL,
      wedding_hashtag VARCHAR(100) NOT NULL,
      couple_email VARCHAR(150) NULL,
      couple_phone VARCHAR(50) NULL,
      comment_link TEXT NULL,
      comment_screenshot_path VARCHAR(255) NULL,
      confirm_follow BOOLEAN NOT NULL DEFAULT 1,
      follow_proof_1_path VARCHAR(255) NULL,
      follow_proof_2_path VARCHAR(255) NULL,
      story_screenshot_path VARCHAR(255) NULL,
      terms_accepted BOOLEAN NOT NULL DEFAULT 1,
      marketing_consent BOOLEAN NOT NULL DEFAULT 0,
      client_ip VARCHAR(64) NULL,
      user_agent TEXT NULL,
      is_drawn_winner BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await db.query(createTableQuery);

  // Auto-migrate new columns if table already exists
  try {
    await db.query(
      `ALTER TABLE competition_entries MODIFY COLUMN comment_link TEXT NULL`
    );
    await db.query(
      `ALTER TABLE competition_entries ADD COLUMN IF NOT EXISTS comment_screenshot_path VARCHAR(255) NULL`
    );
    await db.query(
      `ALTER TABLE competition_entries ADD COLUMN IF NOT EXISTS follow_proof_1_path VARCHAR(255) NULL`
    );
    await db.query(
      `ALTER TABLE competition_entries ADD COLUMN IF NOT EXISTS follow_proof_2_path VARCHAR(255) NULL`
    );
    await db.query(
      `ALTER TABLE competition_entries ADD COLUMN IF NOT EXISTS status VARCHAR(32) DEFAULT 'pending'`
    );
    await db.query(
      `ALTER TABLE competition_entries ADD COLUMN IF NOT EXISTS admin_notes TEXT NULL`
    );
  } catch {
    // Ignore migration errors if columns already exist
  }

  isInitialized = true;
  return true;
}

export interface CompetitionEntryPayload {
  entryId: string;
  entriesCount: number;
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
  residentAge18: boolean;
  instagramHandle: string | null;
  noInstagram: boolean;
  facebookHandle: string | null;
  noFacebook: boolean;
  tiktokHandle: string | null;
  noTikTok: boolean;
  coupleNames: string;
  weddingDate: string;
  weddingHashtag: string;
  coupleEmail: string | null;
  couplePhone: string | null;
  commentLink: string | null;
  commentScreenshotPath: string | null;
  confirmFollow: boolean;
  followProof1Path: string | null;
  followProof2Path: string | null;
  storyScreenshotPath: string | null;
  termsAccepted: boolean;
  marketingConsent: boolean;
  clientIp: string | null;
  userAgent: string | null;
}

export async function insertCompetitionEntry(data: CompetitionEntryPayload) {
  try {
    const initialized = await initDatabase();
    if (!initialized) {
      console.warn("Skipping DB insert because mysql2 is not loaded. Entry saved to backup JSON.");
      return { success: false, fallback: true };
    }

    const db = await getDbPool();
    if (!db) return { success: false, fallback: true };

    const insertQuery = `
      INSERT INTO competition_entries (
        entry_id,
        entries_count,
        full_name,
        relationship,
        email,
        phone,
        resident_age_18,
        instagram_handle,
        no_instagram,
        facebook_handle,
        no_facebook,
        tiktok_handle,
        no_tiktok,
        couple_names,
        wedding_date,
        wedding_hashtag,
        couple_email,
        couple_phone,
        comment_link,
        comment_screenshot_path,
        confirm_follow,
        follow_proof_1_path,
        follow_proof_2_path,
        story_screenshot_path,
        terms_accepted,
        marketing_consent,
        client_ip,
        user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.entryId,
      data.entriesCount,
      data.fullName,
      data.relationship,
      data.email,
      data.phone,
      data.residentAge18 ? 1 : 0,
      data.instagramHandle || null,
      data.noInstagram ? 1 : 0,
      data.facebookHandle || null,
      data.noFacebook ? 1 : 0,
      data.tiktokHandle || null,
      data.noTikTok ? 1 : 0,
      data.coupleNames,
      data.weddingDate,
      data.weddingHashtag,
      data.coupleEmail || null,
      data.couplePhone || null,
      data.commentLink || null,
      data.commentScreenshotPath || null,
      data.confirmFollow ? 1 : 0,
      data.followProof1Path || null,
      data.followProof2Path || null,
      data.storyScreenshotPath || null,
      data.termsAccepted ? 1 : 0,
      data.marketingConsent ? 1 : 0,
      data.clientIp || null,
      data.userAgent || null,
    ];

    const [result] = await db.execute(insertQuery, values);
    return { success: true, result };
  } catch (err) {
    console.error("Database insert error:", err);
    return { success: false, error: err };
  }
}

/**
 * Retrieve all competition entries from MySQL, merged/backed up with data/competition-entries.json
 */
export async function getAllCompetitionEntries(): Promise<any[]> {
  const entriesMap = new Map<string, any>();

  // 1. Try reading from backup JSON file first
  try {
    const dataDir = path.join(process.cwd(), "data");
    const dataFilePath = path.join(dataDir, "competition-entries.json");
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const jsonEntries = JSON.parse(fileContent);
    if (Array.isArray(jsonEntries)) {
      for (const entry of jsonEntries) {
        const id = entry.entryId || entry.entry_id;
        if (id) {
          entriesMap.set(id, {
            id: entry.id || id,
            entryId: id,
            entriesCount: Number(entry.entriesCount || entry.entries_count || 1),
            fullName: entry.entrant?.fullName || entry.fullName || entry.full_name || "",
            relationship: entry.entrant?.relationship || entry.relationship || "",
            email: entry.entrant?.email || entry.email || "",
            phone: entry.entrant?.phone || entry.phone || "",
            residentAge18: Boolean(entry.entrant?.residentAge18 ?? entry.resident_age_18 ?? true),
            instagramHandle: entry.socialProfiles?.instagram ?? entry.instagramHandle ?? entry.instagram_handle ?? null,
            noInstagram: Boolean(entry.noInstagram ?? entry.no_instagram),
            facebookHandle: entry.socialProfiles?.facebook ?? entry.facebookHandle ?? entry.facebook_handle ?? null,
            noFacebook: Boolean(entry.noFacebook ?? entry.no_facebook),
            tiktokHandle: entry.socialProfiles?.tiktok ?? entry.tiktokHandle ?? entry.tiktok_handle ?? null,
            noTikTok: Boolean(entry.noTikTok ?? entry.no_tiktok),
            coupleNames: entry.wedding?.coupleNames || entry.coupleNames || entry.couple_names || "",
            weddingDate: entry.wedding?.weddingDate || entry.weddingDate || entry.wedding_date || "",
            weddingHashtag: entry.wedding?.weddingHashtag || entry.weddingHashtag || entry.wedding_hashtag || "",
            coupleEmail: entry.wedding?.coupleEmail ?? entry.coupleEmail ?? entry.couple_email ?? null,
            couplePhone: entry.wedding?.couplePhone ?? entry.couplePhone ?? entry.couple_phone ?? null,
            commentLink: entry.verification?.commentLink ?? entry.commentLink ?? entry.comment_link ?? null,
            commentScreenshotPath: entry.verification?.commentScreenshotPath ?? entry.commentScreenshotPath ?? entry.comment_screenshot_path ?? null,
            confirmFollow: Boolean(entry.verification?.confirmFollow ?? entry.confirmFollow ?? entry.confirm_follow ?? true),
            followProof1Path: entry.verification?.followProof1Path ?? entry.followProof1Path ?? entry.follow_proof_1_path ?? null,
            followProof2Path: entry.verification?.followProof2Path ?? entry.followProof2Path ?? entry.follow_proof_2_path ?? null,
            storyScreenshotPath: entry.verification?.storyScreenshotPath ?? entry.storyScreenshotPath ?? entry.story_screenshot_path ?? null,
            termsAccepted: Boolean(entry.legal?.termsAccepted ?? entry.termsAccepted ?? entry.terms_accepted ?? true),
            marketingConsent: Boolean(entry.legal?.marketingConsent ?? entry.marketingConsent ?? entry.marketing_consent ?? false),
            status: entry.status || "pending",
            adminNotes: entry.adminNotes || entry.admin_notes || "",
            createdAt: entry.timestamp || entry.created_at || new Date().toISOString(),
          });
        }
      }
    }
  } catch {
    // JSON file doesn't exist yet or is empty
  }

  // 2. Try querying MySQL table
  try {
    const initialized = await initDatabase();
    if (initialized) {
      const db = await getDbPool();
      if (db) {
        const [rows] = await db.query(
          "SELECT * FROM competition_entries ORDER BY id DESC"
        );
        if (Array.isArray(rows)) {
          for (const row of rows) {
            const id = row.entry_id;
            if (id) {
              const existing = entriesMap.get(id);
              entriesMap.set(id, {
                id: row.id,
                entryId: id,
                entriesCount: Number(row.entries_count || 1),
                fullName: row.full_name || "",
                relationship: row.relationship || "",
                email: row.email || "",
                phone: row.phone || "",
                residentAge18: Boolean(row.resident_age_18),
                instagramHandle: row.instagram_handle || null,
                noInstagram: Boolean(row.no_instagram),
                facebookHandle: row.facebook_handle || null,
                noFacebook: Boolean(row.no_facebook),
                tiktokHandle: row.tiktok_handle || null,
                noTikTok: Boolean(row.no_tiktok),
                coupleNames: row.couple_names || "",
                weddingDate: row.wedding_date ? String(row.wedding_date).slice(0, 10) : "",
                weddingHashtag: row.wedding_hashtag || "",
                coupleEmail: row.couple_email || null,
                couplePhone: row.couple_phone || null,
                commentLink: row.comment_link || null,
                commentScreenshotPath: row.comment_screenshot_path || null,
                confirmFollow: Boolean(row.confirm_follow),
                followProof1Path: row.follow_proof_1_path || null,
                followProof2Path: row.follow_proof_2_path || null,
                storyScreenshotPath: row.story_screenshot_path || null,
                termsAccepted: Boolean(row.terms_accepted),
                marketingConsent: Boolean(row.marketing_consent),
                status: row.status || existing?.status || "pending",
                adminNotes: row.admin_notes || existing?.adminNotes || "",
                createdAt: row.created_at ? new Date(row.created_at).toISOString() : existing?.createdAt || new Date().toISOString(),
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("Notice: MySQL entries query failed, using JSON backup entries:", err);
  }

  return Array.from(entriesMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Update an entry's status and admin notes
 */
export async function updateCompetitionEntryStatus(
  entryId: string,
  status: "verified" | "pending" | "disqualified",
  adminNotes?: string
): Promise<boolean> {
  let updatedInDb = false;

  // 1. Update in MySQL
  try {
    const initialized = await initDatabase();
    if (initialized) {
      const db = await getDbPool();
      if (db) {
        await db.execute(
          "UPDATE competition_entries SET status = ?, admin_notes = ? WHERE entry_id = ?",
          [status, adminNotes || null, entryId]
        );
        updatedInDb = true;
      }
    }
  } catch (err) {
    console.warn("DB update status error:", err);
  }

  // 2. Update in backup JSON
  try {
    const dataDir = path.join(process.cwd(), "data");
    const dataFilePath = path.join(dataDir, "competition-entries.json");
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const entries = JSON.parse(fileContent);
    if (Array.isArray(entries)) {
      let modified = false;
      for (const entry of entries) {
        if (entry.entryId === entryId || entry.entry_id === entryId) {
          entry.status = status;
          if (adminNotes !== undefined) entry.adminNotes = adminNotes;
          modified = true;
        }
      }
      if (modified) {
        await fs.writeFile(dataFilePath, JSON.stringify(entries, null, 2), "utf8");
      }
    }
  } catch (err) {
    console.warn("JSON file update status error:", err);
  }

  return updatedInDb || true;
}

/**
 * Delete a competition entry
 */
export async function deleteCompetitionEntry(entryId: string): Promise<boolean> {
  // 1. Delete from MySQL
  try {
    const initialized = await initDatabase();
    if (initialized) {
      const db = await getDbPool();
      if (db) {
        await db.execute("DELETE FROM competition_entries WHERE entry_id = ?", [
          entryId,
        ]);
      }
    }
  } catch (err) {
    console.warn("DB delete error:", err);
  }

  // 2. Delete from backup JSON
  try {
    const dataDir = path.join(process.cwd(), "data");
    const dataFilePath = path.join(dataDir, "competition-entries.json");
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const entries = JSON.parse(fileContent);
    if (Array.isArray(entries)) {
      const filtered = entries.filter(
        (e) => e.entryId !== entryId && e.entry_id !== entryId
      );
      await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2), "utf8");
    }
  } catch (err) {
    console.warn("JSON delete error:", err);
  }

  return true;
}
