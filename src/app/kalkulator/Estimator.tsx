"use client";

import { useState, useMemo } from "react";
import { Check, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import { NumberStepper } from "@/components/shared/NumberStepper";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { services } from "@/data/services";
import { tourPackages } from "@/data/packages";
import { bundles } from "@/data/bundles";
import { addons } from "@/data/addons";
import {
  formatPriceIDR,
  formatPriceUSD,
  formatEUR,
} from "@/lib/currency";
import { estimateWhatsAppUrl } from "@/lib/whatsapp";
import { useKurs, formatKursLabel } from "@/hooks/useKurs";
import type { LucideIcon } from "lucide-react";
import { Compass, Car, Map, Package, Route } from "lucide-react";
import { useRouter } from "next/navigation";

interface EstimableItem {
  id: string;
  name: string;
  priceUSD: number;
  priceIDR: number;
  unit: string;
  duration?: string;
  capacity?: string;
  description?: string;
}

const categoryConfig: {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "best-seller",
    label: "Best Seller",
    description: "Layanan terpopuler Valora",
    icon: Compass,
  },
  {
    id: "transport-vip",
    label: "Transport VIP",
    description: "Armada Mercedes-Benz & driver",
    icon: Car,
  },
  {
    id: "paket-tour",
    label: "Paket Tour",
    description: "Tur all-inclusive per destinasi",
    icon: Map,
  },
  {
    id: "bundle",
    label: "Bundle Hemat",
    description: "Kombinasi layanan lebih hemat",
    icon: Package,
  },
  {
    id: "custom-trip",
    label: "Customized Trip",
    description: "Roadtrip keliling Turki",
    icon: Route,
  },
];

function getItemsByCategory(catId: string): EstimableItem[] {
  switch (catId) {
    case "best-seller":
      return [
        ...services.filter((s) => s.bestSeller),
        ...tourPackages.filter((p) => p.bestSeller),
        ...bundles.filter((b) => b.bestSeller),
      ];
    case "transport-vip":
      return services.filter((s) => s.category === "transport");
    case "paket-tour":
      return tourPackages;
    case "bundle":
      return bundles;
    default:
      return [];
  }
}

const steps = ["Kategori", "Layanan", "Konfigurasi", "Add-on"];

