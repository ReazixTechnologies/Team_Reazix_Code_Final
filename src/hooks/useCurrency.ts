import { createContext, createElement, useContext, useMemo, useState, type ReactNode } from "react";

export type Currency = "INR" | "USD";

const STORAGE_KEY = "reazix:currency";

function readStoredCurrency(): Currency {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "USD" ? "USD" : "INR";
  } catch {
    return "INR";
  }
}

function writeStoredCurrency(currency: Currency) {
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // Storage blocked (private mode, disabled cookies) — currency just won't persist.
  }
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  /** Formats the amount matching the active currency (pass both figures; the inactive one is ignored). */
  formatAmount: (amountINR: number, amountUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

/** Owns the INR/USD preference (persisted to localStorage) for everything under it. */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(readStoredCurrency);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency: (next) => {
        setCurrencyState(next);
        writeStoredCurrency(next);
      },
      formatAmount: (amountINR, amountUSD) =>
        currency === "INR" ? inrFormatter.format(amountINR) : usdFormatter.format(amountUSD),
    }),
    [currency],
  );

  return createElement(CurrencyContext.Provider, { value }, children);
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a <CurrencyProvider>");
  }
  return context;
}
