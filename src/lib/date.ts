/**
 * Formats a date object or string into a localized date string.
 *
 * @param date - The date to format (Date object, timestamp number, or date string).
 * @param locale - The locale string (e.g., 'en-US', 'nb-NO').
 * @param options - Optional Intl.DateTimeFormatOptions to customize the output.
 * @returns A localized date string.
 */
export function formatDate(
  date: Date | number | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateToFormat = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

    // Define the base default options
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // Combine defaults with user options, letting user options override
    const formattingOptions: Intl.DateTimeFormatOptions = {
      ...defaultOptions,
      ...options,
    };

    // If user options explicitly set a property to undefined, remove it if it existed in defaults
    if (options?.day === undefined && defaultOptions.day) {
       delete formattingOptions.day;
    }
    if (options?.month === undefined && defaultOptions.month) {
       delete formattingOptions.month;
    }
    if (options?.year === undefined && defaultOptions.year) {
       delete formattingOptions.year;
    }

    return new Intl.DateTimeFormat(locale, formattingOptions).format(dateToFormat);
  } catch (error) {
    console.error("Error formatting date:", error);
    // Fallback to a simple string representation in case of errors
    return new Date(date).toLocaleDateString();
  }
}

/**
 * Formats a date object or string into a localized time string.
 *
 * @param date - The date to format (Date object, timestamp number, or date string).
 * @param locale - The locale string (e.g., 'en-US', 'nb-NO').
 * @param options - Optional Intl.DateTimeFormatOptions to customize the output.
 * @returns A localized time string.
 */
export function formatTime(
  date: Date | number | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateToFormat = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      ...options,
    };

    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateToFormat);
  } catch (error) {
    console.error("Error formatting time:", error);
    return new Date(date).toLocaleTimeString();
  }
}

/**
 * Formats a date object or string into a localized date and time string.
 *
 * @param date - The date to format (Date object, timestamp number, or date string).
 * @param locale - The locale string (e.g., 'en-US', 'nb-NO').
 * @param options - Optional Intl.DateTimeFormatOptions to customize the output.
 * @returns A localized date and time string.
 */
export function formatDateTime(
  date: Date | number | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
   try {
    const dateToFormat = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      ...options,
    };

    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateToFormat);
  } catch (error) {
    console.error("Error formatting date/time:", error);
    return new Date(date).toLocaleString();
  }
}
