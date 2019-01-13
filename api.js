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
		body: JSON.stringify(pbody),
		headers: {
			'auth-token': window.localStorage.getItem("auth-token")
		}
	});
}

const auth_login = async (user, passwd) => {
	const response = await API_POST('login', { name: user, password: passwd });

	if (response.ok) {
		const response_parsed = await response.json();

		window.localStorage.setItem('name', response_parsed['name']);
		window.localStorage.setItem('display-name', response_parsed['display-name']);
		window.localStorage.setItem('auth-token', JSON.stringify(response_parsed['auth-token']));
		return true;
	} else {
		return false;
	}
}

const auth_logout = async () => {
	const response = await API_POST('logout', "");

	window.localStorage.removeItem('name');
	window.localStorage.removeItem('display-name');
	window.localStorage.removeItem('auth-token');
}

const get_projects = async () => {
	const response = await API_GET('projects');
	const response_parsed = await response.json();
	return response_parsed;
}

const get_project = async (id) => {
	const response = await API_GET('projects/' + id);
	const response_parsed = await response.json();
	return response_parsed;
}

const get_project_files = async (project) => {
	const response = await API_GET('projects/' + project + '/files');
	const response_parsed = await response.json();
	return response_parsed;
}

const get_project_file = async (project, id) => {
	const response = await API_GET('projects/' + project + '/files/' + id);
	return response.text();
}
