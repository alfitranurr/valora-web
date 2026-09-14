import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, Plus, ChevronRight, Wallet } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { CreateBookingForm } from "./CreateBookingForm";
import { logoutAction } from "./actions";
import { isAuthed } from "@/lib/auth";
import { listBookings } from "@/lib/store/bookings";
import { formatIDR } from "@/lib/currency";
import { STATUS_LABEL, STATUS_STYLE, formatDateID } from "@/lib/booking-status";
import type { Booking } from "@/types";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthed())) {
    return <LoginForm />;
  }

  const bookings: Booking[] = [];
  let storeError: string | null = null;
  try {
    bookings.push(...(await listBookings()));
  } catch (e) {
    storeError =
      e instanceof Error ? e.message : "Gagal memuat data booking.";
  }

  return (
    <div className="bg-ivory min-h-screen">
      <section className="pt-10 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                Panel Admin Valora
              </p>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal">
                Manajemen Booking
              </h1>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-sm text-warm-grey hover:text-terracotta transition-colors border border-border-warm rounded-lg px-4 py-2 hover:border-terracotta/40"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </div>

          {/* Buat booking baru */}
          <details className="bg-surface border border-border-warm rounded-lg mb-8 group">
            <summary className="flex items-center gap-2 px-6 py-4 cursor-pointer select-none text-sm font-semibold text-charcoal">
              <Plus className="w-4 h-4 text-terracotta" />
              Buat Booking Baru
              <span className="text-xs text-warm-grey font-normal group-open:hidden">
                (dari hasil quote WhatsApp)
              </span>
            </summary>
            <div className="px-6 pb-6 pt-2 border-t border-border-warm">
              <p className="text-xs text-warm-grey mb-4 mt-2">
                Isi detail booking dari quote yang sudah disetujui user di
                WhatsApp. Setelah disimpan, sistem menyiapkan template pesan
                berisi link halaman booking untuk dikirim ke customer.
              </p>
              <CreateBookingForm />
            </div>
          </details>

          {/* Daftar booking */}
          <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
            Daftar Booking ({bookings.length})
          </h2>

          {storeError && (
            <div className="bg-terracotta/5 border border-terracotta/20 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-terracotta">
                Koneksi Supabase bermasalah
              </p>
              <p className="text-xs text-warm-grey mt-1 leading-relaxed">
                {storeError}
              </p>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="bg-surface border border-border-warm rounded-lg p-10 text-center">
              <Wallet className="w-8 h-8 text-warm-grey mx-auto mb-3" />
              <p className="text-sm text-warm-grey">
                Belum ada booking. Buat dari form di atas setelah quote
                disetujui via WhatsApp.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => {
                const style = STATUS_STYLE[booking.status];
                return (
                  <Link
                    key={booking.id}
                    href={`/admin/${booking.id}`}
                    className="block bg-surface border border-border-warm rounded-lg px-5 py-4 hover:border-terracotta/40 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-charcoal text-sm">
                            {booking.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded border ${style.badge}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            {STATUS_LABEL[booking.status]}
                          </span>
                        </div>
                        <p className="text-sm text-charcoal truncate mt-1">
                          {booking.serviceName}
                        </p>
                        <p className="text-xs text-warm-grey truncate">
                          {booking.customer.name} · {booking.customer.wa} ·{" "}
                          {formatDateID(booking.travelDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-charcoal">
                            {formatIDR(booking.totalIDR)}
                          </p>
                          <p className="text-xs text-warm-grey">
                            DP {formatIDR(booking.depositIDR)}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-warm-grey" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
