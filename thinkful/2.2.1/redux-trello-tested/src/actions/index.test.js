import {ADD_LIST, addList, ADD_CARD, addCard} from './index';

describe('addList', () => {
    it('Should return the action', () => {
        const title = 'List title';
        const action = addList(title);
        expect(action.type).toEqual(ADD_LIST);
        expect(action.title).toEqual(title);
    });
});

describe('addCard', () => {
    it('Should return the action', () => {
        const text = 'Card text';
        const listIndex = 10;
        const action = addCard(text, listIndex);
        expect(action.type).toEqual(ADD_CARD);
        expect(action.text).toEqual(text);
        expect(action.listIndex).toEqual(listIndex);
    });
});
