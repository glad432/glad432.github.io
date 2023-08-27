const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year");
yearElement.textContent = currentYear.toString();

const removeButton = document.querySelector(".remove");
const preElement = document.querySelector("code");
removeButton.addEventListener("click", function() {
	preElement.textContent = "";

});

var textarea = document.getElementById("source");
var button = document.getElementById("rm");

function removeText() {
	textarea.value = "";
}

button.addEventListener("click", removeText);

const resetSpan = document.querySelector('.reset');
const resetSpan1 = document.querySelector('.reset0');
const reseButton = document.getElementById('rm0');
const reseButton0 = document.getElementById('rm');
const reseButton1 = document.getElementById('rm0');

reseButton.addEventListener('click', function() {
	textarea.value = "";
	resetSpan.textContent = '0 Bytes';

	preElement.textContent = "";

});

reseButton0.addEventListener('click', function() {
	textarea.value = "";
	resetSpan1.textContent = '0 Bytes';

	preElement.textContent = "";

});

reseButton1.addEventListener('click', function() {
	textarea.value = "";
	resetSpan1.textContent = '0 Bytes';

	preElement.textContent = "";

});

const edElement = document.querySelector('.edit-pre');

edElement.addEventListener('input', () => {
	const editedContent = edElement.innerText;
});

const copyBtn = document.getElementById('copy');
const editablePre = document.querySelector('.edit-pre');

copyBtn.addEventListener('click', async () => {
	copyBtn.disabled = true;

	try {
		const textToCopy = editablePre.textContent;
		await navigator.clipboard.writeText(textToCopy);
	} catch (err) {
		console.error('Unable to copy content:', err);
	} finally {
		copyBtn.disabled = false;
	}
});


const nopaste = document.querySelector('.edit-pre');

nopaste.addEventListener('paste', (e) => {
	e.preventDefault();
});

nopaste.addEventListener('cut', (e) => {
	e.preventDefault();
});

const codeElement = document.querySelector('.edit-pre');
const charCountSpan = document.getElementById('minified-size');

function updateCharacterCount() {
	const trimmedContent = codeElement.textContent.trim();
	const characterCount = trimmedContent.length;
	charCountSpan.textContent = characterCount + " Bytes";
}

codeElement.addEventListener('input', () => {
	const trimmedContent = codeElement.textContent.trim();

	if (trimmedContent === "") {
		codeElement.textContent = "\n";
	}

	updateCharacterCount();
});

updateCharacterCount();

class MinificationUtil {
	constructor(element) {
		this.minifyButton = document.getElementById('minify');
		this.sourceTextArea = document.getElementById('source');
		this.minifiedTextArea = document.getElementById('minified');
		this.sourceSizeSpan = document.getElementById('source-size');
		this.minifiedSizeSpan = document.getElementById('minified-size');

		this.api_url = 'https://api.python-minifier.com/minify';

		this.minifyButton.addEventListener('click', this.minifyClick.bind(this));
		this.sourceTextArea.addEventListener('input', this.updateSourceSize.bind(this));

		this.options = [
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
		this.setupOptionsListeners();

		this.updateSourceSize();
		this.minifyButton.disabled = false;
	}

	setupOptionsListeners() {
		this.options.forEach(option => {
			document.getElementById(option).addEventListener('change', this.optionsChange.bind(this));
		});
	}

	build_query() {
		let query = this.options.map(option => `${option}=${document.getElementById(option).checked}`).join('&');

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

	optionsChange(event) {
		this.minifiedTextArea.disabled = true;
	}

	async minifyClick() {
		this.minifyButton.disabled = true;
		this.minifiedSizeSpan.innerHTML = 'Loading....';

		try {
			const response = await fetch(this.api_url + '?' + this.build_query(), {
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain'
				},
				body: this.sourceTextArea.value
			});

			if (response.ok) {
				const minified = await response.text();
				this.minifiedTextArea.value = minified;
				this.minifiedSizeSpan.innerHTML = minified.length + ' Bytes';
				this.minifiedTextArea.disabled = false;
				const highlightedpy = Prism.highlight(minified, Prism.languages.python, 'python');
				document.getElementById('codeOutput').querySelector('code').innerHTML = highlightedpy;

			} else {
				this.minifiedTextArea.value = '';
				this.minifiedSizeSpan.innerHTML = 'Error';

				try {
					const error = await response.json();
					this.minifiedSizeSpan.innerHTML = error['message'];
				} catch {}
			}
		} catch {
			this.minifiedTextArea.value = '';
			this.minifiedSizeSpan.innerHTML = 'Enter the Original code!!';
		}

		this.minifyButton.disabled = false;
	}

	updateSourceSize() {
		this.sourceSizeSpan.innerHTML = this.sourceTextArea.value.length + ' Bytes';
		this.minifiedTextArea.disabled = true;
	}
}

const minificationUtil = new MinificationUtil(document);

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
	const bbbtn = '<div class="b animate-bounce mx-auto h-16 w-64 flex justify-center items-center"><div class="i h-16 w-64 bg-gradient-to-br from-blue-400 to-blue-600 items-center rounded-xl shadow-2xl  cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div><span id="up-tx" class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center">Read Again</span></div>';
	orderedListElement.innerHTML = `<div class="collapsible" onclick="toggleContent()">${bbbtn}</div><div class="content-l" style="display: none;"><ol class="md:list-disc space-y-1 list-decimal list-inside">${sentences.map(sentence => `<li class="mb-2 text-left">${sentence}</li>`).join("")}</ol></div>`;
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