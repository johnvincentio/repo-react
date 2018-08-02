//

import store from './store';
import { setLanguage } from './actions';

// Should output {language: 'en'}
console.log('state ', store.getState());

// Switch to German
store.dispatch(setLanguage('de'));

// Should output {language: 'de'}
console.log('state ', store.getState());
