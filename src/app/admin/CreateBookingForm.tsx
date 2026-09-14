"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { createBookingAction, type CreateState } from "./actions";

export function CreateBookingForm() {
  const [state, formAction, pending] = useActionState<CreateState, FormData>(
    createBookingAction,
    {}
  );

  return (
    <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label htmlFor="serviceName" className="block text-sm font-medium text-charcoal mb-1.5">
          Nama Layanan *
        </label>
        <input
          id="serviceName"
          name="serviceName"
          required
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
          placeholder="mis. Istanbul Classical & Bosphorus Panoramic Tour"
        />
      </div>

      <div>
        <label htmlFor="serviceRef" className="block text-sm font-medium text-charcoal mb-1.5">
          Referensi Halaman (opsional)
        </label>
        <input
          id="serviceRef"
          name="serviceRef"
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
          placeholder="tour-packages/istanbul-classical"
        />
      </div>

      <div>
        <label htmlFor="travelDate" className="block text-sm font-medium text-charcoal mb-1.5">
          Tanggal Keberangkatan *
        </label>
        <input
          id="travelDate"
          name="travelDate"
          type="date"
          required
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
        />
      </div>

      <div>
        <label htmlFor="adults" className="block text-sm font-medium text-charcoal mb-1.5">
          Dewasa *
        </label>
        <input
          id="adults"
          name="adults"
          type="number"
          min={1}
          max={50}
          defaultValue={1}
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
        />
      </div>

      <div>
        <label htmlFor="children" className="block text-sm font-medium text-charcoal mb-1.5">
          Anak
        </label>
        <input
          id="children"
          name="children"
          type="number"
          min={0}
          max={50}
          defaultValue={0}
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
        />
      </div>

      <div>
        <label htmlFor="totalIDR" className="block text-sm font-medium text-charcoal mb-1.5">
          Total Harga (IDR) *
        </label>
        <input
          id="totalIDR"
          name="totalIDR"
          type="number"
          min={1}
          required
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
          placeholder="4250000"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
          Nama Customer *
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
        />
      </div>

      <div>
        <label htmlFor="wa" className="block text-sm font-medium text-charcoal mb-1.5">
          WhatsApp Customer *
        </label>
        <input
          id="wa"
          name="wa"
          required
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
          placeholder="08xxxxxxxxxx"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
          Email (opsional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="notes" className="block text-sm font-medium text-charcoal mb-1.5">
          Catatan (opsional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full px-4 py-3 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta resize-none"
          placeholder="Contoh: request guide bahasa Indonesia, high 1 anak, dsb."
        />
      </div>

      {state.error && (
        <p className="md:col-span-2 flex items-start gap-2 text-sm text-terracotta">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {state.error}
        </p>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-charcoal text-ivory font-semibold text-sm rounded-lg px-6 py-3 transition-all duration-300 hover:bg-charcoal-light active:scale-[0.97] disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Buat Booking"}
        </button>
      </div>
    </form>
  );
}
