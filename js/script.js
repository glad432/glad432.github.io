const minifyButton = document.getElementById('minify');
const copyButton = document.getElementById('copy');
const anitext = document.getElementById("anitext");
const errorMessage = document.getElementById('errmsg');
const pysource = document.getElementById('source');
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
const inputContainer = document.getElementById("inputContainer");
const fileLinkInput = document.getElementById("fileLinkInput");
const savefilebtn = document.getElementById("savefilename");
const editfilename = document.getElementById('editfileName');
const edit_msg = document.getElementById('editmsg');
const inputBtnIcon = document.getElementById("input-icon");
const selectallopt = document.getElementById('selectall');
const unselectallopt = document.getElementById('Unselectall');
const preserve_globals = document.getElementById('preserve_globals');
const preserve_locals = document.getElementById('preserve_locals');
var content = document.querySelector('.content-ll');
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
let errorTimeout, cpyTimeout0, cpyTimeout1, readonlyTimeout, sourceEditor, minifiedEditor;
const maxFileSizeInBytes = 1 * 1024 * 1024;
const excir = `<i class="fa-solid fa-circle-exclamation"></i>`;
const exctri = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
const code_file = `<i class="fa-solid fa-file-code self-center pr-2"></i>`;
const classlst = ['select-none', 'font-bold', 'bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded', 'max-w-fit', 'mt-4'];
const classlst0 = ['select-none', 'font-bold', 'bg-green-500', 'text-white', 'py-1', 'px-2', 'rounded', 'max-w-fit', 'whitespace-nowrap', 'inline-flex', 'overflow-auto', 'mt-4'];

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

const fontSizeMap = {
	pc: 14,
	tablet: 14,
	mobile: 12,
};

const features = [{
		text: 'Efficiency',
		color: '#4CAF50'
	},
	{
		text: 'Safety',
		color: '#2196F3'
	},
	{
		text: 'Quick',
		color: '#FF9800'
	},
	{
		text: 'Speed',
		color: '#673AB7'
	},
	{
		text: 'Reliability',
		color: '#F44336'
	},
	{
		text: 'Protection',
		color: '#009688'
	},
	{
		text: 'Robust',
		color: '#C775C9'
	}
];

