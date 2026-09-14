import "server-only";

import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "valora_admin";

function sessionToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD belum diisi di .env.local atau Environment Variables Vercel."
    );
  }
  return createHmac("sha256", password)
    .update("valora-admin-session-v1")
    .digest("hex");
}

export function adminPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isPasswordCorrect(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD belum diisi.");
  if (input.length !== password.length) return false;

  // Perbandingan waktu-konstan sederhana
  let diff = 0;
  for (let i = 0; i < password.length; i++) {
    diff |= input.charCodeAt(i) ^ password.charCodeAt(i);
  }
  return diff === 0;
}

export async function isAuthed(): Promise<boolean> {
  if (!adminPasswordConfigured()) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === sessionToken();
}

export async function signInSession(): Promise<void> {
  // Hanya dipanggil dari Server Action
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 jam
  });
}

export async function signOutSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function assertAuthed(): Promise<void> {
  if (!(await isAuthed())) {
    throw new Error("Akses admin ditolak — silakan login dulu.");
  }
}
