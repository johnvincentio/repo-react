export function wordsQ() {

	const words = [
		"qualification",
		"qualified",
		"qualify",
		"quality",
		"quantity",
		"quarrel",
		"quarter",
		"queen",
		"quest",
		"question",
		"queue",
		"quiet",
		"quit",
		"quota",
		"quotation",
		"quote",
	];
	return words[Math.floor(Math.random() * words.length)];
}

export default wordsQ;
