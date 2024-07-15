const minifyButton = document.getElementById('minify');
const minifyAllBtn = document.getElementById('minifyAll');
const copyButton = document.getElementById('copy');
const aniText = document.getElementById("anitext");
const errorMessage = document.getElementById('errmsg');
const dwButton = document.getElementById('dw');
const shareButton = document.getElementById("share");
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const minifiedSize = document.getElementById('minified-size');
const fileLinkLoad = document.getElementById("fileLink-load");
const qrCode = document.getElementById("qrCode");
const copyMsg = document.getElementById('copy-msg');
const fileShareLink = document.getElementById("fileLink");
const closePopupOverlay = document.getElementById('closePopup');
const popup = document.getElementById("popup");
const shareOverlay = document.getElementById("overlay");
const typeOverlay = document.getElementById("type-overlay");
const orScan = document.getElementById('scantocopy');
const downloadLinkUrl = document.getElementById('downloadLinkurl');
const helpMsg = document.getElementById('help-msg');
const linkNewtab = document.getElementById("new_tab");
const inputContainer = document.getElementById("inputContainer");
const fileLinkInput = document.getElementById("fileLinkInput");
const darkModeToggle = document.getElementById("darkModeToggle");
const selectallopt = document.getElementById('selectall');
const resetOpt = document.getElementById('resetOpt');
const preserveGlobals = document.getElementById('preserve_globals');
const preserveLocals = document.getElementById('preserve_locals');
const fileTabs = document.getElementById('file-tabs');
const fileTabsOut = document.getElementById('file-tabs-out');
const fileTabsOverlay = document.getElementById("tabs-overlay");
const fileTabsOverlayOut = document.getElementById("tabs-overlay-out");
const filetabOutOne = document.getElementById("file-out-1");
const btnsOverlay = document.getElementById("btns-overlay");
const addNewTabBtn = document.getElementById("addNewTab");
const compressFileBtn = document.getElementById('CompressFile');
const compressProgress = document.getElementById('comProgress')
const compressProgressBar = document.getElementById('comProgressBar');
const compressProgressStatus = document.getElementById('comProgressStatus');
const codeRunBtn = document.getElementById("runCode");
const pyTerminal = document.getElementById("pyterminal");
const terminalText = document.getElementById("terminaltext");
const closeCompilerBtn = document.getElementById("closeCompiler");
const graphContainer = document.getElementById("graph-container");
const graphKbSize = document.getElementById("graphkbsize");
const graphLines = document.getElementById("graphlines");
var showOptionsContent = document.querySelector('.content-ll');
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
let errorTimeout, cpyTimeout0, cpyTimeout1, readonlyTimeout, typingTimeout, sourceEditor, minifiedEditor, darkModeEnabled;
let typingInProgress = false;
var sources = ['#PyFile-1'];
var sourcesOut = ['#PyFile-out-1'];
var currentTabIndex = 0;
var currentTabIndexOut = 0;
var pyCompileAtTabIndex = 0;
let startIndex = 0;
let isGetLines = false;
let jusDelete = false
let graph = null;
const defaultFilename = 'default.py';
const defaultContent = "#Empty Python file, Enter code to minify";
const maxFileSizeInBytes = 1 * 400 * 1024;
const excir = `<i class="fa-solid fa-circle-exclamation"></i>`;
const exctri = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
const codeFile = '<i class="fa-solid fa-file-code text-blue-600 pr-2"></i>';
const editFileNameIcon = '<i class="fa-solid fa-pen-to-square"></i>';
const classlst = ['font-bold', 'bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded', 'max-w-fit', 'mt-4', 'transition', 'opacity-100'];

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
		text: 'Quickness',
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

const typewriter = new Typewriter(aniText, {
	loop: true,
	delay: 50,
});

function typeFeatures() {
	features.forEach((feature, index) => {
		typewriter
			.pauseFor(1000)
			.deleteAll()
			.typeString(`<span style="color: ${feature.color}">${feature.text}</span>`)
			.pauseFor(1000)
			.callFunction(() => {
				if (index === features.length - 1) {
					typeFeatures();
				}
			});
	});
}

window.addEventListener("load", () => {
	typeFeatures();
	typewriter.start();
});

document.getElementById("year").textContent = new Date().getFullYear().toString();

async function initMonacoEditor() {
	await new Promise(resolve => {
		require.config({
			paths: {
				'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs'
			}
		});
		require(['vs/editor/editor.main'], () => resolve());
	});
	sourceEditor = monaco.editor.create(document.getElementById('editor'), {
		language: 'python',
		minimap: {
			enabled: false
		},
		theme: darkModeEnabled ? 'vs-dark' : 'vs',
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
		automaticLayout: true
	});
	minifiedEditor = monaco.editor.create(document.getElementById('minified'), {
		language: 'python',
		minimap: {
			enabled: false
		},
		theme: darkModeEnabled ? 'vs-dark' : 'vs',
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
		automaticLayout: true
	});
	sourceEditor.onDidChangeModelContent(() => {
		saveEditorContent();
		document.getElementById('line-count').textContent = `Lines: ${sourceEditor.getModel().getLineCount()}`;
		document.getElementById('text-size').textContent = `${(sourceEditor.getModel().getValueLength() / 1024).toFixed(3)} Kb`;
	});

	minifiedEditor.onDidChangeModelContent(() => {
		saveEditorContent(true);
		document.getElementById('line-count-out').textContent = `Lines: ${minifiedEditor.getModel().getLineCount()}`;
		minifiedSize.textContent = `${(minifiedEditor.getModel().getValueLength() / 1024).toFixed(3)} Kb`;
	});

	function typeInEditor() {
		if (typingInProgress) return;
		const typingPYcode = CryptoJS.AES.decrypt("U2FsdGVkX193pc0vAtJ5A6OWR/h1wgrCfeKfO/6qgjWA+pkCUbdIupXhCTFRoDR2n65EQf5blOu2I+RDW598wSH7M1e3zTH4XIA0Wcl8+qmoZKaiUJFKC3QaiT9gYtcEFOteoT/6uKl2b8kUNM+Dl2U+A5cezQFkURxj5xxIjCqgX1jcRLpLQY2LIOpV0IbA3GLbvaNuh1wDUUsvwnIx+vnNeYruSD2fOXKdz0Lfyn1bnYPA6BxSWrvRxbgoSXTBVAD4tlN19YxI14tUJdizCFsGAKkLvUtKecD9X72maj6ZzEhvoqVTwMwxGawFCzuUeAm8TyxTlfOrVWfVxPoQatCQ0dOsWqRUiVCY8HE+A/OiJ133mA0+l0W1wvkV9bHDqR1UzqP8VAyh8UPB2YMLYnHZVr+US3Bpgu+iczkl2vewGWtt2WJ991O+HsXGCj0tc6iWcwmPu2PaKfR8t0x1PLWYUfVo2lycMMgBCfjhQyIq61Bfhm9QHMisqlap6hE0k1QsBHZOoL9Q+yCslEM8Us0FkQP/KK07NBCKULM8H47aFac6sOBd1VxCw9k1nnA+L1gNeG8oDVu4leUf6bZjs6m0msJISL1plqZY5cCpjdhrcImSsdNGt1jqXV1p7QnwGgVMl9HuRK9AlzxLCA0YNLyXzGqQNJlbSVrzJYS2JgW0Xw0B9M6vL/0G7FygNn2FefvXfx/Pk1ImUqH1u5y6tiuEUYAnxATe7y2cGcHa1J+f4IEV7AeXTEc/zoSh3mhmze8Y6gQN23YEtD0Pxr+3+42FO1dS1zSy3Un9G4vbpgbAPdb29lP/fVUrHSVokEadqfmWDxbnNsg2kwbkb3SuCVhd95Ev+5k9b++oGzlJ4npthp7mczo0IuaYFAZv42t2dPvbI3B6noUaa1S5hXJz4AWvzXX/M5mNxTxmrTblhu1UfomDBgJPnV7Udz6f2yVsPlSsJwApJYykUiB2xPOwPaQl1Zu4j7JhsSgHo2oP2sJonUtVYV3ui1aHwdJIIDCJT0GxCajxjxlTpEVE/P5FEpWymIScnbZ6kEZiy41OagjHnDx+HsbrNn5z6hpGR6u3U8n1hIeE5mfWMBb6XXRurTGU6x1UYDWTTFviIhLCCK2u7ociPOpvYVuD499vA+MYzfKJy0Itjw4S6rd8Ftw0cGsaaY0VbETbchMMtAWN637HgCf6tssXZG0wnjcicVBHrelgKSp+v2rxjfvBtbkYRJTpKhNoT/M+lf8eMy3Ww9OP7G3W4iM71mv9PC9YCYSFehCWFCyUOaDbhslZHqnNrfCmGJSEELLFGb9nnx1EbCvuy5G5ewRtMYzFPRYk3Sf5BlF6AVbiOjgt70tExE8tToejh5gLHjaf4SAGIy24e0Q=", '4#>5p[:/v,o2q/(\\*=:6').toString(CryptoJS.enc.Utf8);
		if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			typeOverlay.classList.remove('!hidden');
			let index = 0;

			function type() {
				if (typingPYcode.length > index) {
					sourceEditor.trigger('', 'type', {
						text: typingPYcode[index]
					});
					index++;
					typingTimeout = setTimeout(type, 1);
				} else {
					typeOverlay.classList.add('!hidden');
					typingInProgress = false;
				}
			};
			type();
			typingInProgress = true;
		} else {
			typeOverlay.classList.add('!hidden');
			sourceEditor.getModel().setValue(typingPYcode);
		}
	}
	window.addEventListener("load", typeInEditor);
};

