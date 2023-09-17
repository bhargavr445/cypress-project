export function testLabels(selector, labelName) {
  cy.get(selector).contains(labelName);
}

export function getStartingPageNumberInPage(pageStartingNumber) {
  return `${pageStartingNumber === 1 ? 1 : ((pageStartingNumber - 1) * 5) + 1}`
}

export function getEndingPageNumberInPage(pageStartingNumber, tableDataLength) {
  const pageSize = 5;
  return pageStartingNumber === 1 ? 5 : ((pageSize * pageStartingNumber)) > tableDataLength ? tableDataLength : ((pageSize * pageStartingNumber))
}

export function formatNumberWithCommasAndDecimal(number) {
  if (typeof number !== 'number') {
    return 'Invalid input';
  }

  // Round the number to 2 decimal places
  const roundedNumber = Math.round(number * 100) / 100;

  // Convert the number to a string with commas and 2 decimal places
  const formattedNumber = roundedNumber.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Add ".00" to the end if it's missing
  if (!formattedNumber.includes('.')) {
    return formattedNumber + '.00';
  }

  return formattedNumber;
}


export function calculateVariance(physicalInventory, bookInventory) {
  return physicalInventory - bookInventory;
}

export function calculateVariancePercentage(physicalInventory, bookInventory, capacity) {
  return ((physicalInventory - bookInventory) / capacity) * 100;
}

export function transform(value, charLength) {
  if (!value || !charLength) {
    return '-';
  }
  const derivedValue = value && Array.isArray(value) && value.length > 0 ? value[0] : value.toString();
  return derivedValue.length > charLength ? derivedValue.substring(0, charLength - 2).trim() + '...' : derivedValue;
}
