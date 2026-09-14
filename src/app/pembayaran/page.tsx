import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { CopyButton } from "@/components/shared/CopyButton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SITE_CONFIG } from "@/data/config";
import { Banknote, Landmark, QrCode, ClipboardCheck } from "lucide-react";

export const metadata = {
  title: "Kebijakan Pembayaran — Valora Tour & Travel",
  description:
    "Cara pembayaran booking Valora Tour: transfer bank atau QRIS. Skema DP dan pelunasan, verifikasi maksimal 1x24 jam.",
};

const steps = [
  {
    number: "01",
    title: "Konfirmasi quote dari Admin",
    description:
      "Setelah konsultasi dan harga final disetujui, Admin mengirim link halaman booking Anda.",
    icon: Landmark,
  },
  {
    number: "02",
    title: "Bayar DP via transfer bank atau QRIS",
    description:
      "Buka halaman booking Anda, lakukan transfer ke rekening di bawah atau scan QRIS di halaman ini.",
    icon: QrCode,
  },
  {
    number: "03",
    title: "Unggah bukti pembayaran",
    description:
      "Unggah foto/screenshot bukti transfer pada halaman booking Anda, lalu lapor via WhatsApp.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Admin verifikasi & booking terkonfirmasi",
    description:
      "Bukti diverifikasi maksimal 1x24 jam. Status booking Anda berubah otomatis di halaman yang sama.",
    icon: Banknote,
  },
];

export default function PembayaranPage() {
  const { payments } = SITE_CONFIG;

  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Pembayaran"
              title="Kebijakan & Cara Pembayaran"
              description={`Semua pembayaran dilakukan melalui transfer bank atau QRIS dengan verifikasi manual oleh Admin. Booking dikonfirmasi setelah DP ${payments.depositPercent}% diterima.`}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Alur pembayaran */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, idx) => (
              <RevealOnScroll key={step.number} delay={idx * 100} y={20}>
                <div className="h-full bg-surface border border-border-warm rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-serif text-2xl font-semibold text-terracotta">
                      {step.number}
                    </span>
                    <step.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-medium text-charcoal text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-warm-grey leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transfer bank */}
            <RevealOnScroll y={20}>
              <div className="h-full bg-surface border border-border-warm rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Landmark className="w-5 h-5 text-terracotta" />
                  <h2 className="font-serif text-lg font-semibold text-charcoal">
                    Transfer Bank
                  </h2>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-warm-grey">Bank</dt>
                    <dd className="font-medium text-charcoal text-right">
                      {payments.bankName}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-warm-grey">No. Rekening</dt>
                    <dd className="font-medium text-charcoal text-right flex items-center gap-2">
                      <span className="font-mono tracking-wide">
                        {payments.accountNumber}
                      </span>
                      <CopyButton text={payments.accountNumber} />
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-warm-grey">Atas Nama</dt>
                    <dd className="font-medium text-charcoal text-right">
                      {payments.accountName}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-warm-grey italic">
                  Pastikan jumlah transfer sama persis dengan nominal di halaman
                  booking Anda agar mudah diverifikasi.
                </p>
              </div>
            </RevealOnScroll>

            {/* QRIS */}
            <RevealOnScroll delay={100} y={20}>
              <div
                id="qris"
                className="h-full bg-surface border border-border-warm rounded-lg p-6 scroll-mt-24"
              >
                <div className="flex items-center gap-2 mb-4">
                  <QrCode className="w-5 h-5 text-terracotta" />
                  <h2 className="font-serif text-lg font-semibold text-charcoal">
                    QRIS
                  </h2>
                </div>
                <div className="max-w-[220px] mx-auto rounded-lg border border-border-warm overflow-hidden bg-ivory">
                  <ImageWithFallback
                    src={payments.qrisImage}
                    alt="Kode QRIS pembayaran Valora Tour"
                    className="w-full aspect-square"
                    imgClassName="object-contain"
                  />
                </div>
                <p className="mt-4 text-xs text-warm-grey italic">
                  Scan dengan aplikasi e-wallet atau mobile banking apa pun
                  (GoPay, OVO, DANA, ShopeePay, m-banking). Foto QRIS hanya
                  legal jika berasal dari halaman resmi Valora.
                </p>
              </div>
            </RevealOnScroll>

            {/* Skema DP */}
            <RevealOnScroll delay={200} y={20}>
              <div className="h-full bg-surface border border-border-warm rounded-lg p-6">
                <h2 className="font-serif text-lg font-semibold text-charcoal mb-4">
                  Skema Pembayaran
                </h2>
                <ul className="space-y-3 text-sm text-charcoal">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-terracotta flex-shrink-0 mt-1.5" />
                    <span>
                      <strong>DP {payments.depositPercent}%</strong> dibayar saat
                      booking dikonfirmasi untuk mengunci jadwal dan armada.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                    <span>
                      <strong>Sisa pembayaran</strong> dilengkapi maksimal H-7
                      sebelum keberangkatan (atau sesuai kesepakatan dengan
                      Admin).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-terracotta flex-shrink-0 mt-1.5" />
                    <span>
                      Status pembayaran dapat dipantau kapan pun di halaman
                      booking pribadi Anda.
                    </span>
                  </li>
                </ul>
                <p className="mt-5 p-4 bg-ivory-dark border border-border-warm rounded-lg text-xs text-warm-grey leading-relaxed">
                  {payments.verificationNote}
                </p>
                <div className="mt-5">
                  <WhatsAppButton
                    label="Tanya Admin via WhatsApp"
                    variant="secondary"
                    size="sm"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