document.addEventListener('DOMContentLoaded', async () => {
	await initMonacoEditor();
});

function disableTyping() {
	clearTimeout(typingTimeout);
	typingInProgress = false;
	typeOverlay.classList.add('!hidden');
}

function setGraphTheme() {
	if (graph) {
		graph.updateOptions({
			theme: {
				mode: darkModeEnabled ? 'dark' : 'light'
			},
			xaxis: {
				axisTicks: {
					color: darkModeEnabled ? '#737373' : '#242424',
				}
			}
		});
		updateGraph();
	}
}

function setTheme() {
	if (typeof darkModeToggle !== 'undefined' && 'checked' in darkModeToggle) {
		darkModeEnabled = darkModeToggle.checked;
	} else {
		return;
	}

	const localStorageDarkMode = localStorage.getItem("darkMode");
	if (localStorageDarkMode !== 'light') {
		darkModeEnabled = localStorageDarkMode === 'true';
	}
	if (localStorageDarkMode === 'dark') {
		darkModeEnabled = localStorageDarkMode === 'true';
	}

	const vsTheme = darkModeEnabled ? 'vs-dark' : 'vs';
	if (sourceEditor && minifiedEditor) {
		sourceEditor.updateOptions({
			theme: vsTheme
		});
		minifiedEditor.updateOptions({
			theme: vsTheme
		});
		setGraphTheme();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	setTheme();
	darkModeToggle.addEventListener("change", setTheme);
	window.addEventListener("storage", (event) => {
		if (event.key === "darkMode") {
			setTheme();
		}
	});
});

window.addEventListener("load", setTheme);

function getFontSize() {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if (width <= 600) {
		return fontSizeMap.mobile;
	} else if (width > 600 && width <= 1024) {
		return fontSizeMap.tablet;
	} else {
		return fontSizeMap.pc;
	}
}

function isMobile() {
	const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return width <= 600;
}

function updateEditorOptions() {
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
			handleErrorMessage(`${exctri} Maximum Size limit (400kB) reached!`);
		}
	});

};

window.addEventListener('load', () => {
	if (sourceEditor && minifiedEditor) {
		updateEditorOptions();
	}
});
window.addEventListener('resize', () => {
	if (sourceEditor && minifiedEditor) {
		updateEditorOptions();
	}
});

async function truncateCode(content) {
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

async function codeCompile() {
	if (minifiedEditor.getModel().getValue() === '') {
		return;
	}
	const fileName = getCurrentTabName();
	let truncatedFileName = fileName.length >= 50 ? fileName.slice(0, 50) + ".py" : fileName;
	const code = minifiedEditor.getModel().getValue();
	try {
		const response = await fetch('https://python-compile.vercel.app/run', {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
			},
			body: code
		});
		if (!response.ok) {
			throw new Error('Network error');
		}

		const data = await response.json();
		pyCompileAtTabIndex = currentTabIndex;
		pyTerminal.classList.remove("hidden");
		terminalText.textContent = `[${new Date().toLocaleTimeString()}] ~/temp/${Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('')}$ python "${truncatedFileName.trim()}"\n${data.output.trim().length === 0 ? "Compiled but no output!" : data.output.trim()}`;
	} catch (error) {
		pyTerminal.classList.remove("hidden");
		terminalText.textContent = error || 'Error occurred while running the code. Please check your code and try again.';
	}
}

function clearPyComplier(jusDelete = false) {
	if (jusDelete || (pyCompileAtTabIndex === currentTabIndex && pyCompileAtTabIndex === currentTabIndexOut)) {
		pyTerminal.classList.add("hidden");
		terminalText.textContent = '';
	}
}

codeRunBtn.addEventListener("click", () => {
	if (minifiedEditor.getModel().getValue().trim() !== "") {
		animateIcon("fade-9", "fa-fade", 1000);
		codeCompile();
	}
});

closeCompilerBtn.addEventListener("click", () => {
	animateIcon("closeCompiler", "fa-fade", 1000);
	setTimeout(() => {
		clearPyComplier(true);
	}, 1100)
})

function validateFiles(files) {
	const validFiles = [];
	const invalidFiles = [];

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (file.name.toLowerCase().trim().endsWith('.py')) {
			validFiles.push(file);
		} else {
			invalidFiles.push(file);
		}
		fileInput.value = '';
	}

	if (invalidFiles.length > 0) {
		handleErrorMessage(`${exctri} Invalid file format. Please select only .py file(s).`);
	}

	return validFiles;
}

function fileContent(e) {
	const fileContent = e.target.result;
	if (fileContent.length === 0) {
		return defaultContent;
	} else {
		return fileContent;
	}
}

function setupFileInput() {
	function dragpy(event) {
		disableTyping();
		handleFiles(validateFiles(event.dataTransfer.files));
	}

	fileInput.addEventListener('change', (event) => {
		disableTyping();
		const pyFiles = [...event.target.files].filter(file => file.name.trim().toLowerCase().endsWith('.py'));
		if (pyFiles.length !== event.target.files.length) {
			handleErrorMessage(`${exctri} Invalid file format. Please select only .py file(s).`);
		} else {
			handleFiles(pyFiles);
		}
		fileInput.value = '';
	});

	dropArea.addEventListener('click', () => {
		fileInput.click();
	});

	document.addEventListener('dragover', (event) => {
		event.preventDefault();
	});

	document.addEventListener('drop', (event) => {
		event.preventDefault();
		dragpy(event);
	});

	dropArea.addEventListener('drop', (event) => {
		event.preventDefault();
		dragpy(event);
	});

	function handleFiles(files) {
		var fileCount = 0;

		Array.from(files).forEach((file) => {
			if (fileCount < (isMobile() ? 10 : 20)) {
				handleErrorMessage();
				handleFile(file);
				fileCount++;
			}
		});
	}

	function handleFile(file) {
		if (file.size <= maxFileSizeInBytes) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (sourceEditor.getModel().getValue().trim() !== '') {
					addEmptyTab();
				}

				sourceEditor.getModel().setValue(fileContent(e));
				sourceEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
				handleErrorMessage();
				updateNametoTab(file.name.trim());
				handleAutoScroll();
			};
			reader.readAsText(file);
		} else {
			handleErrorMessage(`${exctri} File size exceeds 400kb. Please select a smaller file.`);
			fileInput.value = '';
		}
	}
}

window.addEventListener('load', setupFileInput);

function downloadPyFile() {
	animateIcon("fade-1", "fa-fade", 3000);
	var blob = new Blob([minifiedEditor.getModel().getValue()], {
		type: "text/x-python"
	});
	var dataUri = URL.createObjectURL(blob);
	var downloadLink = document.createElement("a");
	downloadLink.href = dataUri;
	downloadLink.download = getCurrentTabName();
	downloadLink.click();
	URL.revokeObjectURL(dataUri);
}

dwButton.addEventListener('click', () => {
	if (minifiedEditor.getModel().getValue() !== "") {
		downloadPyFile();
	}
});

