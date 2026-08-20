"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { createContactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { useDict } from "@/lib/i18n";

type FormStatus = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const t = useDict();

  const schema = useMemo(
    () =>
      createContactSchema({
        nameInvalid: t.contact.form.nameInvalid,
        emailInvalid: t.contact.form.emailInvalid,
        subjectInvalid: t.contact.form.subjectInvalid,
        messageInvalid: t.contact.form.messageInvalid,
      }),
    [t]
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isPending = status === "pending";

  async function onSubmit(data: ContactFormValues) {
    setStatus("pending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      let errorCode = "ERROR";
      try {
        const body = (await response.json()) as { error?: string };
        if (body.error) errorCode = body.error;
      } catch {
        // ignore malformed error body
      }

      setStatus("error");
      setErrorMessage(
        errorCode === "VALIDATION_ERROR"
          ? t.contact.form.validationError
          : t.contact.form.error
      );
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.form.error);
    }
  }

  return (
    <div className="rounded-4xl border bg-card p-6 shadow-md ring-1 ring-foreground/5 sm:p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-name">
                  {t.contact.form.name}
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-email">
                  {t.contact.form.email}
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-subject">
                  {t.contact.form.subject}
                </FieldLabel>
                <Input
                  {...field}
                  id="contact-subject"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-message">
                  {t.contact.form.message}
                </FieldLabel>
                <Textarea
                  {...field}
                  id="contact-message"
                  rows={6}
                  placeholder={t.contact.form.messagePlaceholder}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col gap-4">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending && <Spinner />}
              {isPending ? t.contact.form.submitting : t.contact.form.submit}
            </Button>

            <div aria-live="polite">
              {status === "success" && (
                <p
                  role="status"
                  className="flex items-start gap-2 rounded-2xl border border-emerald-300/40 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-200"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  {t.contact.form.success}
                </p>
              )}

              {status === "error" && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {errorMessage}
                </p>
              )}
            </div>
          </div>

          {/* Honeypot field — must stay empty. Hidden from humans. */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              {...form.register("website")}
              tabIndex={-1}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}