import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";import {
  ArrowLeft,
  Calendar,
  Users,
  Landmark,
  QrCode,
  Clock,
} from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CopyButton } from "@/components/shared/CopyButton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Badge } from "@/components/shared/Badge";
import { getBooking } from "@/lib/store/bookings";
import { SITE_CONFIG } from "@/data/config";
import { formatIDR } from "@/lib/currency";
import {
  STATUS_LABEL,
  STATUS_STYLE,
  verifiedPaidIDR,
  pendingIDR,
  nextPayableType,
  nominalForType,
  formatDateID,
  formatDateTimeID,
} from "@/lib/booking-status";
import {
  paymentSubmittedUrl,
  bookingStatusUrl,
} from "@/lib/whatsapp";
import { ProofUploadForm } from "./ProofUploadForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Booking ${id}`,
    robots: { index: false, follow: false },
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getBooking(id);
  if (!result) notFound();

  const { booking, payments } = result;
  const paid = verifiedPaidIDR(payments);
  const pending = pendingIDR(payments);
  const remaining = Math.max(0, booking.totalIDR - paid);
  const payableType = nextPayableType(booking, payments);
  const nominal = payableType ? nominalForType(booking, payments, payableType) : 0;
  const statusStyle = STATUS_STYLE[booking.status];

  return (
    <div className="bg-ivory">
      <section className="pt-10 md:pt-14 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={12}>
            <Link
              href="/pembayaran"
              className="inline-flex items-center gap-1.5 text-sm text-warm-grey hover:text-charcoal transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kebijakan pembayaran
            </Link>
          </RevealOnScroll>

          {/* Header booking */}
          <RevealOnScroll delay={80} y={16}>
            <div className="bg-surface border border-border-warm rounded-lg p-6 md:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                    Nomor Booking
                  </p>
                  <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal">
                      {booking.id}
                    </h1>
                    <CopyButton text={booking.id} label="Salin ID" className="py-1" />
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded border self-start ${statusStyle.badge}`}
                >
                  <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                  {STATUS_LABEL[booking.status]}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-warm-grey mb-1">Layanan</p>
                  <p className="text-charcoal font-medium">
                    {booking.serviceName}
                    {booking.serviceRef && (
                      <Link
                        href={`/${booking.serviceRef}`}
                        className="ml-1 text-terracotta text-xs hover:underline"
                      >
                        lihat detail
                      </Link>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-warm-grey mb-1">Tanggal keberangkatan</p>
                  <p className="text-charcoal font-medium flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-terracotta" />
                    {formatDateID(booking.travelDate)}
                  </p>
                </div>
                <div>
                  <p className="text-warm-grey mb-1">Peserta</p>
                  <p className="text-charcoal font-medium flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-terracotta" />
                    {booking.adults} dewasa
                    {booking.children > 0 && `, ${booking.children} anak`}
                  </p>
                </div>
                <div>
                  <p className="text-warm-grey mb-1">Nama customer</p>
                  <p className="text-charcoal font-medium">{booking.customer.name}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border-warm grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    Sudah terverifikasi
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
          </RevealOnScroll>

          {/* Status pembayaran tertahan */}
          {pending > 0 && (
            <RevealOnScroll y={16} className="mb-6">
              <div className="flex items-start gap-3 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Menunggu verifikasi — {formatIDR(pending)}
                  </p>
                  <p className="text-xs text-warm-grey mt-0.5">
                    Bukti Anda sedang diperiksa Admin Valora (maksimal 1×24
                    jam). Kamu tidak perlu mengunggah bukti lagi sampai
                    pengajuan ini selesai.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kiri: instruksi pembayaran / upload */}
            <div className="lg:col-span-2 space-y-6">
              {payableType && (
                <RevealOnScroll y={16}>
                  <div className="bg-surface border border-border-warm rounded-lg p-6">
                    <h2 className="font-serif text-lg font-semibold text-charcoal mb-1">
                      Cara Bayar {payableType === "deposit" ? "DP" : "Sisa"}
                    </h2>
                    <p className="text-sm text-warm-grey mb-5">
                      Pilih transfer bank atau QRIS, lalu unggah bukti di bawah.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg border border-border-warm bg-ivory-dark">
                        <p className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                          <Landmark className="w-4 h-4 text-terracotta" />
                          Transfer Bank
                        </p>
                        <ul className="text-xs text-warm-grey space-y-1.5">
                          <li className="flex items-center justify-between gap-2">
                            <span>{SITE_CONFIG.payments.bankName}</span>
                            <span className="font-mono text-charcoal">
                              {SITE_CONFIG.payments.accountNumber}
                              <CopyButton
                                text={SITE_CONFIG.payments.accountNumber}
                                className="ml-1 py-0 px-1"
                                label="Salin"
                              />
                            </span>
                          </li>
                          <li>A.n. {SITE_CONFIG.payments.accountName}</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg border border-border-warm bg-ivory-dark">
                        <p className="flex items-center gap-2 text-sm font-medium text-charcoal mb-2">
                          <QrCode className="w-4 h-4 text-terracotta" />
                          QRIS
                        </p>
                        <Link
                          href="/pembayaran#qris"
                          className="text-xs text-terracotta hover:underline"
                        >
                          Lihat kode QRIS di halaman kebijakan pembayaran →
                        </Link>
                      </div>
                    </div>

                    {payableType && (
                      <ProofUploadForm
                        bookingId={booking.id}
                        payableType={payableType}
                        nominalIDR={nominal}
                        waUrl={paymentSubmittedUrl(booking.id)}
                      />
                    )}
                  </div>
                </RevealOnScroll>
              )}

              {/* Riwayat pembayaran */}
              <RevealOnScroll y={16}>
                <div className="bg-surface border border-border-warm rounded-lg p-6">
                  <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
                    Riwayat Pembayaran
                  </h2>
                  {payments.length === 0 ? (
                    <p className="text-sm text-warm-grey italic">
                      Belum ada pembayaran yang diajukan.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {payments.map((p) => (
                        <li
                          key={p.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-lg border border-border-warm bg-ivory-dark"
                        >
                          <div>
                            <p className="text-sm font-medium text-charcoal">
                              {p.type === "deposit" ? "DP / Deposit" : "Sisa (final)"}{" "}
                              ·{" "}
                              {p.method === "transfer" ? "Transfer Bank" : "QRIS"}
                            </p>
                            <p className="text-xs text-warm-grey mt-0.5">
                              Diajukan {p.submittedAt && formatDateTimeID(p.submittedAt)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-charcoal">
                              {formatIDR(p.amountIDR)}
                            </span>
                            {p.verifiedAt ? (
                              <Badge variant="bestseller">Terverifikasi</Badge>
                            ) : (
                              <Badge variant="default">Menunggu verifikasi</Badge>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </RevealOnScroll>
            </div>

            {/* Kanan: bantuan */}
            <div className="lg:col-span-1">
              <RevealOnScroll delay={120} y={16}>
                <div className="bg-surface border border-border-warm rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-medium text-charcoal text-sm mb-2">
                      Ada pertanyaan?
                    </h3>
                    <p className="text-xs text-warm-grey leading-relaxed mb-4">
                      Semua konfirmasi dan pertanyaan dilayani via WhatsApp
                      {SITE_CONFIG.whatsappDisplay}.
                    </p>
                  </div>
                  <WhatsAppButton
                    url={bookingStatusUrl(booking.id)}
                    label="Tanya Status Booking"
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  />
                  <div className="p-3 bg-ivory-dark border border-border-warm rounded-lg">
                    <p className="text-xs text-warm-grey">
                      Simpan link halaman ini — hanya Anda dan Admin Valora yang
                      tahu nomor booking ini.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
