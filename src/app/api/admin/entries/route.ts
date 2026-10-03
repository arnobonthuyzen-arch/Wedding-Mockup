import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import {
  getAllCompetitionEntries,
  updateCompetitionEntryStatus,
  deleteCompetitionEntry,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = await getAllCompetitionEntries();

    // Calculate executive metrics
    const totalEntries = entries.length;
    const totalTickets = entries.reduce(
      (sum, e) => sum + (Number(e.entriesCount) || 1),
      0
    );
    const bonusEntriesCount = entries.filter((e) => Number(e.entriesCount) === 2).length;
    const singleEntriesCount = totalEntries - bonusEntriesCount;
    const verifiedCount = entries.filter((e) => e.status === "verified").length;
    const pendingCount = entries.filter((e) => !e.status || e.status === "pending").length;
    const disqualifiedCount = entries.filter((e) => e.status === "disqualified").length;

    return NextResponse.json({
      success: true,
      metrics: {
        totalEntries,
        totalTickets,
        bonusEntriesCount,
        singleEntriesCount,
        verifiedCount,
        pendingCount,
        disqualifiedCount,
      },
      entries,
    });
  } catch (err) {
    console.error("Admin entries GET error:", err);
    return NextResponse.json(
      { error: "Failed to load competition entries" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { entryId, status, adminNotes } = body;

    if (!entryId || !status) {
      return NextResponse.json(
        { error: "Missing entryId or status" },
        { status: 400 }
      );
    }

    if (!["verified", "pending", "disqualified"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await updateCompetitionEntryStatus(entryId, status, adminNotes);

    return NextResponse.json({ success: true, entryId, status, adminNotes });
  } catch (err) {
    console.error("Admin entries PATCH error:", err);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get("entryId");

    if (!entryId) {
      return NextResponse.json({ error: "Missing entryId" }, { status: 400 });
    }

    await deleteCompetitionEntry(entryId);
    return NextResponse.json({ success: true, deleted: entryId });
  } catch (err) {
    console.error("Admin entries DELETE error:", err);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
