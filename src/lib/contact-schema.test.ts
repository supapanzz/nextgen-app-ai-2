import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const validInput = {
  name: "Somchai Jaidee",
  email: "somchai@example.com",
  subject: "Question about shipping",
  message: "Hello, I would like to ask about shipping costs to Chiang Mai.",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    expect(contactSchema.safeParse(validInput).success).toBe(true);
  });

  it("accepts an empty or missing honeypot field", () => {
    expect(
      contactSchema.safeParse({ ...validInput, website: "" }).success
    ).toBe(true);
    expect(contactSchema.safeParse({ ...validInput, website: undefined }).success).toBe(
      true
    );
  });

  it("accepts a filled honeypot field (handled at the route level)", () => {
    expect(
      contactSchema.safeParse({ ...validInput, website: "spam-value" }).success
    ).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a name that is too short or too long", () => {
    expect(
      contactSchema.safeParse({ ...validInput, name: "A" }).success
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...validInput, name: "x".repeat(101) }).success
    ).toBe(false);
  });

  it("rejects a subject that is too short or too long", () => {
    expect(
      contactSchema.safeParse({ ...validInput, subject: "ab" }).success
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...validInput, subject: "x".repeat(151) }).success
    ).toBe(false);
  });

  it("rejects a message that is too short or too long", () => {
    expect(
      contactSchema.safeParse({ ...validInput, message: "123456789" }).success
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...validInput, message: "x".repeat(2001) }).success
    ).toBe(false);
  });
});