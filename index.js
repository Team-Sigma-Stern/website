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

function toggleSidebar(item) {
	if (item == null) {
		if (active != null) {
			// deactivate tab active
			document.getElementById(active).style.display = "none";
		}
		return
	}

	if (active == null) {
		// activate tab item
		active = item;
		document.getElementById("sidebar").style.display = "block";
		editor.layout(1,1);
		editor.layout();
		document.getElementById(item).style.display = "block";
	} else if (active == item) {
		// deactivate tab item
		active = null;
		document.getElementById("sidebar").style.display = "none";
		document.getElementById(item).style.display = "none";
		editor.layout();
	} else {
		// deactivate tab active
		// activate tab item
		document.getElementById(active).style.display = "none";
		active = item;
		document.getElementById(item).style.display = "block";
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

function myBlurFunction (state) {
    /* state can be 1 or 0 */
    var containerElement = document.getElementsByClassName('main')[0];
    var overlayEle = document.getElementById('overlay');

    if (state) {
        overlayEle.style.display = 'flex';
        containerElement.classList.add('blur');
    } else {
        overlayEle.style.display = 'none';
        containerElement.classList.remove('blur');
    }
}

function easterEgg() {
	var username = document.getElementById("username");
	if (username.value.toLowerCase() === "ruffdd") {
		document.getElementById("dialog").style.backgroundImage = "url('./icons/david.jpg')";
	} else {
		document.getElementById("dialog").style.backgroundImage = null;
	}
}


async function updateProjectOverview() {
	var projects = await get_projects();
	var sidebar = document.getElementById("projects-list");
	fillProjectSidebar(sidebar, projects);
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
	for (var content in recieved)
	{
		sidebar.innerHTML += "<div class='sidebar-list'" + "onclick='selectFile(this)'>" + recieved[content] + "</div>";
	}
}

async function updateExplorerOverview(project) {
	var files = await get_project_files(project);
	var sidebar = document.getElementById("explorer-list");
	fillExplorerSidebar(sidebar, files);
}

function selectProject(name) {
	if (activeProject === null) {
		name.style.backgroundColor = "rgb(35,35,35)";
		activeProject = name;
		activeProjectName = activeProject.innerHTML;
		setEditorName(activeProjectName, activeFileName);
		toggleSidebar("explorer");//done
		updateExplorerOverview(activeProject.innerHTML);//done
	} else if (activeProject === name) {

	} else {
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
	if (activeFile === null) {
		console.log(name.innerHTML);
		name.style.backgroundColor = "rgb(35,35,35)";
		activeFile = name;
		activeFileName =activeFile.innerHTML;
		setEditorName(activeProjectName, activeFileName);
		openFile(activeFileName);
	} else if (activeFile === name) {

	} else {
		activeFile.style.backgroundColor = "";
		name.style.backgroundColor= "rgb(35,35,35)"
		activeFile = name;
		activeFileName =activeFile.innerHTML;
		setEditorName(activeProjectName, activeFileName);
		openFile(activeFileName);
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

function openFile(file) {
	//todo
}
