import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Button } from "@/components/shared/Button";
import { BadgeCheck, Car, Route, Tag, MapPin, Headset } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

export const metadata = {
  title: "About Us",
  description:
    "Kenali Valora Tour & Travel: spesialis private tour Turki untuk wisatawan Indonesia dengan guide berlisensi, armada VIP Mercedes-Benz, dan dukungan 24/7.",
};

const values = [
  {
    icon: BadgeCheck,
    title: "Guide Berlisensi Resmi",
    description:
      "Tur dipandu guide berlisensi Turki yang berbahasa Indonesia, dengan penjelasan sejarah dan budaya yang mendalam.",
  },
  {
    icon: Car,
    title: "Armada VIP Mercedes-Benz",
    description:
      "Vito hingga coach, terawat dan nyaman. Seluruh armada bersifat private digunakan khusus untuk grup Anda.",
  },
  {
    icon: Route,
    title: "Itinerary Fleksibel",
    description:
      "Rute mengikuti ritme Anda — bukan rombongan. Sesuaikan tempo, istirahat, dan destinasi bersama Admin.",
  },
  {
    icon: Tag,
    title: "Harga Transparan",
    description:
      "Estimasi biaya ditampilkan terbuka dalam USD dan IDR. Harga final disepakati jelas sebelum booking dibuat.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-ivory">
      <PageHeader
        eyebrow="About Us"
        title="Tentang Valora Tour & Travel"
        description="Operator private tour Turki yang dibangun untuk wisatawan Indonesia — berpengalaman, berlisensi, dan berfokus pada kenyamanan grup Anda."
      />

      {/* Cerita */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <RevealOnScroll y={20}>
              <div className="rounded-lg overflow-hidden">
                <div className="aspect-[4/3] w-full">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1774429307435-35651939a7a9?auto=format&fit=crop&w=1200&q=80"
                    alt="Balon udara di Cappadocia, Turki saat sunrise"
                    className="w-full h-full"
                    imgClassName="object-cover"
                  />
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120} y={20}>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-4">
                  Turki, dijelajahi dengan standar Indonesia
                </h2>
                <div className="space-y-4 text-sm md:text-base text-warm-grey leading-relaxed">
                  <p>
                    Valora Tour and Travel adalah operator tur yang bermarkas di
                    Sultanahmet, Istanbul, dengan representatif di Jakarta. Kami
                    fokus pada satu hal: membuat perjalanan Turki yang aman,
                    nyaman, dan mudah dipahami untuk wisatawan Indonesia.
                  </p>
                  <p>
                    Kami melihat banyak traveler berjuang dengan barier bahasa,
                    transportasi lokal, dan negosiasi harga. Private tour Valora
                    menutup semua itu: armada VIP dengan driver sendiri, guide
                    berlisensi yang berbahasa Indonesia, dan itinerary yang
                    disusun transparan dari awal.
                  </p>
                  <p>
                    Setiap tur dijalankan oleh tim lokal yang paham dua budaya —
                    standar pelayanan Indonesia dengan pengetahuan Turki yang
                    dalam. Dari tur pertama hingga grup besar, standar layanan
                    kami tidak berubah: private, berlisensi, dan transparan.
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <WhatsAppButton label="Kenalan via WhatsApp" variant="secondary" size="md" />
                  <Button href="/tour-packages" variant="outline" size="md">
                    Lihat Paket Tour
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Nilai */}
      <section className="py-12 md:py-16 bg-ivory-dark border-y border-border-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <SectionHeader
              eyebrow="Komitmen"
              title="Empat Komitmen di Setiap Tur"
              description="Standar yang tidak berubah, berapa pun ukuran grup Anda."
              className="mb-10"
            />
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <RevealOnScroll key={v.title} delay={idx * 90} y={18}>
                <div className="h-full bg-surface border border-border-warm rounded-lg p-5">
                  <v.icon className="w-5 h-5 text-terracotta mb-3" />
                  <h3 className="font-medium text-charcoal text-sm mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-warm-grey leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi & operasional */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll y={16}>
            <div className="bg-surface border border-border-warm rounded-lg p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-charcoal mb-1">
                    <MapPin className="w-4 h-4 text-terracotta" />
                    Base Operasional
                  </p>
                  <p className="text-sm text-warm-grey">{SITE_CONFIG.operations}</p>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-charcoal mb-1">
                    <MapPin className="w-4 h-4 text-gold" />
                    Representatif
                  </p>
                  <p className="text-sm text-warm-grey">{SITE_CONFIG.representative}</p>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-charcoal mb-1">
                    <Headset className="w-4 h-4 text-terracotta" />
                    Bantuan Selama Tur
                  </p>
                  <p className="text-sm text-warm-grey">
                    Support {SITE_CONFIG.emergencySupport} via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
