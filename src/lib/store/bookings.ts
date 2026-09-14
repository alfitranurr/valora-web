import { getSupabaseAdmin, BUKTI_BUCKET } from "@/lib/supabase/server";
import { SITE_CONFIG } from "@/data/config";
import type {
  Booking,
  BookingPayment,
  BookingStatus,
  PaymentMethod,
  PaymentType,
} from "@/types";

// ------------------------------------------------------------
// Row types (snake_case di Postgres)
// ------------------------------------------------------------

interface BookingRow {
  id: string;
  created_at: string;
  service_name: string;
  service_ref: string | null;
  travel_date: string;
  adults: number;
  children: number;
  total_idr: number;
  deposit_idr: number;
  customer: { name: string; wa: string; email?: string };
  notes: string | null;
  status: BookingStatus;
}

interface PaymentRow {
  id: string;
  booking_id: string;
  type: PaymentType;
  method: PaymentMethod | null;
  amount_idr: number;
  proof_path: string | null;
  submitted_at: string | null;
  verified_at: string | null;
  admin_note: string | null;
  created_at: string;
}

function mapBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    createdAt: row.created_at,
    serviceName: row.service_name,
    serviceRef: row.service_ref || undefined,
    travelDate: row.travel_date,
    adults: row.adults,
    children: row.children,
    totalIDR: row.total_idr,
    depositIDR: row.deposit_idr,
    customer: {
      name: row.customer.name,
      wa: row.customer.wa,
      email: row.customer.email || undefined,
    },
    notes: row.notes || undefined,
    status: row.status,
  };
}

function mapPayment(row: PaymentRow): BookingPayment {
  return {
    id: row.id,
    bookingId: row.booking_id,
    type: row.type,
    method: row.method || undefined,
    amountIDR: row.amount_idr,
    proofPath: row.proof_path || undefined,
    submittedAt: row.submitted_at || undefined,
    verifiedAt: row.verified_at || undefined,
    adminNote: row.admin_note || undefined,
    createdAt: row.created_at,
  };
}

// ------------------------------------------------------------
// ID Generator: VLR-YYMM-#### (unik per bulan, retry bila bentrok)
// ------------------------------------------------------------

export const BOOKING_ID_REGEX = /^VLR-\d{4}-\d{4}$/;

function bookingIdPrefix(date = new Date()): string {
  const yy = String(date.getFullYear() % 100).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `VLR-${yy}${mm}`;
}

async function generateBookingId(): Promise<string> {
  const supabase = getSupabaseAdmin();
  const prefix = bookingIdPrefix();
  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .like("id", `${prefix}-%`);

  if (error) throw error;

  let next = 1;
  for (const row of data ?? []) {
    const suffix = row.id.split("-")[2];
    const n = Number(suffix);
    if (!Number.isNaN(n) && n >= next) next = n + 1;
  }

  return `${prefix}-${String(next).padStart(4, "0")}`;
}

// ------------------------------------------------------------
// API store — semua dipanggil dari server (service role)
// ------------------------------------------------------------

const BOOKING_TABLE = "bookings" as const;
const PAYMENT_TABLE = "payments" as const;

export async function listBookings(): Promise<Booking[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(BOOKING_TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw error;
  return (data as BookingRow[]).map(mapBooking);
}

export async function getBooking(
  bookingId: string
): Promise<{ booking: Booking; payments: BookingPayment[] } | null> {
  const supabase = getSupabaseAdmin();

  const { data: bookingRow, error: bookingErr } = await supabase
    .from(BOOKING_TABLE)
    .select("*")
    .eq("id", bookingId)
    .single<BookingRow>();

  if (bookingErr || !bookingRow) return null;

  const { data: paymentRows, error: paymentErr } = await supabase
    .from(PAYMENT_TABLE)
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: true });

  if (paymentErr) throw paymentErr;

  return {
    booking: mapBooking(bookingRow),
    payments: (paymentRows as PaymentRow[]).map(mapPayment),
  };
}

export async function listPayments(): Promise<BookingPayment[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(PAYMENT_TABLE)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw error;
  return (data as PaymentRow[]).map(mapPayment);
}

export interface CreateBookingInput {
  serviceName: string;
  serviceRef?: string;
  travelDate: string;
  adults: number;
  children: number;
  totalIDR: number;
  customer: { name: string; wa: string; email?: string };
  notes?: string;
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const supabase = getSupabaseAdmin();

