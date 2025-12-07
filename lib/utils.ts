import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
});

export function formatCurrency(amount: number | string | null | undefined) {
  if (typeof amount === null || typeof amount === undefined) {
    return 'NaN';
  }

  const num = typeof amount === 'number' ? amount : Number(amount);

  if (isNaN(num)) {
    return 'NaN'; // or return amount; or return "$0.00"
  }
  return CURRENCY_FORMATTER.format(num);
}
