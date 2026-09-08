"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { SprigDivider } from "./Flourish";

interface FormState {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  diet: string;
  song: string;
  note: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  attending: true,
  guests: 1,
  diet: "",
  song: "",
  note: "",
};

const fieldClasses =
  "border-0 border-b border-gold-light bg-transparent py-2.5 text-xl text-espresso outline-none placeholder:text-[#a6927b] focus:border-espresso transition-colors";

export default function Rsvp() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const field =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const value =
        key === "guests" ? Number(e.target.value) : e.target.value;
      setForm((s) => ({ ...s, [key]: value }));
    };

  const firstName = (form.name || "friend").trim().split(" ")[0];
  const thanksLine = form.attending
    ? "We cannot wait to celebrate with you. Look out for a confirmation in your inbox."
    : "We will miss you dearly, and raise a glass in your honour.";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="bg-cream px-6 pt-27.5 pb-32.5">
      <Reveal className="mx-auto flex max-w-[680px] flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-xs tracking-[0.38em] uppercase text-muted">
            Kindly reply by 14 January 2027
          </div>
          <h2 className="m-0 font-script text-7xl leading-none font-normal text-espresso">
            Will you join us?
          </h2>
          <SprigDivider className="mt-1" lineClassName="bg-gold/40" />
        </div>

        {submitted ? (
          <div className="relative flex flex-col items-center gap-4.5 border border-border bg-cream-soft px-8 py-15 text-center shadow-soft">
            <span className="pointer-events-none absolute inset-2.5 border border-gold-light/25" />
            <div className="font-script text-[56px] leading-none text-gold">
              Thank you, {firstName}
            </div>
            <p className="m-0 text-xl leading-relaxed font-light text-pretty">
              {thanksLine}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="link-rule cursor-pointer border-0 bg-transparent text-xs tracking-[0.3em] uppercase text-[#8c6a48]"
            >
              Edit reply
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-6.5">
            <div className="grid gap-6.5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.3em] uppercase text-muted">
                  Full name
                </span>
                <input
                  required
                  value={form.name}
                  onChange={field("name")}
                  placeholder="Anna van Wyk"
                  className={fieldClasses}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.3em] uppercase text-muted">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={field("email")}
                  placeholder="anna@email.com"
                  className={fieldClasses}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.3em] uppercase text-muted">
                Will you be attending?
              </span>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setForm((s) => ({ ...s, attending: true }))}
                  className={`cursor-pointer border px-5 py-4 text-[17px] tracking-[0.12em] uppercase transition-all duration-500 ease-silk ${
                    form.attending
                      ? "border-espresso bg-espresso text-cream"
                      : "border-gold bg-transparent text-espresso-soft"
                  }`}
                >
                  Joyfully accepts
                </button>
                <button
                  type="button"
                  onClick={() => setForm((s) => ({ ...s, attending: false }))}
                  className={`cursor-pointer border px-5 py-4 text-[17px] tracking-[0.12em] uppercase transition-all duration-500 ease-silk ${
                    !form.attending
                      ? "border-espresso bg-espresso text-cream"
                      : "border-gold bg-transparent text-espresso-soft"
                  }`}
                >
                  Regretfully declines
                </button>
              </div>
            </div>

            {form.attending && (
              <>
                <div className="grid gap-6.5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs tracking-[0.3em] uppercase text-muted">
                      Number of guests
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={form.guests}
                      onChange={field("guests")}
                      className={fieldClasses}
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs tracking-[0.3em] uppercase text-muted">
                      Dietary requirements
                    </span>
                    <input
                      value={form.diet}
                      onChange={field("diet")}
                      placeholder="Vegetarian, halaal, allergies…"
                      className={fieldClasses}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-xs tracking-[0.3em] uppercase text-muted">
                    A song that will get you on the dance floor
                  </span>
                  <input
                    value={form.song}
                    onChange={field("song")}
                    placeholder="Artist — Title"
                    className={fieldClasses}
                  />
                </label>
              </>
            )}

            <label className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.3em] uppercase text-muted">
                A note for the couple
              </span>
              <textarea
                rows={3}
                value={form.note}
                onChange={field("note")}
                placeholder="Optional"
                className={`${fieldClasses} resize-y`}
              />
            </label>

            <button
              type="submit"
              className="mt-2.5 cursor-pointer self-center bg-espresso px-12 py-4.5 text-[13px] tracking-[0.32em] uppercase text-cream shadow-soft transition-all duration-500 ease-silk hover:-translate-y-0.5 hover:bg-espresso-soft hover:shadow-lift"
            >
              Send reply
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