async function createShareLink(file, filename) {
	try {
		const response = await fetch('https://file.io/?expires=2d', {
			method: 'POST',
			body: createFormData(file, filename)
		});
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

function shareLink(content, filename, isCompressed, fileFormat) {
	handleTabsOverlay(false);
	fileLinkLoad.innerHTML = `<span class="font-bold text-gray-500">loading <i class="fa-solid fa-spinner fa-spin"></i></span>`;

	createShareLink(content, filename).then(result => {
		if (result.success) {
			const fileLink = result.link;
			shareOverlay.classList.remove("hidden");
			popup.classList.remove("hidden");
			document.body.classList.add("overflow-y-hidden");
			document.body.classList.remove("overflow-y-scroll");
			fileShareLink.classList.add('hidden');
			copyMsg.textContent = '';
			helpMsg.innerHTML = '';
			setTimeout(() => {
				copyMsg.innerHTML = 'Tap to copy <i class="fa-solid fa-copy"></i>';
				linkNewtab.href = fileLink;
				linkNewtab.classList.add('text-white', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'bg-blue-600', 'hover:bg-blue-700');
				linkNewtab.innerHTML = ` <i class="fa-solid fa-up-right-from-square"></i>`;
				linkNewtab.target = "_blank";
				linkNewtab.title = 'Open in new tab';
				orScan.innerHTML = `or Scan <i class="fa-solid fa-expand"></i>`;
				downloadLinkUrl.classList.remove('hidden');
				helpMsg.innerHTML = `<i class="fas fa-question-circle text-blue-500 text-2xl"></i><div class="help-content rounded-lg"><p class="text-sm text-center text-gray-700">${isCompressed ? (fileFormat.trim() !== "7z" ? fileFormat.toUpperCase().trim() : fileFormat.trim()) +' File' : 'Python file'} will be deleted after download.<br> Link expires on <span class="font-bold">${new Date(result.expires).toLocaleDateString('en-US', dateformat)}</span></p></div>`;
				orScan.classList.add('block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
				closePopupOverlay.classList.remove('hidden');
				qrCode.title = "Double Click to zoom-in and zoom-out";
				qrCode.classList.add('!bg-white', 'rounded-lg', 'border-2', 'border-dashed', 'border-black', 'w-36', 'ml-12', 'p-3', 'mr-12', 'mt-2');
				fileShareLink.classList.remove('hidden');
				fileLinkLoad.innerHTML = '';
				displayQRCode(fileLink);
				qrCode.classList.remove('inline');
				fileShareLink.href = fileLink;
				fileShareLink.value = fileLink;
				downloadLinkUrl.innerHTML = `Download ${fileFormat.trim().toLowerCase() !== "7z" ? fileFormat.toUpperCase().trim() : fileFormat.trim()} <i class="fa-solid fa-file-zipper"></i>`
				if (isCompressed) {
					downloadLinkUrl.onclick = () => {
						let mimeType;
						const fileType = fileFormat.trim().toLowerCase();

						if (fileType === 'zip') {
							mimeType = 'application/zip';
						} else if (fileType === 'rar') {
							mimeType = 'application/vnd.rar';
						} else if (fileType === '7z') {
							mimeType = 'application/x-7z-compressed';
						}

						const blob = new Blob([content], {
							type: mimeType
						});
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = filename.trim();
						a.classList.add("hidden");
						document.body.appendChild(a);
						a.click();
						window.URL.revokeObjectURL(url);
						document.body.removeChild(a);
					};
					downloadLinkUrl.classList.remove('hidden');
				} else {
					downloadLinkUrl.classList.add('hidden');
				}
			}, 1500);
		} else {
			throw new Error('Failed to create share link');
		}
	}).catch(error => {
		Swal.fire({
			html: `${excir} ${error.message}, try again later`,
			icon: "error",
			confirmButtonColor: "#179fff"
		});
		shareButton.disabled = false;
		compressFileBtn.disabled = false;
	});
}

qrCode.addEventListener('dblclick', () => {
	animateIcon("qrCode", "fa-fade", 300);
	setTimeout(() => {
		qrCode.classList.remove('w-39');
		qrCode.classList.toggle('w-60');
	}, 400)
});

shareButton.addEventListener('click', () => {
	if (minifiedEditor.getModel().getValue() !== "") {
		animateIcon("fade-2", "fa-fade", 3000);
		const content = minifiedEditor.getModel().getValue();
		shareButton.disabled = true;
		compressFileBtn.disabled = true;
		shareLink(content, getCurrentTabName(), false, 'python');
	}
});

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
	var qr = qrcode(10, 'M');
	qr.addData(fileLink.trim());
	qr.make();
	var imgTag = qr.createImgTag(6, 0);
	qrCode.innerHTML = imgTag;
}

function closePopup() {
	animateIcon("closePopup", "fa-fade", 700);
	setTimeout(() => {
		shareButton.disabled = false;
		compressFileBtn.disabled = false;
		qrCode.classList.remove('!bg-white', 'rounded-lg', 'border-2', 'border-dashed', 'border-black', 'w-36', 'ml-12', 'p-3', 'mr-12', 'mt-2');
		orScan.classList.remove('block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
		linkNewtab.classList.remove('text-white', 'bg-blue-600', 'hover:bg-blue-700', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5');
		closePopupOverlay.classList.add('hidden');
		shareOverlay.classList.add("hidden");
		downloadLinkUrl.classList.add('hidden');
		popup.classList.add("hidden");
		document.body.classList.remove("overflow-y-hidden");
		document.body.classList.add("overflow-y-scroll");
		qrCode.innerHTML = '';
		qrCode.title = '';
		fileLinkLoad.innerHTML = '';
		fileShareLink.value = '';
		copyMsg.innerHTML = '';
		orScan.innerHTML = '';
		helpMsg.innerHTML = '';
		linkNewtab.innerHTML = '';
		linkNewtab.href = '';
		linkNewtab.target = '';
		downloadLinkUrl.innerHTML = '';
	}, 800);
}

closePopupOverlay.addEventListener('click', closePopup);

async function copyfilelink() {
	await navigator.clipboard.writeText(fileShareLink.value);
	if (cpyTimeout1) {
		clearTimeout(cpyTimeout1);
	}
	copyMsg.innerHTML = 'Copied <i class="fa-solid fa-copy fa-fade"></i>';
	cpyTimeout1 = setTimeout(() => {
		copyMsg.innerHTML = 'Tap to copy <i class="fa-solid fa-copy"></i>';
		cpyTimeout1 = null;
	}, 3000);
}

fileShareLink.addEventListener('click', copyfilelink);

async function compressFiles(selectedIndices, sortedKeys, maxLength, fileName, fileFormat, addReadme, fastCompress) {
	let comPress = new JSZip();
	let nonEmptyFilesCount = 0;
	let fileOccurrences = {};
	let fileNamesList = 'The list of the python files minified:\n\n';
	const fileFormatFinal = fileFormat.trim().toLowerCase() !== "7z" ? fileFormat.toUpperCase().trim() : fileFormat.trim();

	function delay(time) {
		return new Promise((resolve) => {
			setTimeout(resolve, time);
		});
	}

	function getFileNameFromTabId(tabId) {
		const fileTab = document.getElementById(tabId);
		return fileTab ? fileTab.textContent.trim() : '';
	}

	const finalFileNames = selectedIndices.map(index => {
		const fileNameOut = getFileNameFromTabId(`file-out-${index + 1}`);
		const fileNameIn = getFileNameFromTabId(`file-${index + 1}`);
		let finalFileName = fileNameOut || fileNameIn;

		if (!finalFileName) {
			finalFileName = defaultFilename;
		}

		const occurrence = (fileOccurrences[finalFileName] || 0) + 1;
		fileOccurrences[finalFileName] = occurrence;
		if (occurrence > 1) {
			const extensionIndex = finalFileName.lastIndexOf('.');
			const basename = extensionIndex === -1 ? finalFileName : finalFileName.slice(0, extensionIndex);
			const extension = extensionIndex === -1 ? '' : finalFileName.slice(extensionIndex);
			finalFileName = `${basename}-${occurrence}${extension}`;
		}

		return finalFileName;
	});

	for (let i = 0; i < selectedIndices.length; i++) {
		const fileKey = sortedKeys[selectedIndices[i]];
		const fileName = finalFileNames[i];

		if (fileName) {
			const decryptedCode = CryptoJS.AES.decrypt(sessionStorage.getItem(fileKey), newKey).toString(CryptoJS.enc.Utf8);

			if (decryptedCode.trim() !== '') {
				comPress.file(fileName, decryptedCode);
				addReadme && (fileNamesList += `${nonEmptyFilesCount + 1}. ${fileName}\n`);
				nonEmptyFilesCount++;
				let totalCompressProgress = ((nonEmptyFilesCount / maxLength) * 100);
				compressProgressBar.value = totalCompressProgress;
				compressProgressStatus.innerText = `Compressing... ${totalCompressProgress.toFixed(2)}%`;
				compressProgress.classList.remove('hidden');

				await delay(fastCompress || (nonEmptyFilesCount > 10 ? 100 : 300));
			}
		}
	}

	if (nonEmptyFilesCount > 0 && addReadme) {
		fileNamesList += `\n${fileFormatFinal} File Created on: ${new Date().toLocaleString()}\nhttps://glad432.github.io`;
		comPress.file('readme.txt', fileNamesList);
	}

	compressProgressBar.value = 100;
	compressProgressStatus.textContent = `${fileFormatFinal} File Created`;
	setTimeout(() => {
		compressProgress.classList.add('hidden');
	}, 500);

	const compressedBlob = await comPress.generateAsync({
		type: 'blob',
		compression: 'DEFLATE'
	});

	setTimeout(() => {
		shareLink(compressedBlob, `${fileName.trim()}.${fileFormat.trim().toLowerCase()}`, true, fileFormat);
		compressFileBtn.disabled = false;
		disableDwSrCpBtn(false);
	}, 600);
}

function compressOptions() {
	const fragment = document.createDocumentFragment();
	const div1 = document.createElement('div');
	div1.className = 'justify-center flex flex-row my-5';
	['ZIP', 'RAR', '7z'].forEach(labelText => {
		const div = document.createElement('div');
		if (labelText !== "7z") {
			div.className = "mr-5";
		}
		const input = document.createElement('input');
		input.className = "mr-1"
		input.type = 'radio';
		input.id = `format-${labelText.toLowerCase()}`;
		input.name = 'file-format';
		input.value = labelText.toLowerCase();
		if (labelText === 'ZIP') {
			input.checked = true;
		}
		if (input.checked) {
			input.setAttribute('checked', '');
		}
		const label = document.createElement('label');
		label.className = 'active:font-bold focus:font-bold';
		label.setAttribute('for', `format-${labelText.toLowerCase()}`);
		label.textContent = labelText;
		div.appendChild(input);
		div.appendChild(label);
		div1.appendChild(div);
	});
	fragment.appendChild(div1);

	const divCenter = document.createElement('div');
	divCenter.className = 'justify-center flex mb-5 colorhandle';
	const div2 = document.createElement('div');
	div2.className = 'relative';
	const input2 = document.createElement('input');
	input2.type = 'text';
	input2.id = 'file-name-input';
	input2.className = 'block rounded-lg px-2.5 pb-2.5 pt-5 text-sm text-gray-900 w-64 border border-solid border-gray-400 appearance-none focus:outline-none focus:ring-0 peer';
	input2.placeholder = ' ';
	const label1 = document.createElement('label');
	label1.setAttribute('for', 'file-name-input');
	label1.textContent = 'Enter File Name: (Optional)';
	label1.className = 'absolute cursor-text text-bold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto';
	div2.appendChild(input2);
	div2.appendChild(label1);
	divCenter.appendChild(div2)
	fragment.appendChild(divCenter);

	const label2 = document.createElement('label');
	label2.setAttribute('for', 'add-readme');
	label2.className = 'flex justify-center flex-row items-center mb-5 cursor-pointer pl-2';
	const checkbox1 = document.createElement('input');
	checkbox1.type = 'checkbox';
	checkbox1.id = 'add-readme';
	checkbox1.name = 'add-readme';
	checkbox1.className = 'sr-only peer';
	checkbox1.checked = true;
	checkbox1.setAttribute('checked', '');

	const div3 = document.createElement('div');
	div3.className = 'relative w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600';
	label2.appendChild(checkbox1);
	label2.appendChild(div3);
	const span2 = document.createElement('span');
	span2.className = 'cursor-pointer ml-2 text-neutral-500 text-lg font-medium';
	span2.textContent = 'Add ';
	const innerSpan2 = document.createElement('span');
	innerSpan2.className = 'hover:underline text-blue-500';
	innerSpan2.title = 'It will have the list of\nminified Python Files';
	innerSpan2.textContent = 'readme.txt';
	span2.appendChild(innerSpan2);
	span2.innerHTML += ' file';
	label2.appendChild(span2);
	fragment.appendChild(label2);

	const label3 = document.createElement('label');
	label3.setAttribute('for', 'fast-compression');
	label3.className = 'flex justify-center flex-row items-center mb-5 cursor-pointer pl-2';
	const checkbox2 = document.createElement('input');
	checkbox2.type = 'checkbox';
	checkbox2.id = 'fast-compression';
	checkbox2.name = 'fast-compression';
	checkbox2.className = 'sr-only peer';

	const div4 = document.createElement('div');
	div4.className = 'relative w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600';
	label3.appendChild(checkbox2);
	label3.appendChild(div4);
	const span3 = document.createElement('span');
	span3.className = 'cursor-pointer ml-2 text-neutral-500 text-lg font-medium';
	span3.textContent = 'Fast Compression';
	label3.appendChild(span3);
	fragment.appendChild(label3);

	const tempDiv = document.createElement('div');
	tempDiv.appendChild(fragment);

	return tempDiv.innerHTML;
}

async function compressPyFiles() {
	const sortedKeys = Object.keys(sessionStorage)
		.filter(key => key.startsWith("#PyFile-out-"))
		.sort((a, b) => parseInt(a.split("-")[2]) - parseInt(b.split("-")[2]));

	const maxLength = sortedKeys.filter(key => {
		return CryptoJS.AES.decrypt(sessionStorage.getItem(key), newKey).toString(CryptoJS.enc.Utf8).trim() !== "";
	}).length;

	const tabContents = Array.from(fileTabsOut.children)
		.map((tab, index) => ({
			index: index,
			content: minifiedEditor.getModel().getValue()
		}));

	const relevantTabs = tabContents.filter(tab => tab.content !== '');
	const selectedIndices = relevantTabs.map(tab => tab.index);

	if (selectedIndices.length < 2 || maxLength < 2) {
		Swal.fire({
			text: "Switch to a Minifed tab. Need at least 2 minified files for compression.",
			icon: "info",
			confirmButtonColor: "#179fff"
		});
		return;
	}

	animateIcon("fade-8", "fa-fade", 700);
	handleTabsOverlay(true);
	compressFileBtn.disabled = true;
	shareButton.disabled = true;

	const {
		value,
		dismiss
	} = await Swal.fire({
		html: compressOptions(),
		inputValidator: (value) => {
			if (!value.fileFormat) {
				return "You need to choose one file format!";
			}
		},
		allowOutsideClick: false,
		confirmButtonColor: "#179fff",
		showCancelButton: true,
		cancelButtonText: 'Cancel',
		cancelButtonColor: "#d33",

		preConfirm: () => {
			const enteredFileName = document.getElementById('file-name-input').value.trim().slice(0, 256);
			return {
				fileFormat: document.querySelector('input[name="file-format"]:checked').value,
				fileName: enteredFileName.replace(/[^a-zA-Z0-9,\s.()]|,(?![a-zA-Z])|\.(?![a-zA-Z]|py$)/g, "_") || 'minified_files',
				addReadme: document.getElementById('add-readme').checked,
				fastCompress: document.getElementById('fast-compression').checked
			};
		}
	});

	if (dismiss === Swal.DismissReason.cancel) {
		compressFileBtn.disabled = false;
		disableDwSrCpBtn(false);
		handleTabsOverlay(false);
		return;
	}

	const {
		fileFormat,
		fileName,
		addReadme,
		fastCompress
	} = value;

	await compressFiles(selectedIndices, sortedKeys, Math.min(20, maxLength), fileName, fileFormat, addReadme, fastCompress);

}

compressFileBtn.addEventListener('click', () => {
	compressFileBtn.disabled = true;
	disableDwSrCpBtn(true);
	animateIcon("CompressFile", "fa-fade", 400);
	setTimeout(compressPyFiles, 500);
});

function initializeMinifier() {
	function buildQuery() {
		var query = options.map(option => {
			var checkbox = document.getElementById(option);
			if (checkbox && checkbox.checked) {
				return `${option}=true`;
			} else {
				return `${option}=false`;
			}
		}).join('&');
		const preserveGlobalsFinal = preserveGlobals ? preserveGlobals.value.split(',').map(str => str.trim()) : [];
		if (preserveGlobalsFinal.length > 0) {
			query += '&preserve_globals=' + encodeURIComponent(JSON.stringify(preserveGlobalsFinal));
		}
		const preserveLocalsFinal = preserveLocals ? preserveLocals.value.split(',').map(str => str.trim()) : [];
		if (preserveLocalsFinal.length > 0) {
			query += '&preserve_locals=' + encodeURIComponent(JSON.stringify(preserveLocalsFinal));
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
			endLineNumber: lastLineNumber,
			endColumn: minifiedEditor.getModel().getLineMaxColumn(lastLineNumber)
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
		fileTabsOverlayOut.classList.remove("hidden");
		fileTabsOverlay.classList.remove("hidden");
		btnsOverlay.classList.remove("hidden");
		disableDwSrCpBtn(true);
		selectallopt.disabled = true;
		resetOpt.disabled = true;
		const allOptions = [...options, "preserve_locals", "preserve_globals"];
		allOptions.forEach(option => {
			const checkbox = document.getElementById(option);
			checkbox.disabled = true;
		});
		selectallopt.classList.add("cursor-not-allowed");
		resetOpt.classList.add("cursor-not-allowed");
		minifiedEditor.getModel().setValue('');
		animateIcon("fade-0", "fa-fade", 1500);
		minifiedSize.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading....`;
		if (sourceEditor.getModel().getValue() !== '' && minifiedEditor.getModel().getValue() === '') {
			try {
				const response = await fetch(`https://python-minify.vercel.app/minify?${buildQuery()}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain'
					},
					body: sourceEditor.getModel().getValue()
				});
				if (response.ok) {
					const minified = await response.json();
					minifiedEditor.getModel().setValue(minified.minified_code);
					saveEditorContent(true);
					minifiedEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
					disableDwSrCpBtn(false);
					graphContainer.classList.remove("hidden");
				} else {
					disableDwSrCpBtn(true);
					clearPyComplier(true);
					minifiedSize.innerHTML = `${excir} Minification failed!!`;
				}
			} catch {
				disableDwSrCpBtn(true);
				clearPyComplier(true);
				minifiedSize.innerHTML = `${excir} Minification failed!!`;
			}
			updateGraph();
		} else {
			minifiedSize.textContent = "Enter Code";
		}
		fileTabsOverlayOut.classList.add("hidden");
		fileTabsOverlay.classList.add("hidden");
		btnsOverlay.classList.add("hidden");
		selectallopt.disabled = false;
		resetOpt.disabled = false;
		allOptions.forEach(option => {
			const checkbox = document.getElementById(option);
			checkbox.disabled = false;
		});
		selectallopt.classList.remove("cursor-not-allowed");
		resetOpt.classList.remove("cursor-not-allowed");
		minifyButton.classList.remove("pointer-events-none");
		if (minifiedEditor.getModel().getValue().trim() === "" && sourceEditor.getModel().getValue() !== "") {
			fileTabsOut.children[currentTabIndexOut].classList.add("error");
			document.getElementById(`file-out-${currentTabIndexOut + 1}`).title = "Minification failed!\nRe-check the Orginal code";
		} else {
			fileTabsOut.children[currentTabIndexOut].classList.remove("error");
			document.getElementById(`file-out-${currentTabIndexOut + 1}`).title = '';
		}
	}

	minifyButton.addEventListener('click', minifyClick);
	copyButton.addEventListener('click', () => {
		if (minifiedEditor.getModel().getValue() !== "") {
			copyClick();
		}
	});
	minifyButton.classList.remove("pointer-events-none");
	let isProcessing = false;

	minifyAllBtn.addEventListener('click', async () => {
		if (isProcessing) return;
		isProcessing = true;
		animateIcon(`minifyAll`, "fa-fade", 800);
		minifyAllBtn.disabled = true;
		minifyButton.classList.add("pointer-events-none");
		const tabs = document.querySelectorAll('.file-tab-out');
		const maxIndex = tabs.length;
		let endIndex = Math.min(startIndex + 5, maxIndex);
		for (let i = startIndex; i < endIndex; i++) {
			switchTabOut(i);
			await minifyClick(true);
			updateEditorContent(true);
			await delay(100);
		}
		startIndex = endIndex;
		if (startIndex >= maxIndex) {
			startIndex = 0;
		}
		if (startIndex % 5 === 0) {
			minifyButton.classList.remove("pointer-events-none");
			minifyAllBtn.disabled = false;
		}
		isProcessing = false;
	});

	function delay(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}
}

