require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

require(['vs/editor/editor.main'], function() {
	var editor = monaco.editor.create(document.getElementById('editor'), {
		fontFamily: "Hack",
		language: "python",
		theme: "vs-dark",
		value: "Hi, this is a example file!\n",
	});
});
