require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

var editor;
var active = null;
var activeProject = null;
var activeProjectName = "";
var activeFile = null;
var activeFileName = "";

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

function fillProjectSidebar(sidebar, recieved) {
	sidebar.innerHTML = "";
	for (var content in recieved)
	{
		sidebar.innerHTML += "<div class='sidebar-list'" + "onclick='selectProject(this)'>" + recieved[content] + "</div>";
	}
}
function fillExplorerSidebar(sidebar, recieved) {
	sidebar.innerHTML = "";
	for (var content in recieved) {
		filename = recieved[content]
		sidebar.innerHTML += "<div id='file-" + filename + "' class='sidebar-list'" + "onclick='selectFile('" + filename + "')'>" + filename + "</div>";
	}
}

function updateExplorerOverview(project) {
	get_project_files(project).then(function(files) {
		fillExplorerSidebar(document.getElementById("explorer-list"), files);
	});
}

function selectProject(name) {
	if (activeProject === null) {
		name.style.backgroundColor = "rgb(35,35,35)";
		activeProject = name;
		activeProjectName = activeProject.innerHTML;
		setEditorName(activeProjectName, activeFileName);
		toggleSidebar("explorer");//done
		updateExplorerOverview(activeProject.innerHTML);//done
	} else if (activeProject != name) {
		activeProject.style.backgroundColor = "";
		name.style.backgroundColor= "rgb(35,35,35)"
		activeProject = name;
		activeProjectName = activeProject.innerHTML;
		activeFileName = "";
		setEditorName(activeProjectName, activeFileName);
		toggleSidebar("explorer");//done
		updateExplorerOverview(activeProject.innerHTML);//done
	}
}

function selectFile(name) {
	if (activeFile == null) {
		document.getElementById('file-' + name).style.backgroundColor = "rgb(35,35,35)";
		activeFile = name;
		setEditorName(activeProjectName, activeFile);
		openFile(activeFile);
	} else if (activeFile != name) {
		document.getElementById('file-' + activeFile).style.backgroundColor = "";
		document.getElementById('file-' + name).style.backgroundColor = "rgb(35,35,35)";
		activeFile = name;
		setEditorName(activeProjectName, activeFile);
		openFile(activeFile);
	}
}

function setEditorName(projectname, filename) {
	var displayname = "";
	displayname = projectname;
	if (filename != "") {
		displayname += "/" + filename;
	}
	document.getElementById("file-name").innerHTML = displayname;
}

function search(givenString) {
	if (givenString === "joel") {
		alert("TODO");
	}
}

function openFile() {
	lock_project_file(activeProjectName, activeFile).then(function () {
		get_project_file(activeProjectName, activeFile).then(function (data) {
			editor.setValue(data);
		});
	});
}

function saveFile() {
}

function closeFile() {
	editor.setValue("");
	unlock_project_file(activeProjectName, activeFile)
}
