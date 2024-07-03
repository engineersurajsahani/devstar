    function applyStyle(style) {
		const textarea = document.querySelector('textarea');
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = markdownText.substring(start, end);

		let newText = '';
		if (style === 'bold') {
			newText = `**${selectedText}**`;
		} else if (style === 'italic') {
			newText = `*${selectedText}*`;
		} else if (style === 'orderedList') {
			const lines = selectedText.split('\n');
			newText = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
		} else if (style === 'unorderedList') {
			newText = selectedText.replace(/^/gm, '- ');
		}

		markdownText = markdownText.substring(0, start) + newText + markdownText.substring(end);
		updateHtml();
		textarea.focus();
		textarea.selectionStart = start;
		textarea.selectionEnd = start + newText.length;
	}

	function addToHistory(text) {
		if (historyIndex === -1 || text !== history[historyIndex]) {
			history.splice(historyIndex + 1);
			history.push(text);
			historyIndex++;
		}
	}

	function undo() {
		if (historyIndex > 0) {
			historyIndex--;
			markdownText = history[historyIndex];
			updateHtml();
		}
	}

	function redo() {
		if (historyIndex < history.length - 1) {
			historyIndex++;
			markdownText = history[historyIndex];
			updateHtml();
		}
	}

	onMount(updateHtml);
</script>
