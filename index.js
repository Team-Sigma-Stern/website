require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

var editor;
var active = null;
var activeProject = null;
var activeFile = null;

require(['vs/editor/editor.main'], function() {
	editor = monaco.editor.create(document.getElementById('editor'), {
		fontFamily: "Hack",
		language: "python",
		theme: "vs-dark",
		value: "Hi, this is an example file!\n",
	});
});

window.onresize = function(event) {
	editor.layout(1,1);
	editor.layout();
}

if (window.localStorage.getItem('DEVELOPER_LOGIN_BYPASS') == 'yes') {
	document.getElementById('overlay').style.display = 'none';
	document.getElementsByClassName('main')[0].classList.remove('blur');
}

function toggleSidebar(item) {
	if (item == null) {
		if (active != null) {
			document.getElementById(active).style.display = "none";
		}
		return
	}

	if (active == null) {
		document.getElementById(item).style.display = "block";
		active = item;
		document.getElementById("sidebar").style.display = "block";
		editor.layout(1,1);
		editor.layout();
	} else if (active == item) {
		document.getElementById(item).style.display = "none";
		active = null;
		document.getElementById("sidebar").style.display = "none";
		editor.layout();
	} else {
		document.getElementById(active).style.display = "none";
		document.getElementById(item).style.display = "block";
		active = item;
	}
}

function login() {
	auth_login(
		document.getElementById('auth-username').value,
		document.getElementById('auth-password').value
	).then(function(success) {
		if (success) {
			document.getElementById('overlay').style.display = 'none';
			document.getElementsByClassName('main')[0].classList.remove('blur');
		} else {
			alert('Wrong password');
		}
	});
}

function logout() {
	auth_logout().then(function() {
		document.getElementById('overlay').style.display = 'flex';
		document.getElementsByClassName('main')[0].classList.add('blur');
	});
}

function easterEgg() {
	var username = document.getElementById("auth-username");
	if (username.value.toLowerCase() === "ruffdd") {
		document.getElementById("dialog").style.backgroundImage = "url('./icons/david.jpg')";
	} else {
		document.getElementById("dialog").style.backgroundImage = null;
	}
}

function updateProjectOverview() {
	get_projects().then(function (projects) {
		fillProjectSidebar(document.getElementById("projects-list"), projects);
	});
}

function updateExplorerOverview(project) {
	get_project_files(project).then(function(files) {
		fillExplorerSidebar(document.getElementById("explorer-list"), files);
	});
}

function fillProjectSidebar(sidebar, recieved) {
	sidebar.innerHTML = "";
	for (var index in recieved) {
		projectname = recieved[index]
		sidebar.innerHTML += "<div id='project-" + projectname + "' class='sidebar-list'" + "onclick='selectProject(\"" + projectname + "\")'>" + projectname + "</div>";
	}
}
function fillExplorerSidebar(sidebar, recieved) {
	sidebar.innerHTML = "";
	for (var index in recieved) {
		filename = recieved[index]
		sidebar.innerHTML += "<div id='file-" + filename + "' class='sidebar-list'" + "onclick='selectFile(\"" + filename + "\")'>" + filename + "</div>";
	}
}

function selectProject(name) {
	if (activeProject === name) return;

	if (activeProject != null)
		document.getElementById('project-' + activeProject).style.backgroundColor = "";

	document.getElementById('project-' + name).style.backgroundColor = "rgb(35,35,35)";

	selectFile(null);
	activeProject = name;
	setEditorName();
	toggleSidebar("explorer");
	updateExplorerOverview(activeProject);

	if (activeProject == null) {

	} else if (activeProject != name) {
		document.getElementById('project-' + activeProject).style.backgroundColor = "";
		document.getElementById('project-' + name).style.backgroundColor = "rgb(35,35,35)"
		activeProject = name;
		selectFile(null);
		setEditorName();
		toggleSidebar("explorer");
		updateExplorerOverview(activeProject);
	}
}

function selectFile(name) {
	if (name == null) {
		saveFile();
		closeFile();
		activeFile = null;
	}
	if (activeFile == null) {
		document.getElementById('file-' + name).style.backgroundColor = "rgb(35,35,35)";
		activeFile = name;
		setEditorName();
		openFile();
	} else if (activeFile != name) {
		document.getElementById('file-' + activeFile).style.backgroundColor = "";
		document.getElementById('file-' + name).style.backgroundColor = "rgb(35,35,35)";
		saveFile();
		closeFile();
		activeFile = name;
		setEditorName();
		openFile();
	}
}

function setEditorName() {
	var displayname = "";
	displayname = activeProject;
	if (activeFile != null) {
		displayname += "/" + activeFile;
	}
	document.getElementById("file-name").innerHTML = displayname;
}

function search(givenString) {
	if (givenString === "joel") {
		alert("TODO");
	}
}

function openFile() {
	lock_project_file(activeProject, activeFile).then(function () {
		get_project_file(activeProject, activeFile).then(function (data) {
			editor.setValue(data);
		});
	});
}

function saveFile() {
}

function closeFile() {
	editor.setValue("");
	unlock_project_file(activeProject, activeFile);
}
