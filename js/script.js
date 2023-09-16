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
	resetSpan.textContent = '0 kB';

	preElement.textContent = "";

});

reseButton0.addEventListener('click', function() {
	textarea.value = "";
	resetSpan1.textContent = '0 kB';

	preElement.textContent = "";

});

reseButton1.addEventListener('click', function() {
	textarea.value = "";
	resetSpan1.textContent = '0 kB';

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
	charCountSpan.textContent = (characterCount / 1024).toFixed() + " kB";
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
		const load = '<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>';
		this.minifiedSizeSpan.innerHTML = load + 'Loading....';

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
				this.minifiedSizeSpan.innerHTML = (minified.length / 1024).toFixed(3) + ' kB';
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
		this.sourceSizeSpan.innerHTML = (this.sourceTextArea.value.length / 1024).toFixed(3) + ' kB';
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
