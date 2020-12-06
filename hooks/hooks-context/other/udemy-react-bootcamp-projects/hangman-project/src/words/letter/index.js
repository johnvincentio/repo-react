//

import { wordsA } from './wordsA';
import { wordsB } from './wordsB';
import { wordsC } from './wordsC';
import { wordsD } from './wordsD';
import { wordsE } from './wordsE';
import { wordsF } from './wordsF';
import { wordsG } from './wordsG';
import { wordsH } from './wordsH';
import { wordsI } from './wordsI';
import { wordsJ } from './wordsJ';
import { wordsK } from './wordsK';
import { wordsL } from './wordsL';
import { wordsM } from './wordsM';
import { wordsN } from './wordsN';
import { wordsO } from './wordsO';
import { wordsP } from './wordsP';
import { wordsQ } from './wordsQ';
import { wordsR } from './wordsR';
import { wordsS } from './wordsS';
import { wordsT } from './wordsT';
import { wordsU } from './wordsU';
import { wordsV } from './wordsV';
import { wordsW } from './wordsW';
import { wordsX } from './wordsX';
import { wordsY } from './wordsY';
import { wordsZ } from './wordsZ';

import { wordsGeneral } from './wordsGeneral';

export function randomWord() {
	const letters = [ ...'abcdefghijklmnopqrstuvwxyz'];
	const rnd = Math.floor(Math.random() * letters.length + 1);
	switch(rnd) {
		case 0:
		default:
			return wordsA();
		case 1:
			return wordsB();
		case 2:
			return wordsC();
		case 3:
			return wordsD();
		case 4:
			return wordsE();
		case 5:
			return wordsF();
		case 6:
			return wordsG();
		case 7:
			return wordsH();
		case 8:
			return wordsI();
		case 9:
			return wordsJ();
		case 10:
			return wordsK();
		case 11:
			return wordsL();
		case 12:
			return wordsM();
		case 13:
			return wordsN();
		case 14:
			return wordsO();
		case 15:
			return wordsP();
		case 16:
			return wordsQ();
		case 17:
			return wordsR();
		case 18:
			return wordsS();
		case 19:
			return wordsT();
		case 20:
			return wordsU();
		case 21:
			return wordsV();
		case 22:
			return wordsW();
		case 23:
			return wordsX();
		case 24:
			return wordsY();
		case 25:
			return wordsZ();
		case 26:
			return wordsGeneral();
	}
}

export default randomWord;
