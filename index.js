require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

var editor = null;
var active = null;

require(['vs/editor/editor.main'], function() {
	editor = monaco.editor.create(document.getElementById('editor'), {
		fontFamily: "Hack",
		language: "python",
		theme: "vs-dark",
		value: "Hi, this is a example file!\n",
	});
});

function toggleFiles() {
	if (active == null) {
		active = "files";
		document.getElementById("sidebar").style.display = "block";
		editor.layout();
	} else if (active == "files") {
		active = null;
		document.getElementById("sidebar").style.display = "none";
		editor.layout();
	} else {
	}
}
