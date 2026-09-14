import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  Mail,
  MessageCircle,
  Check,
  ImageOff,
} from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";
import { ManualPaymentForm } from "./ManualPaymentForm";
import { setBookingStatusAction, verifyPaymentAction } from "../actions";
import { isAuthed } from "@/lib/auth";
import { getBooking, getProofUrl } from "@/lib/store/bookings";
import { SITE_CONFIG } from "@/data/config";
import { formatIDR } from "@/lib/currency";
import { bookingHandoverMessage } from "@/lib/whatsapp";
import {
  STATUS_LABEL,
  STATUS_STYLE,
  verifiedPaidIDR,
  formatDateTimeID,
  formatDateID,
} from "@/lib/booking-status";

export const metadata: Metadata = {
  title: "Detail Booking",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminBookingDetail({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  if (!(await isAuthed())) {
    notFound();
  }

  const { bookingId } = await params;
  const result = await getBooking(bookingId);
  if (!result) notFound();

  const { booking, payments } = result;
  const paid = verifiedPaidIDR(payments);
  const remaining = Math.max(0, booking.totalIDR - paid);
  const style = STATUS_STYLE[booking.status];

  const waHandoverText = bookingHandoverMessage({
    id: booking.id,
    serviceName: booking.serviceName,
    totalIDR: booking.totalIDR,
    depositIDR: booking.depositIDR,
    bookingUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/booking/${booking.id}`,
  });

  // Signed URL untuk setiap bukti
  const proofUrls = await Promise.all(
    payments.map(async (p) => (p.proofPath ? getProofUrl(p.proofPath) : null))
  );

  return (
    <div className="bg-ivory min-h-screen">
      <section className="pt-10 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-sm text-warm-grey hover:text-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Semua booking
          </Link>

          {/* Ringkasan */}
          <div className="bg-surface border border-border-warm rounded-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Booking
                </p>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl font-semibold text-charcoal">
                    {booking.id}
                  </h1>
                  <CopyButton text={booking.id} label="Salin ID" className="py-1" />
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded border self-start ${style.badge}`}
              >
                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                {STATUS_LABEL[booking.status]}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-warm-grey mb-1">Layanan</p>
                <p className="text-charcoal font-medium">{booking.serviceName}</p>
              </div>
              <div>
                <p className="text-warm-grey mb-1">Keberangkatan</p>
                <p className="text-charcoal font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-terracotta" />
                  {formatDateID(booking.travelDate)}
                </p>
              </div>
              <div>
                <p className="text-warm-grey mb-1">Customer</p>
                <p className="text-charcoal font-medium flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-terracotta" />
                  {booking.customer.name} · {booking.adults} dewasa
                  {booking.children > 0 && `, ${booking.children} anak`}
                </p>
                <p className="text-xs text-warm-grey flex items-center gap-1.5 mt-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {booking.customer.wa}
                </p>
                {booking.customer.email && (
                  <p className="text-xs text-warm-grey flex items-center gap-1.5 mt-1">
                    <Mail className="w-3.5 h-3.5" />
                    {booking.customer.email}
                  </p>
                )}
              </div>
              <div>
                <p className="text-warm-grey mb-1">Dibuat</p>
                <p className="text-charcoal font-medium">
                  {formatDateTimeID(booking.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-warm grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Total
                </p>
                <p className="text-lg font-semibold text-charcoal">
                  {formatIDR(booking.totalIDR)}
                </p>
              </div>
              <div>
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Terverifikasi
                </p>
                <p className="text-lg font-semibold text-terracotta">
                  {formatIDR(paid)}
                </p>
              </div>
              <div>
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Sisa
                </p>
                <p className="text-lg font-semibold text-charcoal">
                  {formatIDR(remaining)}
                </p>
              </div>
            </div>

            {booking.notes && (
              <p className="mt-4 p-3 bg-ivory-dark border border-border-warm rounded-lg text-sm text-warm-grey leading-relaxed">
                {booking.notes}
              </p>
            )}
          </div>

          {/* Aksi status */}
          <div className="bg-surface border border-border-warm rounded-lg p-6 mb-6">
            <h2 className="text-sm font-semibold text-charcoal mb-3">
              Ubah Status Booking
            </h2>
            <div className="flex flex-wrap gap-2">
              {(["dikonfirmasi", "menunggu_pembayaran", "dibatalkan"] as const).map(
                (s) => (
                  <form key={s} action={setBookingStatusAction}>
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      type="submit"
                      className="text-xs font-medium border border-border-warm rounded-lg px-3 py-2 text-charcoal hover:border-terracotta hover:text-terracotta transition-all duration-200 active:scale-[0.97]"
                    >
                      Set {STATUS_LABEL[s]}
                    </button>
                  </form>
                )
              )}
            </div>
          </div>

          {/* Pembayaran */}
          <div className="bg-surface border border-border-warm rounded-lg p-6 mb-6">
            <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
              Pembayaran ({payments.length})
            </h2>

            {payments.length === 0 ? (
              <p className="text-sm text-warm-grey italic pb-2">
                Belum ada pembayaran. User mengunggah bukti via halaman{" "}
                <code className="text-xs bg-ivory-dark px-1 py-0.5 rounded">
                  /booking/{booking.id}
                </code>
                .
              </p>
            ) : (
              <ul className="space-y-4">
                {payments.map((payment, i) => (
                  <li
                    key={payment.id}
                    className="p-4 rounded-lg border border-border-warm bg-ivory-dark"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {payment.type === "deposit" ? "DP / Deposit" : "Sisa (final)"}
                          {payment.method && (
                            <span className="text-warm-grey">
                              {" "}
                              · {payment.method === "transfer" ? "Transfer" : "QRIS"}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-warm-grey mt-0.5">
                          {payment.submittedAt
                            ? `Diajukan ${formatDateTimeID(payment.submittedAt)}`
                            : `Dicatat manual ${formatDateTimeID(payment.createdAt)}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-base font-semibold text-charcoal">
                          {formatIDR(payment.amountIDR)}
                        </span>
                        {!payment.verifiedAt ? (
                          <form action={verifyPaymentAction}>
                            <input type="hidden" name="paymentId" value={payment.id} />
                            <button
                              type="submit"
                              className="inline-flex items-center gap-1.5 bg-terracotta text-white text-xs font-semibold rounded-lg px-3 py-2 hover:bg-terracotta-dark active:scale-[0.97] transition-all"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Verifikasi
                            </button>
                          </form>
                        ) : (
                          <span className="text-xs font-medium text-terracotta">
                            Terverifikasi{" "}
                            {payment.verifiedAt && formatDateTimeID(payment.verifiedAt)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pratinjau bukti */}
                    <div className="mt-3 flex gap-3 items-start">
                      {proofUrls[i] ? (
                        <a
                          href={proofUrls[i] as string}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={proofUrls[i] as string}
                            alt={`Bukti pembayaran ${payment.id}`}
                            className="w-28 h-28 object-cover rounded-lg border border-border-warm"
                          />
                        </a>
                      ) : (
                        <div className="w-28 h-28 rounded-lg border border-dashed border-border-warm flex flex-col items-center justify-center text-warm-grey">
                          <ImageOff className="w-5 h-5 mb-1" />
                          <span className="text-[10px] text-center px-2">
                            {payment.proofPath ? "Bukti tak tersedia" : "Dicatat manual"}
                          </span>
                        </div>
                      )}
                      <div className="text-xs text-warm-grey space-y-1">
                        {payment.adminNote && (
                          <p>
                            <span className="font-medium text-charcoal">Catatan:</span>{" "}
                            {payment.adminNote}
                          </p>
                        )}
                        <p className="font-mono break-all">
                          {payment.proofPath || "no file"}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <ManualPaymentForm bookingId={booking.id} />
          </div>

          {/* Kirim link booking ke customer */}
          <div className="bg-surface border border-border-warm rounded-lg p-6">
            <h2 className="font-serif text-lg font-semibold text-charcoal mb-1">
              Kirim Info Booking ke Customer
            </h2>
            <p className="text-xs text-warm-grey mb-4">
              Salin teks di bawah ke chat WhatsApp customer{" "}
              ({SITE_CONFIG.whatsappDisplay} adalah nomor admin — teks
              dibuat untuk dikirim dari akun admin Anda sendiri).
            </p>
            <pre className="p-4 bg-ivory-dark border border-border-warm rounded-lg text-xs text-charcoal whitespace-pre-wrap font-sans leading-relaxed mb-3">
              {waHandoverText}
            </pre>
            <CopyButton text={waHandoverText} label="Salin Pesan Booking" />
          </div>
        </div>
      </section>
    </div>
  );
}
