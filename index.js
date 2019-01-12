require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' }});

require(['vs/editor/editor.main'], function() {
	var editor = monaco.editor.create(document.getElementById('editor'), {
		value: "Hi, this is a example file!\n",
		language: "python"
	});
});
