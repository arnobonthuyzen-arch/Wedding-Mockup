"use client";

import { useState } from "react";
import Image from "next/image";
import TermsModal from "./TermsModal";

type Relationship =
  | "Bride"
  | "Groom"
  | "Partner (Getting Married)"
  | "Part of the Wedding Party"
  | "Part of the Bridal Party"
  | "Friend"
  | "Family Member"
  | "";

interface FormState {
  fullName: string;
  relationship: Relationship;
  email: string;
  phone: string;
  instagramHandle: string;
  noInstagram: boolean;
  facebookHandle: string;
  noFacebook: boolean;
  tiktokHandle: string;
  noTikTok: boolean;
  residentAge18: "yes" | "no" | "";
  coupleNames: string;
  weddingDate: string;
  dateConfirmed: boolean;
  weddingHashtag: string;
  coupleEmail: string;
  couplePhone: string;
  commentLink: string;
  commentScreenshotFile: File | null;
  commentScreenshotPreview: string | null;
  confirmFollow: boolean;
  followProof1File: File | null;
  followProof1Preview: string | null;
  followProof2File: File | null;
  followProof2Preview: string | null;
  storyFile: File | null;
  storyPreview: string | null;
  termsAccepted: boolean;
  marketingConsent: boolean;
  captchaAnswer: string;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  relationship: "",
  email: "",
  phone: "",
  instagramHandle: "",
  noInstagram: false,
  facebookHandle: "",
  noFacebook: false,
  tiktokHandle: "",
  noTikTok: false,
  residentAge18: "",
  coupleNames: "",
  weddingDate: "",
  dateConfirmed: false,
  weddingHashtag: "",
  coupleEmail: "",
  couplePhone: "",
  commentLink: "",
  commentScreenshotFile: null,
  commentScreenshotPreview: null,
  confirmFollow: false,
  followProof1File: null,
  followProof1Preview: null,
  followProof2File: null,
  followProof2Preview: null,
  storyFile: null,
  storyPreview: null,
  termsAccepted: false,
  marketingConsent: false,
  captchaAnswer: "",
};

// Maximum file upload limit (2.5MB per item)
const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

// South African phone validation: 0XX XXX XXXX or +27 XX XXX XXXX
const validateSAPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^(0|\+27)[6-8][0-9]{8}$/.test(cleaned);
};