window.addEventListener("DOMContentLoaded", initializeMinifier);

function clearSource() {
	deleteAllTabs();
	updateNametoTab("File 1.py");
	disableTyping();
	disableDwSrCpBtn(true);
	handleErrorMessage();
	clearPyComplier(true);
	fileInput.value = '';
	minifiedEditor.getModel().setValue('');
	sourceEditor.getModel().setValue('');
	fileLinkInput.value = '';
	minifiedSize.textContent = '0.000 kB';
	updateGraph();
}

document.getElementById('clearAll').addEventListener('click', () => {
	if (sources.length === 1 && sourcesOut.length === 1) {
		animateIcon("fade-5", "fa-fade", 1500);
		clearSource();
	} else if (sources.length > 1 && sourcesOut.length > 1) {
		animateIcon("fade-5", "fa-fade", 500);
		setTimeout(() => {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showDenyButton: true,
				showCancelButton: true,
				allowOutsideClick: false,
				confirmButtonColor: "#179fff",
				cancelButtonColor: "#d33",
				denyButtonColor: "#ffA500",
				confirmButtonText: "Clear All",
				denyButtonText: "Clear this tab"
			}).then((result) => {
				if (result.isConfirmed) {
					clearSource();
					Swal.fire({
						title: "Cleared!",
						text: "All the tabs are Cleared.",
						icon: "success",
						confirmButtonColor: "#179fff",
						confirmButtonText: "Close"
					});
				} else if (result.isDenied) {
					minifiedEditor.getModel().setValue('');
					sourceEditor.getModel().setValue('');
					handleErrorMessage();
					disableTyping();
					clearPyComplier()
					updateNametoTab(`File ${currentTabIndex + 1}.py`);
					minifiedSize.textContent = '0.000 kB';
					updateGraph();
					if (filetabOutOne.classList.contains("error") && currentTabIndex === 0 && currentTabIndexOut === 0) {
						filetabOutOne.classList.remove("error");
					}
				}
			});
		}, 200)
	}
});

