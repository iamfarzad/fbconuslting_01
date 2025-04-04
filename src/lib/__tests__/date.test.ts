 import { formatDate } from '../date'; // Adjust path as necessary

describe('formatDate', () => {
  // Test with English locale
  it('should format date correctly for en-US locale', () => {
    const date = new Date(2024, 3, 3); // April 3, 2024
    const formattedDate = formatDate(date, 'en-US');
    // Default format is month: 'long'
    expect(formattedDate).toBe('April 3, 2024');
  });

  it('should format date correctly for en-US locale with short month', () => {
    const date = new Date(2024, 3, 3); // April 3, 2024
    const formattedDate = formatDate(date, 'en-US', { month: 'short' });
    expect(formattedDate).toBe('Apr 3, 2024');
  });

  // Test with Norwegian locale
  it('should format date correctly for nb-NO locale', () => {
    const date = new Date(2024, 3, 3); // April 3, 2024
    const formattedDate = formatDate(date, 'nb-NO');
     // Default format is month: 'long' - check expected Norwegian format
    expect(formattedDate).toBe('3. april 2024'); // Common Norwegian format
  });

   it('should format date correctly for nb-NO locale with short month', () => {
    const date = new Date(2024, 3, 3); // April 3, 2024
    const formattedDate = formatDate(date, 'nb-NO', { month: 'short' });
     // Check expected Norwegian short format
    expect(formattedDate).toBe('3. apr. 2024'); // Common Norwegian short format
  });

  // Test with different options
  it('should format date with only year and month', () => {
    const date = new Date(2024, 3, 3);
    const formattedDate = formatDate(date, 'en-US', { year: 'numeric', month: 'long' });
    expect(formattedDate).toBe('April 2024');
  });

  // Test with string input
  it('should handle date string input', () => {
    const dateString = '2024-04-03T10:00:00Z';
    const formattedDate = formatDate(dateString, 'en-US');
    expect(formattedDate).toBe('April 3, 2024');
  });

  // Test with timestamp input
  it('should handle timestamp input', () => {
    // Timestamp for April 3, 2024 00:00:00 UTC
    const timestamp = 1712102400000;
    const formattedDate = formatDate(timestamp, 'en-US');
    expect(formattedDate).toBe('April 3, 2024');
  });

  // Test error handling (optional, depends on implementation)
  it('should return default string on invalid date input', () => {
     const invalidDate = 'not a date';
     // Assuming the function falls back to basic toLocaleDateString on error
     const expectedFallback = new Date(invalidDate).toLocaleDateString(); // This might vary based on system locale
     expect(formatDate(invalidDate, 'en-US')).toBe(expectedFallback);
   });
});

// Add similar test suites for formatTime and formatDateTime if needed
