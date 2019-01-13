const API = "http://192.168.111.30:5090/";

const API_GET = async (path) => {
	return fetch(API + path, {
		method: 'GET',
		headers: {
			'auth-token': window.localStorage.getItem("auth-token")
		}
	});
}

const API_POST = async (path, pbody) => {
	return fetch(API + path, {
		method: 'POST',
		body: pbody,
		headers: {
			'auth-token': window.localStorage.getItem("auth-token")
		}
	});
}

const auth_login = async (user, passwd) => {
	const response = await API_POST('login', { name: user, password: passwd });
	const response_parsed = await response.json();

	window.localStorage.localStorage.setItem('name', response_parsed['name']);
	window.localStorage.localStorage.setItem('display-name', response_parsed['display-name']);
	window.localStorage.localStorage.setItem('auth-token', response_parsed['auth-token']);
}

const auth_logout = async () => {
	const response = await API_POST('logout', "");
}

const get_projects = async () => {
	const response = await API_GET('projects');
	const response_parsed = await response.json();
	return response_parsed;
}