function disableDwSrCpBtn(disable) {
	copyButton.disabled = disable;
	shareButton.disabled = disable;
	dwButton.disabled = disable;
}

function animateIcon(fade, fadeClass, fadeDur) {
	let aniTimeout;
	if (aniTimeout) {
		clearTimeout(aniTimeout);
	}
	var aniIcon = document.getElementById(fade);
	aniIcon.classList.add(fadeClass);
	aniTimeout = setTimeout(() => {
		aniIcon.classList.remove(fadeClass);
		aniTimeout = null;
	}, fadeDur);
}

function handleErrorMessage(text) {
	if (text === undefined) {
		errorMessage.classList.add('opacity-0');
		errorMessage.textContent = '';
		errorMessage.classList.remove(...classlst);
	} else {
		if (errorTimeout) {
			clearTimeout(errorTimeout);
		}
		errorMessage.innerHTML = text;
		errorMessage.classList.add(...classlst);
		setTimeout(() => {
			errorMessage.classList.remove('opacity-0');
			errorMessage.classList.add('opacity-100', 'duration-500');
		}, 50);
		errorTimeout = setTimeout(() => {
			errorMessage.classList.remove('opacity-100');
			errorMessage.classList.add('opacity-0');
			setTimeout(() => {
				errorMessage.textContent = '';
				errorMessage.classList.remove(...classlst);
				errorMessage.classList.add('opacity-0');
				errorTimeout = null;
			}, 500);
		}, 3500);
	}
}

function showMinifyOptions() {
	animateIcon("showOptions", "fa-fade", 1000);
	if (showOptionsContent.style.maxHeight) {
		showOptionsContent.style.maxHeight = null;
	} else {
		showOptionsContent.style.maxHeight = `${showOptionsContent.scrollHeight}px`;
	}
}

document.getElementById('showOptions').addEventListener('click', showMinifyOptions);

function tickAllOptions() {
	animateIcon("selectall", "fa-fade", 800);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true;
	});
}

selectallopt.addEventListener('click', tickAllOptions);

function resetOptions() {
	animateIcon("resetOpt", "fa-fade", 800);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});
	preserveLocals.value = ''
	preserveGlobals.value = '';
}

resetOpt.addEventListener('click', resetOptions);

function inputFromUrl() {
	animateIcon("fade-4", "fa-fade", 1000);
	setTimeout(() => {
		inputContainer.classList.toggle("hidden");
		inputContainer.classList.toggle("flex");
		fileLinkInput.focus();
		fileLinkInput.select();
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
			const contentLength = response.headers.get("content-length");
			if (contentLength && parseInt(contentLength, 10) > maxFileSizeInBytes) {
				throw new Error(`File size exceeds 400kb limit`);
			}
			if (sourceEditor.getModel().getValue().trim() !== '') {
				addEmptyTab();
			}
			const data = await response.text();
			if (data.length === 0) {
				sourceEditor.getModel().setValue(defaultContent);
			} else {
				sourceEditor.getModel().setValue(data);
			}
			sourceEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
			updateNametoTab(fileName.trim());
			handleAutoScroll();
		} catch (error) {
			handleErrorMessage(`${exctri} ${error.message}`);
		}
	}

	function loadFile() {
		disableTyping();
		var fileLink = fileLinkInput.value.trim();
		if (fileLinkInput.value.trim() === '' || ((/^[^\s\d]+$/.test(fileLink)) && !(/\.[a-zA-Z]{2,}$/.test(fileLink)))) {
			handleErrorMessage();
		} else if (!(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(fileLink))) {
			handleErrorMessage(`${exctri} Please enter a valid URL starting with "https://"`);
		} else if (/\.(py)$/.test(fileLink.toLowerCase())) {
			handleErrorMessage();
			animateIcon("fade-3", "fa-fade", 1500);
			loadFileContent(fileLink);
		} else {
			handleErrorMessage(`${exctri} Please enter a valid .py file link`);
		}
	}

	document.getElementById("load_File").addEventListener("click", loadFile);
	document.getElementById("sample_link").addEventListener("click", () => {
		const githubrawlink = "https:\/\/gist.githubusercontent.com\/glad432\/4d1935413e012cd54130a1fc6f31b4bf\/raw\/5f3aaae4b9a360b64a1146e6540804af4a91b7b1\/sample.py";
		if (fileLinkInput.value !== githubrawlink) {
			animateIcon("fade-6", "fa-bounce", 1000);
			fileLinkInput.value = githubrawlink;
			loadFile();
		}
	});
	fileLinkInput.addEventListener("keyup", (event) => {
		if (event.key === "Enter") {
			loadFile();
		}
	})

	document.getElementById("clear_link").addEventListener("click", () => {
		if (fileLinkInput.value !== '') {
			fileLinkInput.value = '';
			animateIcon("fade-7", "fa-fade", 1000);
		}
	});
});

document.getElementById("from_url").addEventListener("click", inputFromUrl);

function showArticle() {
	animateIcon("rot-1", "fa-fade", 1000);
	const displayContent = document.getElementById("display-content");
	const rotateOne = document.getElementById("rot-1");
	displayContent.classList.toggle("content");
	rotateOne.classList.toggle("fa-caret-down");
	displayContent.classList.toggle("hidden");
	rotateOne.classList.toggle("fa-caret-up");
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("show-btn").addEventListener("click", showArticle);
});

document.addEventListener('DOMContentLoaded', async () => {
	const response = await fetch("https://glad432.github.io/article/blog.min.json");
	const articleData = await response.json();
	let content = `<div id="display-content" class="hidden overflow-y-auto max-h-[100%]"><h2 class="sm:text-xl lg:text-3xl text-gray-600 text-left font-bold mb-4"><i class="fa-solid fa-circle-info text-blue-500 pr-2"></i>${articleData.article.title}</h2>`;

	articleData.article.sections.forEach((section) => {
		if (section.section_title !== "FAQs") {
			content += `<div class="mb-4"><h3 class="text-[15px] text-gray-500 lg:text-xl font-bold py-4"><i class="fa-solid fa-diamond text-cyan-900 pr-2"></i>${section.section_title}</h3>`;
			if (section.section_content) {
				content += `<p class="text-[13px] lg:text-[15px]">${section.section_content}</p>`;
			}
			if (section.sub_sections && section.sub_sections.length > 0) {
				content += `<div class="ml-4 mb-2">`;
				section.sub_sections.forEach((subsection) => {
					content += `<h4 class="text-[14px] text-gray-500 lg:text-lg font-bold py-2"><i class="fa-solid fa-square-caret-right text-cyan-900 pr-2"></i>${subsection.subsubsection_title}</h4><p class="text-[13px] lg:text-[15px]">${subsection.subsubsection_content}</p>`;
				});
				content += `</div>`;
			}
			content += `</div>`;
		}
	});

	content += `<h3 class="text-[15px] text-gray-500 lg:text-xl font-bold py-4"><i class="fa-solid fa-circle-question text-blue-700 pr-2"></i>FAQs</h3><ul class="list-none list-inside">`;
	const faqPairs = articleData.article.sections.find(section => section.section_title === "FAQs").section_content.split('\n\n');
	faqPairs.forEach(pair => {
		const [question, answer] = pair.split('\nA:');
		content += `<li class="text-[13px] lg:text-[15px]"><strong>${question}</strong><br/>A: ${answer}</li>`;
	});
	content += `</ul></div>`;

	document.getElementById('article').innerHTML = content;
});

