const textElement = document.getElementById("text");
const cursorElement = document.getElementById("cursor");
const orderedListElement = document.getElementById("orderedList");

const sentences = [
	"A Python minifier is a tool used to shrink Python code size by eliminating unnecessary elements like white spaces, comments, and line breaks.",
	"Its primary purpose is to enhance the loading speed of Python scripts, particularly beneficial for web applications.",
	"By reducing the overall size of the code, the minifier contributes to faster script loading times, optimizing web performance.",
	"The process of minification streamlines code readability without affecting its functionality or logic.",
	"Minified code is more efficiently transmitted and executed across various platforms, aiding developers in delivering smoother user experiences.",
	"Minification is a standard practice for web optimization, mitigating download and execution times of scripts to create a more responsive environment."
];

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

let sentenceIndex = 0;
let charIndex = 0;
let isTyping = true;

function type() {
	if (charIndex < sentences[sentenceIndex].length) {
		textElement.textContent += sentences[sentenceIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, 20);
	} else {
		isTyping = false;
		cursorElement.style.display = "none";
		setTimeout(() => {
			startClearingText();
		}, 3000);
	}
}

function startClearingText() {
	if (charIndex >= 0) {
		const textToClear = sentences[sentenceIndex].substring(0, charIndex);
		textElement.textContent = textToClear;
		charIndex--;
		setTimeout(startClearingText, 20);
	} else {
		sentenceIndex = (sentenceIndex + 1) % sentences.length;
		if (sentenceIndex === 0) {
			showOrderedList();
		} else {
			startTypingNextSentence();
		}
	}
}

function showOrderedList() {
	const bbbtn = '<span class="cursor-pointer select-none relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-blue-500 rounded-lg shadow-2xl group"><span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-500 bg-blue-700 rounded-full blur-md ease"></span><span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease"><span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-blue-500 rounded-full blur-md"></span><span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-blue-700 rounded-full blur-md"></span></span><span id="up-tx" class="font-semibold relative text-white">Read Again</span>'
	orderedListElement.innerHTML = `<div class="collapsible" onclick="toggleContent()">${bbbtn}</div><div class="content-l" style="display: none;"><ol class="mt-4 space-y-1 list-decimal list-inside">${sentences.map(sentence => `<li class="mb-2 text-left">${sentence}</li>`).join("")}</ol></div>`;
}

function startTypingNextSentence() {
	textElement.textContent = "";
	charIndex = 0;
	cursorElement.style.display = "inline";

	if (sentenceIndex > 0) {
		setTimeout(() => {
			type();
		}, 200);
	} else {
		type();
	}
}

shuffleArray(sentences);

startTypingNextSentence();

var contentVisible = false;

function toggleContent() {
	var content = document.querySelector('.content-l');
	var upTx = document.getElementById('up-tx');
	if (content.style.display === 'none') {
		content.style.display = 'block';
		upTx.textContent = 'Hide';
	} else {
		content.style.display = 'none';
		upTx.textContent = 'Read Again';
	}
	if (content) {
		content.style.display = contentVisible ? 'none' : 'block';
		contentVisible = !contentVisible;
	}
}

const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year");
yearElement.textContent = currentYear.toString();

var sourceEditor = CodeMirror.fromTextArea(document.getElementById("source"), {
	mode: "python",
	theme: "mdn-like",
	lineNumbers: true,
	height: 'auto',
	viewportMargin: 20,
	placeholder: "Enter orginal code..."
});

sourceEditor.on("change", function(editor) {
	var codeTextarea = document.getElementById("source");
	codeTextarea.value = editor.getValue();
});

sourceEditor.on("change", function() {
	updateLineCount();
});

function updateLineCount() {
	var lineCount = sourceEditor.lineCount();
	var text = sourceEditor.getValue();
	var textSizeInBytes = new TextEncoder().encode(text).length;

	document.getElementById("line-count").textContent = "Line Count: " + lineCount;
	document.getElementById("text-size").textContent = (textSizeInBytes / 1024).toFixed(3) + " kB";
}

var minifiedEditor = CodeMirror.fromTextArea(document.getElementById("minified"), {
	mode: "python",
	theme: "mdn-like",
	lineNumbers: true,
	readOnly: true,
	viewportMargin: 20,
	placeholder: "Minified code..."

});

var lineCountDiv = document.getElementById("line-count-out");

function updateLineCount_out() {
	var lineCount_out = minifiedEditor.lineCount();
	lineCountDiv.textContent = "Line Count: " + lineCount_out;
}

minifiedEditor.on("change", updateLineCount_out);

updateLineCount_out();

