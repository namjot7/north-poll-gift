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

export function formatCurrency(amount: number | string | null) {
  // if (typeof amount === 'number') {
  //   return CURRENCY_FORMATTER.format(amount);
  // }
  // else if (typeof amount === 'string') {
  //   return CURRENCY_FORMATTER.format(Number(amount));
  // }
  // else {
  //   return 'NaN';
  // }
  if (amount === null || amount === undefined) {
    return 'NaN';
  }

  const num = typeof amount === 'number' ? amount : Number(amount);

  if (isNaN(num)) {
    return 'NaN'; // or return amount; or return "$0.00"
  }

  return CURRENCY_FORMATTER.format(num);
}