function graphConfig(originalData, minifiedData, tabFileNames) {
	return new ApexCharts(document.getElementById("line-graph"), {
		chart: {
			height: "250vh",
			maxWidth: "100%",
			type: "area",
			fontFamily: "Source Code Pro",
			zoom: {
				enabled: false,
			},
			animations: {
				enabled: true,
				easing: 'linear',
				speed: 800,
				animateGradually: {
					enabled: true,
					delay: 150
				},
				dynamicAnimation: {
					enabled: true,
					speed: 350
				}
			}
		},
		grid: {
			show: false,
		},
		tooltip: {
			enabled: true,
			x: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		series: [{
				data: originalData,
				color: "#1A56DB",
			},
			{
				data: minifiedData,
				color: "#EF4444",
			},
		],
		legend: {
			show: true,
		},
		stroke: {
			curve: 'smooth',
		},
		fill: {
			type: "gradient",
			gradient: {
				opacityFrom: 0.6,
				opacityTo: 0,
				shade: "#1C64F2",
				gradientToColors: ["#1C64F2"],
			},
		},
		xaxis: {
			categories: tabFileNames,
			labels: {
				show: false,
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: true,
			},
		},
		yaxis: {
			show: true,
			min: 0,
			labels: {
				show: false,
			},
		},
	});
}

async function decryptAndPush(list, dataArray, isGetLines) {
	for (let key of list) {
		const decryptedVal = CryptoJS.AES.decrypt(sessionStorage.getItem(key), newKey).toString(CryptoJS.enc.Utf8);
		if (isGetLines) {
			dataArray.push((decryptedVal.split("\n").length));
		} else {
			dataArray.push((decryptedVal.length / 1024).toFixed(3));
		}
	}
};

async function updateGraph() {
	const pycodeOutList = [];
	const pycodeList = [];
	const originalData = [];
	const minifiedData = [];
	const tabFileNames = [];
	const minifiedDataFiltered = [];
	const originalDataFiltered = [];
	const tabFileNamesFiltered = [];
	const percentageSavings = [];
	const fileTabsArray = [];
	const fileTabsOutArray = [];

	Object.keys(sessionStorage).forEach(key => {
		if (key.startsWith("#PyFile-out")) {
			pycodeOutList.push(key);
		} else if (key.startsWith("#PyFile")) {
			pycodeList.push(key);
		}
	});

	const numericalSort = (a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
	pycodeList.sort(numericalSort);
	pycodeOutList.sort(numericalSort);

	await decryptAndPush(pycodeOutList, minifiedData, isGetLines);
	await decryptAndPush(pycodeList, originalData, isGetLines);

	if (fileTabs) {
		Array.from(fileTabs.children).forEach(child => {
			fileTabsArray.push(child.textContent.trim());
		});
	}

	if (fileTabsOut) {
		Array.from(fileTabsOut.children).forEach(child => {
			fileTabsOutArray.push(child.textContent.trim());
		});
	}

	for (let i = 0; i < Math.max(fileTabsArray.length, fileTabsOutArray.length); i++) {
		let tabNameA = fileTabsArray[i] || '';
		let tabNameB = fileTabsOutArray[i] || '';
		let chosenName = tabNameA || tabNameB || defaultFilename;
		tabFileNames.push(chosenName.trim());
	}

	for (let i = 0; i < tabFileNames.length; i++) {
		if (!isGetLines) {
			minifiedDataFiltered.push(minifiedData[i]);
			originalDataFiltered.push(originalData[i]);
			tabFileNamesFiltered.push(tabFileNames[i]);
		} else if (isGetLines) {
			minifiedDataFiltered.push(minifiedData[i]);
			originalDataFiltered.push(originalData[i]);
			tabFileNamesFiltered.push(tabFileNames[i]);
		}
	}

	if (minifiedDataFiltered.length > 1) {
		minifiedData.splice(0, minifiedData.length, ...minifiedDataFiltered);
		originalData.splice(0, originalData.length, ...originalDataFiltered);
		tabFileNames.splice(0, tabFileNames.length, ...tabFileNamesFiltered);

		if (!isGetLines) {
			for (let i = 0; i < originalData.length; i++) {
				const original = originalData[i];
				const minified = minifiedData[i];
				if (original === 0 || minified === 0) {
					percentageSavings.push("N/A");
				} else {
					const savingsPercentage = ((original - minified) / original) * 100;
					if (savingsPercentage === 0) {
						percentageSavings.push("0% Saved");
					} else if (savingsPercentage === 100) {
						percentageSavings.push("Not minified");
					} else {
						percentageSavings.push(`${savingsPercentage.toFixed(2)}% Saved`);
					}
				}
			}
		}

		if (graph) {
			graph.updateSeries([{
					name: `Original ${!isGetLines ? 'Size' : 'Lines'}`,
					data: originalData
				},
				{
					name: `Minified ${!isGetLines ? 'Size' : 'Lines'}`,
					data: minifiedData
				}
			], true);
			graph.updateOptions({
				xaxis: {
					categories: tabFileNames.map((name, index) => !isGetLines ? `${name} (${percentageSavings[index]})` : `${name}`)
				}
			}, true);
		} else {
			graph = graphConfig(originalData, minifiedData, tabFileNames);
			graph.render();
			setGraphTheme();
		}

		graphContainer.classList.remove("hidden");
	} else {
		graphContainer.classList.add("hidden");
	}
}

document.addEventListener("load", () => {
	updateGraph();
});

document.addEventListener('DOMContentLoaded', () => {
	if (graphKbSize) {
		graphKbSize.addEventListener("click", () => {
			isGetLines = false;
			updateGraph();
		});
	}

	if (graphLines) {
		graphLines.addEventListener("click", () => {
			isGetLines = true;
			updateGraph();
		});
	}
});

function getCurrentTabName() {
	return (fileTabs.children[currentTabIndex].textContent || fileTabsOut.children[currentTabIndexOut].textContent || defaultFilename).trim()
}

function handleTabsOverlay(enable) {
	fileTabsOverlay.classList.toggle("hidden", !enable)
	fileTabsOverlayOut.classList.toggle("hidden", !enable)
	btnsOverlay.classList.toggle("hidden", !enable)
}

function handleAutoScroll() {
	var activeTab = fileTabs.children[currentTabIndex];
	var tabPosition = activeTab.offsetLeft - fileTabs.offsetLeft;
	var leftVisible = fileTabs.scrollLeft;
	var rightVisible = leftVisible + fileTabs.offsetWidth;

	if (tabPosition >= leftVisible && tabPosition + activeTab.offsetWidth <= rightVisible) {
		return;
	}

	if (tabPosition < leftVisible) {
		fileTabs.scrollLeft = tabPosition;
	} else if (tabPosition + activeTab.offsetWidth > rightVisible) {
		fileTabs.scrollLeft = tabPosition + activeTab.offsetWidth - fileTabs.offsetWidth;
	}
}

function randomKey(length) {
	let key = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(CryptoJS.lib.WordArray.random(1).words[0] / (0xffffffff + 1) * 95) + 32;
		key += String.fromCharCode(randomIndex);
	}
	return key;
}

const newKey = randomKey(50);

function saveEditorContent(isOut = false) {
	if (!isOut) {
		sessionStorage.setItem(sources[currentTabIndex], CryptoJS.AES.encrypt(sourceEditor.getModel().getValue(), newKey).toString());
	} else {
		sessionStorage.setItem(sourcesOut[currentTabIndexOut], CryptoJS.AES.encrypt(minifiedEditor.getModel().getValue(), newKey).toString());
	}
}

function updateEditorContent(isOut = false) {
	var encryptedSource;
	if (!isOut) {
		encryptedSource = sessionStorage.getItem(sources[currentTabIndex]);
		if (encryptedSource && sourceEditor) {
			sourceEditor.getModel().setValue(CryptoJS.AES.decrypt(encryptedSource, newKey).toString(CryptoJS.enc.Utf8));
		}
	} else {
		encryptedSource = sessionStorage.getItem(sourcesOut[currentTabIndexOut]);
		if (encryptedSource && minifiedEditor) {
			minifiedEditor.getModel().setValue(CryptoJS.AES.decrypt(encryptedSource, newKey).toString(CryptoJS.enc.Utf8));
		}
	}
}

function editTabName() {
	var activeTab = fileTabs.children[currentTabIndex];
	var tabNameInput = document.createElement('input');
	tabNameInput.type = 'text';
	tabNameInput.placeholder = "Enter:";
	tabNameInput.value = activeTab.textContent.trim();
	tabNameInput.autocorrect = "off";
	tabNameInput.spellcheck = false;
	tabNameInput.className = "tab-name-input focus:outline-none bg-transparent";
	tabNameInput.style.width = `${activeTab.offsetWidth - 90}px`;
	tabNameInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			updateTabName('.tab-name-input', fileTabs, currentTabIndex);
			updateGraph();
			handleAutoScroll();
		}
	});
	tabNameInput.addEventListener('blur', () => {
		updateTabName('.tab-name-input', fileTabs, currentTabIndex);
		updateGraph();
	});

	var saveIcon = document.createElement('button');
	saveIcon.className = 'save-tab-icon hover:text-green-400 text-green-500';
	saveIcon.title = 'Save or press enter';
	saveIcon.innerHTML = '<i class="fa-solid fa-floppy-disk px-0.5"></i>';
	saveIcon.onclick = () => {
		saveEditorContent();
	};

	var editIcon = document.createElement('button');
	editIcon.className = 'edit-tab-icon hover:text-blue-400 text-blue-600 hidden';
	editIcon.title = 'Edit file name';
	editIcon.innerHTML = editFileNameIcon;
	editIcon.onclick = editTabName;

	var icon = document.createElement('i');
	icon.className = "fa-solid fa-file-code text-blue-600 pr-2";

	activeTab.innerHTML = '';
	activeTab.appendChild(icon);
	activeTab.appendChild(tabNameInput);
	activeTab.appendChild(saveIcon);
	activeTab.appendChild(editIcon);
	tabNameInput.focus();
	handleAutoScroll();
}

