import { PageHeader } from "@/components/shared/PageHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { SITE_CONFIG } from "@/data/config";

export const metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan layanan Valora Tour: booking, DP dan pelunasan, pembatalan, refund, tanggung jawab operator, dan pasal umum.",
};

const sections: { title: string; items: string[] }[] = [
  {
    title: "1. Booking & Konfirmasi",
    items: [
      "Semua layanan diverifikasi dan di-quote oleh Admin Valora melalui WhatsApp. Quote yang disetujui menjadi dasar pembuatan booking.",
      "Setelah booking dibuat, customer menerima halaman status booking dengan nomor VLR-YYMM-#### yang berlakunya sebagai referensi resmi.",
      "Jadwal dan armada menjadi terkunci setelah pembayaran DP diverifikasi Admin.",
    ],
  },
  {
    title: "2. Pembayaran",
    items: [
      `Metode pembayaran: transfer bank atau QRIS ke rekening resmi yang tercantum di halaman Kebijakan Pembayaran. Kami tidak pernah meminta pembayaran ke rekening lain.`,
      `DP ${SITE_CONFIG.payments.depositPercent}% dibayar saat booking dikonfirmasi. Sisa pembayaran dilengkapi maksimal H-7 sebelum keberangkatan atau sesuai kesepakatan.`,
      "Bukti pembayaran diunggah di halaman status booking dan diverifikasi Admin maksimal 1×24 jam.",
      "Harga final mengikuti quote Admin; angka estimasi katalog di situs bersifat indikatif (kurs tampil dapat berubah).",
    ],
  },
  {
    title: "3. Pembatalan & Refund",
    items: [
      "Pembatalan dilakukan melalui Admin via WhatsApp dengan nomor booking sebagai referensi.",
      "Pembatalan lebih dari 30 hari sebelum keberangkatan: pembayaran dikembalikan dikurangi biaya operasional yang sudah terlanjur berjalan.",
      "Pembatalan 14–30 hari sebelum keberangkatan: pengembalian sebagian sesuai kebijakan yang diperjanjikan saat booking.",
      "Pembatalan kurang dari 14 hari sebelum keberangkatan: dana yang sudah dibayar tidak dapat dikembalikan karena armada, guide, dan pembayaran vendor sudah terkunci.",
      "Refund diproses ke rekening asal transfer maksimal 14 hari kerja setelah persetujuan pembatalan.",
    ],
  },
  {
    title: "4. Perubahan Itinerary",
    items: [
      "Perubahan tanggal atau komposisi layanan dapat diajukan, diterima sesuai ketersediaan armada dan vendor; selisih biaya ditagih terlebih dahulu atau dikembalikan.",
      "Kondisi force majeure (cuaca ekstrem, penutupan bandara, kondisi darurat setempat) dapat mengubah rute atau substitusi layanan dan tidak dihitung sebagai pembatalan.",
    ],
  },
  {
    title: "5. Tanggung Jawab & Kewajiban Customer",
    items: [
      "Customer bertanggung jawab atas kelengkapan dokumen perjalanan (paspor, visa bila diperlukan, tiket).",
      "Valora bertanggung jawab atas pelaksanaan layanan yang dinyatakan dalam quote: armada, guide, dan tur sesuai itinerary.",
      "Kehilangan barang pribadi, biaya personal di luar quote, serta risiko yang tidak disebutkan dalam layanan menjadi tanggungan masing-masing peserta.",
      "Dianjurkan memiliki asuransi perjalanan internasional. Valora dapat merekomendasikan, namun bukan penjual asuransi.",
    ],
  },
];

export default function KetentuanPage() {
  return (
    <div className="bg-ivory">
      <PageHeader
        eyebrow="Informasi"
        title="Syarat & Ketentuan Layanan"
        description="Ketentuan dasar layanan tur Valora: booking, pembayaran, pembatalan, refund, tanggung jawab, dan kewajiban customer."
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          {sections.map((section, idx) => (
            <RevealOnScroll key={section.title} delay={idx * 60} y={14}>
              <div className="bg-surface border border-border-warm rounded-lg p-6">
                <h2 className="font-serif text-lg font-semibold text-charcoal mb-3">
                  {section.title}
                </h2>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-warm-grey leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0 mt-1.5" />
                      <span className="text-charcoal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={200} y={14}>
            <div className="p-4 bg-ivory-dark border border-border-warm rounded-lg">
              <p className="text-xs text-warm-grey leading-relaxed">
                Dokumen ini bersifat acuan umum. Ketika terdapat perbedaan,
                kesepakatan spesifik yang tertulis di chat quote WhatsApp dengan
                Admin adalah yang mengikat. Pertanyaan kebijakan harap hubungi{" "}
                {SITE_CONFIG.whatsappDisplay}.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={260} y={14}>
            <div className="text-center">
              <WhatsAppButton
                label="Konsultasi Kebijakan via WhatsApp"
                variant="secondary"
                size="sm"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
