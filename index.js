require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

var editor;
var active = null;
var active = null;

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
	fillSidebar(sidebar, projects);
}

function fillSidebar(sidebar, recieved) {
	sidebar.innerHTML = "";
	for (var content in recieved)
	{
		sidebar.innerHTML += "<li>" + recieved[content] + "</li>";
	}
}