export default function CompetitionForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    entryId: string;
    entriesCount: number;
    coupleNames: string;
    entrantName: string;
  } | null>(null);

  // Field change helper
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSubmitError(null);
  };

  // Relationship check
  const isDirectCouple =
    form.relationship === "Bride" ||
    form.relationship === "Groom" ||
    form.relationship === "Partner (Getting Married)";

  const isEnteringForCouple =
    form.relationship === "Part of the Wedding Party" ||
    form.relationship === "Part of the Bridal Party" ||
    form.relationship === "Friend" ||
    form.relationship === "Family Member";

  // Calculate platform count
  const validPlatformsCount = [
    !form.noInstagram && form.instagramHandle.trim().length > 0,
    !form.noFacebook && form.facebookHandle.trim().length > 0,
    !form.noTikTok && form.tiktokHandle.trim().length > 0,
  ].filter(Boolean).length;

  const noAccountCount = [form.noInstagram, form.noFacebook, form.noTikTok].filter(Boolean).length;

  // Handle Story file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSubmitError("Screenshot must be smaller than 2.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        storyFile: file,
        storyPreview: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeStoryFile = () => {
    setForm((prev) => ({
      ...prev,
      storyFile: null,
      storyPreview: null,
    }));
  };

  // Handle follow proof uploads (2 optional photo uploads)
  const handleFollowProof1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSubmitError("Follow proof photo must be smaller than 2.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        followProof1File: file,
        followProof1Preview: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFollowProof1 = () => {
    setForm((prev) => ({
      ...prev,
      followProof1File: null,
      followProof1Preview: null,
    }));
  };

  const handleFollowProof2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSubmitError("Follow proof photo must be smaller than 2.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        followProof2File: file,
        followProof2Preview: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFollowProof2 = () => {
    setForm((prev) => ({
      ...prev,
      followProof2File: null,
      followProof2Preview: null,
    }));
  };

  // Handle comment screenshot upload (alternative to comment link)
  const handleCommentScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSubmitError("Comment screenshot must be smaller than 2.5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        commentScreenshotFile: file,
        commentScreenshotPreview: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeCommentScreenshot = () => {
    setForm((prev) => ({
      ...prev,
      commentScreenshotFile: null,
      commentScreenshotPreview: null,
    }));
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Check age gate
    if (form.residentAge18 !== "yes") {
      setSubmitError("You must be a South African resident aged 18 or older to enter.");
      window.scrollTo({ top: 400, behavior: "smooth" });
      return;
    }

    // 2. Validate phone number
    if (!validateSAPhone(form.phone)) {
      setSubmitError("Please enter a valid South African mobile number (e.g. 082 123 4567 or +27 82 123 4567).");
      return;
    }

    // 3. Validate 2 of 3 platform rule
    if (validPlatformsCount < 2) {
      setSubmitError("You must provide handles for at least 2 platforms (Instagram, Facebook, or TikTok).");
      return;
    }

    // 4. Validate wedding date (must be in 2027 per clause 2.8 & 5.2)
    if (!form.weddingDate) {
      setSubmitError("Please provide your confirmed wedding date.");
      return;
    }
    const weddingYear = new Date(form.weddingDate).getFullYear();
    if (weddingYear !== 2027) {
      setSubmitError(
        "Only weddings taking place in the 2027 calendar year are eligible for this prize (Clause 2.8 & 5.2 of Terms & Conditions)."
      );
      return;
    }
    if (!form.dateConfirmed) {
      setSubmitError("Please confirm that your wedding date is accurate.");
      return;
    }

    // 5. Unique hashtag
    if (!form.weddingHashtag.trim()) {
      setSubmitError("Please enter the couple's unique wedding hashtag.");
      return;
    }

    // 6. Comment verification (link or screenshot required)
    if (!form.commentLink.trim() && !form.commentScreenshotFile) {
      setSubmitError("Please provide either a link to your comment or upload a screenshot of your comment tagging 3 friends.");
      return;
    }

    // 7. Follow confirmation
    if (!form.confirmFollow) {
      setSubmitError("Please confirm you follow Creative Forge Digital on at least 2 platforms.");
      return;
    }

    // 8. Terms accepted
    if (!form.termsAccepted) {
      setSubmitError("You must read and accept the Competition Terms & Conditions to enter.");
      return;
    }

    // 9. Simple anti-bot check
    const answer = form.captchaAnswer.trim();
    if (answer !== "7" && answer.toLowerCase() !== "seven") {
      setSubmitError("Please solve the security calculation (3 + 4) correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("relationship", form.relationship);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("residentAge18", form.residentAge18);

      formData.append("instagramHandle", form.noInstagram ? "" : form.instagramHandle);
      formData.append("noInstagram", String(form.noInstagram));
      formData.append("facebookHandle", form.noFacebook ? "" : form.facebookHandle);
      formData.append("noFacebook", String(form.noFacebook));
      formData.append("tiktokHandle", form.noTikTok ? "" : form.tiktokHandle);
      formData.append("noTikTok", String(form.noTikTok));

      formData.append("coupleNames", form.coupleNames || form.fullName);
      formData.append("weddingDate", form.weddingDate);
      formData.append("weddingHashtag", form.weddingHashtag.startsWith("#") ? form.weddingHashtag : `#${form.weddingHashtag}`);
      formData.append("coupleEmail", form.coupleEmail);
      formData.append("couplePhone", form.couplePhone);

      formData.append("commentLink", form.commentLink.trim());
      if (form.commentScreenshotFile) {
        formData.append("commentScreenshot", form.commentScreenshotFile);
      }

      formData.append("confirmFollow", String(form.confirmFollow));
      formData.append("termsAccepted", String(form.termsAccepted));
      formData.append("marketingConsent", String(form.marketingConsent));

      if (form.followProof1File) {
        formData.append("followProof1", form.followProof1File);
      }

      if (form.followProof2File) {
        formData.append("followProof2", form.followProof2File);
      }

      if (form.storyFile) {
        formData.append("storyScreenshot", form.storyFile);
      }

      const res = await fetch("/api/competition", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit entry. Please try again.");
      }

      setSubmittedData({
        entryId: data.entryId,
        entriesCount: data.entriesCount,
        coupleNames: data.coupleNames,
        entrantName: form.fullName,
      });

      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // SUCCESS SCREEN (CFD Editorial Celebration)
  // =========================================================================
  if (submittedData) {
    return (
      <section className="relative mx-auto my-12 max-w-3xl border border-cfd-border bg-white p-8 sm:p-14 text-center shadow-lift text-cfd-charcoal font-sans">
        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-cfd-black bg-black shadow-lift">
          <Image
            src="/images/cfd-logo.png"
            alt="Creative Forge Digital Logo"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="mt-6 block text-[11px] uppercase tracking-[0.3em] text-cfd-muted font-medium">
          Official Entry Verified &amp; Recorded
        </span>

        <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-cfd-black">
          You are in the draw. <br />
          <span className="italic font-light text-cfd-charcoal">
            {submittedData.coupleNames}
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-cfd-muted font-serif">
          Thank you, <strong>{submittedData.entrantName}</strong>. Your entry has been recorded in our official database. The audited random draw takes place on <strong>23 October 2026</strong>.
        </p>

        {/* Tally Card */}
        <div className="mx-auto my-8 grid max-w-md grid-cols-2 gap-4 border border-cfd-border bg-cfd-newsprint p-5 text-left">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-cfd-muted">
              Reference Code
            </div>
            <div className="font-mono text-base font-bold text-cfd-black mt-0.5">
              {submittedData.entryId}
            </div>
          </div>
          <div className="border-l border-cfd-border pl-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-cfd-muted">
              Official Tally
            </div>
            <div className="text-sm font-semibold text-cfd-black mt-0.5">
              {submittedData.entriesCount} {submittedData.entriesCount === 2 ? "Entries (Bonus Included)" : "Entry"}
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="mx-auto max-w-lg border border-cfd-border bg-cfd-newsprint p-5 text-left text-xs leading-relaxed text-cfd-charcoal">
          <strong className="block font-semibold uppercase tracking-wider text-[11px] text-cfd-black mb-1">
            Ensure your entry remains valid:
          </strong>
          <p className="m-0 text-cfd-muted">
            Keep following Creative Forge Digital and ensure your tagged comment remains active. Winners will be announced by 26 October 2026.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://instagram.com/creativeforgedigital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-cfd-border bg-white px-3 py-1.5 text-[11px] uppercase tracking-wider text-cfd-black hover:border-black transition-colors"
            >
              Instagram @creativeforgedigital ↗
            </a>
            <a
              href="https://facebook.com/creativeforgedigital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-cfd-border bg-white px-3 py-1.5 text-[11px] uppercase tracking-wider text-cfd-black hover:border-black transition-colors"
            >
              Facebook ↗
            </a>
            <a
              href="https://tiktok.com/@creativeforgedigital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-cfd-border bg-white px-3 py-1.5 text-[11px] uppercase tracking-wider text-cfd-black hover:border-black transition-colors"
            >
              TikTok @creativeforgedigital ↗
            </a>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              setSubmittedData(null);
              setForm(INITIAL_FORM);
            }}
            className="border-0 bg-transparent text-[11px] uppercase tracking-[0.25em] text-cfd-muted hover:text-cfd-black transition-colors cursor-pointer underline underline-offset-4"
          >
            Submit Another Entry
          </button>
        </div>
      </section>
    );
  }

  // =========================================================================
  // MAIN EDITORIAL FORM (CFD Style)
  // =========================================================================
  return (
    <>
      <section
        id="entry-form"
        className="relative mx-auto my-8 max-w-4xl border border-cfd-border/90 bg-white p-6 sm:p-14 shadow-lift font-sans text-cfd-charcoal"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 sm:gap-14">
          {/* Error Banner */}
          {submitError && (
            <div className="border border-red-300 bg-red-50/90 p-4 text-xs text-red-800 flex items-start gap-3">
              <span className="font-mono text-sm font-bold text-red-600">!</span>
              <div>
                <strong className="block font-semibold uppercase tracking-wider text-[11px]">
                  Please review and resolve:
                </strong>
                <p className="mt-0.5 m-0">{submitError}</p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 01. ENTRANT DETAILS */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-7 border-b border-cfd-border/80 pb-12">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-1.5">
                <span>Section 01</span>
                <span>Entrant Specification</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-cfd-black">
                Entrant details. <span className="italic font-light">Who is entering.</span>
              </h2>
              <p className="mt-2 text-xs text-cfd-muted leading-relaxed font-serif italic max-w-2xl">
                The entrant is always the person physically completing the form and social actions — even when entering on behalf of a friend&apos;s or family member&apos;s wedding.
              </p>
            </div>

            {/* Full Name & Relationship */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Full Name <span className="text-neutral-400">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kayla Marais"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className="rounded-xs border border-cfd-border bg-white px-4 py-3 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-cfd-muted">
                  Must match the name on your social media account(s)
                </span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Relationship to the Wedding <span className="text-neutral-400">*</span>
                </span>
                <select
                  required
                  value={form.relationship}
                  onChange={(e) => update("relationship", e.target.value as Relationship)}
                  className="rounded-xs border border-cfd-border bg-white px-4 py-3 text-sm text-cfd-black focus:border-cfd-black focus:outline-none transition-colors"
                >
                  <option value="" disabled>Select relationship...</option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                  <option value="Partner (Getting Married)">Partner (Getting Married)</option>
                  <option value="Part of the Wedding Party">Part of the Wedding Party</option>
                  <option value="Friend">Friend</option>
                  <option value="Family Member">Family Member</option>
                </select>
                <span className="text-[11px] text-cfd-muted">
                  Determines whether Section 2 couple details are shown
                </span>
              </label>
            </div>

            {/* Email & Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Email Address <span className="text-neutral-400">*</span>
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@example.co.za"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="rounded-xs border border-cfd-border bg-white px-4 py-3 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-cfd-muted">
                  Used to contact you immediately if drawn as winner
                </span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Phone Number (SA Format) <span className="text-neutral-400">*</span>
                </span>
                <input
                  type="tel"
                  required
                  placeholder="082 123 4567 or +27 82 123 4567"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={`rounded-xs border bg-white px-4 py-3 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:outline-none transition-colors ${
                    form.phone && !validateSAPhone(form.phone)
                      ? "border-red-400 focus:border-red-600"
                      : "border-cfd-border focus:border-cfd-black"
                  }`}
                />
                <span className="text-[11px] text-cfd-muted">
                  South African mobile number format
                </span>
              </label>
            </div>

            {/* Eligibility: SA Resident 18+ Gate */}
            <div className="border border-cfd-border bg-cfd-newsprint p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black block">
                    Are you a South African resident aged 18 or older? <span className="text-neutral-400">*</span>
                  </span>
                  <span className="text-xs text-cfd-muted">
                    Hard eligibility gate per Clause 5.1 of Terms &amp; Conditions.
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cfd-black cursor-pointer">
                    <input
                      type="radio"
                      name="residentAge18"
                      value="yes"
                      checked={form.residentAge18 === "yes"}
                      onChange={() => update("residentAge18", "yes")}
                      className="accent-black h-4 w-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cfd-black cursor-pointer">
                    <input
                      type="radio"
                      name="residentAge18"
                      value="no"
                      checked={form.residentAge18 === "no"}
                      onChange={() => update("residentAge18", "no")}
                      className="accent-black h-4 w-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {form.residentAge18 === "no" && (
                <div className="mt-3 border border-red-300 bg-red-50 p-3 text-xs text-red-700">
                  ⚠️ This competition is open only to South African residents aged 18 or older. Submissions from ineligible entrants cannot be processed.
                </div>
              )}
            </div>

            {/* Platform Rule Callout Banner (CFD Signature Editorial) */}
            <div className="border border-cfd-border bg-cfd-newsprint p-5 sm:p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                    Platform Rule • 2 of 3 Platforms Required
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                      validPlatformsCount >= 2
                        ? "bg-black text-white"
                        : "bg-cfd-border text-cfd-black"
                    }`}
                  >
                    {validPlatformsCount} of 2 Confirmed
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-cfd-charcoal font-serif">
                  &ldquo;You must follow Creative Forge Digital on at least <strong>2 of the 3 platforms</strong> below (Instagram, Facebook, TikTok) for your entry to be valid. If you don&apos;t have an account on one platform, tick the box next to it and make sure you&apos;re following us on the other two.&rdquo;
                </p>
              </div>
            </div>

            {/* Platform 1: Instagram */}
            <div className="border border-cfd-border bg-white p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                      Instagram Handle
                    </span>
                    <a
                      href="https://instagram.com/creativeforgedigital"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-cfd-muted hover:text-black transition-colors"
                    >
                      Follow @creativeforgedigital ↗
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs text-cfd-muted">@</span>
                    <input
                      type="text"
                      disabled={form.noInstagram}
                      placeholder={form.noInstagram ? "No Instagram account" : "your_handle"}
                      value={form.instagramHandle}
                      onChange={(e) => update("instagramHandle", e.target.value.replace(/^@/, ""))}
                      className="w-full rounded-xs border border-cfd-border bg-white py-2.5 pl-8 pr-3 text-sm text-cfd-black placeholder:text-cfd-muted/50 disabled:opacity-40 disabled:bg-cfd-newsprint focus:border-cfd-black focus:outline-none transition-colors"
                    />
                  </div>
                </label>

                <label className="flex items-center gap-2 self-start sm:self-center sm:pt-4 cursor-pointer text-xs text-cfd-muted hover:text-cfd-black">
                  <input
                    type="checkbox"
                    checked={form.noInstagram}
                    onChange={(e) => {
                      update("noInstagram", e.target.checked);
                      if (e.target.checked) update("instagramHandle", "");
                    }}
                    className="accent-black h-4 w-4"
                  />
                  <span>I don&apos;t have an Instagram account</span>
                </label>
              </div>
            </div>

            {/* Platform 2: Facebook */}
            <div className="border border-cfd-border bg-white p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                      Facebook Name / Profile Handle
                    </span>
                    <a
                      href="https://facebook.com/creativeforgedigital"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-cfd-muted hover:text-black transition-colors"
                    >
                      Follow Creative Forge Digital ↗
                    </a>
                  </div>
                  <input
                    type="text"
                    disabled={form.noFacebook}
                    placeholder={form.noFacebook ? "No Facebook account" : "Your Facebook Name or profile link"}
                    value={form.facebookHandle}
                    onChange={(e) => update("facebookHandle", e.target.value)}
                    className="w-full rounded-xs border border-cfd-border bg-white py-2.5 px-3.5 text-sm text-cfd-black placeholder:text-cfd-muted/50 disabled:opacity-40 disabled:bg-cfd-newsprint focus:border-cfd-black focus:outline-none transition-colors"
                  />
                </label>

                <label className="flex items-center gap-2 self-start sm:self-center sm:pt-4 cursor-pointer text-xs text-cfd-muted hover:text-cfd-black">
                  <input
                    type="checkbox"
                    checked={form.noFacebook}
                    onChange={(e) => {
                      update("noFacebook", e.target.checked);
                      if (e.target.checked) update("facebookHandle", "");
                    }}
                    className="accent-black h-4 w-4"
                  />
                  <span>I don&apos;t have a Facebook account</span>
                </label>
              </div>
            </div>

            {/* Platform 3: TikTok */}
            <div className="border border-cfd-border bg-white p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                      TikTok Handle
                    </span>
                    <a
                      href="https://tiktok.com/@creativeforgedigital"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-cfd-muted hover:text-black transition-colors"
                    >
                      Follow @creativeforgedigital ↗
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs text-cfd-muted">@</span>
                    <input
                      type="text"
                      disabled={form.noTikTok}
                      placeholder={form.noTikTok ? "No TikTok account" : "your_handle"}
                      value={form.tiktokHandle}
                      onChange={(e) => update("tiktokHandle", e.target.value.replace(/^@/, ""))}
                      className="w-full rounded-xs border border-cfd-border bg-white py-2.5 pl-8 pr-3 text-sm text-cfd-black placeholder:text-cfd-muted/50 disabled:opacity-40 disabled:bg-cfd-newsprint focus:border-cfd-black focus:outline-none transition-colors"
                    />
                  </div>
                </label>

                <label className="flex items-center gap-2 self-start sm:self-center sm:pt-4 cursor-pointer text-xs text-cfd-muted hover:text-cfd-black">
                  <input
                    type="checkbox"
                    checked={form.noTikTok}
                    onChange={(e) => {
                      update("noTikTok", e.target.checked);
                      if (e.target.checked) update("tiktokHandle", "");
                    }}
                    className="accent-black h-4 w-4"
                  />
                  <span>I don&apos;t have a TikTok account</span>
                </label>
              </div>
            </div>

            {noAccountCount >= 2 && (
              <div className="border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
                Notice: You have marked {noAccountCount} platforms as &quot;no account&quot;. You must follow CFD on at least 2 platforms for your entry to be valid.
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 02. THE WEDDING */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-7 border-b border-cfd-border/80 pb-12">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-1.5">
                <span>Section 02</span>
                <span>The 2027 Wedding</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-cfd-black">
                The wedding. <span className="italic font-light">The celebration.</span>
              </h2>
              <p className="mt-2 text-xs text-cfd-muted leading-relaxed font-serif italic max-w-2xl">
                {isDirectCouple
                  ? "Since you are entering your own wedding, specify your confirmed 2027 wedding date and unique wedding hashtag."
                  : "Tell us about the lucky couple you are entering on behalf of."}
              </p>
            </div>

            {/* Couple's Names: Shown in full only if Bridal Party, Friend, or Family Member (per spec) */}
            {isEnteringForCouple ? (
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Couple&apos;s Names (as they&apos;d appear on the website) <span className="text-neutral-400">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kayla & Wynand"
                  value={form.coupleNames}
                  onChange={(e) => update("coupleNames", e.target.value)}
                  className="rounded-xs border border-cfd-border bg-white px-4 py-3 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-cfd-muted">
                  How the couple&apos;s names should be presented across website navigation and headlines
                </span>
              </label>
            ) : (
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Couple&apos;s Names (as they&apos;d appear on the website) <span className="text-neutral-400">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kayla & Wynand"
                  value={form.coupleNames || form.fullName}
                  onChange={(e) => update("coupleNames", e.target.value)}
                  className="rounded-xs border border-cfd-border bg-white px-4 py-3 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-cfd-muted">
                  Your and your partner&apos;s names for the website header
                </span>
              </label>
            )}

            {/* Wedding Date & Hashtag */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Confirmed Wedding Date <span className="text-neutral-400">*</span>
                </span>
                <input
                  type="date"
                  required
                  min="2027-01-01"
                  max="2027-12-31"
                  value={form.weddingDate}
                  onChange={(e) => update("weddingDate", e.target.value)}
                  className="rounded-xs border border-cfd-border bg-white px-4 py-3 text-sm text-cfd-black focus:border-cfd-black focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-cfd-muted">
                  Must be in 2027 (Clause 2.8: Only weddings in 2027 are eligible)
                </span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Couple&apos;s Unique Wedding Hashtag <span className="text-neutral-400">*</span>
                </span>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-semibold text-cfd-muted">#</span>
                  <input
                    type="text"
                    required
                    placeholder="KaylaAndWynand2027"
                    value={form.weddingHashtag.replace(/^#/, "")}
                    onChange={(e) => update("weddingHashtag", `#${e.target.value.replace(/^#/, "")}`)}
                    className="w-full rounded-xs border border-cfd-border bg-white py-3 pl-8 pr-3 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none transition-colors"
                  />
                </div>
                <span className="text-[11px] text-cfd-muted">
                  Must be unique to the couple (checked against your Story post)
                </span>
              </label>
            </div>

            {/* Honesty Commitment Checkbox */}
            <label className="flex items-start gap-3 border border-cfd-border bg-cfd-newsprint p-4 sm:p-5 cursor-pointer hover:border-black transition-colors">
              <input
                type="checkbox"
                required
                checked={form.dateConfirmed}
                onChange={(e) => update("dateConfirmed", e.target.checked)}
                className="accent-black h-4 w-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs leading-relaxed text-cfd-charcoal font-serif">
                I confirm this wedding date is accurate to the best of my knowledge, and understand proof may be requested if drawn as a winner. <span className="text-neutral-400 font-sans">*</span>
              </span>
            </label>

            {/* Couple Backup Contact (Shown if entering on behalf of couple) */}
            {isEnteringForCouple && (
              <div className="border border-dashed border-cfd-border bg-cfd-newsprint/60 p-5">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black block mb-1">
                  Couple&apos;s Direct Contact (Optional Backup)
                </span>
                <p className="text-[11px] text-cfd-muted mb-4 font-serif">
                  If the entrant drawn goes unresponsive within 7 days, providing the couple&apos;s details upfront ensures they do not forfeit the prize.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    placeholder="Couple's Email (optional)"
                    value={form.coupleEmail}
                    onChange={(e) => update("coupleEmail", e.target.value)}
                    className="rounded-xs border border-cfd-border bg-white px-3.5 py-2.5 text-xs text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Couple's Phone (optional)"
                    value={form.couplePhone}
                    onChange={(e) => update("couplePhone", e.target.value)}
                    className="rounded-xs border border-cfd-border bg-white px-3.5 py-2.5 text-xs text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 03. ENTRY VERIFICATION */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-7 border-b border-cfd-border/80 pb-12">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-1.5">
                <span>Section 03</span>
                <span>Proof of Engagement</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-cfd-black">
                Entry verification. <span className="italic font-light">The social actions.</span>
              </h2>
              <p className="mt-2 text-xs text-cfd-muted leading-relaxed font-serif italic max-w-2xl">
                Verify your entry actions to qualify for the audited random draw.
              </p>
            </div>

            {/* Proof of Comment: Link or Screenshot */}
            <div className="border border-cfd-border bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black">
                  Proof of Comment (Tagging 3 Friends) <span className="text-neutral-400">*</span>
                </span>
                <span className="bg-cfd-black text-white px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold">
                  Link or Screenshot
                </span>
              </div>
              <p className="text-xs text-cfd-muted font-serif italic mb-5">
                Provide either a direct link to your comment OR upload a screenshot showing your comment with 3 tagged friends.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Method 1: Comment Link */}
                <div className="border border-cfd-border bg-cfd-newsprint p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-cfd-black">
                      Option A: Enter Comment Link
                    </span>
                    <input
                      type="text"
                      placeholder="https://instagram.com/p/... or handle & comment details"
                      value={form.commentLink}
                      onChange={(e) => update("commentLink", e.target.value)}
                      className="rounded-xs border border-cfd-border bg-white px-3.5 py-2.5 text-sm text-cfd-black placeholder:text-cfd-muted/60 focus:border-cfd-black focus:outline-none transition-colors"
                    />
                    <span className="text-[11px] text-cfd-muted">
                      Paste the link to your comment or specify your handle and post
                    </span>
                  </div>
                </div>

                {/* Method 2: Comment Screenshot */}
                <div className="border border-cfd-border bg-cfd-newsprint p-4 sm:p-5 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-cfd-black">
                      Option B: Upload Comment Screenshot
                    </span>

                    {form.commentScreenshotPreview ? (
                      <div className="relative inline-flex flex-col items-center border border-cfd-border bg-white p-3 shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form.commentScreenshotPreview}
                          alt="Comment screenshot"
                          className="h-32 w-auto max-w-full object-contain"
                        />
                        <div className="mt-2 flex items-center justify-between w-full text-xs text-cfd-muted">
                          <span className="truncate max-w-[150px]">
                            {form.commentScreenshotFile?.name}
                          </span>
                          <button
                            type="button"
                            onClick={removeCommentScreenshot}
                            className="text-red-700 hover:text-black font-semibold cursor-pointer underline text-[11px]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-cfd-border hover:border-cfd-black bg-white p-4 cursor-pointer transition-colors text-center">
                        <span className="font-serif text-sm font-medium text-cfd-black">
                          Upload Comment Screenshot
                        </span>
                        <span className="mt-1 text-[10px] uppercase tracking-wider text-cfd-muted">
                          JPG, PNG, or WEBP up to 2.5MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCommentScreenshotChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    <span className="text-[11px] text-cfd-muted">
                      Screenshot showing your comment tagging 3 friends
                    </span>
                  </div>
                </div>
              </div>

              {/* Status helper */}
              <div className="mt-4 pt-3 border-t border-cfd-border/60 flex items-center justify-between text-[11px]">
                <span
                  className={
                    form.commentLink.trim() || form.commentScreenshotFile
                      ? "text-emerald-700 font-semibold"
                      : "text-amber-800"
                  }
                >
                  {form.commentLink.trim() && form.commentScreenshotFile
                    ? "✓ Both link and screenshot provided"
                    : form.commentLink.trim()
                    ? "✓ Comment link provided"
                    : form.commentScreenshotFile
                    ? "✓ Comment screenshot uploaded"
                    : "⚠️ Please enter a link or upload a screenshot (at least one is required)"}
                </span>
              </div>
            </div>

            {/* Follow Confirmation Checkbox */}
            <label className="flex items-start gap-3 border border-cfd-border bg-cfd-newsprint p-4 sm:p-5 cursor-pointer hover:border-black transition-colors">
              <input
                type="checkbox"
                required
                checked={form.confirmFollow}
                onChange={(e) => update("confirmFollow", e.target.checked)}
                className="accent-black h-4 w-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs leading-relaxed text-cfd-charcoal font-serif">
                I confirm I follow Creative Forge Digital on at least 2 of the 3 platforms I&apos;ve indicated above. <span className="text-neutral-400 font-sans">*</span>
              </span>
            </label>

            {/* Proof of Following: 2 Optional Photo Uploads */}
            <div className="border border-cfd-border bg-cfd-newsprint p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black flex items-center gap-2">
                  <span>Proof of Social Following</span>
                  <span className="bg-cfd-border text-cfd-black px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold">
                    2 Optional Photos
                  </span>
                </span>
                <span className="text-[11px] text-cfd-muted">Optional</span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-cfd-charcoal font-serif italic">
                &ldquo;Add photo screenshots confirming you follow Creative Forge Digital on your 2 chosen platforms (Instagram, Facebook, or TikTok).&rdquo;
              </p>
              <p className="mt-1 text-[11px] text-cfd-muted">
                Uploading follow screenshots is optional but helps us verify your entry immediately during the audited draw.
              </p>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {/* Photo 1 Dropzone */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-cfd-black">
                    Follow Proof Photo 1 (Optional)
                  </span>
                  {form.followProof1Preview ? (
                    <div className="relative inline-flex flex-col items-center border border-cfd-border bg-white p-3 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.followProof1Preview}
                        alt="Follow proof 1"
                        className="h-40 w-auto max-w-full object-contain"
                      />
                      <div className="mt-2 flex items-center justify-between w-full text-xs text-cfd-muted">
                        <span className="truncate max-w-[150px]">{form.followProof1File?.name}</span>
                        <button
                          type="button"
                          onClick={removeFollowProof1}
                          className="text-red-700 hover:text-black font-semibold cursor-pointer underline text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-cfd-border hover:border-cfd-black bg-white p-6 cursor-pointer transition-colors text-center">
                      <span className="font-serif text-sm font-medium text-cfd-black">
                        Upload Follow Proof 1
                      </span>
                      <span className="mt-1 text-[10px] uppercase tracking-wider text-cfd-muted">
                        JPG, PNG, or WEBP up to 2.5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFollowProof1Change}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Photo 2 Dropzone */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-cfd-black">
                    Follow Proof Photo 2 (Optional)
                  </span>
                  {form.followProof2Preview ? (
                    <div className="relative inline-flex flex-col items-center border border-cfd-border bg-white p-3 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.followProof2Preview}
                        alt="Follow proof 2"
                        className="h-40 w-auto max-w-full object-contain"
                      />
                      <div className="mt-2 flex items-center justify-between w-full text-xs text-cfd-muted">
                        <span className="truncate max-w-[150px]">{form.followProof2File?.name}</span>
                        <button
                          type="button"
                          onClick={removeFollowProof2}
                          className="text-red-700 hover:text-black font-semibold cursor-pointer underline text-[11px]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-cfd-border hover:border-cfd-black bg-white p-6 cursor-pointer transition-colors text-center">
                      <span className="font-serif text-sm font-medium text-cfd-black">
                        Upload Follow Proof 2
                      </span>
                      <span className="mt-1 text-[10px] uppercase tracking-wider text-cfd-muted">
                        JPG, PNG, or WEBP up to 2.5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFollowProof2Change}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Bonus Entry Plate: Story Screenshot */}
            <div className="border border-cfd-border bg-cfd-newsprint p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black flex items-center gap-2">
                  <span>Screenshot of your Instagram Story</span>
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold">
                    Bonus 2nd Entry
                  </span>
                </span>
                <span className="text-[11px] text-cfd-muted">Optional</span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-cfd-charcoal font-serif italic">
                &ldquo;Your Story must show your wedding hashtag and #CreativeForgeDigital, and tag @creativeforgedigital.&rdquo;
              </p>
              <p className="mt-1 text-[11px] text-cfd-muted">
                Stories disappear after 24 hours — upload your screenshot here before it expires to secure your second entry.
              </p>

              {/* Upload Dropzone */}
              <div className="mt-4">
                {form.storyPreview ? (
                  <div className="relative inline-flex flex-col items-center border border-cfd-border bg-white p-3 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.storyPreview}
                      alt="Story verification screenshot"
                      className="h-48 w-auto max-w-full object-contain"
                    />
                    <div className="mt-3 flex items-center justify-between w-full text-xs text-cfd-muted">
                      <span className="truncate max-w-[200px]">{form.storyFile?.name}</span>
                      <button
                        type="button"
                        onClick={removeStoryFile}
                        className="text-red-700 hover:text-black font-semibold cursor-pointer underline text-[11px]"
                      >
                        Remove file
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-cfd-border hover:border-cfd-black bg-white p-8 cursor-pointer transition-colors text-center">
                    <span className="font-serif text-lg font-medium text-cfd-black">
                      Upload Story Screenshot
                    </span>
                    <span className="mt-1 text-[11px] uppercase tracking-wider text-cfd-muted">
                      JPG, PNG, or WEBP up to 2.5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 04. CONSENT & LEGAL */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-7">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-cfd-muted font-medium mb-1.5">
                <span>Section 04</span>
                <span>Compliance &amp; Governance</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-cfd-black">
                Consent &amp; legal. <span className="italic font-light">POPIA and CPA.</span>
              </h2>
              <p className="mt-2 text-xs text-cfd-muted leading-relaxed font-serif italic max-w-2xl">
                Kept separate and explicit, per the Consumer Protection Act 68 of 2008 and POPIA.
              </p>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="border border-cfd-border bg-white p-4 sm:p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.termsAccepted}
                  onChange={(e) => update("termsAccepted", e.target.checked)}
                  className="accent-black h-4 w-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs leading-relaxed text-cfd-charcoal font-serif">
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(true)}
                    className="font-semibold text-cfd-black underline underline-offset-4 hover:text-neutral-600"
                  >
                    Competition Terms &amp; Conditions
                  </button>
                  . <span className="text-neutral-400 font-sans">*</span>
                </span>
              </label>
            </div>

            {/* POPIA Marketing Opt-In Checkbox */}
            <div className="border border-cfd-border bg-white p-4 sm:p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.marketingConsent}
                  onChange={(e) => update("marketingConsent", e.target.checked)}
                  className="accent-black h-4 w-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs leading-relaxed text-cfd-charcoal font-serif">
                  I&apos;d like to receive marketing communication from Creative Forge Digital. (Unbundled per POPIA Section 69; you may unsubscribe at any time).
                </span>
              </label>
            </div>

            {/* Anti-Bot Challenge */}
            <div className="border border-cfd-border bg-cfd-newsprint p-4 sm:p-5">
              <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-cfd-black block">
                    Security Verification <span className="text-neutral-400">*</span>
                  </span>
                  <span className="text-xs text-cfd-muted font-serif">
                    Automated entry filter: What is <strong>3 + 4</strong>?
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your answer"
                  value={form.captchaAnswer}
                  onChange={(e) => update("captchaAnswer", e.target.value)}
                  className="w-32 rounded-xs border border-cfd-border bg-white px-3 py-2 text-center text-sm font-semibold text-cfd-black focus:border-cfd-black focus:outline-none"
                />
              </label>
            </div>

            {/* Submit Action (CFD Signature Button) */}
            <div className="pt-6 flex flex-col items-start sm:items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[300px] border border-cfd-black bg-cfd-black px-9 py-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lift transition-all hover:bg-neutral-800 disabled:opacity-50 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Your Entry...</span>
                ) : (
                  <>
                    <span>Submit Competition Entry</span>
                    <span className="text-sm">→</span>
                  </>
                )}
              </button>

              <span className="text-[11px] uppercase tracking-wider text-cfd-muted">
                Free to enter • Verified &amp; Encrypted per POPIA
              </span>
            </div>
          </div>
        </form>
      </section>

      {/* Terms Modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </>
  );
}
