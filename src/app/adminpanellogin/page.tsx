"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

interface CompetitionEntry {
  id: number | string;
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
  status: "verified" | "pending" | "disqualified";
  adminNotes: string;
  createdAt: string;
}

interface Metrics {
  totalEntries: number;
  totalTickets: number;
  bonusEntriesCount: number;
  singleEntriesCount: number;
  verifiedCount: number;
  pendingCount: number;
  disqualifiedCount: number;
}

export default function AdminPanelPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [entries, setEntries] = useState<CompetitionEntry[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);

  // UI State: Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending" | "disqualified" | "bonus">("all");

  // UI State: Modals
  const [selectedEntry, setSelectedEntry] = useState<CompetitionEntry | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [activeNotes, setActiveNotes] = useState("");
  const [activeStatus, setActiveStatus] = useState<"verified" | "pending" | "disqualified">("pending");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // UI State: Audited Draw Modal
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawResult, setDrawResult] = useState<any | null>(null);
  const [drawError, setDrawError] = useState("");

  // UI State: Test Email
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestStatus, setEmailTestStatus] = useState<string | null>(null);

  const handleSendTestEmail = async () => {
    setIsTestingEmail(true);
    setEmailTestStatus(null);
    try {
      const res = await fetch("/api/admin/test-email", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setEmailTestStatus(`✓ Test email delivered to admin@ & danielle@ (ID: ${data.resendId})`);
      } else {
        setEmailTestStatus(`✕ Error: ${data.error || "Failed to send email"}`);
      }
    } catch {
      setEmailTestStatus("✕ Network error connecting to mail server");
    } finally {
      setIsTestingEmail(false);
    }
  };

  // 1. Check existing session on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/entries");
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries || []);
          setMetrics(data.metrics || null);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Authentication failed.");
        setIsLoggingIn(false);
        return;
      }

      setIsAuthenticated(true);
      fetchEntries();
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setEntries([]);
      setMetrics(null);
      setSelectedEntry(null);
    }
  };

  // 4. Fetch Entries
  const fetchEntries = async () => {
    setIsLoadingEntries(true);
    try {
      const res = await fetch("/api/admin/entries");
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
        setMetrics(data.metrics || null);
      }
    } catch (err) {
      console.error("Failed to load entries:", err);
    } finally {
      setIsLoadingEntries(false);
    }
  };

  // 5. Open Entry Details
  const handleSelectEntry = (entry: CompetitionEntry) => {
    setSelectedEntry(entry);
    setActiveStatus(entry.status || "pending");
    setActiveNotes(entry.adminNotes || "");
  };

  // 6. Save Status & Notes
  const handleSaveEntryStatus = async () => {
    if (!selectedEntry) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/entries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId: selectedEntry.entryId,
          status: activeStatus,
          adminNotes: activeNotes,
        }),
      });

      if (res.ok) {
        // Update local state
        setEntries((prev) =>
          prev.map((e) =>
            e.entryId === selectedEntry.entryId
              ? { ...e, status: activeStatus, adminNotes: activeNotes }
              : e
          )
        );
        setSelectedEntry((prev) =>
          prev ? { ...prev, status: activeStatus, adminNotes: activeNotes } : null
        );
        fetchEntries(); // Refresh metrics
      }
    } catch (err) {
      console.error("Failed to save entry status:", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // 7. Delete Entry
  const handleDeleteEntry = async (entryId: string) => {
    if (!window.confirm(`Are you sure you want to delete entry ${entryId}? This action is irreversible.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/entries?entryId=${encodeURIComponent(entryId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSelectedEntry(null);
        fetchEntries();
      }
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  // 8. Run Audited Random Draw
  const handleRunDraw = async (verifiedOnly = true) => {
    setIsDrawing(true);
    setDrawError("");
    setDrawResult(null);

    try {
      const res = await fetch("/api/admin/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifiedOnly }),
      });

      const data = await res.json();
      if (!res.ok) {
        setDrawError(data.error || "Draw failed.");
      } else {
        setDrawResult(data);
      }
    } catch {
      setDrawError("Error executing draw.");
    } finally {
      setIsDrawing(false);
    }
  };

  // 9. Export to CSV
  const handleExportCSV = () => {
    if (entries.length === 0) return;

    const headers = [
      "Entry ID",
      "Tickets",
      "Status",
      "Entrant Name",
      "Relationship",
      "Email",
      "Phone",
      "Couple Names",
      "Wedding Date",
      "Wedding Hashtag",
      "Couple Email",
      "Couple Phone",
      "Instagram",
      "Facebook",
      "TikTok",
      "Comment Link",
      "Comment Screenshot",
      "Follow Proof 1",
      "Follow Proof 2",
      "Bonus Story Screenshot",
      "Marketing Consent",
      "Admin Notes",
      "Submission Timestamp",
    ];

    const rows = entries.map((e) => [
      `"${e.entryId}"`,
      e.entriesCount,
      `"${e.status}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.relationship}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.coupleNames.replace(/"/g, '""')}"`,
      `"${e.weddingDate}"`,
      `"${e.weddingHashtag.replace(/"/g, '""')}"`,
      `"${e.coupleEmail || ""}"`,
      `"${e.couplePhone || ""}"`,
      `"${e.instagramHandle || ""}"`,
      `"${e.facebookHandle || ""}"`,
      `"${e.tiktokHandle || ""}"`,
      `"${(e.commentLink || "").replace(/"/g, '""')}"`,
      `"${e.commentScreenshotPath || ""}"`,
      `"${e.followProof1Path || ""}"`,
      `"${e.followProof2Path || ""}"`,
      `"${e.storyScreenshotPath || ""}"`,
      e.marketingConsent ? "Yes" : "No",
      `"${(e.adminNotes || "").replace(/"/g, '""')}"`,
      `"${e.createdAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `CFD_Competition_Entries_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Entries
  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      // 1. Status Filter
      if (statusFilter === "verified" && e.status !== "verified") return false;
      if (statusFilter === "pending" && e.status !== "pending") return false;
      if (statusFilter === "disqualified" && e.status !== "disqualified") return false;
      if (statusFilter === "bonus" && Number(e.entriesCount) !== 2) return false;

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = e.fullName?.toLowerCase().includes(q);
        const matchCouple = e.coupleNames?.toLowerCase().includes(q);
        const matchEmail = e.email?.toLowerCase().includes(q);
        const matchPhone = e.phone?.toLowerCase().includes(q);
        const matchId = e.entryId?.toLowerCase().includes(q);
        const matchTag = e.weddingHashtag?.toLowerCase().includes(q);
        return matchName || matchCouple || matchEmail || matchPhone || matchId || matchTag;
      }

      return true;
    });
  }, [entries, statusFilter, searchQuery]);

  // Loading Screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-white/50 font-sans text-xs uppercase tracking-[0.25em]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <span>Securing Admin Session...</span>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // LOGIN SCREEN
  // ===========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-white selection:text-black">
        {/* Top Header */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/40">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Encrypted Administration Gateway</span>
          </div>
          <span>Johannesburg • South Africa</span>
        </div>

        {/* Login Box */}
        <div className="mx-auto w-full max-w-md">
          <div className="border border-white/10 bg-[#141414] p-8 sm:p-10 shadow-2xl relative">
            {/* Top Gold Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B]" />

            {/* CFD Monogram Emblem */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black shadow-lift">
              <Image
                src="/images/cfd-logo.png"
                alt="Creative Forge Digital"
                width={56}
                height={56}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
                Creative Forge Digital
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Competition Control Room
              </h1>
              <p className="mt-1 text-xs text-white/50 font-serif italic">
                2027 Wedding Initiative • Audited Verification Console
              </p>
            </div>

            {loginError && (
              <div className="mb-6 rounded-xs border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-white/60 mb-1.5 font-medium">
                  ID Number / Username
                </label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="e.g. 0205205114080"
                  required
                  autoFocus
                  className="w-full border border-white/15 bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-white/60 font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] uppercase tracking-wider text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="w-full border border-white/15 bg-black/60 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 cursor-pointer border border-[#D4AF37] bg-[#D4AF37] py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-[#F3E5AB] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoggingIn ? "Authenticating..." : "Access Control Room →"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="text-center text-[10px] uppercase tracking-[0.22em] text-white/30">
          Consumer Protection Act 68 of 2008 &amp; POPIA Monitored • Authorized Personnel Only
        </div>
      </div>
    );
  }

  // ===========================================================================
  // AUTHENTICATED DASHBOARD
  // ===========================================================================
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1816] font-sans antialiased selection:bg-black selection:text-white">
      {/* 1. Executive Editorial Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#E3DDD1] bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-black">
              <Image
                src="/images/cfd-logo.png"
                alt="CFD"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <span className="font-serif text-base text-[#111] font-medium tracking-wide block leading-tight">
                Creative Forge Digital
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#7A746B] font-semibold">
                Competition Control Room • 2027 Wedding
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleSendTestEmail}
              disabled={isTestingEmail}
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-50 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-blue-900 hover:bg-blue-600 hover:text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <span>✉</span>
              <span>{isTestingEmail ? "Sending..." : "Test Email"}</span>
            </button>

            <button
              onClick={() => setIsDrawModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37] bg-[#FAF5EB] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold text-[#8C6D1F] hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-xs"
            >
              <span>★</span>
              <span>Audited Draw</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD6C9] bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-[#4A453E] hover:border-black hover:text-black transition-colors cursor-pointer"
            >
              <span>↓</span>
              <span>Export CSV</span>
            </button>

            <div className="hidden md:flex items-center gap-2 border-l border-[#E5DFD4] pl-3 text-xs text-[#7A746B] font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>0205205114080</span>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-full border border-[#E5DFD4] bg-white px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#7A746B] hover:border-red-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Test Email Status Banner */}
        {emailTestStatus && (
          <div className="border-t border-[#E3DDD1] bg-white px-4 sm:px-8 py-2.5 text-xs text-center flex items-center justify-between">
            <span className={emailTestStatus.startsWith("✓") ? "text-emerald-700 font-medium" : "text-red-700 font-medium"}>
              {emailTestStatus}
            </span>
            <button
              onClick={() => setEmailTestStatus(null)}
              className="text-neutral-400 hover:text-black text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        {/* 2. Top Title Bar & Draw Deadline Banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E3DDD1] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#8C6D1F] font-semibold mb-1">
              <span>Audited Competition Administration</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111] font-normal">
              Win a Bespoke Wedding Website (R4,500 Value)
            </h1>
            <p className="mt-1 text-sm text-[#6B655B] font-serif italic">
              Entries close 20 October 2026, 23:59 SAST • Audited random draw on 23 October 2026
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchEntries}
              disabled={isLoadingEntries}
              className="inline-flex items-center gap-1.5 border border-[#DCD6C9] bg-white px-3 py-2 text-xs uppercase tracking-wider text-[#4A453E] hover:border-black transition-colors cursor-pointer"
            >
              <span className={isLoadingEntries ? "animate-spin" : ""}>↻</span>
              <span>{isLoadingEntries ? "Refreshing..." : "Refresh Data"}</span>
            </button>
          </div>
        </div>

        {/* 3. Executive Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <div className="border border-[#E3DDD1] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A746B] block mb-1">
              Total Entrants
            </span>
            <span className="font-serif text-3xl font-medium text-[#111]">
              {metrics?.totalEntries ?? entries.length}
            </span>
          </div>

          <div className="border border-[#E3DDD1] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D1F] block mb-1 font-semibold">
              Draw Tickets
            </span>
            <span className="font-serif text-3xl font-medium text-[#8C6D1F]">
              {metrics?.totalTickets ?? entries.reduce((s, e) => s + Number(e.entriesCount), 0)}
            </span>
          </div>

          <div className="border border-[#E3DDD1] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A746B] block mb-1">
              Bonus Entries (2x)
            </span>
            <span className="font-serif text-3xl font-medium text-[#111]">
              {metrics?.bonusEntriesCount ?? entries.filter((e) => Number(e.entriesCount) === 2).length}
            </span>
          </div>

          <div className="border border-[#E3DDD1] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 block mb-1 font-semibold">
              Verified
            </span>
            <span className="font-serif text-3xl font-medium text-emerald-800">
              {metrics?.verifiedCount ?? entries.filter((e) => e.status === "verified").length}
            </span>
          </div>

          <div className="border border-[#E3DDD1] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-700 block mb-1">
              Pending
            </span>
            <span className="font-serif text-3xl font-medium text-amber-800">
              {metrics?.pendingCount ?? entries.filter((e) => e.status === "pending").length}
            </span>
          </div>

          <div className="border border-[#E3DDD1] bg-white p-4 shadow-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-red-700 block mb-1">
              Disqualified
            </span>
            <span className="font-serif text-3xl font-medium text-red-800">
              {metrics?.disqualifiedCount ?? entries.filter((e) => e.status === "disqualified").length}
            </span>
          </div>
        </div>

        {/* 4. Filter & Search Bar */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-[#E3DDD1] bg-white p-4 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by entrant, couple, hashtag, email, phone, or reference ID..."
              className="w-full border border-[#DCD6C9] bg-[#FAF8F5] pl-10 pr-4 py-2 text-xs text-[#111] placeholder-[#8A847A] focus:border-black focus:outline-none focus:bg-white transition-all font-sans"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {(
              [
                { id: "all", label: "All", count: entries.length },
                { id: "verified", label: "Verified", count: metrics?.verifiedCount },
                { id: "pending", label: "Pending", count: metrics?.pendingCount },
                { id: "bonus", label: "Bonus (2x)", count: metrics?.bonusEntriesCount },
                { id: "disqualified", label: "Disqualified", count: metrics?.disqualifiedCount },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium cursor-pointer transition-colors ${
                  statusFilter === tab.id
                    ? "bg-[#111] text-white"
                    : "bg-[#F3EFE8] text-[#555] hover:bg-[#E8E2D5] hover:text-black"
                }`}
              >
                {tab.label} {tab.count !== undefined && `(${tab.count})`}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Entries Table */}
        <div className="border border-[#E3DDD1] bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E3DDD1] bg-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] text-[#7A746B]">
                  <th className="py-3.5 px-4 font-semibold">Reference</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Entrant</th>
                  <th className="py-3.5 px-4 font-semibold">Couple &amp; 2027 Date</th>
                  <th className="py-3.5 px-4 font-semibold">Hashtag</th>
                  <th className="py-3.5 px-4 font-semibold">Tickets</th>
                  <th className="py-3.5 px-4 font-semibold">Proofs Attached</th>
                  <th className="py-3.5 px-4 font-semibold">Submitted</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EDE5]">
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-[#7A746B] font-serif italic text-base">
                      No competition entries match the current search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => {
                    const proofsCount = [
                      entry.commentScreenshotPath,
                      entry.followProof1Path,
                      entry.followProof2Path,
                      entry.storyScreenshotPath,
                    ].filter(Boolean).length;

                    return (
                      <tr
                        key={entry.entryId}
                        className="hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
                        onClick={() => handleSelectEntry(entry)}
                      >
                        {/* Reference */}
                        <td className="py-3.5 px-4 font-mono font-medium text-[#111]">
                          {entry.entryId}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-xs ${
                              entry.status === "verified"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : entry.status === "disqualified"
                                ? "bg-red-100 text-red-800 border border-red-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {entry.status || "pending"}
                          </span>
                        </td>

                        {/* Entrant */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#111]">{entry.fullName}</div>
                          <div className="text-[11px] text-[#7A746B]">{entry.relationship}</div>
                        </td>

                        {/* Couple & Date */}
                        <td className="py-3.5 px-4">
                          <div className="font-serif font-medium text-[#111] text-sm">
                            {entry.coupleNames}
                          </div>
                          <div className="text-[11px] text-[#7A746B]">
                            {entry.weddingDate}
                          </div>
                        </td>

                        {/* Hashtag */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-[#8C6D1F]">
                          {entry.weddingHashtag}
                        </td>

                        {/* Tickets */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                              Number(entry.entriesCount) === 2
                                ? "bg-[#D4AF37] text-black"
                                : "bg-neutral-200 text-neutral-800"
                            }`}
                          >
                            {Number(entry.entriesCount) === 2 ? "★ 2 Entries" : "1 Entry"}
                          </span>
                        </td>

                        {/* Proofs */}
                        <td className="py-3.5 px-4 text-[11px] text-[#6B655B]">
                          {proofsCount > 0 ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-neutral-800">
                              📷 {proofsCount} file{proofsCount > 1 ? "s" : ""}
                            </span>
                          ) : entry.commentLink ? (
                            <span className="text-neutral-500">🔗 Link provided</span>
                          ) : (
                            <span className="text-neutral-400">None</span>
                          )}
                        </td>

                        {/* Submitted */}
                        <td className="py-3.5 px-4 text-[11px] text-[#7A746B]">
                          {new Date(entry.createdAt).toLocaleDateString("en-ZA", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectEntry(entry);
                            }}
                            className="border border-[#DCD6C9] bg-white px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium text-[#111] group-hover:border-black transition-colors"
                          >
                            Inspect →
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* =====================================================================
          INSPECTION DRAWER / MODAL
         ===================================================================== */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl border border-[#DCD6C9] bg-white p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:text-black hover:border-black cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="border-b border-[#E3DDD1] pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6D1F] font-semibold">
                  Competition Entry Inspection
                </span>
                <span className="text-neutral-400">•</span>
                <span className="font-mono text-xs font-semibold">{selectedEntry.entryId}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111]">
                {selectedEntry.coupleNames}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold ${
                    Number(selectedEntry.entriesCount) === 2
                      ? "bg-[#D4AF37] text-black"
                      : "bg-neutral-200 text-neutral-800"
                  }`}
                >
                  {Number(selectedEntry.entriesCount) === 2 ? "★ 2 Entries (Bonus Story Verified)" : "1 Standard Entry"}
                </span>
                <span className="text-xs text-[#7A746B]">
                  Wedding Date: <strong>{selectedEntry.weddingDate}</strong> (2027) • #{selectedEntry.weddingHashtag}
                </span>
              </div>
            </div>

            <div className="space-y-6 text-xs text-[#2A2724]">
              {/* Entrant Details */}
              <div className="border border-[#E3DDD1] bg-[#FAF8F5] p-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7A746B] font-semibold mb-3">
                  01. Entrant Profile
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-neutral-500 block">Full Name:</span>
                    <strong className="text-neutral-900 text-sm">{selectedEntry.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Relationship:</span>
                    <strong className="text-neutral-900">{selectedEntry.relationship}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Email Address:</span>
                    <a href={`mailto:${selectedEntry.email}`} className="text-black underline font-medium">
                      {selectedEntry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Phone Number:</span>
                    <a href={`tel:${selectedEntry.phone}`} className="text-black underline font-medium">
                      {selectedEntry.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="border border-[#E3DDD1] bg-[#FAF8F5] p-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7A746B] font-semibold mb-3">
                  02. Social Media Handles
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-neutral-500 block">Instagram:</span>
                    {selectedEntry.noInstagram ? (
                      <span className="italic text-neutral-400">No account</span>
                    ) : selectedEntry.instagramHandle ? (
                      <a
                        href={`https://instagram.com/${selectedEntry.instagramHandle}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-black underline font-medium flex items-center gap-1"
                      >
                        @{selectedEntry.instagramHandle} ↗
                      </a>
                    ) : (
                      <span className="text-neutral-400">None</span>
                    )}
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Facebook:</span>
                    {selectedEntry.noFacebook ? (
                      <span className="italic text-neutral-400">No account</span>
                    ) : (
                      <strong>{selectedEntry.facebookHandle || "None"}</strong>
                    )}
                  </div>
                  <div>
                    <span className="text-neutral-500 block">TikTok:</span>
                    {selectedEntry.noTikTok ? (
                      <span className="italic text-neutral-400">No account</span>
                    ) : selectedEntry.tiktokHandle ? (
                      <a
                        href={`https://tiktok.com/@${selectedEntry.tiktokHandle}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-black underline font-medium flex items-center gap-1"
                      >
                        @{selectedEntry.tiktokHandle} ↗
                      </a>
                    ) : (
                      <span className="text-neutral-400">None</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Verification & Attached Proofs */}
              <div className="border border-[#E3DDD1] bg-[#FAF8F5] p-4">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#7A746B] font-semibold mb-3">
                  03. Engagement Verification &amp; Proof Uploads
                </h3>

                {/* Comment Proof */}
                <div className="mb-4 pb-3 border-b border-[#E3DDD1]">
                  <span className="font-semibold block mb-1">Comment Tagging (3 Friends):</span>
                  {selectedEntry.commentLink && (
                    <div className="mb-2">
                      <span className="text-neutral-500 text-[11px] block">Comment Link:</span>
                      <a
                        href={selectedEntry.commentLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-700 underline break-all font-mono text-[11px]"
                      >
                        {selectedEntry.commentLink} ↗
                      </a>
                    </div>
                  )}
                  {selectedEntry.commentScreenshotPath && (
                    <div className="mt-2">
                      <span className="text-neutral-500 text-[11px] block mb-1">Uploaded Comment Screenshot:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            src: selectedEntry.commentScreenshotPath!,
                            title: `Comment Screenshot — ${selectedEntry.fullName}`,
                          })
                        }
                        className="inline-block border border-neutral-300 p-1 bg-white hover:border-black transition-colors cursor-zoom-in"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedEntry.commentScreenshotPath}
                          alt="Comment Proof"
                          className="h-20 w-auto object-cover"
                        />
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow Proofs */}
                <div className="mb-4 pb-3 border-b border-[#E3DDD1]">
                  <span className="font-semibold block mb-1">Follow Proof Screenshots:</span>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {selectedEntry.followProof1Path ? (
                      <div>
                        <span className="text-neutral-500 text-[10px] block mb-1">Proof #1:</span>
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: selectedEntry.followProof1Path!,
                              title: `Follow Proof #1 — ${selectedEntry.fullName}`,
                            })
                          }
                          className="inline-block border border-neutral-300 p-1 bg-white hover:border-black transition-colors cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedEntry.followProof1Path}
                            alt="Follow Proof 1"
                            className="h-20 w-auto object-cover"
                          />
                        </button>
                      </div>
                    ) : (
                      <span className="text-neutral-400 italic">No proof #1 uploaded</span>
                    )}

                    {selectedEntry.followProof2Path && (
                      <div>
                        <span className="text-neutral-500 text-[10px] block mb-1">Proof #2:</span>
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: selectedEntry.followProof2Path!,
                              title: `Follow Proof #2 — ${selectedEntry.fullName}`,
                            })
                          }
                          className="inline-block border border-neutral-300 p-1 bg-white hover:border-black transition-colors cursor-zoom-in"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedEntry.followProof2Path}
                            alt="Follow Proof 2"
                            className="h-20 w-auto object-cover"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bonus Instagram Story */}
                <div>
                  <span className="font-semibold block mb-1">Bonus Instagram Story (24h Live Rule):</span>
                  {selectedEntry.storyScreenshotPath ? (
                    <div className="mt-2">
                      <span className="text-neutral-500 text-[10px] block mb-1">Story Screenshot (Bonus Awarded):</span>
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxImage({
                            src: selectedEntry.storyScreenshotPath!,
                            title: `Instagram Story Proof — ${selectedEntry.fullName}`,
                          })
                        }
                        className="inline-block border border-[#D4AF37] p-1 bg-white hover:border-black transition-colors cursor-zoom-in"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedEntry.storyScreenshotPath}
                          alt="Story Proof"
                          className="h-24 w-auto object-cover"
                        />
                      </button>
                    </div>
                  ) : (
                    <span className="text-neutral-400 italic">No bonus story screenshot uploaded (Single entry)</span>
                  )}
                </div>
              </div>

              {/* Admin Decision & Notes */}
              <div className="border-2 border-black p-4 bg-white">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-black font-bold mb-3">
                  04. Verification Status &amp; Admin Notes
                </h3>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {(
                    [
                      { id: "verified", label: "✓ Verified (Eligible for Draw)", color: "bg-emerald-600 text-white" },
                      { id: "pending", label: "⧗ Pending Review", color: "bg-amber-500 text-black" },
                      { id: "disqualified", label: "✕ Disqualified", color: "bg-red-600 text-white" },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setActiveStatus(st.id)}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        activeStatus === st.id ? st.color + " ring-2 ring-black" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-600 mb-1">
                    Internal Admin Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={activeNotes}
                    onChange={(e) => setActiveNotes(e.target.value)}
                    placeholder="e.g. Checked comment tagging; valid South African entrant; verified 24h story screenshot."
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSaveEntryStatus}
                    disabled={isUpdatingStatus}
                    className="border border-black bg-black px-5 py-2 text-xs uppercase tracking-wider font-semibold text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    {isUpdatingStatus ? "Saving..." : "Save Verification Status"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteEntry(selectedEntry.entryId)}
                    className="text-red-600 hover:text-red-800 text-xs uppercase tracking-wider underline cursor-pointer"
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LIGHTBOX IMAGE VIEWER
         ===================================================================== */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white text-sm uppercase tracking-widest hover:text-neutral-300 cursor-pointer"
            >
              Close ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[80vh] w-auto border border-white/20 object-contain shadow-2xl bg-black"
            />
            <span className="text-white/70 text-xs mt-3 uppercase tracking-wider">
              {lightboxImage.title}
            </span>
          </div>
        </div>
      )}

      {/* =====================================================================
          AUDITED RANDOM DRAW MODAL
         ===================================================================== */}
      {isDrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-xl border-2 border-[#D4AF37] bg-white p-6 sm:p-10 shadow-2xl text-center">
            <button
              onClick={() => setIsDrawModalOpen(false)}
              className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:text-black cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D1F] font-bold block mb-1">
              Creative Forge Digital
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111]">
              Audited Random Winner Draw
            </h2>
            <p className="mt-1 text-xs text-neutral-600 font-serif italic">
              Conducted per Consumer Protection Act (68 of 2008) regulations. Weighted ticket random selection.
            </p>

            {drawError && (
              <div className="my-4 rounded-xs border border-red-400 bg-red-50 p-3 text-xs text-red-800">
                {drawError}
              </div>
            )}

            {!drawResult && !isDrawing && (
              <div className="my-8 space-y-4">
                <div className="border border-[#E3DDD1] bg-[#FAF8F5] p-5 text-left text-xs">
                  <div className="flex justify-between py-1 border-b border-[#E3DDD1]">
                    <span className="text-neutral-500">Verified Entrants:</span>
                    <strong>{metrics?.verifiedCount ?? 0} couples</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E3DDD1]">
                    <span className="text-neutral-500">Total Valid Tickets in Draw:</span>
                    <strong className="text-[#8C6D1F]">
                      {entries
                        .filter((e) => e.status === "verified")
                        .reduce((s, e) => s + Number(e.entriesCount), 0)}{" "}
                      tickets
                    </strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">Grand Prize:</span>
                    <strong>Custom Wedding Website (R4,500 value)</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleRunDraw(true)}
                    className="flex-1 cursor-pointer border border-[#D4AF37] bg-[#D4AF37] py-3 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-[#F3E5AB] transition-colors"
                  >
                    Draw From Verified Entries ★
                  </button>
                  <button
                    onClick={() => handleRunDraw(false)}
                    className="cursor-pointer border border-neutral-300 bg-neutral-100 px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-700 hover:bg-neutral-200"
                  >
                    Draw From All Active
                  </button>
                </div>
              </div>
            )}

            {isDrawing && (
              <div className="my-12 flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D4AF37] border-t-black" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D1F] font-bold animate-pulse">
                  Selecting Winner via Cryptographic Randomization...
                </span>
              </div>
            )}

            {drawResult && !isDrawing && (
              <div className="my-6 border-2 border-[#D4AF37] bg-[#FAF5EB] p-6 text-left">
                <div className="text-center mb-4">
                  <span className="text-3xl">🎉</span>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-[#8C6D1F] font-bold mt-1">
                    Official Winner Selected
                  </span>
                  <h3 className="font-serif text-3xl font-medium text-black mt-1">
                    {drawResult.winner.coupleNames}
                  </h3>
                  <p className="text-xs font-serif italic text-neutral-700">
                    2027 Wedding: {drawResult.winner.weddingDate} • #{drawResult.winner.weddingHashtag}
                  </p>
                </div>

                <div className="border-t border-[#D4AF37]/40 pt-4 text-xs space-y-1.5 text-neutral-800">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Winning Entrant:</span>
                    <strong>{drawResult.winner.fullName} ({drawResult.winner.relationship})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact Email:</span>
                    <a href={`mailto:${drawResult.winner.email}`} className="underline font-semibold">
                      {drawResult.winner.email}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact Phone:</span>
                    <a href={`tel:${drawResult.winner.phone}`} className="underline font-semibold">
                      {drawResult.winner.phone}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Winning Ticket #:</span>
                    <strong className="font-mono text-[#8C6D1F]">Ticket #{drawResult.winningTicketNumber}</strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-500 pt-2 border-t border-[#D4AF37]/30">
                    <span>Audit Hash:</span>
                    <span className="font-mono text-[10px] truncate max-w-[240px]">
                      {drawResult.auditTrail.auditHash}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDrawResult(null)}
                  className="mt-5 w-full border border-black bg-black py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800 cursor-pointer"
                >
                  Close &amp; Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
