//

/*
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
*/

function authGetHeader() {
	const token = localStorage.getItem('token');
	if (token) {
		console.log('*** found a token');
		return { Authorization: `Bearer ${token}` };
	}
	return {};
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}

	return response.json();
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authGetHeader()
	};
	console.log('getAll:requestOptions ', requestOptions);

	return fetch('/api/goals/all', requestOptions).then(handleResponse);
}

export const testService = {
	getAll
};

// export default userService;
