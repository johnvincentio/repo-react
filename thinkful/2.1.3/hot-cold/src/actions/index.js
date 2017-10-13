
/*
Actions:

User guessed a number
New Game

Help
Dismiss Help
*/
export const USER_GUESSED_NUMBER = 'USER_GUESSED_NUMBER';
export const userGuessedNumber = guess => ({
  type: USER_GUESSED_NUMBER,
  guess,
});

export const NEW_GAME = 'NEW_GAME';
export const handleNewGame = () => ({
  type: NEW_GAME,
});

export const HELP = 'HELP';
export const handleHelp = () => ({
  type: HELP,
});

export const DISMISS_HELP = 'DISMISS_HELP';
export const handleDismissHelp = () => ({
  type: DISMISS_HELP,
});
