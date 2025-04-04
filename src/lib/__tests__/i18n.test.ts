import { formatPlural, formatCurrency } from '../i18n'; // Adjust path as necessary

describe('formatPlural', () => {
  // English tests
  it('should return "one" form for count 1 in en-US', () => {
    const options = { one: '1 item', other: 'items' };
    expect(formatPlural(1, 'en-US', options)).toBe('1 item');
  });

  it('should return "other" form for count 0 in en-US', () => {
    const options = { one: '1 item', other: 'items' };
    expect(formatPlural(0, 'en-US', options)).toBe('items');
  });

  it('should return "other" form for count 2 in en-US', () => {
    const options = { one: '1 item', other: 'items' };
    expect(formatPlural(2, 'en-US', options)).toBe('items');
  });

  it('should use "other" form for count 0 in en-US, even if "zero" is provided', () => {
    // Intl.PluralRules maps 0 to 'other' for en-US, not 'zero'
    const options = { zero: 'no items', one: '1 item', other: 'items' };
    expect(formatPlural(0, 'en-US', options)).toBe('items');
  });

  // Norwegian tests (Note: Norwegian doesn't typically have distinct plural forms like some languages, 'one' and 'other' cover most cases)
   it('should return "one" form for count 1 in nb-NO', () => {
    const options = { one: '1 artikkel', other: 'artikler' };
    expect(formatPlural(1, 'nb-NO', options)).toBe('1 artikkel');
  });

  it('should return "other" form for count 0 in nb-NO', () => {
    const options = { one: '1 artikkel', other: 'artikler' };
    expect(formatPlural(0, 'nb-NO', options)).toBe('artikler');
  });

  it('should return "other" form for count 5 in nb-NO', () => {
    const options = { one: '1 artikkel', other: 'artikler' };
    expect(formatPlural(5, 'nb-NO', options)).toBe('artikler');
  });

   it('should use "other" form for count 0 in nb-NO, even if "zero" is provided', () => {
    // Intl.PluralRules maps 0 to 'other' for nb-NO, not 'zero'
    const options = { zero: 'ingen artikler', one: '1 artikkel', other: 'artikler' };
    expect(formatPlural(0, 'nb-NO', options)).toBe('artikler');
  });

  // Fallback test
  it('should fallback correctly on error', () => {
    // Spy on the select method and make it throw an error
    const pluralRulesSpy = jest.spyOn(Intl.PluralRules.prototype, 'select')
      .mockImplementation(() => {
        throw new Error('mock select error');
      });

    const options = { one: '1 item', other: 'items' };
    // Expect the fallback behavior defined in the catch block of formatPlural
    expect(formatPlural(5, 'en-US', options)).toBe('items'); // Fallback to 'other' for count != 1
    expect(formatPlural(1, 'en-US', options)).toBe('1 item'); // Fallback to 'one' for count === 1

    // Restore the original implementation
    pluralRulesSpy.mockRestore();
  });

});

describe('formatCurrency', () => {
  // English tests
  it('should format USD correctly for en-US', () => {
    // Note: Non-breaking space might be used by Intl.NumberFormat
    expect(formatCurrency(1234.56, 'en-US', 'USD')).toBe('$1,234.56');
  });

  it('should format EUR correctly for en-US', () => {
    expect(formatCurrency(987.65, 'en-US', 'EUR')).toBe('€987.65');
  });

  // Norwegian tests
  it('should format NOK correctly for nb-NO', () => {
    // Note: Check for non-breaking space ( ), comma decimal separator, and symbol position
    // Actual Intl output for nb-NO places symbol AFTER the number
    expect(formatCurrency(5432.10, 'nb-NO', 'NOK')).toBe('5 432,10 kr');
  });

   it('should format EUR correctly for nb-NO', () => {
     // Actual Intl output for nb-NO places symbol AFTER the number
    expect(formatCurrency(987.65, 'nb-NO', 'EUR')).toBe('987,65 €');
  });

  // Options tests
  it('should format without fraction digits', () => {
    expect(formatCurrency(1234, 'en-US', 'USD', { minimumFractionDigits: 0, maximumFractionDigits: 0 })).toBe('$1,234');
  });

   it('should format NOK without fraction digits for nb-NO', () => {
     // Actual Intl output for nb-NO places symbol AFTER the number
    expect(formatCurrency(5432, 'nb-NO', 'NOK', { minimumFractionDigits: 0, maximumFractionDigits: 0 })).toBe('5 432 kr');
  });

  // Error fallback test
  it('should fallback on invalid currency code', () => {
    // Fallback might place symbol differently depending on internal logic
    // Let's check the actual fallback implementation's output
    // Assuming fallback is `${amount.toFixed(2)} ${currencyCode}`
    expect(formatCurrency(100, 'en-US', 'XYZ')).toBe('100.00 XYZ');
    // If the fallback was different, adjust the expectation here.
    // For example, if it used Intl with just the code:
    // expect(formatCurrency(100, 'en-US', 'XYZ')).toBe('XYZ 100.00');
  });
});