  const depositPercent = SITE_CONFIG.payments.depositPercent;
  const depositIDR = Math.round((input.totalIDR * depositPercent) / 100);

  for (let attempt = 0; attempt < 5; attempt++) {
    const id = await generateBookingId();
    const { data, error } = await supabase
      .from(BOOKING_TABLE)
      .insert({
        id,
        service_name: input.serviceName,
        service_ref: input.serviceRef ?? null,
        travel_date: input.travelDate,
        adults: input.adults,
        children: input.children,
        total_idr: input.totalIDR,
        deposit_idr: depositIDR,
        customer: {
          name: input.customer.name,
          wa: input.customer.wa,
          ...(input.customer.email ? { email: input.customer.email } : {}),
        },
        notes: input.notes ?? null,
        status: "menunggu_pembayaran",
      })
      .select("*")
      .single();

    if (error) {
      const code = (error as { code?: string }).code;
      if (code === "23505") continue; // unique violation → coba ID berikutnya
      throw error;
    }

    return mapBooking(data as BookingRow);
  }

  throw new Error("Gagal membuat ID booking unik, coba lagi.");
}

export async function submitPaymentProof(input: {
  bookingId: string;
  type: PaymentType;
  method: PaymentMethod;
  amountIDR: number;
  proofPath: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error: paymentErr } = await supabase.from(PAYMENT_TABLE).insert({
    booking_id: input.bookingId,
    type: input.type,
    method: input.method,
    amount_idr: input.amountIDR,
    proof_path: input.proofPath,
    submitted_at: now,
  });
  if (paymentErr) throw paymentErr;

  const { error: bookingErr } = await supabase
    .from(BOOKING_TABLE)
    .update({ status: "menunggu_verifikasi", updated_at: now })
    .eq("id", input.bookingId);
  if (bookingErr) throw bookingErr;
}

/** Admin memverifikasi satu pembayaran; status booking ikut maju. */
export async function verifyPayment(
  paymentId: string,
  adminNote?: string
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { data: row, error } = await supabase
    .from(PAYMENT_TABLE)
    .select("*")
    .eq("id", paymentId)
    .single();
  if (error || !row) throw error || new Error("Pembayaran tidak ditemukan.");
  const payment = mapPayment(row as PaymentRow);

  const { error: verifyErr } = await supabase
    .from(PAYMENT_TABLE)
    .update({
      verified_at: now,
      admin_note: adminNote || null,
    })
    .eq("id", paymentId);
  if (verifyErr) throw verifyErr;

  const nextStatus: BookingStatus =
    payment.type === "final" ? "lunas" : "dp_terverifikasi";

  const { error: bookingErr } = await supabase
    .from(BOOKING_TABLE)
    .update({ status: nextStatus, updated_at: now })
    .eq("id", payment.bookingId);
  if (bookingErr) throw bookingErr;
}

export async function setBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from(BOOKING_TABLE)
    .update({ status, updated_at: now })
    .eq("id", bookingId);
  if (error) throw error;
}

export function isBookingIdFormat(id: string): boolean {
  return /^VLR-(?:\d{2})(?:0[1-9]|1[0-2])-\d{4}$/.test(id);
}

/** Admin mencatat pembayaran manual (langsung terverifikasi). */
export async function recordManualPayment(input: {
  bookingId: string;
  type: PaymentType;
  amountIDR: number;
  adminNote?: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error: paymentErr } = await supabase.from(PAYMENT_TABLE).insert({
    booking_id: input.bookingId,
    type: input.type,
    method: "transfer",
    amount_idr: input.amountIDR,
    verified_at: now,
    admin_note: input.adminNote || null,
  });
  if (paymentErr) throw paymentErr;

  const nextStatus: BookingStatus =
    input.type === "final" ? "lunas" : "dp_terverifikasi";

  const { error: bookingErr } = await supabase
    .from(BOOKING_TABLE)
    .update({ status: nextStatus, updated_at: now })
    .eq("id", input.bookingId);
  if (bookingErr) throw bookingErr;
}

/** Signed URL (1 jam) untuk pratinjau bukti transfer di admin. */
export async function getProofUrl(
  proofPath: string
): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.storage
    .from(BUKTI_BUCKET)
    .createSignedUrl(proofPath, 3600);
  return data?.signedUrl ?? null;
}
