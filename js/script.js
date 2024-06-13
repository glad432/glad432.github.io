const minifyButton = document.getElementById('minify');
const minifyAllBtn = document.getElementById('minifyAll');
const copyButton = document.getElementById('copy');
const anitext = document.getElementById("anitext");
const errorMessage = document.getElementById('errmsg');
const dwButton = document.getElementById('dw');
const shareButton = document.getElementById("share");
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const minifiedSizeSpan = document.getElementById('minified-size');
const fileLink_load = document.getElementById("fileLink-load");
const qrCode = document.getElementById("qrCode");
const copy_msg = document.getElementById('copy-msg');
const file_Link = document.getElementById("fileLink");
const close_Popup = document.getElementById('closePopup');
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const type_overlay = document.getElementById("type-overlay");
const orscan = document.getElementById('scantocopy');
const downloadLinkUrl = document.getElementById('downloadLinkurl');
const help_msg = document.getElementById('help-msg');
const link_newtab = document.getElementById("new_tab");
const inputContainer = document.getElementById("inputContainer");
const fileLinkInput = document.getElementById("fileLinkInput");
const darkModeToggle = document.getElementById("darkModeToggle");
const selectallopt = document.getElementById('selectall');
const unselectallopt = document.getElementById('Unselectall');
const preserve_globals = document.getElementById('preserve_globals');
const preserve_locals = document.getElementById('preserve_locals');
const fileTabs = document.getElementById('file-tabs');
const fileTabsOut = document.getElementById('file-tabs-out');
const fileTabsOverlay = document.getElementById("tabs-overlay");
const fileTabsOverlayOut = document.getElementById("tabs-overlay-out");
const addNewTabBtn = document.getElementById("addNewTab");
const zipFileBtn = document.getElementById('zipFile');
const zipProgressBar = document.getElementById('zipProgressBar');
const zipProgressStatus = document.getElementById('zipProgressStatus');
var content = document.querySelector('.content-ll');
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
let errorTimeout, cpyTimeout0, cpyTimeout1, readonlyTimeout, typingTimeout, sourceEditor, minifiedEditor;
let typingInProgress = false;
var sources = ['#PyFile-1'];
var sourcesOut = ['#PyFile-out-1'];
var currentTabIndex = 0;
var currentTabIndexOut = 0;
let startIndex = 0;
const maxFileSizeInBytes = 1 * 400 * 1024;
const excir = `<i class="fa-solid fa-circle-exclamation"></i>`;
const exctri = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
const code_file = '<i class="fa-solid fa-file-code text-blue-600 pr-2"></i>';
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