function updateTabName(tabQueryInput, fileTabs, currentTabIndex) {
	var tabNameInput = document.querySelector(tabQueryInput);
	var newName = tabNameInput.value.trim();
	var cleanedStrnopy = newName.replace(/\.py$/, '');
	if (!(/^\s+$/.test(cleanedStrnopy)) && (cleanedStrnopy.length >= 1 && cleanedStrnopy.length <= 256)) {
		var cleanedString = cleanedStrnopy.replace(/[^a-zA-Z0-9,\s.()]|,(?![a-zA-Z])|\.(?![a-zA-Z]|py$)/g, "_");
		if (!cleanedString.endsWith('.py')) {
			cleanedString += '.py';
		}
		fileTabs.children[currentTabIndex].textContent = cleanedString;
		var icon = document.createElement('i');
		icon.className = "fa-solid fa-file-code text-blue-600 pr-2";
		fileTabs.children[currentTabIndex].insertBefore(icon, fileTabs.children[currentTabIndex].childNodes[0]);
		updateNametoTab(cleanedString);
		tabNameInput.value = cleanedString;
	} else if (newName.trim() === '') {
		return;
	} else {
		handleErrorMessage(`${exctri} Ensure file name has 256 characters max, no invalid characters`);
	}
}

function updateNametoTab(fileName, isOut = false) {
	if (!isOut) {
		updateNametoTab(fileName, true);
	}
	var activeTabIndex = isOut ? currentTabIndexOut : currentTabIndex;
	var fileTabsToUpdate = isOut ? fileTabsOut : fileTabs;
	var tabToUpdate = fileTabsToUpdate.children[activeTabIndex];
	if (tabToUpdate) {
		tabToUpdate.innerHTML = `${codeFile}${fileName.trim()}`;
	}
}

function addEmptyTab() {
	disableTyping(true);
	if (!isMobile() && sources.length >= 20) {
		Swal.fire({
			icon: "error",
			html: `${exctri} You can't add more than 20 tabs.`,
			confirmButtonColor: "#179fff"
		});
		return;
	} else if (isMobile() && sources.length >= 10) {
		Swal.fire({
			icon: "error",
			html: `${exctri} You can't add more than 10 tabs.`,
			confirmButtonColor: "#179fff"
		});
		return;
	}
	saveEditorContent();
	addNewTabBtn.classList.remove("hidden")
	minifyAllBtn.disabled = false;
	minifyAllBtn.classList.remove("hidden")
	addTabOut();
	var newFileIndex = sources.length;
	var newSourceId = `#PyFile-${newFileIndex + 1}`;
	var newTab = document.createElement('li');
	newTab.className = 'file-tab relative cursor-pointer bg-[#f0f0f0] border-[#ccc] px-[25px] py-2 mb-[5px] border border-solid rounded mr-[5px] transition-opacity';
	newTab.innerHTML = `${codeFile}File ${newFileIndex + 1}.py`;
	newTab.id = `file-${newFileIndex + 1}`;
	newTab.title = `${newFileIndex + 1}${(n => ["th", "st", "nd", "rd"][n % 100 >> 3 ^ 1 && n % 10] || "th")(newFileIndex + 1)} Tab`;
	newTab.onclick = () => {
		switchTab(newFileIndex);
	};
	updateTabStyles();
	fileTabs.appendChild(newTab);
	sources.push(newSourceId);
	switchTab(newFileIndex);
	sessionStorage.setItem(newSourceId, '');
	sourceEditor.getModel().setValue('');
	if ((!isMobile() && sources.length >= 20) || (isMobile() && sources.length >= 10)) {
		addNewTabBtn.classList.add("hidden");
	}
}

addNewTabBtn.addEventListener("click", () => {
	animateIcon("addNewTab", "fa-fade", 500);
	setTimeout(addEmptyTab, 400);
});

function updateTabStyles() {
	handleAutoScroll();
	if (sourcesOut.length < 2) {
		minifyAllBtn.disabled = true;
		minifyAllBtn.classList.add("hidden");
	}
	var tabs = document.querySelectorAll('.file-tab');
	compressFileBtn.classList.toggle('hidden', tabs.length <= 1);
	compressFileBtn.disabled = tabs.length <= 1;
	if (currentTabIndex < tabs.length && currentTabIndex >= 0) {
		tabs.forEach((tab, index) => {
			var icon = tab.querySelector('.fa-file-code');
			if (index === currentTabIndex) {
				tab.classList.add('active');
				icon.classList.add('text-blue-600');
				var editBtn = tab.querySelector('.edit-tab-icon');
				var deleteBtn = tab.querySelector('.delete-tab-icon');
				if (!editBtn) {
					editBtn = document.createElement('button');
					editBtn.id = `editbtn-${currentTabIndex + 1}`;
					editBtn.className = 'edit-tab-icon mr-0.5 ml-[3px] hover:text-blue-400 text-blue-600';
					editBtn.title = 'Edit file name';
					editBtn.innerHTML = editFileNameIcon;
					editBtn.onclick = () => {
						animateIcon(`editbtn-${currentTabIndex + 1}`, "fa-bounce", 800);
						setTimeout(() => {
							editTabName();
							handleAutoScroll();
						}, 800)
					};
					tab.appendChild(editBtn);
				}
				if (index === tabs.length - 1 && !deleteBtn) {
					deleteBtn = document.createElement('button');
					deleteBtn.id = `delbtn-${currentTabIndex + 1}`;
					deleteBtn.className = 'delete-tab-icon absolute pl-[5px] right-[5px] top-2 font-bold cursor-pointer mr-0.5 ml-[3px] hover:text-red-400 text-red-500';
					deleteBtn.title = 'Delete this tab';
					deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
					deleteBtn.onclick = () => {
						addNewTabBtn.disabled = true;
						animateIcon(`delbtn-${currentTabIndex + 1}`, "fa-bounce", 800);
						setTimeout(() => {
							confirmDeleteFile(currentTabIndex);
						}, 800)
					};
					tab.appendChild(deleteBtn);
				}
			} else {
				tab.classList.remove('active');
				icon.classList.remove('text-blue-600');
				var editBtn = tab.querySelector('.edit-tab-icon');
				var deleteBtn = tab.querySelector('.delete-tab-icon');
				if (editBtn) {
					tab.removeChild(editBtn);
				}
				if (deleteBtn) {
					tab.removeChild(deleteBtn);
				}
			}
		});
	}
}

function deleteFile(index, isOut = false) {
	if (!isOut) {
		addNewTabBtn.classList.remove("hidden");
		sessionStorage.removeItem(sources[index]);
		sources.splice(index, 1);
		fileTabs.removeChild(fileTabs.children[index]);
		if (currentTabIndex >= sources.length) {
			currentTabIndex = sources.length - 1;
		} else if (currentTabIndex > index) {
			currentTabIndex--;
		}
		updateTabStyles();
		switchTab(currentTabIndex);
		updateEditorContent();
	} else {
		sessionStorage.removeItem(sourcesOut[index]);
		sourcesOut.splice(index, 1);
		fileTabsOut.removeChild(fileTabsOut.children[index]);
		if (currentTabIndexOut >= sourcesOut.length) {
			currentTabIndexOut = sourcesOut.length - 1;
		} else if (currentTabIndexOut > index) {
			currentTabIndexOut--;
		}
		updateTabStylesOut();
		switchTabOut(currentTabIndexOut);
		updateEditorContent(true);
	}
}