function initializeMinifier() {
	const minifyButton = document.getElementById('minify');
	const sourceTextArea = document.getElementById('source');
	const minifiedTextArea = document.getElementById('minified');
	const copyButton = document.getElementById('copy');

	const api_url = 'https://api.python-minifier.com/minify';

	function build_query() {
		const options = [
			'combine_imports',
			'remove_pass',
			'remove_literal_statements',
			'remove_annotations',
			'hoist_literals',
			'rename_locals',
			'rename_globals',
			'convert_posargs_to_args',
			'preserve_shebang',
			'remove_asserts',
			'remove_debug',
			'remove_explicit_return_none'
		];

		let query = options.map(option => `${option}=${document.getElementById(option).checked}`).join('&');

		const preserve_globals = document.getElementById('preserve_globals').value;
		if (preserve_globals) {
			query += '&preserve_globals=' + encodeURIComponent(preserve_globals);
		}

		const preserve_locals = document.getElementById('preserve_locals').value;
		if (preserve_locals) {
			query += '&preserve_locals=' + encodeURIComponent(preserve_locals);
		}

		return query;
	}

	function optionsChange() {
		minifiedEditor.setValue('');
	}

	async function copyClick() {
		try {
			await navigator.clipboard.writeText(minifiedEditor.getValue());
		} catch (error) {
			console.error('Copy failed:', error);
		}
	}

	async function minifyClick() {
		minifyButton.disabled = true;
		minifiedEditor.setValue('');
		const minifiedSizeSpan = document.getElementById('minified-size');
		const load = '<svg aria-hidden="true" role="status" class="inline font-bold w-4 h-4 mr-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>';
		minifiedSizeSpan.innerHTML = load + 'Loading....';

		try {
			const response = await fetch(api_url + '?' + build_query(), {
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain'
				},
				body: sourceTextArea.value
			});

			if (response.ok) {
				const minified = await response.text();
				minifiedEditor.setValue(minified);
				minifiedSizeSpan.innerHTML = (minified.length / 1024).toFixed(3) + ' kB';
				copyButton.disabled = false;
			} else {
				copyButton.disabled = true;
				minifiedSizeSpan.innerHTML = 'Error';

				try {
					const error = await response.json();
					minifiedSizeSpan.innerHTML = error['message'];
				} catch {}
			}

		} catch {
			copyButton.disabled = true;
			minifiedSizeSpan.innerHTML = 'Enter orginal code!!';
		}

		minifyButton.disabled = false;
	}

	function updateSourceSize() {
		const sourceSizeSpan = document.getElementById('text-size');
		sourceSizeSpan.innerHTML = (sourceTextArea.value.length / 1024).toFixed(3) + '  kB';

	}

	minifyButton.addEventListener('click', minifyClick);
	copyButton.addEventListener('click', copyClick);

	const options = [
		'combine_imports', 'remove_pass', 'remove_literal_statements',
		'remove_annotations', 'hoist_literals', 'rename_locals',
		'rename_globals', 'convert_posargs_to_args', 'preserve_shebang',
		'remove_asserts', 'remove_debug', 'remove_explicit_return_none'
	];

	options.forEach(option => {
		const element = document.getElementById(option);
		if (element) {
			element.addEventListener('change', optionsChange);
		}
	});

	updateSourceSize();
	minifyButton.disabled = false;
}

function clearSource() {
	sourceEditor.setValue('');
}

const clearButton = document.getElementById('rm');
clearButton.addEventListener('click', clearSource);

document.getElementById("rm").addEventListener("click", function() {

	document.getElementById("source").textContent = "";

	minifiedEditor.setValue("");

});

const clearButton0 = document.getElementById('rm0');
clearButton0.addEventListener('click', clearSource);

document.getElementById("rm0").addEventListener("click", function() {

	document.getElementById("source").textContent = "";

	minifiedEditor.setValue("");

});

const minifiedSizeElement = document.getElementById("minified-size");
const resetButton = document.getElementById("rm");

resetButton.addEventListener("click", function() {

	minifiedSizeElement.textContent = "0.000 kB";
});

const resetButton1 = document.getElementById("rm0");

resetButton1.addEventListener("click", function() {

	minifiedSizeElement.textContent = "0.000 kB";
});

initializeMinifier();

var contentVisible1 = false;

function toggleContent1() {
	var content = document.querySelector('.content-ll');
	if (content) {
		content.style.display = contentVisible1 ? 'none' : 'block';
		contentVisible1 = !contentVisible1;
	}
}

function toggleContentFiles() {
	var content = document.querySelector('.content-ll');
	content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function tickAllAndSetGlobals() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	var preservedGlobalsInput = document.getElementById('preserve_globals');

	checkboxes.forEach(function(checkbox) {
		checkbox.checked = true;
	});

	preservedGlobalsInput.value = 'handler';
}

function resetOptions() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	var preservedGlobalsInput = document.getElementById('preserve_globals');
	var otherTextFields = document.querySelectorAll('input[type="text"]:not(#preserve_globals)');

	checkboxes.forEach(function(checkbox) {
		checkbox.checked = false;
	});

	preservedGlobalsInput.value = 'handler';

	otherTextFields.forEach(function(textField) {
		textField.value = '';
	});
}
