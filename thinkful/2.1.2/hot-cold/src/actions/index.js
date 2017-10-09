
/*
Create the action creators for a version of this Hot and Cold guessing game.
In the game, the computer randomly selects a number between 1 and 100,
and the player then tries to guess the number.
The player gets feedback for each guess –
"hot" if their guess was close, and
"cold" if their guess was far.
When the user guesses the secret number, the app lets them know,
and they'll have the option to start a new game.
*/

/*
Actions:

User guessed a number
Generate a new random number
*/
export const USER_GUESSED_NUMBER = 'USER_GUESSED_NUMBER';
export const userGuessedNumber = guess => ({
  type: USER_GUESSED_NUMBER,
  guess,
});

export const RANDOM_NUMBER = 'RANDOM_NUMBER';
export const generateRandomNumber = (fromNumber, toNumber) => ({
  type: RANDOM_NUMBER,
  fromNumber,
  toNumber,
});
