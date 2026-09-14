"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  );

  return (
    <div className="max-w-sm mx-auto mt-16">
      <div className="bg-surface border border-border-warm rounded-lg p-8">
        <div className="w-12 h-12 rounded-full bg-ivory-dark border border-border-warm flex items-center justify-center mx-auto mb-4">
          <Lock className="w-5 h-5 text-terracotta" />
        </div>
        <h1 className="font-serif text-xl font-semibold text-charcoal text-center mb-1">
          Admin Valora
        </h1>
        <p className="text-sm text-warm-grey text-center mb-6">
          Masukkan password admin untuk melanjutkan.
        </p>
        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              className="w-full px-4 py-2.5 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-terracotta"
              placeholder="••••••••"
            />
          </div>
          {state.error && (
            <p className="text-sm text-terracotta">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-charcoal text-ivory font-semibold text-sm rounded-lg px-6 py-3 transition-all duration-300 hover:bg-charcoal-light active:scale-[0.97] disabled:opacity-50"
          >
            {pending ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
