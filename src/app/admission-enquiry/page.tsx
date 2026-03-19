"use client";

import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { translations } from "@/lib/translations";

type FormState = {
  studentName: string;
  className: string;
  medium: string;
  guardianName: string;
  guardianRelation: string;
  currentSchool: string;
  mobileNumber: string;
};

type SubmitEvent = Parameters<
  NonNullable<React.ComponentProps<"form">["onSubmit"]>
>[0];

const initialForm: FormState = {
  studentName: "",
  className: "",
  medium: "",
  guardianName: "",
  guardianRelation: "",
  currentSchool: "",
  mobileNumber: "",
};

export default function AdmissionEnquiryPage() {
  const { locale } = useLocale();
  const t = translations[locale].admissionEnquiry;
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const isEnglishMedium = form.medium === t.mediumOptions.english;
  const isHindiMedium = form.medium === t.mediumOptions.hindi;

  const classOptions =
    isEnglishMedium ? t.classOptions.slice(0, 11) : t.classOptions;
  let schoolOptions: readonly string[] = [];
  if (isEnglishMedium) {
    schoolOptions = t.schoolListByMedium.english;
  } else if (isHindiMedium) {
    schoolOptions = t.schoolListByMedium.hindi;
  }

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setSubmitMessage("");

    if (
      !form.studentName ||
      !form.className ||
      !form.medium ||
      !form.guardianName ||
      !form.guardianRelation ||
      !form.mobileNumber
    ) {
      alert(t.required);
      return;
    }

    if (!/^\d{10}$/.test(form.mobileNumber)) {
      alert(t.mobileInvalid);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/notifications/admission-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { ok?: boolean };

      if (!response.ok || !data.ok) {
        setSubmitMessage(t.submitFailed);
        return;
      }

      setSubmitMessage(t.submitted);
      setForm(initialForm);
    } catch {
      setSubmitMessage(t.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {t.title}
      </h1>
      <p className="mt-3 text-muted-foreground">{t.subtitle}</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.studentName} *</span>
          <input
            required
            value={form.studentName}
            onChange={(e) => setForm((p) => ({ ...p, studentName: e.target.value }))}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.medium} *</span>
          <select
            required
            value={form.medium}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                medium: e.target.value,
                className: "",
                currentSchool: "",
              }))
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value={t.mediumOptions.hindi}>{t.mediumOptions.hindi}</option>
            <option value={t.mediumOptions.english}>{t.mediumOptions.english}</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.class} *</span>
          <select
            required
            value={form.className}
            onChange={(e) => setForm((p) => ({ ...p, className: e.target.value }))}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">{t.selectPlaceholder}</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.guardianName} *</span>
          <input
            required
            value={form.guardianName}
            onChange={(e) => setForm((p) => ({ ...p, guardianName: e.target.value }))}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.guardianRelation} *</span>
          <select
            required
            value={form.guardianRelation}
            onChange={(e) =>
              setForm((p) => ({ ...p, guardianRelation: e.target.value }))
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value={t.relationOptions.father}>{t.relationOptions.father}</option>
            <option value={t.relationOptions.mother}>{t.relationOptions.mother}</option>
            <option value={t.relationOptions.brother}>{t.relationOptions.brother}</option>
            <option value={t.relationOptions.sister}>{t.relationOptions.sister}</option>
            <option value={t.relationOptions.relatives}>{t.relationOptions.relatives}</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.currentSchool}</span>
          <select
            value={form.currentSchool}
            onChange={(e) => setForm((p) => ({ ...p, currentSchool: e.target.value }))}
            disabled={!form.medium}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">{t.selectPlaceholder}</option>
            {schoolOptions.map((schoolName) => (
              <option key={schoolName} value={schoolName}>
                {schoolName}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">{t.mobileNumber} *</span>
          <input
            required
            inputMode="numeric"
            maxLength={10}
            value={form.mobileNumber}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                mobileNumber: e.target.value.replaceAll(/\D/g, "").slice(0, 10),
              }))
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>
        {submitMessage ? (
          <p className="text-sm text-foreground">{submitMessage}</p>
        ) : null}
      </form>
    </section>
  );
}
