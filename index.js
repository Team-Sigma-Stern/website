require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

var editor;
var active = null;

require(['vs/editor/editor.main'], function() {
	editor = monaco.editor.create(document.getElementById('editor'), {
		fontFamily: "Hack",
		language: "python",
		theme: "vs-dark",
		value: "Hi, this is a example file!\n",
	});
});

function toggleSidebar(item) {
	if (item == null) {
		if (active != null) {
			// deactivate tab active
		}
		return
	}

	if (active == null) {
		// activate tab item
		active = item;
		document.getElementById("sidebar").style.display = "block";
		editor.layout(1,1);
		editor.layout();
	} else if (active == item) {
		// deactivate tab item
		active = null;
		document.getElementById("sidebar").style.display = "none";
		editor.layout();
	} else {
		// deactivate tab active
		// activate tab item
		active = item;
	}
}

logout() {
	alert("logged out");
}
