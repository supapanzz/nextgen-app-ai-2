import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider } from "@/lib/i18n";
import { ContactForm } from "./contact-form";

function renderForm() {
  return render(
    <LocaleProvider locale="th">
      <ContactForm />
    </LocaleProvider>
  );
}

const validInput = {
  name: "Somchai Jaidee",
  email: "somchai@example.com",
  subject: "Question about shipping",
  message: "Hello, I would like to ask about shipping costs to Chiang Mai.",
};

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders all labelled fields", () => {
    renderForm();

    expect(screen.getByLabelText("ชื่อ")).toBeInTheDocument();
    expect(screen.getByLabelText("อีเมล")).toBeInTheDocument();
    expect(screen.getByLabelText("หัวข้อ")).toBeInTheDocument();
    expect(screen.getByLabelText("ข้อความ")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ส่งข้อความ" })).toBeInTheDocument();
  });

  it("shows validation errors and keeps values when submitting invalid data", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("ชื่อ"), "A");
    await user.type(screen.getByLabelText("อีเมล"), "bad-email");
    await user.type(screen.getByLabelText("หัวข้อ"), "ab");
    await user.type(screen.getByLabelText("ข้อความ"), "short");
    await user.click(screen.getByRole("button", { name: "ส่งข้อความ" }));

    expect(
      await screen.findByText("ชื่อต้องมีความยาว 2-100 ตัวอักษร")
    ).toBeInTheDocument();
    expect(screen.getByText("รูปแบบอีเมลไม่ถูกต้อง")).toBeInTheDocument();
    expect(screen.getByText("หัวข้อต้องมีความยาว 3-150 ตัวอักษร")).toBeInTheDocument();
    expect(
      screen.getByText("ข้อความต้องมีความยาว 10-2000 ตัวอักษร")
    ).toBeInTheDocument();

    expect(screen.getByLabelText("ชื่อ")).toHaveValue("A");
    expect(screen.getByLabelText("อีเมล")).toHaveValue("bad-email");
    expect(screen.getByLabelText("หัวข้อ")).toHaveValue("ab");
    expect(screen.getByLabelText("ข้อความ")).toHaveValue("short");

    expect(fetch).not.toHaveBeenCalled();
  });

  it("shows success message and resets the form on success", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    renderForm();

    await user.type(screen.getByLabelText("ชื่อ"), validInput.name);
    await user.type(screen.getByLabelText("อีเมล"), validInput.email);
    await user.type(screen.getByLabelText("หัวข้อ"), validInput.subject);
    await user.type(screen.getByLabelText("ข้อความ"), validInput.message);
    await user.click(screen.getByRole("button", { name: "ส่งข้อความ" }));

    expect(
      await screen.findByRole("status")
    ).toHaveTextContent(/ส่งข้อความสำเร็จ/);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );

    await waitFor(() => {
      expect(screen.getByLabelText("ชื่อ")).toHaveValue("");
      expect(screen.getByLabelText("อีเมล")).toHaveValue("");
      expect(screen.getByLabelText("หัวข้อ")).toHaveValue("");
      expect(screen.getByLabelText("ข้อความ")).toHaveValue("");
    });
  });

  it("shows an error message and keeps values when sending fails", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "SEND_ERROR" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    );
    vi.stubGlobal("fetch", fetchMock);

    renderForm();

    await user.type(screen.getByLabelText("ชื่อ"), validInput.name);
    await user.type(screen.getByLabelText("อีเมล"), validInput.email);
    await user.type(screen.getByLabelText("หัวข้อ"), validInput.subject);
    await user.type(screen.getByLabelText("ข้อความ"), validInput.message);
    await user.click(screen.getByRole("button", { name: "ส่งข้อความ" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /เกิดข้อผิดพลาด/
    );

    expect(screen.getByLabelText("ชื่อ")).toHaveValue(validInput.name);
    expect(screen.getByLabelText("อีเมล")).toHaveValue(validInput.email);
    expect(screen.getByLabelText("หัวข้อ")).toHaveValue(validInput.subject);
    expect(screen.getByLabelText("ข้อความ")).toHaveValue(validInput.message);
  });
});