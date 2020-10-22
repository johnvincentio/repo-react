// 

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function createRoughImageUrl(id) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function createImageUrl(id) {
	let num = id;
	if (id < 10) {
		num = `00${id}`;
	}
	else if (id < 100) {
		num = `0${id}`;
	}
	return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${num}.png`;
}

