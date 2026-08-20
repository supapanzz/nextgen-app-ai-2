import * as z from "zod";

export interface ContactSchemaMessages {
  nameInvalid: string;
  emailInvalid: string;
  subjectInvalid: string;
  messageInvalid: string;
}

export function createContactSchema(messages: ContactSchemaMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, messages.nameInvalid)
      .max(100, messages.nameInvalid),
    email: z.string().trim().email(messages.emailInvalid),
    subject: z
      .string()
      .trim()
      .min(3, messages.subjectInvalid)
      .max(150, messages.subjectInvalid),
    message: z
      .string()
      .trim()
      .min(10, messages.messageInvalid)
      .max(2000, messages.messageInvalid),
    // Honeypot field for spam bots. Must stay empty.
    website: z.string().optional(),
  });
}

export const contactSchema = createContactSchema({
  nameInvalid: "Invalid name",
  emailInvalid: "Invalid email",
  subjectInvalid: "Invalid subject",
  messageInvalid: "Invalid message",
});

export type ContactFormValues = z.infer<typeof contactSchema>;