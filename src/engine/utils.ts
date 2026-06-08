export function formatNumber(
  value: number,
  options?: { precision?: number; locale?: string; compact?: boolean }
): string {
  const { precision, locale = 'en-US', compact = false } = options ?? {};

  if (!isFinite(value)) return '—';

  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }

  if (precision !== undefined) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    }).format(value);
  }

  // Auto-precision
  if (Number.isInteger(value) || Math.abs(value) >= 100) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  }
  if (Math.abs(value) >= 1) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 4 }).format(value);
  }
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 6 }).format(value);
}

export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function parseInputValue(value: string): number {
  const cleaned = value.replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
