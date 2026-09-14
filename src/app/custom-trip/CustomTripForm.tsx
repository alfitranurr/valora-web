"use client";

import { useState, useMemo } from "react";
import { Check, ChevronLeft, ChevronRight, MapPin, Route } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import { NumberStepper } from "@/components/shared/NumberStepper";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { vehicles, customTripDestinations, customTripPopularRoute } from "@/data/vehicles";
import { formatPriceIDR, formatPriceUSD } from "@/lib/currency";
import { customTripWhatsAppUrl } from "@/lib/whatsapp";
import { useKurs, formatKursLabel } from "@/hooks/useKurs";

const steps = ["Kontak", "Perjalanan", "Peserta", "Destinasi", "Permintaan"];

interface FormData {
  name: string;
  whatsapp: string;
  email: string;
  vehicleId: string;
  duration: number;
  date: string;
  adults: number;
  children: number;
  destinations: string[];
  specialRequest: string;
}

const initialData: FormData = {
  name: "",
  whatsapp: "",
  email: "",
  vehicleId: vehicles[0].id,
  duration: 7,
  date: "",
  adults: 4,
  children: 0,
  destinations: [],
  specialRequest: "",
};

export function CustomTripForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { kurs } = useKurs();

  const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId) || vehicles[0];
  const estimateUSD = selectedVehicle.priceUSD * data.duration;
  const estimateIDR = Math.round(estimateUSD * kurs.USD_IDR);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!data.name.trim()) newErrors.name = "Masukkan nama lengkap Anda.";
      if (!data.whatsapp.trim()) newErrors.whatsapp = "Masukkan nomor WhatsApp aktif.";
      else if (!/^[0-9+\s-]{8,}$/.test(data.whatsapp))
        newErrors.whatsapp = "Format nomor WhatsApp tidak valid.";
    }

    if (step === 1) {
      if (!data.date) newErrors.date = "Pilih tanggal keberangkatan.";
    }

    if (step === 3) {
      if (data.destinations.length === 0)
        newErrors.destinations = "Pilih minimal satu destinasi untuk melanjutkan.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleDestination = (dest: string) => {
    setData((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(dest)
        ? prev.destinations.filter((d) => d !== dest)
        : [...prev.destinations, dest],
    }));
  };

  const update = (field: keyof FormData, value: string | number | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const whatsappUrl = useMemo(() => {
    return customTripWhatsAppUrl({
      name: data.name,
      whatsapp: data.whatsapp,
      email: data.email || undefined,
      vehicle: selectedVehicle.name,
      duration: data.duration,
      date: data.date,
      adults: data.adults,
      children: data.children,
      destinations: data.destinations,
      specialRequest: data.specialRequest || undefined,
      estimateUSD,
      estimateIDR,
    });
  }, [data, selectedVehicle, estimateUSD, estimateIDR]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs border font-medium",
                    i === step
                      ? "bg-terracotta text-white border-terracotta"
                      : i < step
                      ? "bg-charcoal text-ivory border-charcoal"
                      : "border-border-warm text-warm-grey"
                  )}
                >
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:inline",
                    i === step ? "text-terracotta" : i < step ? "text-charcoal" : "text-warm-grey"
                  )}
                >
                  {s}
                </span>
              </div>
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

        {/* Step 0: Contact */}
        {step === 0 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
                Data Kontak
              </h2>
              <p className="text-sm text-warm-grey mb-6">
                Kami menghubungi Anda via WhatsApp untuk konfirmasi.
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                Nama Lengkap <span className="text-terracotta">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                className={cn(
                  "w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-terracotta",
                  errors.name ? "border-terracotta" : "border-border-warm"
                )}
                placeholder="Nama lengkap Anda"
              />
              {errors.name && <p className="mt-1.5 text-xs text-terracotta">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-charcoal mb-2">
                Nomor WhatsApp <span className="text-terracotta">*</span>
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={data.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                className={cn(
                  "w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-terracotta",
                  errors.whatsapp ? "border-terracotta" : "border-border-warm"
                )}
                placeholder="Contoh: 08123456789"
              />
              {errors.whatsapp && (
                <p className="mt-1.5 text-xs text-terracotta">{errors.whatsapp}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Alamat Email (opsional)
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
                placeholder="email@example.com"
              />
            </div>
          </div>
        )}

        {/* Step 1: Trip */}
        {step === 1 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
                Pilihan Armada & Waktu
              </h2>
              <p className="text-sm text-warm-grey mb-6">
                Pilih kendaraan dan rencana waktu perjalanan Anda.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                Pilihan Kendaraan VIP
              </label>
              <div className="space-y-3">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => update("vehicleId", v.id)}
                    className={cn(
                    "w-full flex items-center justify-between gap-4 p-4 rounded-lg border text-left transition-all duration-200 active:scale-[0.98]",
                    data.vehicleId === v.id
                      ? "border-terracotta bg-terracotta/5"
                      : "border-border-warm hover:border-terracotta/40"
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal text-sm">{v.name}</p>
                      <p className="text-xs text-warm-grey mt-0.5">
                        {v.capacity} · {v.highlights[0]}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-charcoal text-sm">
                        {formatPriceIDR(v.priceIDR)}
                      </p>
                      <p className="text-xs text-warm-grey">
                        {formatPriceUSD(v.priceUSD)} / {v.unit}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <NumberStepper
              label="Perkiraan Durasi (hari)"
              id="custom-duration"
              value={data.duration}
              min={3}
              max={14}
              fallback={7}
              onChange={(v) => update("duration", v)}
              trailing="hari (3–14 hari)"
            />

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-2">
                Rencana Tanggal Berangkat <span className="text-terracotta">*</span>
              </label>
              <input
                id="date"
                type="date"
                value={data.date}
                onChange={(e) => update("date", e.target.value)}
                className={cn(
                  "w-full max-w-xs px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-terracotta",
                  errors.date ? "border-terracotta" : "border-border-warm"
                )}
              />
              {errors.date && <p className="mt-1.5 text-xs text-terracotta">{errors.date}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Travelers */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
                Jumlah Peserta
              </h2>
              <p className="text-sm text-warm-grey mb-6">
                Berapa orang yang akan ikut perjalanan ini?
              </p>
            </div>

            <NumberStepper
              label="Jumlah Dewasa (Adults)"
              id="custom-adults"
              value={data.adults}
              min={1}
              max={50}
              onChange={(v) => update("adults", v)}
              trailing="orang"
            />

            <NumberStepper
              label="Jumlah Anak / Balita (Children)"
              id="custom-children"
              value={data.children}
              min={0}
              max={50}
              fallback={0}
              onChange={(v) => update("children", v)}
              trailing="anak"
            />
          </div>
        )}

        {/* Step 3: Destinations */}
        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
                Pilih Destinasi
              </h2>
              <p className="text-sm text-warm-grey mb-6">
                Pilih kota dan destinasi yang ingin Anda jelajahi. Bisa lebih dari satu.
              </p>
            </div>

            {errors.destinations && (
              <p className="text-sm text-terracotta mb-4">{errors.destinations}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customTripDestinations.map((dest) => {
                const isSelected = data.destinations.includes(dest);
                return (
                  <button
                    key={dest}
                    onClick={() => toggleDestination(dest)}
                    className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border text-left transition-all duration-200 active:scale-[0.98]",
                    isSelected
                      ? "border-terracotta bg-terracotta/5"
                      : "border-border-warm hover:border-terracotta/40"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center",
                        isSelected ? "bg-terracotta border-terracotta" : "border-border-warm"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-charcoal flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-warm-grey" />
                      {dest}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-ivory-dark border border-border-warm rounded-lg">
              <p className="text-xs font-medium text-warm-grey uppercase tracking-wide mb-2">
                Rute populer
              </p>
              <p className="text-sm text-charcoal leading-relaxed">
                {customTripPopularRoute.join(" → ")}
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Special Request */}
        {step === 4 && (
          <div className="animate-fade-in space-y-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-charcoal mb-1">
                Permintaan Khusus
              </h2>
              <p className="text-sm text-warm-grey mb-6">
                Ada keinginan spesifik atau permintaan khusus? Sampaikan kepada kami.
              </p>
            </div>

            <div>
              <label htmlFor="special" className="block text-sm font-medium text-charcoal mb-2">
                Permintaan / Keinginan Spesifik (opsional)
              </label>
              <textarea
                id="special"
                value={data.specialRequest}
                onChange={(e) => update("specialRequest", e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta resize-none"
                placeholder="Contoh: Ingin foto sunrise di Cappadocia, kuliner Iskender Kebab di Bursa, menginap di cave hotel, dll."
              />
            </div>

            <div className="p-4 bg-ivory-dark border border-border-warm rounded-lg">
              <h3 className="font-medium text-charcoal text-sm mb-2">
                Estimasi Dasar Armada
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-warm-grey">Armada</span>
                  <span className="text-charcoal font-medium">{selectedVehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-grey">Durasi</span>
                  <span className="text-charcoal font-medium">{data.duration} hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-grey">Destinasi</span>
                  <span className="text-charcoal font-medium">
                    {data.destinations.length} kota
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border-warm flex justify-between items-baseline">
                <span className="text-sm text-warm-grey">Estimasi dasar</span>
                <div>
                  <span className="font-semibold text-charcoal">
                    {formatPriceIDR(estimateIDR)}
                  </span>
                  <span className="text-sm text-warm-grey ml-2">
                    {formatPriceUSD(estimateUSD)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-warm-grey italic">
                Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
              </p>
            </div>

            <WhatsAppButton
              url={whatsappUrl}
              label="Kirim Request ke WhatsApp"
              variant="secondary"
              size="md"
              className="w-full"
            />
          </div>
        )}

        {/* Navigation */}
        {step < steps.length - 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-warm">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm text-warm-grey hover:text-charcoal transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Kembali
              </button>
            ) : (
              <span />
            )}
            <Button onClick={handleNext} variant="primary" size="md">
              Lanjut
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {step === steps.length - 1 && (
          <div className="mt-8 pt-6 border-t border-border-warm">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-warm-grey hover:text-charcoal transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Kembali
            </button>
          </div>
        )}
      </div>

      {/* Summary sidebar */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24 bg-surface border border-border-warm rounded-lg p-6">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">
            Ringkasan Custom Trip
          </h3>

          {step === 0 && !data.name && !data.whatsapp ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-ivory-dark flex items-center justify-center">
                <Route className="w-6 h-6 text-warm-grey" />
              </div>
              <p className="text-sm text-warm-grey leading-relaxed">
                Isi form di sebelah kiri untuk melihat ringkasan perjalanan Anda.
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              {data.name && (
                <div className="flex justify-between">
                  <span className="text-warm-grey">Nama</span>
                  <span className="text-charcoal font-medium">{data.name}</span>
                </div>
              )}
              {data.whatsapp && (
                <div className="flex justify-between">
                  <span className="text-warm-grey">WhatsApp</span>
                  <span className="text-charcoal font-medium">{data.whatsapp}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-warm-grey">Armada</span>
                <span className="text-charcoal font-medium">{selectedVehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-grey">Durasi</span>
                <span className="text-charcoal font-medium">{data.duration} hari</span>
              </div>
              {data.date ? (
                <div className="flex justify-between">
                  <span className="text-warm-grey">Tanggal</span>
                  <span className="text-charcoal font-medium">{data.date}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-warm-grey">Tanggal</span>
                  <span className="text-warm-grey/50">—</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-warm-grey">Dewasa</span>
                <span className="text-charcoal font-medium">{data.adults} orang</span>
              </div>
              {data.children > 0 && (
                <div className="flex justify-between">
                  <span className="text-warm-grey">Anak</span>
                  <span className="text-charcoal font-medium">{data.children} anak</span>
                </div>
              )}
              {data.destinations.length > 0 ? (
                <div>
                  <p className="text-warm-grey mb-1">Destinasi</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.destinations.map((d) => (
                      <span
                        key={d}
                        className="text-xs bg-ivory-dark border border-border-warm px-2 py-1 rounded text-charcoal"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-warm-grey">Destinasi</span>
                  <span className="text-warm-grey/50">—</span>
                </div>
              )}
            </div>
          )}

          {step > 0 && (
            <>
              <div className="mt-4 pt-4 border-t border-border-warm">
                <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
                  Estimasi Dasar
                </p>
                <p className="text-2xl font-semibold text-charcoal">
                  {formatPriceIDR(estimateIDR)}
                </p>
                <p className="text-sm text-warm-grey">{formatPriceUSD(estimateUSD)}</p>
                <p className="mt-2 text-xs text-warm-grey italic">
                  {formatKursLabel(kurs)}
                </p>
                <p className="mt-1 text-xs text-warm-grey italic">
                  Estimasi awal — harga final dikonfirmasi oleh Admin Valora.
                </p>
              </div>

              <div className="mt-4 p-3 bg-ivory-dark border border-border-warm rounded-lg">
                <p className="text-xs text-warm-grey">
                  <strong className="text-charcoal">Armada Eksklusif:</strong> Tidak
                  digabung rombongan asing. Rute 100% mengikuti ritme Anda.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
