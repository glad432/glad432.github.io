const minifyButton = document.getElementById('minify');
const copyButton = document.getElementById('copy');
const textElement = document.getElementById("text");
const cursorElement = document.getElementById("cursor");
const errorMessage = document.getElementById('errmsg');
const dwButton = document.getElementById('dw');
const shareButton = document.getElementById("share");
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const minifiedSizeSpan = document.getElementById('minified-size');
const fileLink_load = document.getElementById("fileLink-load");
const qrCode = document.getElementById("qrCode");
const copy_msg = document.getElementById('copy-msg');
const file_Link = document.getElementById("fileLink");
const close_Popup = document.getElementById('closePopup');
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const orscan = document.getElementById('scantocopy');
const help_msg = document.getElementById('help-msg');
const link_newtab = document.getElementById("new_tab");
const fileLinkInput = document.getElementById("fileLinkInput");
const selectallopt = document.getElementById('selectall');
const unselectallopt = document.getElementById('Unselectall');
const preservedGlobalsInput = document.getElementById('preserve_globals');
var content = document.querySelector('.content-ll');
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
let errorTimeout, aniTimeout, cpyTimeout0, cpyTimeout1;
const maxFileSizeInBytes = 1 * 1024 * 1024;
let sentenceIndex = 0;
let charIndex = 0;
let isTyping = true;
var contentVisible = false;
const excir = `<i class="fa-solid fa-circle-exclamation"></i>`;
const exctri = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
const code_file = `<i class="fa-solid fa-file-code"></i>`;
const classlst = ['select-none', 'font-bold', 'bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded', 'max-w-fit'];
const classlst0 = ['select-none', 'font-bold', 'bg-green-500', 'text-white', 'py-1', 'px-2', 'rounded', 'max-w-fit'];
var words = [
	'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
	'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import',
	'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
	'True', 'try', 'while', 'with', 'yield', 'abs', 'all', 'any', 'ascii', 'bin',
	'bool', 'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex',
	'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'filter', 'float',
	'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id',
	'input', 'int', 'isinstance', 'issubclass', 'iter', 'len', 'list', 'locals', 'map',
	'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print',
	'property', 'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted',
	'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip', 'exec', 'Ellipsis',
	'NotImplemented',
]

const sentences = [
	"A Python minifier is a tool used to shrink Python code size by eliminating unnecessary elements like white spaces, comments, and line breaks.",
	"Its primary purpose is to enhance the loading speed of Python scripts, particularly beneficial for web applications.",
	"By reducing the overall size of the code, the minifier contributes to faster script loading times, optimizing web performance.",
	"The process of minification streamlines code readability without affecting its functionality or logic.",
	"Minified code is more efficiently transmitted and executed across various platforms, aiding developers in delivering smoother user experiences.",
	"Minification is a standard practice for web optimization, mitigating download and execution times of scripts to create a more responsive environment."
];

const dateformat = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	timeZoneName: 'short'
};

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

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
	document.getElementById("orderedList").innerHTML = `<div class="collapsible" onclick="toggleContent()">${bbbtn}</div><div class="content-l" style="display: none;"><ol class="mt-4 space-y-1 list-decimal list-inside">${sentences.map(sentence => `<li class="mb-2 text-left">${sentence}</li>`).join("")}</ol></div>`;
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

document.getElementById("year").textContent = new Date().getFullYear().toString();

var sourceEditor = CodeMirror.fromTextArea(document.getElementById("source"), {
	mode: "python",
	theme: "mdn-like",
	lineNumbers: true,
	height: 'auto',
	viewportMargin: 20,
	placeholder: "Enter original code...",
	matchBrackets: true,
	autoCloseBrackets: true,
	hint: CodeMirror.hint.anyword,
	scrollbarStyle: "overlay",
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	foldGutter: true,
	extraKeys: {
		"Ctrl-Space": "autocomplete",
		"Ctrl-Q": function(cm) {
			cm.foldCode(cm.getCursor());
		}
	}
});

var minifiedEditor = CodeMirror.fromTextArea(document.getElementById("minified"), {
	mode: "python",
	theme: "mdn-like",
	lineNumbers: true,
	readOnly: true,
	viewportMargin: 20,
	scrollbarStyle: "overlay",
	matchBrackets: true,
	placeholder: "Minified code...",
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	foldGutter: true,
	extraKeys: {
		"Ctrl-Q": function(cm) {
			cm.foldCode(cm.getCursor());
		}
	}
});

