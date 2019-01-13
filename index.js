require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

var editor;
var active = null;

require(['vs/editor/editor.main'], function() {
	editor = monaco.editor.create(document.getElementById('editor'), {
		fontFamily: "Hack",
		language: "python",
		theme: "vs-dark",
		value: "Hi, this is an example file!\n",
	});
});

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

function logout() {
	alert("logged out");
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