export function Estimator() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<EstimableItem | null>(null);
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [pax, setPax] = useState(4);
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const router = useRouter();
  const { kurs } = useKurs();

  const items = useMemo(
    () => (category ? getItemsByCategory(category) : []),
    [category]
  );

  const basePriceUSD = selectedItem ? selectedItem.priceUSD * duration * quantity : 0;
  const addonsUSD = selectedAddons.reduce((sum, id) => {
    const a = addons.find((x) => x.id === id);
    return sum + (a?.priceUSD || 0);
  }, 0);
  const totalUSD = basePriceUSD + addonsUSD;
  const totalIDR = Math.round(totalUSD * kurs.USD_IDR);
  const totalEUR = Math.round(totalUSD * kurs.USD_EUR * 100) / 100;

  const handleCategorySelect = (catId: string) => {
    if (catId === "custom-trip") {
      router.push("/custom-trip");
      return;
    }
    setCategory(catId);
    setSelectedItem(null);
    setStep(1);
  };

  const handleItemSelect = (item: EstimableItem) => {
    setSelectedItem(item);
    setStep(2);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canGoNext = () => {
    if (step === 0) return !!category;
    if (step === 1) return !!selectedItem;
    return true;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const selectedAddonNames = selectedAddons.map((id) => {
    const a = addons.find((x) => x.id === id);
    return a?.name || "";
  });

  const whatsappUrl = selectedItem
    ? estimateWhatsAppUrl({
        serviceName: selectedItem.name,
        date: date || undefined,
        pax,
        duration: duration > 1 ? `${duration} hari` : selectedItem.duration,
        pickupLocation: pickup || undefined,
        totalUSD,
        totalIDR,
        addons: selectedAddonNames.length > 0 ? selectedAddonNames : undefined,
      })
    : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex items-center gap-2 text-xs font-medium transition-colors",
                  i === step
                    ? "text-terracotta"
                    : i < step
                    ? "text-charcoal cursor-pointer hover:text-terracotta"
                    : "text-warm-grey/50"
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs border",
                    i === step
                      ? "bg-terracotta text-white border-terracotta"
                      : i < step
                      ? "bg-charcoal text-ivory border-charcoal"
                      : "border-border-warm text-warm-grey"
                  )}
                >
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2",
                    i < step ? "bg-charcoal" : "bg-border-warm"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Category */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
              Pilih kategori layanan
            </h2>
            <p className="text-sm text-warm-grey mb-6">
              Apa yang Anda butuhkan untuk perjalanan Turki Anda?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryConfig.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-200 active:scale-[0.98]",
                    "border-border-warm hover:border-terracotta hover:bg-terracotta/5",
                    category === cat.id && "border-terracotta bg-terracotta/5"
                  )}
                >
                  <cat.icon className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal text-sm">{cat.label}</p>
                    <p className="text-xs text-warm-grey mt-0.5">{cat.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Service */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
              Pilih layanan
            </h2>
            <p className="text-sm text-warm-grey mb-6">
              Pilih layanan spesifik yang Anda inginkan.
            </p>
            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemSelect(item)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 p-4 rounded-lg border text-left transition-all duration-200 active:scale-[0.98]",
                    "border-border-warm hover:border-terracotta hover:bg-terracotta/5",
                    selectedItem?.id === item.id &&
                      "border-terracotta bg-terracotta/5"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-charcoal text-sm">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-warm-grey">
                      {item.duration && <span>{item.duration}</span>}
                      {item.capacity && <span>· {item.capacity}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-charcoal text-sm">
                      {formatPriceIDR(item.priceIDR)}
                    </p>
                    <p className="text-xs text-warm-grey">
                      {formatPriceUSD(item.priceUSD)} / {item.unit}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && selectedItem && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
              Sesuaikan perjalanan
            </h2>
            <p className="text-sm text-warm-grey mb-6">
              Atur durasi, jumlah peserta, dan detail perjalanan Anda.
            </p>

            <div className="space-y-5">
              {/* Duration */}
              <NumberStepper
                label="Durasi (hari)"
                id="estimator-duration"
                value={duration}
                min={1}
                max={14}
                onChange={setDuration}
                trailing="hari"
              />

              {/* Quantity */}
              <NumberStepper
                label="Jumlah unit / armada"
                id="estimator-quantity"
                value={quantity}
                min={1}
                max={10}
                onChange={setQuantity}
                trailing="unit"
              />

              {/* Pax */}
              <NumberStepper
                label="Jumlah peserta (pax)"
                id="estimator-pax"
                value={pax}
                min={1}
                max={50}
                onChange={setPax}
                trailing="orang"
              />

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Tanggal mulai
                </label>
                <div className="relative max-w-xs">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Pickup location */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Lokasi penjemputan / hotel (opsional)
                </label>
                <div className="relative max-w-md">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey pointer-events-none" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Contoh: Hotel Sultanahmet, Istanbul"
                    className="w-full pl-10 pr-3 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Add-ons */}
        {step === 3 && selectedItem && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
              Layanan tambahan
            </h2>
            <p className="text-sm text-warm-grey mb-6">
              Pilih layanan tambahan opsional untuk melengkapi perjalanan Anda.
            </p>
            <div className="space-y-3">
              {addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={cn(
                    "w-full flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-200 active:scale-[0.98]",
                    isSelected
                      ? "border-terracotta bg-terracotta/5"
                      : "border-border-warm hover:border-terracotta/40"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center",
                        isSelected
                          ? "bg-terracotta border-terracotta"
                          : "border-border-warm"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal text-sm">
                        {addon.name}
                      </p>
                      <p className="text-xs text-warm-grey mt-0.5">
                        {addon.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-charcoal text-sm">
                        {formatPriceIDR(addon.priceIDR)}
                      </p>
                      <p className="text-xs text-warm-grey">
                        {formatPriceUSD(addon.priceUSD)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedAddons.length === 0 && (
              <p className="mt-4 text-sm text-warm-grey italic">
                Belum ada layanan tambahan dipilih. Anda dapat melanjutkan tanpa
                add-on.
              </p>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        {step > 0 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-warm">
            <button
              onClick={handleBack}
              className="text-sm text-warm-grey hover:text-charcoal transition-colors"
            >
              Kembali
            </button>
            {step < 3 ? (
              <Button
                onClick={handleNext}
                variant="primary"
                size="md"
                disabled={!canGoNext()}
              >
                Lanjut
              </Button>
            ) : (
              <WhatsAppButton
                url={whatsappUrl}
                label="Kirim Request ke WhatsApp"
                variant="secondary"
                size="md"
              />
            )}
          </div>
        )}
      </div>

      {/* Summary sidebar */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 bg-surface border border-border-warm rounded-lg p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
            Ringkasan Estimasi
          </h3>

          {!selectedItem ? (
            <p className="text-sm text-warm-grey">
              Pilih kategori dan layanan untuk melihat estimasi biaya.
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Layanan
                </p>
                <p className="text-sm font-medium text-charcoal">
                  {selectedItem.name}
                </p>
              </div>

              {step >= 2 && (
                <div className="flex justify-between text-sm">
                  <span className="text-warm-grey">Durasi</span>
                  <span className="text-charcoal font-medium">{duration} hari</span>
                </div>
              )}

              {step >= 2 && (
                <div className="flex justify-between text-sm">
                  <span className="text-warm-grey">Jumlah unit</span>
                  <span className="text-charcoal font-medium">{quantity} unit</span>
                </div>
              )}

              {step >= 2 && (
                <div className="flex justify-between text-sm">
                  <span className="text-warm-grey">Peserta</span>
                  <span className="text-charcoal font-medium">{pax} orang</span>
                </div>
              )}

              {step >= 2 && date && (
                <div className="flex justify-between text-sm">
                  <span className="text-warm-grey">Tanggal</span>
                  <span className="text-charcoal font-medium">{date}</span>
                </div>
              )}

              {step >= 3 && selectedAddons.length > 0 && (
                <div>
                  <p className="text-xs text-warm-grey uppercase tracking-wide mb-2">
                    Layanan tambahan
                  </p>
                  <ul className="space-y-1">
                    {selectedAddons.map((id) => {
                      const a = addons.find((x) => x.id === id);
                      return (
                        <li
                          key={id}
                          className="text-xs text-charcoal flex justify-between"
                        >
                          <span className="flex-1 truncate mr-2">
                            {a?.name}
                          </span>
                          <span className="text-warm-grey flex-shrink-0">
                            {formatPriceUSD(a?.priceUSD || 0)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-border-warm space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-grey">Subtotal layanan</span>
                  <span className="text-charcoal font-medium">
                    {formatPriceUSD(basePriceUSD)}
                  </span>
                </div>
                {addonsUSD > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-grey">Add-on</span>
                    <span className="text-charcoal font-medium">
                      {formatPriceUSD(addonsUSD)}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border-warm">
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Total Estimasi
                </p>
                <p className="text-2xl font-semibold text-charcoal">
                  {formatPriceIDR(totalIDR)}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-medium text-gold">
                    {formatPriceUSD(totalUSD)}
                  </span>
                  <span className="text-sm text-warm-grey">
                    · {formatEUR(totalEUR)}
                  </span>
                </div>
                <p className="mt-3 text-xs text-warm-grey italic">
                  {formatKursLabel(kurs)}
                </p>
                <p className="mt-1 text-xs text-warm-grey italic">
                  Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
                </p>
              </div>

              {step === 3 && (
                <WhatsAppButton
                  url={whatsappUrl}
                  label="Kirim Request ke WhatsApp"
                  variant="secondary"
                  size="md"
                  className="w-full"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