CodeMirror.registerHelper("hint", "anyword", function(editor, options) {
	var wordList = options.words || words;
	var cur = editor.getCursor();
	var curLine = editor.getLine(cur.line);
	var start = cur.ch;
	var end = start;

	while (end < curLine.length && /[\w$]+/.test(curLine.charAt(end))) ++end;
	while (start && /[\w$]+/.test(curLine.charAt(start - 1))) --start;

	var prefix = curLine.slice(start, end).toLowerCase();
	var list = wordList.filter(function(word) {
		return word.toLowerCase().startsWith(prefix);
	});

	return {
		list: list,
		from: CodeMirror.Pos(cur.line, start),
		to: CodeMirror.Pos(cur.line, end)
	};
});

function updateEditorState() {
	var cursor = sourceEditor.getCursor();
	var value = sourceEditor.getValue();
	var fileSizeInBytes = new Blob([value]).size;

	if (fileSizeInBytes > maxFileSizeInBytes) {
		errorMessage.classList.add(...classlst);
		errorMessage.innerHTML = `${exctri} Maximum Size limit 1MB reached!`;
		sourceEditor.setValue(value.substring(0, value.length - (fileSizeInBytes - maxFileSizeInBytes)));
		sourceEditor.setOption("readOnly", true);
		clear_err_msg();
	} else {
		sourceEditor.setOption("readOnly", false);
	}

	sourceEditor.setCursor(cursor);
}

sourceEditor.on("beforeChange", function(_, change) {
	var currentSize = new Blob([sourceEditor.getValue()]).size;
	var newSize = currentSize + new Blob([change.text.join("")]).size - change.to - change.from;

	if (newSize > maxFileSizeInBytes) {
		change.cancel();
	}
});

sourceEditor.on("change", updateEditorState);

function setupFileInput() {
	function dragpy(event) {
		const droppedFile = event.dataTransfer.files[0];

		if (droppedFile) {
			if (droppedFile.name.toLowerCase().endsWith('.py')) {
				errorMessage.classList.remove(...classlst);
				fileNameDisplay.innerHTML = `${code_file} ${droppedFile.name}`;
				fileNameDisplay.classList.add(...classlst0);
				handleFile(droppedFile);
			} else {
				fileNameDisplay.classList.remove(...classlst);
				errorMessage.classList.add(...classlst);
				errorMessage.innerHTML = `${exctri} Invalid file format. Please select a .py file.`;
				clear_err_msg();
				fileNameDisplay.textContent = '';
			}
		} else {
			fileNameDisplay.textContent = '';
		}
	}

	fileInput.addEventListener('change', function(event) {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			if (selectedFile.name.toLowerCase().endsWith('.py')) {
				fileNameDisplay.innerHTML = `${code_file} ${selectedFile.name}`;
				fileNameDisplay.classList.add(...classlst0);
				handleFile(selectedFile);
			} else {
				dwButton.disabled = true;
				fileNameDisplay.classList.remove(...classlst0);
				errorMessage.classList.add(...classlst);
				errorMessage.innerHTML = `${exctri} Invalid file format. Please select a .py file.`;
				fileInput.value = '';
				fileNameDisplay.textContent = '';
				clear_err_msg();
			}
		} else {
			fileNameDisplay.textContent = '';
		}
	});

	dropArea.addEventListener('click', function() {
		fileInput.click();
	});

	document.addEventListener('dragover', function(event) {
		event.preventDefault();
	});

	document.addEventListener('drop', function(event) {
		event.preventDefault();
		dragpy(event)
	});

	dropArea.addEventListener('drop', function(event) {
		event.preventDefault();
		dragpy(event)
	});

	function handleFile(file) {
		if (file.size <= maxFileSizeInBytes) {
			const reader = new FileReader();

			reader.onload = function(e) {
				sourceEditor.getDoc().setValue(e.target.result);
				errorMessage.textContent = '';
			};

			reader.readAsText(file);
		} else {
			fileNameDisplay.classList.remove(...classlst0);
			errorMessage.classList.add(...classlst);
			errorMessage.innerHTML = `${exctri} File size exceeds 1MB. Please select a smaller file.`;
			fileNameDisplay.textContent = '';
			fileInput.value = '';
			clear_err_msg();
		}
	}
}

window.addEventListener('load', setupFileInput);

