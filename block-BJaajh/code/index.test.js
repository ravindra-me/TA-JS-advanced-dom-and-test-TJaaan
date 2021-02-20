const { checkFive, getWinner } = require('./index');

test('4 is less than 5', () => {
  expect(checkFive(4)).toBe('4 is less than 5.');
});

test('6 is greater than 5', () => {
  expect(checkFive(6)).toBe('6 is greater than 5.');
});

test('guess1 is equal to quess1 then we get TIE', () => {
  expect(getWinner('Rock', 'Rock')).toBe('TIE');
});

test('guess1 is equal to quess1 then we get TIE', () => {
  expect(getWinner('Paper', 'Rock')).toBe('Player 1 wins!');
});

test('guess1 win to quess2 then we get Player 1 wins!', () => {
  expect(getWinner('Paper', 'Rock')).toBe('Player 1 wins!');
});

test('guess1 win to quess2 then we get Player 1 wins!', () => {
  expect(getWinner('Scissor', 'Paper')).toBe('Player 1 wins!');
});
test('guess1 is not win to quess2 then we get Player 2 wins!', () => {
  expect(getWinner('Paper', 'Scissor')).toBe('Player 2 wins!');
});
