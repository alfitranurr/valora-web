"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminPasswordConfigured,
  assertAuthed,
  isAuthed,
  isPasswordCorrect,
  signInSession,
  signOutSession,
} from "@/lib/auth";
import {
  createBooking,
  recordManualPayment,
  setBookingStatus,
  verifyPayment,
} from "@/lib/store/bookings";
import type { BookingStatus, PaymentType } from "@/types";

// ------------------------------------------------------------
// Login / logout
// ------------------------------------------------------------

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!adminPasswordConfigured()) {
    return {
      error:
        "ADMIN_PASSWORD belum diisi di .env.local (atau Vercel Env Variables).",
    };
  }

  const password = String(formData.get("password") || "");
  if (!isPasswordCorrect(password)) {
    return { error: "Password salah." };
  }

  await signInSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await signOutSession();
  redirect("/admin");
}

// ------------------------------------------------------------
// Booking CRUD
// ------------------------------------------------------------

export interface CreateState {
  error?: string;
}

export async function createBookingAction(
  _prev: CreateState,
  formData: FormData
): Promise<CreateState> {
  if (!(await isAuthed())) {
    return { error: "Sesi habis — silakan login ulang." };
  }

  const serviceName = String(formData.get("serviceName") || "").trim();
  const serviceRef = String(formData.get("serviceRef") || "").trim();
  const travelDate = String(formData.get("travelDate") || "");
  const adults = Number(formData.get("adults") || 0);
  const children = Number(formData.get("children") || 0);
  const totalIDR = Number(formData.get("totalIDR") || 0);
  const name = String(formData.get("name") || "").trim();
  const wa = String(formData.get("wa") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!serviceName) return { error: "Nama layanan wajib diisi." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(travelDate))
    return { error: "Tanggal keberangkatan tidak valid." };
  if (!Number.isFinite(totalIDR) || totalIDR <= 0)
    return { error: "Total harga (IDR) wajib diisi." };
  if (!name) return { error: "Nama customer wajib diisi." };
  if (!/^[0-9+\s-]{8,}$/.test(wa))
    return { error: "Nomor WhatsApp customer tidak valid." };

  const booking = await createBooking({
    serviceName,
    serviceRef: serviceRef || undefined,
    travelDate,
    adults: Number.isFinite(adults) && adults > 0 ? Math.round(adults) : 1,
    children: Number.isFinite(children) && children > 0 ? Math.round(children) : 0,
    totalIDR: Math.round(totalIDR),
    customer: { name, wa, ...(email ? { email } : {}) },
    notes: notes || undefined,
  });

  revalidatePath("/admin");
  redirect(`/admin/${booking.id}`);
}

export async function verifyPaymentAction(formData: FormData): Promise<void> {
  await assertAuthed();
  const paymentId = String(formData.get("paymentId") || "");
  if (!paymentId) return;

  await verifyPayment(paymentId);
  revalidatePath("/admin");
}

export async function setBookingStatusAction(formData: FormData): Promise<void> {
  await assertAuthed();
  const bookingId = String(formData.get("bookingId") || "");
  const status = String(formData.get("status") || "");
  if (!bookingId) return;

  const valid: BookingStatus[] = [
    "menunggu_pembayaran",
    "menunggu_verifikasi",
    "dp_terverifikasi",
    "lunas",
    "dikonfirmasi",
    "dibatalkan",
  ];
  if (!valid.includes(status as BookingStatus)) return;

  await setBookingStatus(bookingId, status as BookingStatus);
  revalidatePath("/admin");
  revalidatePath("/admin/" + bookingId);
}

export async function recordManualPaymentAction(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAuthed())) {
    return { error: "Sesi habis — silakan login ulang." };
  }

  const bookingId = String(formData.get("bookingId") || "");
  const type = String(formData.get("type") || "");
  const amountIDR = Number(formData.get("amountIDR") || 0);
  const adminNote = String(formData.get("adminNote") || "").trim();

  if (!bookingId) return { error: "Booking tidak valid." };
  if (type !== "deposit" && type !== "final")
    return { error: "Jenis pembayaran tidak valid." };
  if (!Number.isFinite(amountIDR) || amountIDR <= 0)
    return { error: "Nominal wajib diisi." };

  try {
    await recordManualPayment({
      bookingId,
      type: type as PaymentType,
      amountIDR: Math.round(amountIDR),
      adminNote: adminNote || undefined,
    });
  } catch {
    return { error: "Gagal menyimpan pembayaran. Coba lagi." };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/" + bookingId);
  return { error: undefined };
}
