// 1. Write a function named `getFullName` that accepts two input `firstName` and `lastName` and return the `fullName`

function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

// 2. Write a function named `isPalindrome` that accepts one input returns `true` or `false` based on wether the value passed is palindrome or not.

function isPalindrome(num) {
  return String(num) === String(num).split('').reverse().join('');
}

// 3. Create 2 functions that calculate properties of a circle, using the definitions here.
function getCircumference(radius) {
  return 2 * Math.PI * radius;
}

// - Create a function called `getCircumfrence`:

// Pass the radius of a circle to the function and it returns the circumference based on the radius, and output `The circumference is NN`.

// - Create a function called `getArea`:
function getArea(radius) {
  return Math.PI * radius * radius;
}

// Pass the radius to the function and it returns the area based on the radius, and output `The area is NN`.
module.exports = {
  getFullName,
  getCircumference,
  getArea,
  isPalindrome,
};
