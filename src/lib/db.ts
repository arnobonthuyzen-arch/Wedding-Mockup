// Database helper with safe dynamic resolution for MariaDB / MySQL

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
    const mod = req("mysql2/promise");
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
      comment_link TEXT NOT NULL,
      confirm_follow BOOLEAN NOT NULL DEFAULT 1,
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
  commentLink: string;
  confirmFollow: boolean;
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
        confirm_follow,
        story_screenshot_path,
        terms_accepted,
        marketing_consent,
        client_ip,
        user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      data.commentLink,
      data.confirmFollow ? 1 : 0,
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