const typewriter = new Typewriter(anitext, {
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

require.config({
	paths: {
		'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.46.0/min/vs'
	}
});

require(['vs/editor/editor.main'], () => {
	sourceEditor = monaco.editor.create(document.getElementById('editor'), {
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
	sourceEditor.onDidChangeModelContent(() => {
		saveEditorContent();
		document.getElementById('line-count').textContent = `Lines: ${sourceEditor.getModel().getLineCount()}`;
		document.getElementById('text-size').textContent = `${(sourceEditor.getModel().getValueLength() / 1024).toFixed(3)} Kb`;
	});

	minifiedEditor.onDidChangeModelContent(() => {
		saveEditorContent(true);
		document.getElementById('line-count-out').textContent = `Lines: ${minifiedEditor.getModel().getLineCount()}`;
		minifiedSizeSpan.textContent = `${(minifiedEditor.getModel().getValueLength() / 1024).toFixed(3)} Kb`;
	});

	function typeInEditor() {
		if (typingInProgress) return;
		const typingPYcode = CryptoJS.AES.decrypt("U2FsdGVkX193pc0vAtJ5A6OWR/h1wgrCfeKfO/6qgjWA+pkCUbdIupXhCTFRoDR2n65EQf5blOu2I+RDW598wSH7M1e3zTH4XIA0Wcl8+qmoZKaiUJFKC3QaiT9gYtcEFOteoT/6uKl2b8kUNM+Dl2U+A5cezQFkURxj5xxIjCqgX1jcRLpLQY2LIOpV0IbA3GLbvaNuh1wDUUsvwnIx+vnNeYruSD2fOXKdz0Lfyn1bnYPA6BxSWrvRxbgoSXTBVAD4tlN19YxI14tUJdizCFsGAKkLvUtKecD9X72maj6ZzEhvoqVTwMwxGawFCzuUeAm8TyxTlfOrVWfVxPoQatCQ0dOsWqRUiVCY8HE+A/OiJ133mA0+l0W1wvkV9bHDqR1UzqP8VAyh8UPB2YMLYnHZVr+US3Bpgu+iczkl2vewGWtt2WJ991O+HsXGCj0tc6iWcwmPu2PaKfR8t0x1PLWYUfVo2lycMMgBCfjhQyIq61Bfhm9QHMisqlap6hE0k1QsBHZOoL9Q+yCslEM8Us0FkQP/KK07NBCKULM8H47aFac6sOBd1VxCw9k1nnA+L1gNeG8oDVu4leUf6bZjs6m0msJISL1plqZY5cCpjdhrcImSsdNGt1jqXV1p7QnwGgVMl9HuRK9AlzxLCA0YNLyXzGqQNJlbSVrzJYS2JgW0Xw0B9M6vL/0G7FygNn2FefvXfx/Pk1ImUqH1u5y6tiuEUYAnxATe7y2cGcHa1J+f4IEV7AeXTEc/zoSh3mhmze8Y6gQN23YEtD0Pxr+3+42FO1dS1zSy3Un9G4vbpgbAPdb29lP/fVUrHSVokEadqfmWDxbnNsg2kwbkb3SuCVhd95Ev+5k9b++oGzlJ4npthp7mczo0IuaYFAZv42t2dPvbI3B6noUaa1S5hXJz4AWvzXX/M5mNxTxmrTblhu1UfomDBgJPnV7Udz6f2yVsPlSsJwApJYykUiB2xPOwPaQl1Zu4j7JhsSgHo2oP2sJonUtVYV3ui1aHwdJIIDCJT0GxCajxjxlTpEVE/P5FEpWymIScnbZ6kEZiy41OagjHnDx+HsbrNn5z6hpGR6u3U8n1hIeE5mfWMBb6XXRurTGU6x1UYDWTTFviIhLCCK2u7ociPOpvYVuD499vA+MYzfKJy0Itjw4S6rd8Ftw0cGsaaY0VbETbchMMtAWN637HgCf6tssXZG0wnjcicVBHrelgKSp+v2rxjfvBtbkYRJTpKhNoT/M+lf8eMy3Ww9OP7G3W4iM71mv9PC9YCYSFehCWFCyUOaDbhslZHqnNrfCmGJSEELLFGb9nnx1EbCvuy5G5ewRtMYzFPRYk3Sf5BlF6AVbiOjgt70tExE8tToejh5gLHjaf4SAGIy24e0Q=", '4#>5p[:/v,o2q/(\\*=:6').toString(CryptoJS.enc.Utf8);
		if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			type_overlay.classList.remove('!hidden');
			let index = 0;

			function type() {
				if (typingPYcode.length > index) {
					sourceEditor.trigger('', 'type', {
						text: typingPYcode[index]
					});
					index++;
					typingTimeout = setTimeout(type, 1);
				} else {
					type_overlay.classList.add('!hidden');
					typingInProgress = false;
				}
			};
			type();
			typingInProgress = true;
		} else {
			sourceEditor.getModel().setValue(typingPYcode);
		}
	}
	window.addEventListener("load", typeInEditor);
});

function disableTyping() {
	clearTimeout(typingTimeout);
	typingInProgress = false;
	type_overlay.classList.add('!hidden');
}

function setTheme() {
	if (typeof darkModeToggle !== 'undefined' && 'checked' in darkModeToggle) {
		const theme = darkModeToggle.checked ? 'vs-dark' : 'vs';
		sourceEditor.updateOptions({
			theme: theme
		});
		minifiedEditor.updateOptions({
			theme: theme
		});
	}
}

darkModeToggle.addEventListener("change", setTheme)
window.addEventListener("load", setTheme)

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
			handleErrorMessage(`${exctri} Maximum Size limit (400kB) reached!`);
		}
	});

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

