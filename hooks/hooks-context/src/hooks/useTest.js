import { useEffect } from 'react';

function useTest(props) {
	useEffect(() => {
		console.log(props.name);
	}, []); // <-- should error and offer autofix to [props.name]
}

export default useTest;