function confirmDeleteFile(index) {
	const tabFileName = fileTabs.children[currentTabIndex].textContent.replace(/\.py$/, "");
	if (sources.length === 1) {
		startIndex = 0;
		Swal.fire({
			icon: "error",
			html: `${exctri} You can't delete this tab`,
			confirmButtonColor: "#179fff",
			confirmButtonText: "Close"
		});
		addNewTabBtn.disabled = false;
		return;
	}
	Swal.fire({
		html: `Are you sure you want to delete <span class="font-bold text-neutral-500 hover:underline">${tabFileName.length > 15 ? `${tabFileName.slice(0,7)}...${tabFileName.slice(-3)}` : tabFileName}</span> tab?`,
		icon: "question",
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonColor: "#179fff",
		confirmButtonText: "Yes",
		cancelButtonText: "No",
		cancelButtonColor: "#d33",
	}).then((result) => {
		if (result.isConfirmed) {
			clearPyComplier();
			deleteFile(index);
			deleteFile(index, true);
			updateGraph();
			fileLinkInput.value = '';
		}
		addNewTabBtn.disabled = false;
	});
}

function deleteAllTabs() {
	startIndex = 0;
	minifyAllBtn.disabled = true;
	minifyAllBtn.classList.add("hidden");
	fileTabsOut.children[currentTabIndexOut].classList.remove("error");
	document.getElementById(`file-out-${currentTabIndexOut + 1}`).title = '';
	var numTabs = sources.length;
	if (numTabs > 1) {
		for (var i = numTabs - 1; i > 0; i--) {
			deleteFile(i);
			deleteFile(i, true);
		}
	}
	if (filetabOutOne.classList.contains("error")) {
		filetabOutOne.classList.remove("error");
	}
	if (numTabs === 0) {
		addEmptyTab();
	}
}

window.addEventListener('beforeunload', (e) => {
	e.preventDefault();
	e.returnValue = '';
	return '';
});

window.addEventListener('load', () => {
	sessionStorage.clear();
});

function switchTab(index, fromSwitchTabOut = false) {
	if (!fromSwitchTabOut) {
		switchTabOut(index);
	}
	disableTyping();
	var previousIndex = currentTabIndex;
	currentTabIndex = Math.max(0, Math.min(index, sources.length - 1));
	animateIcon(`file-${currentTabIndex + 1}`, "animate-pulse", 700);
	updateEditorContent();
	updateTabStyles();
	if (previousIndex !== currentTabIndex) {
		if (fileTabs.children[previousIndex].querySelector('.tab-name-input')) {
			updateTabName('.tab-name-input', fileTabs, currentTabIndex);

		}
	}
}

document.getElementById("file-1").addEventListener('click', () => {
	switchTab(0);
})

function handleAutoScrollOut() {
	handleAutoScroll();
	var activeTab = fileTabsOut.children[currentTabIndexOut];
	var tabPosition = activeTab.offsetLeft - fileTabsOut.offsetLeft;
	var leftVisible = fileTabsOut.scrollLeft;
	var rightVisible = leftVisible + fileTabsOut.offsetWidth;

	if (tabPosition >= leftVisible && tabPosition + activeTab.offsetWidth <= rightVisible) {
		return;
	}

	if (tabPosition < leftVisible) {
		fileTabsOut.scrollLeft = tabPosition;
	} else if (tabPosition + activeTab.offsetWidth > rightVisible) {
		fileTabsOut.scrollLeft = tabPosition + activeTab.offsetWidth - fileTabsOut.offsetWidth;
	}
}

function editTabNameOut() {
	var activeTab = fileTabsOut.children[currentTabIndexOut];
	var tabNameInput = document.createElement('input');
	tabNameInput.type = 'text';
	tabNameInput.placeholder = "Enter:";
	tabNameInput.value = activeTab.textContent.trim();
	tabNameInput.autocorrect = "off";
	tabNameInput.spellcheck = false;
	tabNameInput.className = "tab-name-input-out focus:outline-none bg-transparent";
	tabNameInput.style.width = `${activeTab.offsetWidth - 90}px`;
	tabNameInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			updateTabName('.tab-name-input-out', fileTabsOut, currentTabIndexOut);
			updateGraph();
			handleAutoScrollOut();
		}
	});
	tabNameInput.addEventListener('blur', () => {
		updateTabName('.tab-name-input-out', fileTabsOut, currentTabIndexOut);
		updateGraph();
	});

	var saveIcon = document.createElement('button');
	saveIcon.className = 'save-tab-icon hover:text-green-400 text-green-500';
	saveIcon.title = 'Save or press enter';
	saveIcon.innerHTML = '<i class="fa-solid fa-floppy-disk px-0.5"></i>';
	saveIcon.onclick = () => {
		saveEditorContent(true);
	};

	var editIcon = document.createElement('button');
	editIcon.className = 'edit-tab-icon hover:text-blue-400 text-blue-600 hidden';
	editIcon.title = 'Edit file name';
	editIcon.innerHTML = editFileNameIcon;
	editIcon.onclick = editTabNameOut;

	var icon = document.createElement('i');
	icon.className = "fa-solid fa-file-code text-blue-600 pr-2";

	activeTab.innerHTML = '';
	activeTab.appendChild(icon);
	activeTab.appendChild(tabNameInput);
	activeTab.appendChild(saveIcon);
	activeTab.appendChild(editIcon);
	tabNameInput.focus();
	handleAutoScrollOut();
}

function addTabOut() {
	disableTyping();
	saveEditorContent(true);
	var newFileIndexOut = sourcesOut.length;
	var newSourceId = `#PyFile-out-${newFileIndexOut + 1}`;
	var newTab = document.createElement('li');
	newTab.className = 'file-tab-out relative cursor-pointer bg-[#f0f0f0] border-[#ccc] px-[25px] py-2 mb-[5px] border border-solid rounded mr-[5px] transition-opacity';
	newTab.innerHTML = `${codeFile}File ${newFileIndexOut + 1}.py`;
	newTab.id = `file-out-${newFileIndexOut + 1}`;
	newTab.onclick = () => {
		switchTabOut(newFileIndexOut);
	};
	updateTabStylesOut();
	fileTabsOut.appendChild(newTab);
	sourcesOut.push(newSourceId);
	switchTabOut(newFileIndexOut);
	sessionStorage.setItem(newSourceId, '');
	minifiedEditor.getModel().setValue('');
}

function updateTabStylesOut() {
	handleAutoScrollOut();
	minifyAllBtn.title = (sourcesOut.length === 1) ? '' : 'Minify More';
	var tabs = document.querySelectorAll('.file-tab-out');
	if (currentTabIndexOut < tabs.length && currentTabIndexOut >= 0) {
		tabs.forEach((tab, index) => {
			var icon = tab.querySelector('.fa-file-code');
			if (index === currentTabIndexOut) {
				tab.classList.add('active');
				icon.classList.add('text-blue-600');
				var editBtn = tab.querySelector('.edit-tab-icon-out');
				var deleteBtn = tab.querySelector('.delete-tab-icon-out');
				if (!editBtn) {
					editBtn = document.createElement('button');
					editBtn.id = `editbtnout-${currentTabIndexOut + 1}`;
					editBtn.className = 'edit-tab-icon-out mr-0.5 ml-[3px] hover:text-blue-400 text-blue-600';
					editBtn.title = 'Edit file name';
					editBtn.innerHTML = editFileNameIcon;
					editBtn.onclick = () => {
						animateIcon(`editbtnout-${currentTabIndexOut + 1}`, "fa-bounce", 800);
						setTimeout(() => {
							editTabNameOut();
							handleAutoScrollOut();
						}, 800)
					};
					tab.appendChild(editBtn);
				}
				if (index === tabs.length - 1 && !deleteBtn) {
					deleteBtn = document.createElement('button');
					deleteBtn.id = `delbtnout-${currentTabIndexOut + 1}`;
					deleteBtn.className = 'delete-tab-icon-out absolute pl-[5px] right-[5px] top-2 font-bold cursor-pointer mr-0.5 ml-[3px] hover:text-red-400 text-red-500';
					deleteBtn.title = 'Delete this tab';
					deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
					deleteBtn.onclick = () => {
						addNewTabBtn.disabled = true;
						animateIcon(`delbtnout-${currentTabIndexOut + 1}`, "fa-bounce", 800);
						setTimeout(() => {
							confirmDeleteFile(currentTabIndexOut);
						}, 800)
					};
					tab.appendChild(deleteBtn);
				}
			} else {
				tab.classList.remove('active');
				icon.classList.remove('text-blue-600');
				var editBtn = tab.querySelector('.edit-tab-icon-out');
				var deleteBtn = tab.querySelector('.delete-tab-icon-out');
				if (editBtn) {
					tab.removeChild(editBtn);
				}
				if (deleteBtn) {
					tab.removeChild(deleteBtn);
				}
			}
		});
	}
}

function switchTabOut(index) {
	switchTab(index, true);
	var previousIndexOut = currentTabIndexOut;
	currentTabIndexOut = Math.max(0, Math.min(index, sourcesOut.length - 1));
	animateIcon(`file-out-${currentTabIndexOut + 1}`, "animate-pulse", 700);
	updateEditorContent(true);
	updateTabStylesOut();
	if (previousIndexOut !== currentTabIndexOut) {
		if (fileTabsOut.children[previousIndexOut].querySelector('.tab-name-input-out')) {
			updateTabName('.tab-name-input-out', fileTabsOut, currentTabIndexOut);
		}
	}
}

document.getElementById("file-out-1").addEventListener('click', () => {
	switchTabOut(0);
})