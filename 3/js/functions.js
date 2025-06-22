function getStringLength(string, maxLength) {
  return string <= maxLength;
}

function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const reversedString = normalizedString.split('').reverse().join('');
  return reversedString === normalizedString;
}

function getNumbers(string) {
  const newString = string.toString();
  let res = '';
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i], 10))) {
      res += newString[i];
    }
  }
  return res === '' ? NaN : parseInt(res, 10);
}
