"use client";

import { useState, useId } from "react";
import TermsModal from "./TermsModal";
import { SprigDivider } from "../Flourish";

type Relationship =
  | "Bride"
  | "Groom"
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
  confirmFollow: boolean;
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
  confirmFollow: false,
  storyFile: null,
  storyPreview: null,
  termsAccepted: false,
  marketingConsent: false,
  captchaAnswer: "",
};

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
  const isDirectCouple = form.relationship === "Bride" || form.relationship === "Groom";
  const isEnteringForCouple =
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

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Please upload an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSubmitError("Screenshot must be smaller than 10MB.");
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

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Check age gate
    if (form.residentAge18 !== "yes") {
      setSubmitError("You must be a South African resident aged 18 or older to enter.");
      window.scrollTo({ top: 300, behavior: "smooth" });
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

    // 4. Validate wedding date confirmation
    if (!form.weddingDate) {
      setSubmitError("Please provide your confirmed wedding date.");
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

    // 6. Comment link
    if (!form.commentLink.trim()) {
      setSubmitError("Please provide the link to your comment tagging 3 friends.");
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

      formData.append("commentLink", form.commentLink);
      formData.append("confirmFollow", String(form.confirmFollow));
      formData.append("termsAccepted", String(form.termsAccepted));
      formData.append("marketingConsent", String(form.marketingConsent));

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

      window.scrollTo({ top: 150, behavior: "smooth" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // RENDER: SUCCESS SCREEN
  if (submittedData) {
    return (
      <section className="relative mx-auto my-8 max-w-2xl border border-gold bg-cream-soft px-6 py-12 sm:px-12 sm:py-16 text-center shadow-lift">
        <span className="pointer-events-none absolute inset-2.5 border border-gold-light/35" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="mt-5 block text-xs uppercase tracking-[0.35em] text-gold font-sans font-semibold">
          Entry Confirmed
        </span>

        <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-espresso">
          You&apos;re in the Draw!
        </h2>

        <SprigDivider className="my-4" lineClassName="bg-gold/40" />

        <p className="mx-auto max-w-lg font-serif text-lg leading-relaxed text-espresso-soft">
          Thank you, <strong>{submittedData.entrantName}</strong>. Your entry to win a bespoke wedding website for <strong>{submittedData.coupleNames}</strong> has been officially recorded.
        </p>

        {/* Tally Card */}
        <div className="mx-auto my-6 flex max-w-md items-center justify-between rounded-lg border border-border bg-cream p-4 text-left shadow-xs">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted font-sans">
              Entry Reference
            </div>
            <div className="font-mono text-base font-bold text-espresso">
              {submittedData.entryId}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-muted font-sans">
              Entries Earned
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 font-sans text-xs font-semibold text-espresso">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              {submittedData.entriesCount} {submittedData.entriesCount === 2 ? "Entries (Bonus included!)" : "Entry"}
            </div>
          </div>
        </div>

        {/* Social Reminder Card */}
        <div className="mx-auto max-w-lg rounded-lg border border-gold-light/40 bg-gold/5 p-5 text-left font-sans">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs leading-relaxed text-espresso-soft">
              <strong className="text-espresso block font-medium mb-1">Make sure your entry stays valid:</strong>
              Keep following Creative Forge Digital on your 2 platforms and keep your tagged comment active until the draw date. Winners will be contacted via email and phone.
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <a
              href="https://instagram.com/creativeforgedigital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-border bg-cream px-3 py-1.5 text-xs font-medium text-espresso hover:border-gold hover:text-gold transition-colors"
            >
              <span>Instagram</span>
              <span className="text-gold">@creativeforgedigital</span>
            </a>
            <a
              href="https://facebook.com/creativeforgedigital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-border bg-cream px-3 py-1.5 text-xs font-medium text-espresso hover:border-gold hover:text-gold transition-colors"
            >
              <span>Facebook</span>
              <span className="text-gold">Creative Forge Digital</span>
            </a>
            <a
              href="https://tiktok.com/@creativeforgedigital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-border bg-cream px-3 py-1.5 text-xs font-medium text-espresso hover:border-gold hover:text-gold transition-colors"
            >
              <span>TikTok</span>
              <span className="text-gold">@creativeforgedigital</span>
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              setSubmittedData(null);
              setForm(INITIAL_FORM);
            }}
            className="border-0 bg-transparent text-xs uppercase tracking-[0.25em] text-muted hover:text-espresso font-sans transition-colors cursor-pointer underline underline-offset-4"
          >
            Submit Another Entry
          </button>
        </div>
      </section>
    );
  }

  // RENDER: MAIN FORM
  return (
    <>
      <section className="relative mx-auto my-6 max-w-3xl border border-border bg-cream-soft p-6 sm:p-12 shadow-soft font-sans text-espresso">
        <span className="pointer-events-none absolute inset-2.5 border border-gold-light/25" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          {/* Global Submit Error Message */}
          {submitError && (
            <div className="rounded-md border border-red-300 bg-red-50/90 p-4 text-sm text-red-800 shadow-xs flex items-start gap-3">
              <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <strong className="font-semibold block">Please fix the following:</strong>
                <p className="mt-0.5">{submitError}</p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 1: ENTRANT DETAILS */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6 border-b border-border/80 pb-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-cream text-xs font-semibold">
                  1
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                  Entrant Details
                </h3>
              </div>
              <p className="mt-2 text-xs italic text-muted font-serif">
                The entrant is always the person physically completing the form and social actions — even when entering on behalf of a friend&apos;s or family member&apos;s wedding.
              </p>
            </div>

            {/* Full Name & Relationship */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  Full Name <span className="text-gold">*</span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kayla Marais"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className="rounded border border-border bg-cream px-3.5 py-2.5 text-sm text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-muted">
                  Must match the name on your social media account(s)
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  Relationship to the Wedding <span className="text-gold">*</span>
                </span>
                <select
                  required
                  value={form.relationship}
                  onChange={(e) => update("relationship", e.target.value as Relationship)}
                  className="rounded border border-border bg-cream px-3.5 py-2.5 text-sm text-espresso focus:border-gold focus:outline-none transition-colors"
                >
                  <option value="" disabled>Select your relationship...</option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                  <option value="Part of the Bridal Party">Part of the Bridal Party</option>
                  <option value="Friend">Friend</option>
                  <option value="Family Member">Family Member</option>
                </select>
                <span className="text-[11px] text-muted">
                  Determines couple details needed in Section 2
                </span>
              </label>
            </div>

            {/* Email & Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  Email Address <span className="text-gold">*</span>
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@example.co.za"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="rounded border border-border bg-cream px-3.5 py-2.5 text-sm text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-muted">
                  Used to contact you immediately if drawn as winner
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  Phone Number (SA Format) <span className="text-gold">*</span>
                </span>
                <input
                  type="tel"
                  required
                  placeholder="082 123 4567 or +27 82 123 4567"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={`rounded border bg-cream px-3.5 py-2.5 text-sm text-espresso placeholder:text-[#a6927b] focus:outline-none transition-colors ${
                    form.phone && !validateSAPhone(form.phone)
                      ? "border-red-400 focus:border-red-500"
                      : "border-border focus:border-gold"
                  }`}
                />
                <span className="text-[11px] text-muted">
                  South African mobile format (e.g. 082 123 4567)
                </span>
              </label>
            </div>

            {/* Eligibility: SA Resident 18+ */}
            <div className="rounded-lg border border-gold-light/40 bg-gold/5 p-4">
              <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-espresso block">
                    Are you a South African resident aged 18 or older? <span className="text-gold">*</span>
                  </span>
                  <span className="text-[11px] text-espresso-soft">
                    Hard eligibility requirement per competition rules.
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="residentAge18"
                      value="yes"
                      checked={form.residentAge18 === "yes"}
                      onChange={() => update("residentAge18", "yes")}
                      className="accent-[#b8956e] h-4 w-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="residentAge18"
                      value="no"
                      checked={form.residentAge18 === "no"}
                      onChange={() => update("residentAge18", "no")}
                      className="accent-[#b8956e] h-4 w-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </label>

              {form.residentAge18 === "no" && (
                <div className="mt-3 rounded border border-red-300 bg-red-50 p-2.5 text-xs text-red-700">
                  ⚠️ This competition is only open to South African residents aged 18 and older. Submissions from ineligible entrants cannot be accepted.
                </div>
              )}
            </div>

            {/* Social Platform 2-of-3 Rule Callout */}
            <div className="rounded-lg border border-border bg-cream p-4.5 shadow-xs">
              <div className="flex items-start gap-2.5">
                <svg className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs leading-relaxed text-espresso-soft">
                  <strong className="text-espresso font-semibold">Social Platform Rule (2 of 3 Required):</strong>
                  <p className="mt-1">
                    You must follow <strong>Creative Forge Digital</strong> on at least <strong>2 of the 3 platforms</strong> below (Instagram, Facebook, TikTok) for your entry to be valid. If you don&apos;t have an account on one platform, tick the box next to it and make sure you&apos;re following us on the other two.
                  </p>
                </div>
              </div>

              {/* Live Status Counter */}
              <div className="mt-3.5 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="text-muted">Platform verification status:</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold text-[11px] ${
                    validPlatformsCount >= 2
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {validPlatformsCount >= 2 ? "✓ " : "• "}
                  {validPlatformsCount} of 2 required platforms provided
                </span>
              </div>
            </div>

            {/* Platform 1: Instagram */}
            <div className="rounded border border-border bg-cream/70 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-medium text-espresso flex items-center gap-1.5">
                      <span className="font-semibold">Instagram Handle</span>
                      <span className="text-[10px] text-muted lowercase">(follow @creativeforgedigital)</span>
                    </span>
                  </div>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 text-xs text-muted">@</span>
                    <input
                      type="text"
                      disabled={form.noInstagram}
                      placeholder={form.noInstagram ? "No Instagram account" : "your_instagram_handle"}
                      value={form.instagramHandle}
                      onChange={(e) => update("instagramHandle", e.target.value.replace(/^@/, ""))}
                      className="w-full rounded border border-border bg-cream py-2 pl-7 pr-3 text-sm text-espresso placeholder:text-[#a6927b] disabled:opacity-50 disabled:bg-cream-soft focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </label>

                <label className="flex items-center gap-2 self-start sm:self-center sm:pt-4 cursor-pointer text-xs text-muted hover:text-espresso">
                  <input
                    type="checkbox"
                    checked={form.noInstagram}
                    onChange={(e) => {
                      update("noInstagram", e.target.checked);
                      if (e.target.checked) update("instagramHandle", "");
                    }}
                    className="accent-[#b8956e] h-4 w-4"
                  />
                  <span>I don&apos;t have an Instagram account</span>
                </label>
              </div>
            </div>

            {/* Platform 2: Facebook */}
            <div className="rounded border border-border bg-cream/70 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex-1 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider font-medium text-espresso">
                    Facebook Name / Profile Handle
                  </span>
                  <input
                    type="text"
                    disabled={form.noFacebook}
                    placeholder={form.noFacebook ? "No Facebook account" : "Your Facebook Name or profile link"}
                    value={form.facebookHandle}
                    onChange={(e) => update("facebookHandle", e.target.value)}
                    className="mt-1 w-full rounded border border-border bg-cream px-3 py-2 text-sm text-espresso placeholder:text-[#a6927b] disabled:opacity-50 disabled:bg-cream-soft focus:border-gold focus:outline-none transition-colors"
                  />
                </label>

                <label className="flex items-center gap-2 self-start sm:self-center sm:pt-4 cursor-pointer text-xs text-muted hover:text-espresso">
                  <input
                    type="checkbox"
                    checked={form.noFacebook}
                    onChange={(e) => {
                      update("noFacebook", e.target.checked);
                      if (e.target.checked) update("facebookHandle", "");
                    }}
                    className="accent-[#b8956e] h-4 w-4"
                  />
                  <span>I don&apos;t have a Facebook account</span>
                </label>
              </div>
            </div>

            {/* Platform 3: TikTok */}
            <div className="rounded border border-border bg-cream/70 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex-1 flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider font-medium text-espresso flex items-center gap-1.5">
                    <span className="font-semibold">TikTok Handle</span>
                    <span className="text-[10px] text-muted lowercase">(follow @creativeforgedigital)</span>
                  </span>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-2.5 text-xs text-muted">@</span>
                    <input
                      type="text"
                      disabled={form.noTikTok}
                      placeholder={form.noTikTok ? "No TikTok account" : "your_tiktok_handle"}
                      value={form.tiktokHandle}
                      onChange={(e) => update("tiktokHandle", e.target.value.replace(/^@/, ""))}
                      className="w-full rounded border border-border bg-cream py-2 pl-7 pr-3 text-sm text-espresso placeholder:text-[#a6927b] disabled:opacity-50 disabled:bg-cream-soft focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </label>

                <label className="flex items-center gap-2 self-start sm:self-center sm:pt-4 cursor-pointer text-xs text-muted hover:text-espresso">
                  <input
                    type="checkbox"
                    checked={form.noTikTok}
                    onChange={(e) => {
                      update("noTikTok", e.target.checked);
                      if (e.target.checked) update("tiktokHandle", "");
                    }}
                    className="accent-[#b8956e] h-4 w-4"
                  />
                  <span>I don&apos;t have a TikTok account</span>
                </label>
              </div>
            </div>

            {noAccountCount >= 2 && (
              <div className="rounded border border-amber-300 bg-amber-50 p-2.5 text-xs text-amber-800">
                Notice: You have marked {noAccountCount} platforms as &quot;no account&quot;. You must have accounts and follow CFD on at least 2 platforms to be eligible.
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: THE WEDDING */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6 border-b border-border/80 pb-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-cream text-xs font-semibold">
                  2
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                  The Wedding
                </h3>
              </div>
              <p className="mt-2 text-xs italic text-muted font-serif">
                {isDirectCouple
                  ? "Since you are entering your own wedding, specify your wedding date and unique wedding hashtag."
                  : "Tell us about the lucky couple you are entering on behalf of."}
              </p>
            </div>

            {/* Couple's Names: Always shown (or customized) */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">
                Couple&apos;s Names (as they&apos;d appear on the website) <span className="text-gold">*</span>
              </span>
              <input
                type="text"
                required
                placeholder="e.g. Kayla Marais & Wynand Bonthuyzen"
                value={form.coupleNames}
                onChange={(e) => update("coupleNames", e.target.value)}
                className="rounded border border-border bg-cream px-3.5 py-2.5 text-sm text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none transition-colors"
              />
              <span className="text-[11px] text-muted">
                How the names should be presented across the site, navigation, and banners
              </span>
            </label>

            {/* Wedding Date & Hashtag */}
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  Confirmed Wedding Date <span className="text-gold">*</span>
                </span>
                <input
                  type="date"
                  required
                  value={form.weddingDate}
                  onChange={(e) => update("weddingDate", e.target.value)}
                  className="rounded border border-border bg-cream px-3.5 py-2.5 text-sm text-espresso focus:border-gold focus:outline-none transition-colors"
                />
                <span className="text-[11px] text-muted">
                  Must be a specific date, not a general year
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  Couple&apos;s Unique Wedding Hashtag <span className="text-gold">*</span>
                </span>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm text-gold font-medium">#</span>
                  <input
                    type="text"
                    required
                    placeholder="KaylaAndWynand2027"
                    value={form.weddingHashtag.replace(/^#/, "")}
                    onChange={(e) => update("weddingHashtag", `#${e.target.value.replace(/^#/, "")}`)}
                    className="w-full rounded border border-border bg-cream py-2.5 pl-8 pr-3 text-sm text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <span className="text-[11px] text-muted">
                  Must be unique to the couple (checked against your Instagram Story post)
                </span>
              </label>
            </div>

            {/* Date Confirmation Checkbox */}
            <label className="flex items-start gap-3 rounded-lg border border-border bg-cream p-4 cursor-pointer hover:border-gold-light transition-colors">
              <input
                type="checkbox"
                required
                checked={form.dateConfirmed}
                onChange={(e) => update("dateConfirmed", e.target.checked)}
                className="accent-[#b8956e] h-4 w-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs leading-relaxed text-espresso-soft">
                <strong className="text-espresso">Honesty Commitment: </strong>
                I confirm this wedding date is accurate to the best of my knowledge, and understand proof (such as venue booking or invitations) may be requested if drawn as a winner. <span className="text-gold">*</span>
              </span>
            </label>

            {/* If entering on behalf of someone else, show optional couple backup contact */}
            {isEnteringForCouple && (
              <div className="rounded-lg border border-dashed border-border bg-cream/40 p-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-espresso block mb-1">
                  Couple&apos;s Direct Contact (Optional Backup)
                </span>
                <p className="text-[11px] text-muted mb-3">
                  If you are entering on behalf of a friend or family member and cannot be reached within 5 business days of winning, providing their contact details ensures they don&apos;t miss out.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    placeholder="Couple's Email (optional)"
                    value={form.coupleEmail}
                    onChange={(e) => update("coupleEmail", e.target.value)}
                    className="rounded border border-border bg-cream px-3 py-2 text-xs text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Couple's Phone (optional)"
                    value={form.couplePhone}
                    onChange={(e) => update("couplePhone", e.target.value)}
                    className="rounded border border-border bg-cream px-3 py-2 text-xs text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3: ENTRY VERIFICATION */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6 border-b border-border/80 pb-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-cream text-xs font-semibold">
                  3
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                  Entry Verification
                </h3>
              </div>
              <p className="mt-2 text-xs italic text-muted font-serif">
                Verify your entry actions to qualify for the draw.
              </p>
            </div>

            {/* Comment Link */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs uppercase tracking-wider text-muted font-medium">
                Link to your comment on the entry post (tagging 3 friends) <span className="text-gold">*</span>
              </span>
              <input
                type="text"
                required
                placeholder="https://instagram.com/p/... or your Instagram handle + comment time"
                value={form.commentLink}
                onChange={(e) => update("commentLink", e.target.value)}
                className="rounded border border-border bg-cream px-3.5 py-2.5 text-sm text-espresso placeholder:text-[#a6927b] focus:border-gold focus:outline-none transition-colors"
              />
              <span className="text-[11px] text-muted">
                Paste the URL to your comment or specify your handle so our team can verify your 3 tags.
              </span>
            </label>

            {/* Follow Confirmation Checkbox */}
            <label className="flex items-start gap-3 rounded-lg border border-border bg-cream p-4 cursor-pointer hover:border-gold-light transition-colors">
              <input
                type="checkbox"
                required
                checked={form.confirmFollow}
                onChange={(e) => update("confirmFollow", e.target.checked)}
                className="accent-[#b8956e] h-4 w-4 mt-0.5 flex-shrink-0"
              />
              <span className="text-xs leading-relaxed text-espresso-soft">
                <strong className="text-espresso">Follower Verification: </strong>
                I confirm I follow Creative Forge Digital on at least 2 of the 3 platforms I&apos;ve indicated above (Instagram, Facebook, TikTok). Spot-checked on CFD&apos;s side before the draw. <span className="text-gold">*</span>
              </span>
            </label>

            {/* Bonus Entry: Story Screenshot Upload */}
            <div className="rounded-lg border border-gold-light/60 bg-gold/5 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-espresso flex items-center gap-2">
                  <span>Screenshot of your Instagram Story</span>
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-espresso border border-gold/40">
                    ★ BONUS 2ND ENTRY
                  </span>
                </span>
                <span className="text-[11px] text-muted font-medium">Optional</span>
              </div>

              {/* Instructional Text */}
              <p className="mt-2 text-xs leading-relaxed text-espresso-soft font-serif italic">
                &ldquo;Your Story must show your wedding hashtag and #CreativeForgeDigital, and tag @creativeforgedigital.&rdquo;
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Since Stories disappear after 24 hours, uploading your screenshot here serves as permanent proof to secure your double entry!
              </p>

              {/* Upload Dropzone */}
              <div className="mt-4">
                {form.storyPreview ? (
                  <div className="relative inline-flex flex-col items-center rounded-lg border border-gold bg-cream p-3 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.storyPreview}
                      alt="Story preview"
                      className="h-44 w-auto max-w-full rounded object-contain"
                    />
                    <div className="mt-2 flex items-center justify-between w-full text-xs text-muted">
                      <span className="truncate max-w-[200px]">{form.storyFile?.name}</span>
                      <button
                        type="button"
                        onClick={removeStoryFile}
                        className="text-red-600 hover:text-red-800 font-semibold cursor-pointer underline text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-gold bg-cream p-6 cursor-pointer transition-colors text-center">
                    <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="mt-2 text-xs font-semibold text-espresso">
                      Upload Story Screenshot
                    </span>
                    <span className="mt-0.5 text-[11px] text-muted">
                      JPG, PNG, or WEBP up to 10MB
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
          {/* SECTION 4: CONSENT & LEGAL */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-cream text-xs font-semibold">
                  4
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                  Consent &amp; Legal
                </h3>
              </div>
              <p className="mt-2 text-xs italic text-muted font-serif">
                Kept strictly separate per the Consumer Protection Act and POPIA regulations.
              </p>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="rounded-lg border border-border bg-cream p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.termsAccepted}
                  onChange={(e) => update("termsAccepted", e.target.checked)}
                  className="accent-[#b8956e] h-4 w-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs leading-relaxed text-espresso-soft">
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(true)}
                    className="font-semibold text-gold underline underline-offset-2 hover:text-espresso"
                  >
                    Competition Terms &amp; Conditions
                  </button>
                  . <span className="text-gold">*</span>
                </span>
              </label>
            </div>

            {/* POPIA Marketing Opt-In Checkbox */}
            <div className="rounded-lg border border-border bg-cream p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.marketingConsent}
                  onChange={(e) => update("marketingConsent", e.target.checked)}
                  className="accent-[#b8956e] h-4 w-4 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs leading-relaxed text-espresso-soft">
                  <strong className="text-espresso">Marketing Updates (Optional): </strong>
                  I&apos;d like to receive inspiring wedding website ideas, design trends, and special offers from Creative Forge Digital. (Separately unbundled per POPIA compliance; you may unsubscribe at any time).
                </span>
              </label>
            </div>

            {/* Anti-Bot Security Challenge */}
            <div className="rounded-lg border border-border bg-cream p-4">
              <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-espresso block">
                    Security Verification <span className="text-gold">*</span>
                  </span>
                  <span className="text-[11px] text-muted">
                    To prevent automated entries: What is <strong>3 + 4</strong>?
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your answer"
                  value={form.captchaAnswer}
                  onChange={(e) => update("captchaAnswer", e.target.value)}
                  className="w-32 rounded border border-border bg-cream-soft px-3 py-2 text-center text-sm font-semibold text-espresso focus:border-gold focus:outline-none"
                />
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[280px] rounded-none border border-espresso bg-espresso px-8 py-3.5 text-center font-sans text-xs font-semibold uppercase tracking-[0.25em] text-cream shadow-lift transition-all hover:bg-gold hover:border-gold disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Recording Your Entry...
                  </span>
                ) : (
                  <span>Submit Competition Entry</span>
                )}
              </button>

              <span className="text-[11px] text-muted tracking-wide">
                🔒 Free entry • Encrypted &amp; securely handled under POPIA Act
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
