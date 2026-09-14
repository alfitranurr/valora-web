import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin, BUKTI_BUCKET } from "@/lib/supabase/server";
import { getBooking, submitPaymentProof } from "@/lib/store/bookings";
import { nominalForType } from "@/lib/booking-status";
import type { PaymentMethod, PaymentType } from "@/types";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const result = await getBooking(id);
    if (!result) {
      return NextResponse.json({ error: "Booking tidak ditemukan." }, { status: 404 });
    }

    const formData = await request.formData();
    const type = String(formData.get("type") || "");
    const method = String(formData.get("method") || "");
    const amount = Number(formData.get("amountIdr") || 0);
    const file = formData.get("file");

    if (type !== "deposit" && type !== "final") {
      return NextResponse.json({ error: "Jenis pembayaran tidak valid." }, { status: 400 });
    }
    if (method !== "transfer" && method !== "qris") {
      return NextResponse.json({ error: "Metode pembayaran tidak valid." }, { status: 400 });
    }
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "File bukti pembayaran wajib diunggah." }, { status: 400 });
    }
    if (!ALLOWED_TYPES[file.type]) {
      return NextResponse.json(
        { error: "Format file harus JPG, PNG, atau WebP." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 2 MB." },
        { status: 400 }
      );
    }

    // Validasi nominal terhadap booking
    const payableType = type as PaymentType;
    const maxNominal = nominalForType(result.booking, result.payments, payableType);
    if (amount <= 0 || amount > Math.max(maxNominal, result.booking.totalIDR)) {
      return NextResponse.json(
        { error: "Nominal tidak sesuai dengan booking ini." },
        { status: 400 }
      );
    }

    // Batasi duplikat pending: hanya satu pengajuan aktif
    if (result.payments.some((p) => !p.verifiedAt)) {
      return NextResponse.json(
        { error: "Ada pengajuan pembayaran yang masih menunggu verifikasi." },
        { status: 409 }
      );
    }

    const ext = ALLOWED_TYPES[file.type];
    const path = `${id}/${crypto.randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = getSupabaseAdmin();
    const { error: uploadErr } = await supabase.storage
      .from(BUKTI_BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadErr) {
      return NextResponse.json(
        { error: "Gagal menyimpan file. Coba lagi atau lapor via WhatsApp." },
        { status: 500 }
      );
    }

    await submitPaymentProof({
      bookingId: id,
      type: payableType,
      method: method as PaymentMethod,
      amountIDR: amount,
      proofPath: path,
    });

    revalidatePath(`/booking/${id}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi atau lapor via WhatsApp." },
      { status: 500 }
    );
  }
}