function setupFileInput() {
	function dragpy(event) {
		disableTyping();
		const files = event.dataTransfer.files;
		handleFiles(files);
	}

	fileInput.addEventListener('change', (event) => {
		disableTyping();
		const files = event.target.files;
		handleFiles(files);
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
		const nonPyFiles = Array.from(files).filter((file) => !file.name.toLowerCase().endsWith('.py'));
		if (nonPyFiles.length > 0) {
			handleErrorMessage(`${exctri} Invalid file format. Please select only .py file(s).`);
			return;
		}

		Array.from(files).forEach((file) => {
			if (file.name.toLowerCase().endsWith('.py')) {
				handleErrorMessage();
				handleFile(file);
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

				sourceEditor.getModel().setValue(e.target.result);
				sourceEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
				handleErrorMessage();
				updateNametoTab(file.name);
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
	downloadLink.download = `${(fileTabs.children[currentTabIndex].textContent || fileTabsOut.children[currentTabIndexOut].textContent || "default.py").trim()}`;
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

function shareLink(content, filename, isZip) {
	handleTabsOverlay(false);
	fileLink_load.innerHTML = `<span class="font-bold text-gray-500">loading <i class="fa-solid fa-spinner fa-spin-pulse"></i></span>`;

	createShareLink(content, filename).then(result => {
		if (result.success) {
			const fileLink = result.link;
			overlay.classList.remove("hidden");
			popup.classList.remove("hidden");
			document.body.classList.add("overflow-y-hidden");
			document.body.classList.remove("overflow-y-scroll");
			file_Link.classList.add('hidden');
			copy_msg.textContent = '';
			help_msg.innerHTML = '';
			setTimeout(() => {
				copy_msg.innerHTML = 'Tap to copy <i class="fa-solid fa-copy"></i>';
				link_newtab.href = fileLink;
				link_newtab.classList.add('text-white', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'bg-blue-600', 'hover:bg-blue-700');
				link_newtab.innerHTML = ` <i class="fa-solid fa-up-right-from-square"></i>`;
				link_newtab.target = "_blank";
				link_newtab.title = 'Open in new tab';
				orscan.innerHTML = `or Scan <i class="fa-solid fa-expand"></i>`;
				downloadLinkUrl.classList.remove('hidden');
				help_msg.innerHTML = `<i class="fas fa-question-circle text-blue-500 text-2xl"></i><div class="help-content"><p class="text-sm text-center text-gray-700">${isZip ? 'Zip File' : 'Python file'} will be deleted after download.<br> Link expires on <span class="font-bold">${new Date(result.expires).toLocaleDateString('en-US', dateformat)}</span></p></div>`;
				orscan.classList.add('block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
				close_Popup.classList.remove('hidden');
				qrCode.classList.add('!bg-white', 'w-36', 'ml-12', 'p-3', 'mr-12', 'mt-2');
				file_Link.classList.remove('hidden');
				fileLink_load.innerHTML = '';
				displayQRCode(fileLink);
				qrCode.classList.remove('inline');
				file_Link.href = fileLink;
				file_Link.value = fileLink;
				if (isZip) {
					downloadLinkUrl.onclick = () => {
						const blob = new Blob([content], {
							type: 'application/zip'
						});
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = filename;
						a.classList.add("hidden");
						document.body.appendChild(a);
						a.click();
						window.URL.revokeObjectURL(url);
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
	});
}

shareButton.addEventListener('click', () => {
	if (minifiedEditor.getModel().getValue() !== "") {
		animateIcon("fade-2", "fa-fade", 3000);
		const content = minifiedEditor.getModel().getValue();
		const filename = `${(fileTabs.children[currentTabIndex].textContent || fileTabsOut.children[currentTabIndexOut].textContent || "default.py").trim()}`;
		shareButton.disabled = true;
		zipFileBtn.disabled = true;
		shareLink(content, filename, false);
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
		zipFileBtn.disabled = false;
		qrCode.classList.remove('!bg-white', 'w-36', 'ml-12', 'p-3', 'mr-12', 'mt-2');
		orscan.classList.remove('block', 'pt-2', 'mb-2', 'text-lg', 'text-neutral-500', 'font-medium');
		link_newtab.classList.remove('text-white', 'bg-blue-600', 'hover:bg-blue-700', 'focus:ring-4', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5');
		close_Popup.classList.add('hidden');
		overlay.classList.add("hidden");
		downloadLinkUrl.classList.add('hidden');
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
	}, 800);
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

async function zipFiles(selectedIndices, sortedKeys, maxLength, zip) {
	let nonEmptyFilesCount = 0;
	let fileOccurrences = {};
	let fileNamesList = 'The list of the python files minified:\n\n';

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
			finalFileName = 'default.py';
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
			const decryptedCode = CryptoJS.AES.decrypt(sessionStorage.getItem(fileKey), '4#>5p[:/v,o2q/(\*=:6').toString(CryptoJS.enc.Utf8);

			if (decryptedCode.trim() !== '') {
				zip.file(fileName, decryptedCode);
				fileNamesList += `${nonEmptyFilesCount + 1}. ${fileName}\n`;
				nonEmptyFilesCount++;
				let totalZipProgress = ((nonEmptyFilesCount / maxLength) * 100);
				zipProgressBar.value = totalZipProgress;
				zipProgressStatus.innerText = `Zipping... ${totalZipProgress.toFixed(2)}%`;
				zipProgress.classList.remove('hidden');

				await delay(nonEmptyFilesCount > 10 ? 300 : 600);
			}
		}
	}

	if (nonEmptyFilesCount > 0) {
		fileNamesList += `\nMinified on: ${new Date().toLocaleString()}\nhttps://glad432.github.io`;
		zip.file('readme.txt', fileNamesList);
		zipProgressBar.value = 100;
		zipProgressStatus.innerText = `Zip File Created`;
		setTimeout(() => {
			zipProgress.classList.add('hidden');
		}, 500);

		const zipBlob = await zip.generateAsync({
			type: 'blob',
			compression: 'DEFLATE'
		});

		setTimeout(() => {
			shareLink(zipBlob, 'minified_files.zip', true);
			disableDwSrCpBtn(false);
		}, 600);
	}
}

async function zipPyFiles() {
	const sortedKeys = Object.keys(sessionStorage)
		.filter(key => key.startsWith("#PyFile-out-"))
		.sort((a, b) => parseInt(a.split("-")[2]) - parseInt(b.split("-")[2]));

	const maxLength = sortedKeys.filter(key => {
		return CryptoJS.AES.decrypt(sessionStorage.getItem(key), '4#>5p[:/v,o2q/(\*=:6').toString(CryptoJS.enc.Utf8).trim() !== "";
	}).length;

	const tabContents = Array.from(fileTabsOut.children)
		.map((tab, index) => ({
			index: index,
			content: minifiedEditor.getModel().getValue()
		}));

	const relevantTabs = tabContents.filter(tab => tab.content !== '');
	const selectedIndices = relevantTabs.map(tab => tab.index);

	if (selectedIndices.length > 1 && maxLength > 1) {
		animateIcon("fade-8", "fa-fade", 700);
		handleTabsOverlay(true);
		zipFileBtn.disabled = true;
		shareButton.disabled = true;
		const filteredSortedKeys = selectedIndices.map(index => sortedKeys[index]);

		await zipFiles(selectedIndices, filteredSortedKeys, Math.min(20, maxLength), new JSZip());
	} else {
		Swal.fire({
			text: "At least 2 minified files needed for the zip.",
			icon: "info",
			confirmButtonColor: "#179fff"
		});
	}
}

zipFileBtn.addEventListener('click', zipPyFiles);

function initializeMinifier() {
	function build_query() {
		var query = options.map(option => {
			var checkbox = document.getElementById(option);
			if (checkbox && checkbox.checked) {
				return `${option}=true`;
			} else {
				return `${option}=false`;
			}
		}).join('&');
		const preserveGlobals = preserve_globals ? preserve_globals.value.split(',').map(str => str.trim()) : [];
		if (preserveGlobals.length > 0) {
			query += '&preserve_globals=' + encodeURIComponent(JSON.stringify(preserveGlobals));
		}
		const preserveLocals = preserve_locals ? preserve_locals.value.split(',').map(str => str.trim()) : [];
		if (preserveLocals.length > 0) {
			query += '&preserve_locals=' + encodeURIComponent(JSON.stringify(preserveLocals));
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
		disableDwSrCpBtn(true);
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
		minifiedEditor.getModel().setValue('');
		animateIcon("fade-0", "fa-fade", 1500);
		minifiedSizeSpan.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading....`;
		if (sourceEditor.getModel().getValue() !== '' && minifiedEditor.getModel().getValue() === '') {
			try {
				const response = await fetch(`https://python-minify.vercel.app/minify?${build_query()}`, {
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
				} else {
					disableDwSrCpBtn(true);
					minifiedSizeSpan.innerHTML = `${excir} Error`;
				}
			} catch {
				disableDwSrCpBtn(true);
				minifiedSizeSpan.innerHTML = `${excir} Something went wrong!!`;
			}
		} else {
			minifiedSizeSpan.textContent = "Enter Code";
		}
		fileTabsOverlayOut.classList.add("hidden");
		fileTabsOverlay.classList.add("hidden");
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
		if (minifiedEditor.getModel().getValue().trim() === "" && sourceEditor.getModel().getValue() !== "") {
			fileTabsOut.children[currentTabIndexOut].classList.add("error");
			document.getElementById(`file-out-${currentTabIndexOut + 1}`).title = "Minification failed , Re-check the Orginal code";
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
	minifyButton.disabled = false;

	let isProcessing = false;

	minifyAllBtn.addEventListener('click', async () => {
		if (isProcessing) return;
		isProcessing = true;
		animateIcon(`minifyAll`, "fa-fade", 800);
		minifyAllBtn.disabled = true;
		const tabs = document.querySelectorAll('.file-tab-out');
		const maxIndex = tabs.length;
		let endIndex = Math.min(startIndex + 5, maxIndex);
		for (let i = startIndex; i < endIndex; i++) {
			switchTabOut(i);
			await minifyClick();
			updateEditorContent(true);
			await delay(100);
		}
		startIndex = endIndex;
		if (startIndex >= maxIndex) {
			startIndex = 0;
		}
		if (startIndex % 5 === 0) {
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
	animateIcon("fade-5", "fa-fade", 1500);
	deleteAllTabs();
	updateNametoTab("File 1.py");
	disableTyping();
	disableDwSrCpBtn(true);
	handleErrorMessage();
	fileInput.value = '';
	minifiedEditor.getModel().setValue('');
	sourceEditor.getModel().setValue('');
	fileLinkInput.value = '';
	minifiedSizeSpan.textContent = '0.000 kB';
}

document.getElementById('rm').addEventListener('click', clearSource);

function disableDwSrCpBtn(disable) {
	copyButton.disabled = disable;
	shareButton.disabled = disable;
	dwButton.disabled = disable;
}

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

function toggleContent1() {
	animateIcon("toggleContent1", "fa-fade", 1000);
	if (content.style.maxHeight) {
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = `${content.scrollHeight}px`;
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
			const contentLength = response.headers.get("content-length");
			if (contentLength && parseInt(contentLength, 10) > maxFileSizeInBytes) {
				throw new Error(`File size exceeds 400kb limit`);
			}
			if (sourceEditor.getModel().getValue().trim() !== '') {
				addEmptyTab();
			}
			const data = await response.text();
			sourceEditor.getModel().setValue(data);
			sourceEditor.revealLine(1, monaco.editor.ScrollType.Immediate);
			updateNametoTab(fileName);
			handleAutoScroll();
		} catch (error) {
			handleErrorMessage(`${exctri} ${error.message}`);
		}
	}

	function load_file() {
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

	document.getElementById("load_File").addEventListener("click", load_file);
	document.getElementById("sample_link").addEventListener("click", () => {
		const githubrawlink = "https:\/\/gist.githubusercontent.com\/glad432\/4d1935413e012cd54130a1fc6f31b4bf\/raw\/5f3aaae4b9a360b64a1146e6540804af4a91b7b1\/sample.py";
		if (fileLinkInput.value !== githubrawlink) {
			animateIcon("fade-6", "fa-bounce", 1000);
			fileLinkInput.value = githubrawlink;
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
	const response = await fetch("https://glad432.github.io/article/blog.min.json");
	const articleData = await response.json();
	let content = `<div id="display-content" class="hidden overflow-y-auto max-h-[100%]"><h1 class="sm:text-xl lg:text-3xl text-gray-600 text-left font-bold mb-4"><i class="fa-solid fa-circle-info text-blue-500 pr-2"></i>${articleData.article.title}</h1>`;

	articleData.article.sections.forEach((section) => {
		if (section.section_title !== "FAQs") {
			content += `<div class="mb-4"><h2 class="text-[15px] text-gray-500 lg:text-xl font-bold py-4"><i class="fa-solid fa-diamond text-cyan-900 pr-2"></i>${section.section_title}</h2>`;
			if (section.section_content) {
				content += `<p class="text-[13px] lg:text-[15px]">${section.section_content}</p>`;
			}
			if (section.sub_sections && section.sub_sections.length > 0) {
				content += `<div class="ml-4 mb-2">`;
				section.sub_sections.forEach((subsection) => {
					content += `<div class="ml-4 mb-2"><h4 class="text-[14px] text-gray-500 lg:text-lg font-bold py-2"><i class="fa-solid fa-square-caret-right text-cyan-900 pr-2"></i>${subsection.subsubsection_title}</h4><p class="text-[13px] lg:text-[15px]">${subsection.subsubsection_content}</p></div>`;
				});
				content += `</div>`;
			}
			content += `</div>`;
		}
	});

	content += `<h2 class="text-[15px] text-gray-500 lg:text-xl font-bold py-4"><i class="fa-solid fa-circle-question text-blue-700 pr-2"></i>FAQs</h2><ul class="list-none list-inside">`;
	const faqPairs = articleData.article.sections.find(section => section.section_title === "FAQs").section_content.split('\n\n');
	faqPairs.forEach(pair => {
		const [question, answer] = pair.split('\nA:');
		content += `<li class="text-[13px] lg:text-[15px]"><strong>${question}</strong><br/>${answer}</li>`;
	});
	content += `</ul></div>`;

	document.getElementById('article').innerHTML = content;
});

function handleTabsOverlay(enable) {
	fileTabsOverlay.classList.toggle("hidden", !enable)
	fileTabsOverlayOut.classList.toggle("hidden", !enable)
}

function handleAutoScroll(fromhandleAutoScrollOut = false) {
	if (!fromhandleAutoScrollOut) {
		handleAutoScrollOut();
	}
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

function saveEditorContent(isOut = false) {
	if (!isOut) {
		sessionStorage.setItem(sources[currentTabIndex], CryptoJS.AES.encrypt(sourceEditor.getModel().getValue(), '4#>5p[:/v,o2q/(\*=:6').toString());
	} else {
		sessionStorage.setItem(sourcesOut[currentTabIndexOut], CryptoJS.AES.encrypt(minifiedEditor.getModel().getValue(), '4#>5p[:/v,o2q/(\*=:6').toString());
	}
}

function updateEditorContent(isOut = false) {
	var encryptedSource;
	if (!isOut) {
		encryptedSource = sessionStorage.getItem(sources[currentTabIndex]);
		if (encryptedSource && sourceEditor) {
			sourceEditor.getModel().setValue(CryptoJS.AES.decrypt(encryptedSource, '4#>5p[:/v,o2q/(\*=:6').toString(CryptoJS.enc.Utf8));
		}
	} else {
		encryptedSource = sessionStorage.getItem(sourcesOut[currentTabIndexOut]);
		if (encryptedSource && minifiedEditor) {
			minifiedEditor.getModel().setValue(CryptoJS.AES.decrypt(encryptedSource, '4#>5p[:/v,o2q/(\*=:6').toString(CryptoJS.enc.Utf8));
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
			handleAutoScroll();
		}
	});
	tabNameInput.addEventListener('blur', () => {
		updateTabName('.tab-name-input', fileTabs, currentTabIndex);
	});

	var saveIcon = document.createElement('button');
	saveIcon.className = 'save-tab-icon hover:text-green-400 text-green-500';
	saveIcon.title = 'Save or press enter';
	saveIcon.innerHTML = '<i class="fa-solid fa-floppy-disk px-[2px]"></i>';
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
		var cleanedString = cleanedStrnopy.replace(/[^a-zA-Z0-9,\s.]|,(?![a-zA-Z])|\.(?![a-zA-Z]|py$)/g, "_");
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
		tabToUpdate.innerHTML = `${code_file}${fileName}`;
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
	newTab.className = 'file-tab relative cursor-pointer bg-[#f0f0f0] border-[#ccc] px-[25px] py-[8px] mb-[5px] border-[1px] border-solid rounded-[5px] mr-[5px] [transition:background-color_0.3s_ease] transition-opacity';
	newTab.innerHTML = `${code_file}File ${newFileIndex + 1}.py`;
	newTab.id = `file-${newFileIndex + 1}`;
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
	zipFileBtn.classList.toggle('hidden', tabs.length <= 1);
	zipFileBtn.disabled = tabs.length <= 1;
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
					editBtn.className = 'edit-tab-icon mr-[2px] ml-[3px] hover:text-blue-400 text-blue-600';
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
					deleteBtn.className = 'delete-tab-icon absolute pl-[5px] right-[5px] top-[8px] font-bold cursor-pointer mr-[2px] ml-[3px] hover:text-red-400 text-red-500';
					deleteBtn.title = 'Delete this tab';
					deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
					deleteBtn.onclick = () => {
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
			confirmButtonColor: "#179fff"
		});
		return;
	}
	Swal.fire({
		html: `Are you sure you want to delete <span class="font-bold text-neutral-500 hover:underline">${tabFileName.length > 15 ? `${tabFileName.slice(0,7)}...${tabFileName.slice(-3)}` : tabFileName}</span> tab?`,
		icon: "question",
		allowOutsideClick: false,
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Yes",
		cancelButtonText: "No",
		cancelButtonColor: "#d33",
	}).then((result) => {
		if (result.isConfirmed) {
			deleteFile(index);
			deleteFile(index, true);
		}
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
	if (numTabs === 0) {
		addEmptyTab();
		addTabOut();
	}
}

function clearSessionStorage() {
	sessionStorage.clear();
}
window.addEventListener('beforeunload', clearSessionStorage);

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
	handleAutoScroll(true);
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
			handleAutoScrollOut();
		}
	});
	tabNameInput.addEventListener('blur', () => {
		updateTabName('.tab-name-input-out', fileTabsOut, currentTabIndexOut);
	});

	var saveIcon = document.createElement('button');
	saveIcon.className = 'save-tab-icon hover:text-green-400 text-green-500';
	saveIcon.title = 'Save or press enter';
	saveIcon.innerHTML = '<i class="fa-solid fa-floppy-disk px-[2px]"></i>';
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
	newTab.className = 'file-tab-out relative cursor-pointer bg-[#f0f0f0] border-[#ccc] px-[25px] py-[8px] mb-[5px] border-[1px] border-solid rounded-[5px] mr-[5px] [transition:background-color_0.3s_ease] transition-opacity';
	newTab.innerHTML = `${code_file}File ${newFileIndexOut + 1}.py`;
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
					editBtn.className = 'edit-tab-icon-out mr-[2px] ml-[3px] hover:text-blue-400 text-blue-600';
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
					deleteBtn.className = 'delete-tab-icon-out absolute pl-[5px] right-[5px] top-[8px] font-bold cursor-pointer mr-[2px] ml-[3px] hover:text-red-400 text-red-500';
					deleteBtn.title = 'Delete this tab';
					deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
					deleteBtn.onclick = () => {
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