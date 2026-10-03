import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import { getAllCompetitionEntries } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const verifiedOnly = body.verifiedOnly !== false;

    const allEntries = await getAllCompetitionEntries();
    const candidateEntries = verifiedOnly
      ? allEntries.filter((e) => e.status === "verified")
      : allEntries.filter((e) => e.status !== "disqualified");

    if (candidateEntries.length === 0) {
      return NextResponse.json(
        {
          error: verifiedOnly
            ? "No verified entries found to draw from. Please verify valid entries first."
            : "No active entries found.",
        },
        { status: 400 }
      );
    }

    // Build weighted ticket pool
    // Entrants with 2 entries get 2 tickets
    const ticketPool: { ticketNumber: number; entry: any }[] = [];
    let ticketCounter = 1;

    for (const entry of candidateEntries) {
      const tickets = Number(entry.entriesCount) === 2 ? 2 : 1;
      for (let i = 0; i < tickets; i++) {
        ticketPool.push({
          ticketNumber: ticketCounter++,
          entry,
        });
      }
    }

    // Cryptographically secure random selection
    const winningIndex = crypto.randomInt(0, ticketPool.length);
    const winningTicket = ticketPool[winningIndex];

    const auditTrail = {
      drawTimestamp: new Date().toISOString(),
      poolSize: candidateEntries.length,
      totalTicketsIssued: ticketPool.length,
      drawnTicketNumber: winningTicket.ticketNumber,
      auditHash: crypto
        .createHash("sha256")
        .update(
          `${winningTicket.entry.entryId}:${winningTicket.ticketNumber}:${Date.now()}`
        )
        .digest("hex"),
      verifiedOnly,
    };

    return NextResponse.json({
      success: true,
      winner: winningTicket.entry,
      winningTicketNumber: winningTicket.ticketNumber,
      auditTrail,
    });
  } catch (err) {
    console.error("Audited draw error:", err);
    return NextResponse.json(
      { error: "Failed to conduct random draw" },
      { status: 500 }
    );
  }
}
