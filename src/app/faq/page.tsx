import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export const metadata = {
  title: "FAQ — Pertanyaan Umum Tur Turki — Valora Tour & Travel",
  description:
    "FAQ lengkap tentang private tour Turki: cara booking, DP dan pembayaran, visum WNI, guide berbahasa Indonesia, armada VIP, pembatalan, dan refund.",
};

const faqs: { q: string; a: string }[] = [
  {
    q: "Bagaimana cara memesan paket tour di Valora?",
    a: "Alurnya: (1) pilih layanan di katalog, (2) konsultasi dan dapatkan harga final dari Admin via WhatsApp, (3) Admin mengirimkan link halaman booking Anda, (4) bayar DP dan unggah bukti di halaman booking, (5) booking terkonfirmasi setelah DP diverifikasi.",
  },
  {
    q: "Berapa DP (deposit) yang harus dibayar?",
    a: `DP ${SITE_CONFIG.payments.depositPercent}% dari total harga quote untuk mengunci jadwal dan armada. Sisa pembayaran dilengkapi maksimal H-7 sebelum keberangkatan (atau sesuai kesepakatan dengan Admin).`,
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "Transfer bank dan QRIS (m-banking/e-wallet Indonesia mana saja via QRIS). Bukti transfer diunggah di halaman booking Anda, lalu diverifikasi Admin maksimal 1×24 jam.",
  },
  {
    q: "Apakah harga sudah termasuk tiket pesawat dan visa?",
    a: "Harga katalog umumnya mencakup layanan di Turki (transport, guide, tur sesuai itinerary paket yang dinyatakan). Tiket pesawat internasional, asuransi perjalanan, dan biaya personal berada di luar kecuali dinyatakan berbeda dalam quote Anda.",
  },
  {
    q: "Apakah wisatawan Indonesia butuh visa ke Turki?",
    a: "Umumnya warga Indonesia masuk kategori bebas-visa kunjungan wisata (umumnya maksimal 30 hari) asalkan paspor aktif. Aturan dapat berubah — selalu cek info terbaru dari kedutaan/konsuler Turki atau konfirmasi ke Admin sebelum tanggal keberangkatan.",
  },
  {
    q: "Apakah guide berbicara bahasa Indonesia?",
    a: "Ya — kami menyediakan guide berlisensi resmi Turki yang berbahasa Indonesia. Ini layanan standar di semua paket tur private kami.",
  },
  {
    q: "Armada apa yang digunakan?",
    a: "Armada VIP yang terawat: Mercedes-Benz Vito (1–6 pax), Sprinter (grup menengah), hingga midibus dan luxury coach untuk grup besar. Semua bersifat private — tidak digabungkan dengan rombongan lain.",
  },
  {
    q: "Berapa maksimal peserta dalam satu grup?",
    a: "Fleksibel. Mulai 1–6 orang (Vito), grup keluarga, sampai grup besar 20–50 orang. Kapasitas dan konfigurasi armada menyesuaikan quote Anda.",
  },
  {
    q: "Bisa berangkat bersama anak-anak atau lansia?",
    a: "Sangat bisa. Private tour Valora ramah keluarga dan lansia — itinerary diatur lebih lambat sesuai ritme grup, termasuk rekomendasi hotel dan jadwal istirahat.",
  },
  {
    q: "Bagaimana kebijakan pembatalan dan refund?",
    a: "Pembatalan lebih awal mengembalikan sebagian pembayaran sesuai ketentuan tanggal (dikurangi biaya operasional yang terlanjur berjalan). Gradasi persentase diuraikan di halaman Syarat & Ketentuan.",
  },
  {
    q: "Kenapa angka harga di manapun tidak persis sama?",
    a: "Karena harga ditampilkan 3 mata uang (USD/EUR/IDR) dengan kurs yang berubah real-time. Harga final dikonfirmasi Admin saat quote — inilah satu-satunya harga yang mengikat.",
  },
  {
    q: "Kalau ada keadaan darurat saat tur, apa yang harus dilakukan?",
    a: `Tim di Istanbul siap membantu 24/7 selama tur berjalan. Hubungi Admin via WhatsApp ${SITE_CONFIG.whatsappDisplay}.`,
  },
];

export default function FAQPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-16 md:pt-20 pb-12 border-b border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="FAQ"
              title="Pertanyaan yang Sering Diajukan"
              description="Jawaban ringkas tentang booking, pembayaran, visum, armada, dan kebijakan pembatalan. Pertanyaan spesifik selalu via WhatsApp."
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <RevealOnScroll key={item.q} delay={idx * 40} y={12}>
                <details className="group bg-surface border border-border-warm rounded-lg">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none">
                    <span className="text-sm font-medium text-charcoal leading-snug">
                      {item.q}
                    </span>
                    <ChevronDown className="w-4 h-4 text-warm-grey flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-4 text-sm text-warm-grey leading-relaxed">
                    {item.a}
                  </p>
                </details>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={120} y={12}>
            <div className="mt-8 p-6 bg-ivory-dark border border-border-warm rounded-lg text-center">
              <p className="flex items-center justify-center gap-2 text-sm font-medium text-charcoal mb-1">
                <MessageCircle className="w-4 h-4 text-terracotta" />
                Pertanyaan Anda tidak ada di daftar?
              </p>
              <p className="text-sm text-warm-grey mb-4">
                Tanya langsung ke Admin Valora — dijawab cepat.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <WhatsAppButton
                  label="Tanya via WhatsApp"
                  variant="secondary"
                  size="sm"
                />
                <Link
                  href="/pembayaran"
                  className="text-sm text-terracotta hover:underline"
                >
                  Baca kebijakan pembayaran →
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
