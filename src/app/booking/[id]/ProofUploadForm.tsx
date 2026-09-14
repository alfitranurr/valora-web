"use client";

import { useState } from "react";
import { Upload, CheckCircle2, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/Button";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { SITE_CONFIG } from "@/data/config";

interface ProofUploadFormProps {
  bookingId: string;
  payableType: "deposit" | "final";
  nominalIDR: number;
  waUrl: string;
}

const MAX_SIZE = 2 * 1024 * 1024;

export function ProofUploadForm({
  bookingId,
  payableType,
  nominalIDR,
  waUrl,
}: ProofUploadFormProps) {
  const [method, setMethod] = useState<"transfer" | "qris">("transfer");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const handleFile = (selected: File | null) => {
    setError("");
    if (!selected) {
      setFile(null);
      setFileName("");
      setPreview(null);
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      setError("Format file harus JPG, PNG, atau WebP.");
      return;
    }
    if (selected.size > MAX_SIZE) {
      setError("Ukuran file maksimal 2 MB.");
      return;
    }
    setFile(selected);
    setFileName(selected.name);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Pilih file bukti pembayaran terlebih dahulu.");
      return;
    }
    setStatus("uploading");
    setError("");

    const formData = new FormData();
    formData.set("type", payableType);
    formData.set("method", method);
    formData.set("amountIdr", String(nominalIDR));
    formData.set("file", file);

    try {
      const res = await fetch(`/api/booking/${bookingId}/proof`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Gagal mengunggah. Coba lagi.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Jaringan bermasalah. Coba lagi.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="bg-terracotta/5 border border-terracotta/20 rounded-lg p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-terracotta mx-auto mb-3" />
        <h3 className="font-medium text-charcoal mb-2">
          Bukti pembayaran terkirim
        </h3>
        <p className="text-sm text-warm-grey mb-5">
          Admin Valora akan memverifikasi maksimal 1×24 jam. Klik tombol di
          bawah untuk melaporkan pembayaran Anda via WhatsApp.
        </p>
        <Button href={waUrl} variant="secondary" size="md" className="w-full">
          <MessageCircle className="w-4 h-4" />
          Lapor via WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">
          Metode pembayaran
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["transfer", "qris"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                method === m
                  ? "border-terracotta bg-terracotta/5 text-charcoal"
                  : "border-border-warm text-warm-grey hover:border-terracotta/40"
              )}
            >
              {m === "transfer" ? "Transfer Bank" : "QRIS"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-ivory-dark border border-border-warm rounded-lg">
        <p className="text-xs text-warm-grey uppercase tracking-wide mb-1">
          Nominal {payableType === "deposit" ? "DP" : "sisa pembayaran"}
        </p>
        <p className="text-xl font-semibold text-charcoal">
          Rp {nominalIDR.toLocaleString("id-ID")}
        </p>
        <p className="mt-1 text-xs text-warm-grey italic">
          Transfer <strong>sama persis</strong> dengan nominal ini agar mudah
          diverifikasi.
        </p>
      </div>

      <div>
        <label
          htmlFor="proof-file"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Bukti pembayaran (JPG/PNG/WebP, maks 2 MB)
        </label>
        {preview ? (
          <button
            type="button"
            onClick={() =>
              handleFile(null)
            }
            className="w-full group"
            aria-label="Ganti file bukti"
          >
            <span className="block relative rounded-lg overflow-hidden border border-border-warm">
              <ImageWithFallback
                src={preview}
                alt="Preview bukti pembayaran"
                className="w-full aspect-[4/3]"
                imgClassName="object-contain"
              />
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-warm-grey">
              <Upload className="w-3.5 h-3.5" />
              {fileName} — klik untuk ganti file
            </span>
          </button>
        ) : (
          <label
            htmlFor="proof-file"
            className="flex flex-col items-center justify-center gap-2 p-8 border border-dashed border-border-warm rounded-lg text-center cursor-pointer hover:border-terracotta/50 hover:bg-terracotta/5 transition-all duration-200"
          >
            <Upload className="w-6 h-6 text-warm-grey" />
            <span className="text-sm text-charcoal font-medium">
              Klik untuk pilih file bukti
            </span>
            <span className="text-xs text-warm-grey">
              Screenshot m-banking / struk ATM / bukti QRIS
            </span>
          </label>
        )}
        <input
          id="proof-file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) =>
            handleFile(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>

      {error && (
        <p className="flex items-start gap-2 text-sm text-terracotta">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={status === "uploading"}
      >
        {status === "uploading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Mengunggah...
          </>
        ) : (
          "Unggah Bukti Pembayaran"
        )}
      </Button>

      <p className="text-xs text-warm-grey italic">
        Halaman ini ({bookingId}) hanya untuk unggah bukti — semua pertanyaan
        tetap via WhatsApp {SITE_CONFIG.whatsappDisplay}.
      </p>
    </form>
  );
}
