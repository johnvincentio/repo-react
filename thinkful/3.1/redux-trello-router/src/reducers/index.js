import * as actions from '../actions';

const initialState = {
    boards: {}
};

const defaultBoard = {
    lists: []
};

export const trelloReducer = (state=initialState, action) => {
    if (action.type === actions.ADD_LIST) {
        const {title, boardId} = action;
        const boards = state.boards;
        const board = Object.assign({}, defaultBoard, boards[boardId]);
        board.lists = [...board.lists, {
            cards: [],
            title
        }];
        return Object.assign({}, state, {
            boards: Object.assign({}, boards, {
                [boardId]: board
            })
        });
    }
    else if (action.type === actions.ADD_CARD) {
        const {text, boardId, listIndex} = action;
        const boards = state.boards;
        const board = Object.assign({}, defaultBoard, boards[boardId]);
        board.lists = board.lists.map((list, index) => {
            if (index !== listIndex) {
                return list;
            }
            return Object.assign({}, list, {
                cards: [...list.cards, {
                    text
                }]
            });
        });

        return Object.assign({}, state, {
            boards: Object.assign({}, boards, {
                [boardId]: board
            })
        });
    }
    return state;
};

