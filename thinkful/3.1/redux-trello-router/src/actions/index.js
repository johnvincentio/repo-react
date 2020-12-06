export const ADD_LIST = 'ADD_LIST';
export const addList = (title, boardId) => ({
    type: ADD_LIST,
    title,
    boardId,
});

export const ADD_CARD = 'ADD_CARD';
export const addCard = (text, boardId, listIndex) => ({
    type: ADD_CARD,
    text,
    boardId,
    listIndex
});