function dw_py() {
	animateIcon("fade-1", "fa-fade", 3000);
	var blob = new Blob([minifiedEditor.getValue()], {
		type: "text/x-python"
	});
	var dataUri = URL.createObjectURL(blob);
	var downloadLink = document.createElement("a");
	downloadLink.href = dataUri;
	downloadLink.download = (fileNameDisplay.textContent || "default.py").replace(/^ /, "").replace(/\.[^/.]+$/, "") + "_min.py";
	downloadLink.click();
	URL.revokeObjectURL(dataUri);
}

document.getElementById('dw').addEventListener('click', dw_py);

async function Sharelink() {
	animateIcon("fade-2", "fa-fade", 3000);
	const editorContent = minifiedEditor.getValue();
	const fileName = (fileNameDisplay.textContent || "default.py").replace(/^ /, "").replace(/\.[^/.]+$/, "") + "_min.py";

	try {
		const response = await fetch('https://file.io/?expires=2w', {
			method: 'POST',
			body: createFormData(editorContent, fileName)
		});

		const result = await response.json();

		if (result.success) {
			const fileLink = result.link;

			document.getElementById('downloadLink').style.display = 'block';
			overlay.classList.remove("hidden");
			popup.classList.remove("hidden");
			document.body.classList.add("overflow-y-hidden");
			document.body.classList.remove("overflow-y-scroll");
			file_Link.classList.add('hidden');
			copy_msg.textContent = '';
			help_msg.innerHTML = '';
			fileLink_load.innerHTML = `<span class="font-bold text-gray-500">loading <i class="fa-solid fa-spinner fa-spin-pulse"></i></span>`;
			setTimeout(() => {
				copy_msg.innerHTML = 'Tap to copy <i class="fa-solid fa-copy"></i>';
				link_newtab.href = fileLink;
				link_newtab.classList.add('text-white', 'bg-blue-700', 'hover:bg-blue-800', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'dark:bg-blue-600', 'dark:hover:bg-blue-700');
				link_newtab.innerHTML = ` <i class="fa-solid fa-up-right-from-square"></i>`;
				link_newtab.target = "_blank";
				link_newtab.title = 'Open in new tab';
				orscan.innerHTML = `or Scan <i class="fa-solid fa-expand"></i>`;
				help_msg.innerHTML = `<i class="fas fa-question-circle text-blue-500 text-2xl"></i><div class="help-content"><p class="select-none text-sm text-gray-700">Python file will be deleted after download.<br> Expires on <span class="font-bold">${new Date(result.expires).toLocaleDateString('en-US', dateformat)}</span></p></div>`;
				orscan.classList.add('select-none', 'block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
				close_Popup.classList.remove('hidden');
				qrCode.style.textAlign = '-moz-center';
				qrCode.style.textAlign = '-webkit-center';
				qrCode.style.background = 'rgb(255, 255, 255)';
				qrCode.classList.add('ml-12', 'p-2', 'mr-12', 'mt-2');
				file_Link.classList.remove('hidden');
				fileLink_load.innerHTML = '';
				displayQRCode(fileLink);
				qrCode.classList.remove('inline');
				file_Link.href = fileLink;
				file_Link.value = fileLink;
			}, 1500);
		} else {
			console.log('Error generating file link:', result.message || 'Unknown error');
		}
	} catch (error) {
		console.error('Error during fetch request:', error);
	}
}

shareButton.addEventListener('click', Sharelink);

function createFormData(content, fileName) {
	shuffleArray(sentences);
	const formData = new FormData();

	const blob = new Blob([content], {
		type: 'application/x-python'
	});

	formData.append('file', blob, fileName);
	formData.append('description', `Python Minifier - Glad432 (glad432.github.io)\n${sentences[0]}`);

	return formData;
}

function displayQRCode(fileLink) {
	const qr = new QRCode(qrCode, {
		text: fileLink,
		width: 128,
		height: 128,
		correctLevel: QRCode.CorrectLevel.H,
	});

}

function closePopup() {
	qrCode.classList.remove('ml-12', 'p-2', 'mr-12', 'mt-2');
	orscan.classList.remove('select-none', 'block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
	link_newtab.classList.remove('text-white', 'bg-blue-700', 'hover:bg-blue-800', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'dark:bg-blue-600', 'dark:hover:bg-blue-700');
	qrCode.style.textAlign = '';
	qrCode.style.background = '';
	close_Popup.classList.add('hidden');
	overlay.classList.add("hidden");
	popup.classList.add("hidden");
	document.body.classList.remove("overflow-y-hidden");
	document.body.classList.add("overflow-y-scroll");
	qrCode.innerHTML = '';
	fileLink_load.innerHTML = '';
	file_Link.value = '';
	copy_msg.innerHTML = '';
	orscan.innerHTML = '';
	help_msg.innerHTML = '';
	link_newtab.innerHTML = '';
	link_newtab.href = '';
	link_newtab.target = '';

}
close_Popup.addEventListener('click', closePopup);

async function copyfilelink() {
	await navigator.clipboard.writeText(file_Link.value);
	if (cpyTimeout1) {
		clearTimeout(cpyTimeout1);
	}
	copy_msg.innerHTML = 'Copied <i class="fa-solid fa-copy fa-fade"></i>';
	cpyTimeout1 = setTimeout(() => {
		copy_msg.innerHTML = 'Tap to copy <i class="fa-solid fa-copy"></i>';
		cpyTimeout1 = null;
	}, 3000);
}
file_Link.addEventListener('click', copyfilelink);

sourceEditor.on("change", function(editor) {
	document.getElementById("source").value = editor.getValue();
});

sourceEditor.on("change", updateLineCount);

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

function updateLineCount() {
	document.getElementById("line-count").textContent = `Line Count: ${sourceEditor.lineCount()}`;
	document.getElementById("text-size").textContent = (new TextEncoder().encode(sourceEditor.getValue()).length / 1024).toFixed(3) + " kB";
}

function updateLineCount_out() {
	document.getElementById("line-count-out").textContent = `Line Count: ${minifiedEditor.lineCount()}`;
}

minifiedEditor.on("change", updateLineCount_out);

updateLineCount_out();

function initializeMinifier() {
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

	async function copyClick() {
		try {
			await navigator.clipboard.writeText(minifiedEditor.getValue());
			if (cpyTimeout0) {
				clearTimeout(cpyTimeout0);
			}
			copyButton.innerHTML = `Copied <i class="fa-solid fa-clipboard fa-fade"></i>`;
			cpyTimeout0 = setTimeout(() => {
				copyButton.innerHTML = `Copy <i class="fa-solid fa-clipboard"></i>`;
				cpyTimeout0 = null;
			}, 2500);
		} catch (error) {
			console.error(`Copy failed:, ${error}`);
		}
	}

	async function minifyClick() {
		minifyButton.disabled = false;
		shareButton.disabled = true;
		copyButton.disabled = true;
		dwButton.disabled = true;
		selectallopt.disabled = true;
		unselectallopt.disabled = true;
		selectallopt.classList.add("cursor-not-allowed");
		unselectallopt.classList.add("cursor-not-allowed");

		minifiedEditor.setValue('');
		animateIcon("fade-0", "fa-fade", 1500);
		minifiedSizeSpan.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading....`;

		if (sourceEditor.getValue() !== "") {
			try {
				const response = await fetch("https://api.python-minifier.com/minify?" + build_query(), {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain'
					},
					body: document.getElementById('source').value
				});

				if (response.ok) {
					const minified = await response.text();
					minifiedEditor.setValue(minified);
					minifiedSizeSpan.textContent = `${(minified.length / 1024).toFixed(3)}  kB`;
					copyButton.disabled = false;
					shareButton.disabled = false;
					dwButton.disabled = false;

				} else {
					copyButton.disabled = true;
					shareButton.disabled = true;
					dwButton.disabled = true;
					minifiedSizeSpan.innerHTML = `${excir} Error`;
				}

			} catch {
				shareButton.disabled = true;
				copyButton.disabled = true;
				dwButton.disabled = true;
				minifiedSizeSpan.innerHTML = `${excir} Something went wrong!!`;
			}
		} else {
			minifiedSizeSpan.textContent = "Enter Code";
		}

		selectallopt.disabled = false;
		unselectallopt.disabled = false;
		selectallopt.classList.remove("cursor-not-allowed");
		unselectallopt.classList.remove("cursor-not-allowed");
		minifyButton.disabled = false;

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
			element.addEventListener('change', function() {
				minifiedEditor.setValue('');
			});
		}
	});

	minifyButton.disabled = false;

}

initializeMinifier();

function clearSource() {
	animateIcon("fade-5", "fa-fade", 1500);
	shareButton.disabled = true;
	dwButton.disabled = true;
	copyButton.disabled = true;

	fileNameDisplay.classList.remove(...classlst);
	fileNameDisplay.textContent = '';

	errorMessage.classList.remove(...classlst);
	errorMessage.textContent = '';

	fileInput.value = '';

	document.getElementById("source").textContent = "";

	minifiedEditor.setValue("");

	sourceEditor.setValue('');

	minifiedSizeSpan.textContent = "0.000 kB";
	fileLinkInput.value = "";
}

document.getElementById('rm').addEventListener('click', clearSource);

function animateIcon(fade, fade_class, fade_dur) {
	if (aniTimeout) {
		clearTimeout(aniTimeout);
	}
	var ani_icon = document.getElementById(fade);

	ani_icon.classList.add(fade_class);

	aniTimeout = setTimeout(() => {
		ani_icon.classList.remove(fade_class);
		aniTimeout = null;
	}, fade_dur);
}

function clear_err_msg() {
	if (errorTimeout) {
		clearTimeout(errorTimeout);
	}

	errorTimeout = setTimeout(() => {
		errorMessage.classList.remove(...classlst);
		errorMessage.innerHTML = "";
		errorTimeout = null;
	}, 3500);
}

function toggleContent1() {
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + 'px';
	}
}
document.getElementById('toggleContent1').addEventListener('click', toggleContent1);

function tickAllAndSetGlobals() {
	checkboxes.forEach(function(checkbox) {
		checkbox.checked = true;
	});

	preservedGlobalsInput.value = 'handler';
}
selectallopt.addEventListener('click', tickAllAndSetGlobals);

function resetOptions() {
	checkboxes.forEach(function(checkbox) {
		checkbox.checked = false;
	});

	preservedGlobalsInput.value = 'handler';

	document.querySelectorAll('input[type="text"]:not(#preserve_globals)').forEach(function(textField) {
		textField.value = '';
	});
}
unselectallopt.addEventListener('click', resetOptions);

function input_from_url() {
	animateIcon("fade-4", "fa-fade", 1000);
	var inputContainer = document.getElementById("inputContainer");
	inputContainer.classList.toggle("hidden");
	inputContainer.classList.toggle("flex");
}

document.addEventListener("DOMContentLoaded", function() {
	function loadFileContent(fileUrl) {
		fetch(fileUrl)
			.then((response) => {
				if (!response.ok) {
					sourceEditor.setValue("");
				}

				const contentDisposition = response.headers.get("content-disposition");
				const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
				const fileName = fileNameMatch ? fileNameMatch[1] : fileUrl.split('/').pop();

				fileNameDisplay.innerHTML = `${code_file} ${fileName}`;
				fileNameDisplay.classList.add(...classlst0);

				const contentLength = response.headers.get("content-length");
				if (contentLength && parseInt(contentLength, 10) > maxFileSizeInBytes) {
					throw new Error(`File size exceeds 1MB limit`);
				}

				return response.text();
			})
			.then((data) => {
				sourceEditor.setValue(data);
			})
			.catch((error) => {
				fileNameDisplay.innerHTML = "";
				fileNameDisplay.classList.remove(...classlst0);
				errorMessage.classList.add(...classlst);
				errorMessage.innerHTML = `${exctri} ${error.message}`;
				clear_err_msg();
			});
	}

	function load_file() {
		var fileLink = fileLinkInput.value.trim();
		if (fileLinkInput.value === "" || ((/^[^\s\d]+$/.test(fileLink)) && !(/\.[a-zA-Z]{2,}$/.test(fileLink)))) {
			fileNameDisplay.innerHTML = "";
			fileNameDisplay.classList.remove(...classlst0);
			clear_err_msg();
		} else if (!(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(fileLink))) {
			errorMessage.classList.add(...classlst);
			errorMessage.innerHTML = `${exctri} Please enter a valid URL starting with "https://"`;
			clear_err_msg();
			fileNameDisplay.innerHTML = "";
			fileNameDisplay.classList.remove(...classlst0);
		} else if (/\.(py)$/.test(fileLink.toLowerCase())) {
			animateIcon("fade-3", "fa-fade", 1500);
			loadFileContent(fileLink);
		} else {
			fileNameDisplay.innerHTML = "";
			fileNameDisplay.classList.remove(...classlst0);
			errorMessage.classList.add(...classlst);
			errorMessage.innerHTML = `${exctri} Please enter a valid .py file link`;
			clear_err_msg();
		}
	}

	document.getElementById("load_File").addEventListener("click", load_file);
});
document.getElementById("from_url").addEventListener("click", input_from_url);
