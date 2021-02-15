const {
  getFullName,
  getCircumference,
  getArea,
  isPalindrome,
} = require('./index');

test('adds ravindra and singh to equal ravindra singh', () => {
  expect(getFullName('Ravindra', 'Singh')).toBe('Ravindra Singh');
});

test('adds ravindra and singh to equal ravindra singh', () => {
  expect(getFullName('Ravindra', 'Singh')).not.toBe('Ravindra');
});

test('circumference of radius 2 is 12.566370', () => {
  expect(getCircumference(2)).toBe(12.566370614359172);
});

test('circumference of radius 4 is 25.132741228718345', () => {
  expect(getCircumference(4)).toBe(25.132741228718345);
});

test('circumference of radius 5 is not 25.132741228718345', () => {
  expect(getCircumference(5)).not.toBe(25.132741228718345);
});

test('circumference of radius 2 is 12.566370', () => {
  expect(getCircumference(2)).not.toBe(12.5);
});

test('area of radius 3 is 9.424777', () => {
  expect(getArea(3)).toBe(28.274333882308138);
});

test('area of radius 3 is 8', () => {
  expect(getArea(3)).not.toBe(10);
});

test('area of radius 5 is 78.53981633974483', () => {
  expect(getArea(5)).toBe(78.53981633974483);
});

test('circumference of radius 5 is not 8', () => {
  expect(getArea(5)).not.toBe(10);
});

test('isPalindrome 22 is true', () => {
  expect(isPalindrome(22)).toBe(true);
});

test('isPalindrome 23 is false', () => {
  expect(isPalindrome(23)).not.toBe(true);
});
