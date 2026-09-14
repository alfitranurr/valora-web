"use client";

import { useActionState } from "react";
import { AlertCircle, Plus } from "lucide-react";
import { recordManualPaymentAction } from "../actions";

export function ManualPaymentForm({ bookingId }: { bookingId: string }) {
  const [state, formAction, pending] = useActionState(
    recordManualPaymentAction,
    {}
  );

  return (
    <form action={formAction} className="mt-4 pt-4 border-t border-border-warm">
      <p className="text-sm font-medium text-charcoal mb-3">
        <Plus className="w-4 h-4 text-terracotta inline mr-1 -mt-0.5" />
        Catat pembayaran manual (transfer terverifikasi di rekening)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label
            htmlFor="type"
            className="block text-xs font-medium text-charcoal mb-1.5"
          >
            Jenis
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-3 py-2 border border-border-warm rounded-lg text-sm bg-white focus:outline-none focus:border-terracotta"
            defaultValue="deposit"
          >
            <option value="deposit">DP / Deposit</option>
            <option value="final">Sisa / Final</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="amountIDR"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Nominal (IDR)
          </label>
          <input
            id="amountIDR"
            name="amountIDR"
            type="number"
            min={1}
            required
            placeholder="4250000"
            className="w-full px-3 py-2 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
          />
        </div>
        <div>
          <label
            htmlFor="adminNote"
            className="block text-sm font-medium text-charcoal mb-1.5"
          >
            Catatan (opsional)
          </label>
          <input
            id="adminNote"
            name="adminNote"
            placeholder="mis. transfer BCA 14 Sep"
            className="w-full px-3 py-2 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
          />
        </div>
      </div>
      <input type="hidden" name="bookingId" value={bookingId} />
      {state.error && (
        <p className="mt-2 flex items-start gap-2 text-sm text-terracotta">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-3 bg-terracotta text-white font-semibold text-xs rounded-lg px-4 py-2 transition-all duration-300 hover:bg-terracotta-dark active:scale-[0.97] disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Pembayaran"}
      </button>
    </form>
  );
}
