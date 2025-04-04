/**
 * Options for pluralization strings. Matches Intl.LDMLPluralRule types.
 */
interface PluralOptions {
  zero?: string;
  one: string; // 'one' is typically required as a minimum
  two?: string;
  few?: string;
  many?: string;
  other: string; // 'other' is always required as a fallback
}

/**
 * Selects the correct plural string based on a number and locale.
 *
 * @param count - The number to determine the plural form for.
 * @param locale - The locale string (e.g., 'en-US', 'nb-NO').
 * @param options - An object containing strings for different plural categories.
 *                  Requires at least 'one' and 'other'.
 * @returns The appropriate plural string based on the count and locale rules.
 */
export function formatPlural(
  count: number,
  locale: string,
  options: PluralOptions
): string {
  try {
    const rules = new Intl.PluralRules(locale);
    const category = rules.select(count);

    // Return the specific string if available, otherwise fallback to 'other'
    return options[category] ?? options.other;

  } catch (error) {
    console.error("Error formatting plural:", error);
    // Basic fallback in case of error
    return count === 1 ? options.one : options.other;
  }
}

/**
 * Formats a number as a currency string based on locale.
 *
 * @param amount - The numeric amount to format.
 * @param locale - The locale string (e.g., 'en-US', 'nb-NO').
 * @param currencyCode - The ISO 4217 currency code (e.g., 'USD', 'NOK').
 * @param options - Optional Intl.NumberFormatOptions to customize the output.
 * @returns A localized currency string.
 */
export function formatCurrency(
  amount: number,
  locale: string,
  currencyCode: string,
  options?: Intl.NumberFormatOptions
): string {
  try {
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2, // Default to 2 decimal places for most currencies
      ...options, // User options override defaults
    };

    return new Intl.NumberFormat(locale, defaultOptions).format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    // Basic fallback
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}


import { LocalizedContent, Language } from '@/types/localization';

/**
 * Gets localized content as a string, with fallback to English.
 * Safe for use in server components.
 */
export function getStaticLocalizedContent(content: LocalizedContent, locale: Language = 'en'): string {
  return locale === 'no' ? content.no || content.en : content.en;
}

// Example Usage:
// const itemsString = formatPlural(numberOfItems, locale, {
//   one: '1 item',
//   other: `${numberOfItems} items`,
//   zero: 'No items' // Optional
// });
//
// const articlesString = formatPlural(articleCount, locale, {
//   one: '1 artikkel',
//   other: `${articleCount} artikler`
// });
