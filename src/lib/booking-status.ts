import type { Booking, BookingPayment, BookingStatus } from "@/types";

export const STATUS_LABEL: Record<BookingStatus, string> = {
  menunggu_pembayaran: "Menunggu Pembayaran DP",
  menunggu_verifikasi: "Menunggu Verifikasi Admin",
  dp_terverifikasi: "DP Diterima",
  lunas: "Lunas",
  dikonfirmasi: "Booking Dikonfirmasi",
  dibatalkan: "Dibatalkan",
};

export const STATUS_STYLE: Record<
  BookingStatus,
  { badge: string; dot: string }
> = {
  menunggu_pembayaran: {
    badge: "bg-gold/15 text-gold border-gold/30",
    dot: "bg-gold",
  },
  menunggu_verifikasi: {
    badge: "bg-terracotta/10 text-terracotta border-terracotta/30",
    dot: "bg-terracotta",
  },
  dp_terverifikasi: {
    badge: "bg-terracotta/10 text-terracotta border-terracotta/30",
    dot: "bg-terracotta",
  },
  lunas: {
    badge: "bg-charcoal/5 text-charcoal border-charcoal/20",
    dot: "bg-charcoal",
  },
  dikonfirmasi: {
    badge: "bg-charcoal/5 text-charcoal border-charcoal/20",
    dot: "bg-charcoal",
  },
  dibatalkan: {
    badge: "bg-warm-grey/10 text-warm-grey border-warm-grey/20",
    dot: "bg-warm-grey",
  },
};

/** Total yang sudah VERIFIKASI admin. */
export function verifiedPaidIDR(payments: BookingPayment[]): number {
  return payments
    .filter((p) => p.verifiedAt)
    .reduce((sum, p) => sum + p.amountIDR, 0);
}

/** Total diajukan (termasuk yang belum diverifikasi). */
export function pendingIDR(payments: BookingPayment[]): number {
  return payments
    .filter((p) => !p.verifiedAt)
    .reduce((sum, p) => sum + p.amountIDR, 0);
}

export type PayableType = "deposit" | "final" | null;

/** Jenis pembayaran berikutnya yang boleh diajukan user. */
export function nextPayableType(
  booking: Booking,
  payments: BookingPayment[]
): PayableType {
  if (booking.status === "dibatalkan") return null;
  if (booking.status === "lunas" || booking.status === "dikonfirmasi")
    return null;

  const hasDeposit = payments.some(
    (p) => p.type === "deposit" && p.verifiedAt
  );
  const hasPending = payments.some((p) => !p.verifiedAt);
  if (hasPending) return null;

  return hasDeposit ? "final" : "deposit";
}

export function nominalForType(
  booking: Booking,
  payments: BookingPayment[],
  type: PayableType
): number {
  if (type === "deposit") return booking.depositIDR;
  if (type === "final") {
    const paid = payments
      .filter((p) => p.verifiedAt)
      .reduce((sum, p) => sum + p.amountIDR, 0);
    return Math.max(0, booking.totalIDR - paid);
  }
  return 0;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDateID(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return dateFormatter.format(new Date(Date.UTC(y, m - 1, d)));
}

export function formatDateTimeID(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