var options = [
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

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

shuffleArray(features);

const typewriter = new Typewriter(anitext, {
	loop: true,
	delay: 50,
});

features.forEach((feature, index) => {
	typewriter
		.pauseFor(1000)
		.deleteAll()
		.typeString(`<span style="color: ${feature.color}">${feature.text}</span>`)
		.pauseFor(1000)
		.callFunction(() => {
			if (index === features.length - 1) {
				typewriter.stop();
			}
		});
});

window.addEventListener("load", () => {
	typewriter.start();
})

document.getElementById("year").textContent = new Date().getFullYear().toString();

require.config({
	paths: {
		'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.46.0/min/vs'
	}
});
require(['vs/editor/editor.main'], () => {
	sourceEditor = monaco.editor.create(document.getElementById('editor'), {
		value: pysource.value,
		language: 'python',
		minimap: {
			enabled: false
		},
		theme: 'vs',
		matchBrackets: 'always',
		fontFamily: 'Source Code Pro',
		renderValidationDecorations: 'on',
		scrollbar: {
			vertical: 'visible',
			horizontal: 'visible'
		},
		fontWeight: 'bold',
		formatOnPaste: true,
		semanticHighlighting: true,
		folding: true,
		cursorBlinking: 'smooth',
		cursorSmoothCaretAnimation: true,
		cursorStyle: 'line',
	});
	minifiedEditor = monaco.editor.create(document.getElementById('minified'), {
		language: 'python',
		minimap: {
			enabled: false
		},
		theme: 'vs',
		matchBrackets: 'always',
		fontFamily: 'Source Code Pro',
		renderValidationDecorations: 'on',
		scrollbar: {
			vertical: 'visible',
			horizontal: 'visible'
		},
		fontWeight: 'bold',
		semanticHighlighting: true,
		folding: true,
		cursorBlinking: 'smooth',
		cursorSmoothCaretAnimation: true,
		cursorStyle: 'line',
		readOnly: true,
	});
	document.getElementById("darkModeToggle").addEventListener("change", setTheme)
	window.addEventListener("load", setTheme)
	sourceEditor.onDidChangeModelContent(() => {
		document.getElementById('line-count').textContent = `Line Count: ${sourceEditor.getModel().getLineCount()}`;
		document.getElementById('text-size').textContent = `${(sourceEditor.getModel().getValue().length / 1024).toFixed(3)} Kb`;
	});
	minifiedEditor.onDidChangeModelContent(() => {
		document.getElementById('line-count-out').textContent = `Line Count: ${minifiedEditor.getModel().getLineCount()}`;
		minifiedSizeSpan.textContent = `${(minifiedEditor.getModel().getValue().length / 1024).toFixed(3)} Kb`;
	});
});

function setTheme() {
	darkmode = localStorage.getItem("darkMode");
	if (darkmode === "true") {
		sourceEditor.updateOptions({
			theme: 'vs-dark'
		});
	} else {
		sourceEditor.updateOptions({
			theme: 'vs'
		});
	}
}

function getFontSize() {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (width <= 600) {
		return fontSizeMap.mobile;
	} else if (width > 600 && width <= 1024) {
		return fontSizeMap.tablet;
	} else {
		return fontSizeMap.pc;
	}
};

function isMobile() {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return width <= 600;
};

window.addEventListener('load', () => {
	sourceEditor.updateOptions({
		fontSize: getFontSize()
	});
	minifiedEditor.updateOptions({
		fontSize: getFontSize()
	});
	if (isMobile()) {
		sourceEditor.updateOptions({
			folding: false
		});
		minifiedEditor.updateOptions({
			folding: false
		});
	} else if (!isMobile()) {
		sourceEditor.updateOptions({
			folding: true
		});
		minifiedEditor.updateOptions({
			folding: true
		});
	}
	sourceEditor.onDidChangeModelContent(async () => {
		if ((new Blob([sourceEditor.getModel().getValue()])).size / maxFileSizeInBytes > 1) {
			sourceEditor.getModel().setValue(await truncateCode(sourceEditor.getModel().getValue()));
			var totalLines = sourceEditor.getModel().getLineCount();
			sourceEditor.setPosition({
				lineNumber: totalLines,
				column: sourceEditor.getModel().getLineMaxColumn(totalLines)
			});
			sourceEditor.revealLineInCenter(Math.max(totalLines - 5, 1));
			handleErrorMessage(`${exctri} Maximum Size limit (1MB) reached!`);
		}
		pysource.value = sourceEditor.getModel().getValue();
	});

});

function truncateCode(content) {
	var pyblob = new Blob([content]);
	if (pyblob.size > maxFileSizeInBytes) {
		return new Promise(resolve => {
			var pyreader = new FileReader();
			pyreader.onloadend = () => {
				resolve(pyreader.result);
			};
			pyreader.readAsText(pyblob.slice(0, maxFileSizeInBytes));
		});
	}
	return Promise.resolve(content);
}

function setupFileInput() {
	function dragpy(event) {
		const droppedFile = event.dataTransfer.files[0];
		loadfiledit()
		loadeditbtn();
		if (droppedFile) {
			if (droppedFile.name.toLowerCase().endsWith('.py')) {
				handleErrorMessage();
				handleFilename(`${code_file} ${droppedFile.name}`);
				handleFile(droppedFile);
			} else {
				handleFilename();
				handleErrorMessage(`${exctri} Invalid file format. Please select a .py file.`);
			}
		}
	}

	fileInput.addEventListener('change', (event) => {
		const selectedFile = event.target.files[0];
		loadfiledit()
		loadeditbtn();
		if (selectedFile) {
			if (selectedFile.name.toLowerCase().endsWith('.py')) {
				handleErrorMessage();
				handleFilename(`${code_file} ${selectedFile.name}`);
				handleFile(selectedFile);
			} else {
				dwButton.disabled = true;
				shareButton.disabled = true;
				copyButton.disabled = true;
				handleFilename();
				handleErrorMessage(`${exctri} Invalid file format. Please select a .py file.`);
				fileInput.value = '';
			}
		}
	});

	dropArea.addEventListener('click', () => {
		fileInput.click();
	});

	document.addEventListener('dragover', (event) => {
		event.preventDefault();
	});

	document.addEventListener('drop', (event) => {
		event.preventDefault();
		dragpy(event)
	});

	dropArea.addEventListener('drop', (event) => {
		event.preventDefault();
		dragpy(event)
	});

	function handleFile(file) {
		if (file.size <= maxFileSizeInBytes) {
			const reader = new FileReader();
			reader.onload = (e) => {
				sourceEditor.getModel().setValue(e.target.result);
				sourceEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
				handleErrorMessage();
			};
			reader.readAsText(file);
		} else {
			handleFilename();
			handleErrorMessage(`${exctri} File size exceeds 1MB. Please select a smaller file.`);
			fileInput.value = '';
		}
	}
}

window.addEventListener('load', setupFileInput);

function dw_py() {
	animateIcon("fade-1", "fa-fade", 3000);
	var blob = new Blob([minifiedEditor.getModel().getValue()], {
		type: "text/x-python"
	});
	var dataUri = URL.createObjectURL(blob);
	var downloadLink = document.createElement("a");
	downloadLink.href = dataUri;
	downloadLink.download = (fileNameDisplay.textContent || "default.py").replace(/^ /, '').replace(/\.[^/.]+$/, '') + "_min.py";
	downloadLink.click();
	URL.revokeObjectURL(dataUri);
}

document.getElementById('dw').addEventListener('click', dw_py);

function validateCH(event) {
	animateIcon("fade-2", "fa-fade", 2000);
	event.preventDefault();
	hcaptcha.execute();
}

async function Sharelink(token) {
	animateIcon("fade-2", "fa-fade", 3000);
	const editorContent = minifiedEditor.getModel().getValue();
	const fileName = (fileNameDisplay.textContent || "default.py").replace(/^ /, '').replace(/\.[^/.]+$/, '') + "_min.py";
	try {
		const response = await fetch('https://file.io/?expires=2w', {
			method: 'POST',
			body: createFormData(editorContent, fileName)
		});
		const result = await response.json();
		if (result.success) {
			const fileLink = result.link;
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
				link_newtab.classList.add('text-white', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'bg-blue-600', 'hover:bg-blue-700');
				link_newtab.innerHTML = ` <i class="fa-solid fa-up-right-from-square"></i>`;
				link_newtab.target = "_blank";
				link_newtab.title = 'Open in new tab';
				orscan.innerHTML = `or Scan <i class="fa-solid fa-expand"></i>`;
				help_msg.innerHTML = `<i class="fas fa-question-circle text-blue-500 text-2xl"></i><div class="help-content"><p class="select-none text-sm text-center text-gray-700">Python file will be deleted after download.<br> Expires on <span class="font-bold">${new Date(result.expires).toLocaleDateString('en-US', dateformat)}</span></p></div>`;
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
			minifiedSizeSpan.textContent = 'Error generating share link';
		}
	} catch {
		minifiedSizeSpan.textContent = 'Error during fetch request';
	}
}

shareButton.addEventListener('click', validateCH);

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
	animateIcon("closePopup", "fa-fade", 700);
	setTimeout(() => {
		qrCode.classList.remove('ml-12', 'p-2', 'mr-12', 'mt-2');
		orscan.classList.remove('select-none', 'block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
		link_newtab.classList.remove('text-white', 'bg-blue-600', 'hover:bg-blue-700', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5');
		qrCode.style.textAlign = '';
		qrCode.style.background = '';
		close_Popup.classList.add('hidden');
		overlay.classList.add("hidden");
		popup.classList.add("hidden");
		document.body.classList.remove("overflow-y-hidden");
		document.body.classList.add("overflow-y-scroll");
		qrCode.innerHTML = '';
		qrCode.title = '';
		fileLink_load.innerHTML = '';
		file_Link.value = '';
		copy_msg.innerHTML = '';
		orscan.innerHTML = '';
		help_msg.innerHTML = '';
		link_newtab.innerHTML = '';
		link_newtab.href = '';
		link_newtab.target = '';
	}, 800)
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

function initializeMinifier() {
	function build_query() {
		let query = options.map(option => `${option}=${document.getElementById(option).checked}`).join('&');
		if (preserve_globals) {
			query += '&preserve_globals=' + encodeURIComponent(preserve_globals);
		}
		if (preserve_locals) {
			query += '&preserve_locals=' + encodeURIComponent(preserve_locals);
		}
		return query;
	}

	async function copyClick() {
		await navigator.clipboard.writeText(minifiedEditor.getModel().getValue());
		const lastLineNumber = minifiedEditor.getModel().getLineCount();
		minifiedEditor.revealLine(lastLineNumber);
		minifiedEditor.setSelection({
			startLineNumber: 1,
			startColumn: 1,
			endLineNumber: minifiedEditor.getModel().getLineCount(),
			endColumn: minifiedEditor.getModel().getLineMaxColumn(minifiedEditor.getModel().getLineCount())
		});
		if (cpyTimeout0) {
			clearTimeout(cpyTimeout0);
		}
		copyButton.innerHTML = `Copied <i class="fa-solid fa-clipboard fa-fade"></i>`;
		cpyTimeout0 = setTimeout(() => {
			copyButton.innerHTML = `Copy <i class="fa-solid fa-clipboard"></i>`;
			cpyTimeout0 = null;
		}, 2500);
	}

	async function minifyClick() {
		minifyButton.disabled = false;
		shareButton.disabled = true;
		copyButton.disabled = true;
		dwButton.disabled = true;
		selectallopt.disabled = true;
		unselectallopt.disabled = true;
		options.push("preserve_locals", "preserve_globals");
		options.forEach(option => {
			const checkbox = document.getElementById(option);
			checkbox.classList.add("cursor-not-allowed");
			checkbox.disabled = true;
		});
		selectallopt.classList.add("cursor-not-allowed");
		unselectallopt.classList.add("cursor-not-allowed");
		minifiedEditor.setValue('');
		animateIcon("fade-0", "fa-fade", 1500);
		minifiedSizeSpan.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading....`;
		if (sourceEditor.getModel().getValue() !== '') {
			try {
				const response = await fetch("https://api.python-minifier.com/minify?" + build_query(), {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain'
					},
					body: pysource.value
				});
				if (response.ok) {
					const minified = await response.text();
					minifiedEditor.getModel().setValue(minified);
					minifiedEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
					minifiedSizeSpan.textContent = `${(minified.length / 1024).toFixed(3)} kB`;
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
		options.forEach(option => {
			const checkbox = document.getElementById(option);
			checkbox.classList.remove("cursor-not-allowed");
			checkbox.disabled = false;
		});
		selectallopt.classList.remove("cursor-not-allowed");
		unselectallopt.classList.remove("cursor-not-allowed");
		minifyButton.disabled = false;
	}

	minifyButton.addEventListener('click', minifyClick);
	copyButton.addEventListener('click', copyClick);
	minifyButton.disabled = false;
}

window.addEventListener("DOMContentLoaded", initializeMinifier);

function clearSource() {
	animateIcon("fade-5", "fa-fade", 1500);
	shareButton.disabled = true;
	dwButton.disabled = true;
	copyButton.disabled = true;
	handleFilename();
	handleErrorMessage();
	fileInput.value = '';
	pysource.textContent = '';
	minifiedEditor.getModel().setValue('');
	sourceEditor.getModel().setValue('');
	fileLinkInput.value = '';
	minifiedSizeSpan.textContent = '0.000 kB';
}

document.getElementById('rm').addEventListener('click', clearSource);

function loadfiledit() {
	fileNameDisplay.classList.remove('hidden');
	editfilename.classList.add('hidden');
	savefilebtn.classList.add("hidden");
	inputBtnIcon.classList.add("hidden-imp");
}

function loadeditbtn() {
	inputBtnIcon.classList.add("hidden-imp");
	edit_msg.classList.remove("hidden-imp")
	edit_msg.innerHTML = `<i id="fade-8" class="fa-regular fa-pen-to-square fa-lg"></i>`;
	edit_msg.classList.add('pl-2', 'pb-1', 'cursor-pointer', 'text-blue-600');
	edit_msg.title = `Click to edit py file name`;
}

function makeEditable() {
	editfilename.style.width = `${fileNameDisplay.offsetWidth - 28}px`;
	animateIcon("fade-8", "fa-beat-fade", 400);
	setTimeout(() => {
		edit_msg.classList.add("hidden-imp")
		savefilebtn.classList.remove("hidden");
		fileNameDisplay.classList.add('hidden');
		editfilename.classList.remove('hidden');
		inputBtnIcon.classList.remove("hidden-imp");
		editfilename.value = fileNameDisplay.textContent.trim();
		editfilename.focus();
	}, 500);
}

edit_msg.addEventListener("click", makeEditable);

function saveChanges() {
	var cleanedStrnopy = editfilename.value.replace(/\.py$/, '');
	if (!(/^\s+$/.test(cleanedStrnopy)) && (cleanedStrnopy.length >= 1 && cleanedStrnopy.length <= 256)) {
		var cleanedString = cleanedStrnopy.replace(/[^a-zA-Z0-9,\s.]|,(?![a-zA-Z])|\.(?![a-zA-Z]|py$)/g, "_");
		if (cleanedString.indexOf('.py', cleanedString.indexOf('.py') + 1) !== -1) {
			cleanedString = cleanedString.replace(/\.py(?!.*\.py)/, '');
		}
		animateIcon("savefilename", "fa-fade", 800);
		setTimeout(() => {
			editfilename.value = cleanedString;
			handleFilename(`${code_file} ${cleanedString}.py`);
			loadfiledit();
		}, 1000);
	}
}

savefilebtn.addEventListener("click", saveChanges);
editfilename.addEventListener("keyup", (event) => {
	if (event.key === 'Enter') {
		saveChanges();
	}
});

function animateIcon(fade, fade_class, fade_dur) {
	let aniTimeout;
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

function handleFilename(text) {
	if (text === undefined) {
		sourceEditor.getModel().setValue('');
		minifiedEditor.getModel().setValue('');
		edit_msg.textContent = '';
		fileNameDisplay.textContent = '';
		fileNameDisplay.classList.remove(...classlst0);
	} else {
		loadeditbtn();
		fileNameDisplay.innerHTML = text;
		fileNameDisplay.classList.add(...classlst0);
	}
}

function handleErrorMessage(text) {
	if (text === undefined) {
		errorMessage.textContent = '';
		errorMessage.classList.remove(...classlst);
	} else {
		if (errorTimeout) {
			clearTimeout(errorTimeout);
		}
		errorMessage.innerHTML = text;
		errorMessage.classList.add(...classlst);
		errorTimeout = setTimeout(() => {
			errorMessage.classList.remove(...classlst);
			errorMessage.innerHTML = '';
			errorTimeout = null;
		}, 3500);
	}
}

function toggleContent1() {
	animateIcon("toggleContent1", "fa-fade", 1000);
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + 'px';
	}
}

document.getElementById('toggleContent1').addEventListener('click', toggleContent1);

function tickAllAndSetGlobals() {
	animateIcon("selectall", "fa-fade", 800);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true;
	});
	preserve_globals.value = 'handler';
}

selectallopt.addEventListener('click', tickAllAndSetGlobals);

function resetOptions() {
	animateIcon("Unselectall", "fa-fade", 800);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});
	preserve_globals.value = 'handler';
	document.querySelectorAll('input[type="text"]:not(#preserve_globals)').forEach((textField) => {
		textField.value = '';
	});
}

unselectallopt.addEventListener('click', resetOptions);

function input_from_url() {
	animateIcon("fade-4", "fa-fade", 1000);
	setTimeout(() => {
		inputContainer.classList.toggle("hidden");
		inputContainer.classList.toggle("flex");
		fileLinkInput.focus();
	}, 500);
}

document.addEventListener("DOMContentLoaded", () => {
	async function loadFileContent(fileUrl) {
		try {
			const response = await fetch(fileUrl);
			if (!response.ok) {
				sourceEditor.getModel().setValue('');
			}
			const contentDisposition = response.headers.get("content-disposition");
			const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
			const fileName = fileNameMatch ? fileNameMatch[1] : fileUrl.split('/').pop();
			handleFilename(`${code_file} ${fileName}`);
			const contentLength = response.headers.get("content-length");
			if (contentLength && parseInt(contentLength, 10) > maxFileSizeInBytes) {
				throw new Error(`File size exceeds 1MB limit`);
			}
			const data = await response.text();
			sourceEditor.getModel().setValue(data);
			sourceEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
		} catch (error) {
			handleFilename();
			handleErrorMessage(`${exctri} ${error.message}`);
		}
	}

	function load_file() {
		var fileLink = fileLinkInput.value.trim();
		if (fileLinkInput.value.trim() === '' || ((/^[^\s\d]+$/.test(fileLink)) && !(/\.[a-zA-Z]{2,}$/.test(fileLink)))) {
			handleErrorMessage();
		} else if (!(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(fileLink))) {
			handleFilename();
			handleErrorMessage(`${exctri} Please enter a valid URL starting with "https://"`);
		} else if (/\.(py)$/.test(fileLink.toLowerCase())) {
			handleErrorMessage();
			animateIcon("fade-3", "fa-fade", 1500);
			loadfiledit()
			loadeditbtn();
			loadFileContent(fileLink);
		} else {
			handleFilename();
			handleErrorMessage(`${exctri} Please enter a valid .py file link`);
		}
	}

	document.getElementById("load_File").addEventListener("click", load_file);
	document.getElementById("sample_link").addEventListener("click", () => {
		const githubrawlink = "https:\/\/gist.githubusercontent.com\/glad432\/4d1935413e012cd54130a1fc6f31b4bf\/raw\/5f3aaae4b9a360b64a1146e6540804af4a91b7b1\/sample.py";
		if (fileLinkInput.value !== githubrawlink) {
			animateIcon("fade-6", "fa-bounce", 1000);
			fileLinkInput.value = githubrawlink;
			loadfiledit()
			loadeditbtn();
			load_file();
		}
	});
	fileLinkInput.addEventListener("keyup", (event) => {
		if (event.key === "Enter") {
			load_file();
		}
	})

	document.getElementById("clear_link").addEventListener("click", () => {
		if (fileLinkInput.value !== '') {
			fileLinkInput.value = '';
			loadfiledit()
			loadeditbtn();
			animateIcon("fade-7", "fa-fade", 1000);
		}
	});
});

document.getElementById("from_url").addEventListener("click", input_from_url);

function show_article() {
	animateIcon("rot-1", "fa-fade", 1000);
	const display_content = document.getElementById("display-content");
	const rotate_1 = document.getElementById("rot-1");
	display_content.classList.toggle("content");
	rotate_1.classList.toggle("fa-caret-down");
	display_content.classList.toggle("hidden");
	rotate_1.classList.toggle("fa-caret-up");
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("show-btn").addEventListener("click", show_article);
});

document.addEventListener('DOMContentLoaded', async () => {
	const response = await fetch("https://glad432.github.io/article/blog.json");
	const articleData = await response.json();
	document.getElementById('article').innerHTML = `<div id="display-content" class="hidden overflow-y-auto max-h-[100%]"><h1 class="sm:text-xl lg:text-3xl before:font-['Font_Awesome_6_Free'] before:content-['&#xf05a'] before:text-blue-500 before:pr-2 text-gray-600 text-left font-bold mb-4">${articleData?.article?.title}</h1>${articleData?.article?.sections.map(section => `<div class="mb-4"><h2 class="text-[15px] text-gray-500 before:font-['Font_Awesome_6_Free'] before:content-['&#xf219'] before:text-cyan-900 before:pr-2 lg:text-xl font-bold py-4">${section?.section_title}</h2><p class="text-[13px] lg:text-[15px]">${section?.section_content}</p></div>`).join('')}</div>`;
});
