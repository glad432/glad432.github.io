const minifyButton = document.getElementById('minify');
const copyButton = document.getElementById('copy');
const anitext = document.getElementById("anitext");
const errorMessage = document.getElementById('errmsg');
const pysource = document.getElementById('source');
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
const help_msg = document.getElementById('help-msg');
const link_newtab = document.getElementById("new_tab");
const inputContainer = document.getElementById("inputContainer");
const fileLinkInput = document.getElementById("fileLinkInput");
const inputBtnIcon = document.getElementById("input-icon");
const darkModeToggle = document.getElementById("darkModeToggle");
const selectallopt = document.getElementById('selectall');
const unselectallopt = document.getElementById('Unselectall');
const preserve_globals = document.getElementById('preserve_globals');
const preserve_locals = document.getElementById('preserve_locals');
const fileTabs = document.getElementById('file-tabs');
const addNewTabBtn = document.getElementById("addNewTab");
var content = document.querySelector('.content-ll');
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
let errorTimeout, cpyTimeout0, cpyTimeout1, readonlyTimeout, typingTimeout, sourceEditor, minifiedEditor, minifiedFilename, minifiedFileIndex;
let typingInProgress = false;
var sources = ['#PyFile-1'];
var currentTabIndex = 0;
const maxFileSizeInBytes = 1 * 1024 * 1024;
const excir = `<i class="fa-solid fa-circle-exclamation"></i>`;
const exctri = `<i class="fa-solid fa-file-circle-exclamation"></i>`;
const code_file = '<i class="fa-solid fa-file-code text-blue-600 pr-2"></i>';
const editFileNameIcon = '<i class="fa-solid fa-pen-to-square"></i>';
const classlst = ['select-none', 'font-bold', 'bg-red-500', 'text-white', 'py-1', 'px-2', 'rounded', 'max-w-fit', 'mt-4', 'transition', 'opacity-100'];

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
		value: "",
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
		document.getElementById('line-count-out').textContent = `Lines: ${minifiedEditor.getModel().getLineCount()}`;
		minifiedSizeSpan.textContent = `${(minifiedEditor.getModel().getValueLength() / 1024).toFixed(3)} Kb`;
	});

	function typeInEditor() {
		if (typingInProgress) return;
		let typingPYcode = document.getElementById("source").value;
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
			handleErrorMessage(`${exctri} Maximum Size limit (1MB) reached!`);
		}
		pysource.value = sourceEditor.getModel().getValue();
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
		const droppedFile = event.dataTransfer.files[0];
		if (droppedFile) {
			if (droppedFile.name.toLowerCase().endsWith('.py')) {
				handleErrorMessage();
				handleFile(droppedFile);
			} else {
				handleErrorMessage(`${exctri} Invalid file format. Please select a .py file.`);
			}
		}
	}

	fileInput.addEventListener('change', (event) => {
		disableTyping();
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			if (selectedFile.name.toLowerCase().endsWith('.py')) {
				handleErrorMessage();
				handleFile(selectedFile);
			} else {
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
				updateNametoTab(file.name);
				handleAutoScroll();
			};
			reader.readAsText(file);
		} else {
			handleErrorMessage(`${exctri} File size exceeds 1MB. Please select a smaller file.`);
			fileInput.value = '';
		}
	}
}

window.addEventListener('load', setupFileInput);

function DownloadPyFile() {
	animateIcon("fade-1", "fa-fade", 3000);
	var blob = new Blob([minifiedEditor.getModel().getValue()], {
		type: "text/x-python"
	});
	var dataUri = URL.createObjectURL(blob);
	var downloadLink = document.createElement("a");
	downloadLink.href = dataUri;
	downloadLink.download = `${(minifiedFilename || "default.py").trim().replace(/\.[^/.]+$/, '')}_min.py`;
	downloadLink.click();
	URL.revokeObjectURL(dataUri);
}

document.getElementById('dw').addEventListener('click', DownloadPyFile);


function validateCH(event) {
	animateIcon("fade-2", "fa-fade", 2000);
	event.preventDefault();
	hcaptcha.execute();
}

async function createShareLink() {
	try {
		const response = await fetch('https://file.io/?expires=1w', {
			method: 'POST',
			body: createFormData(minifiedEditor.getModel().getValue(), `${(minifiedFilename || "default.py").trim().replace(/\.[^/.]+$/, '')}_min.py`)
		});
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
}

function shareLink(token) {
	animateIcon("fade-2", "fa-fade", 3000);
	fileLink_load.innerHTML = `<span class="font-bold text-gray-500">loading <i class="fa-solid fa-spinner fa-spin-pulse"></i></span>`;
	createShareLink().then(result => {
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
					help_msg.innerHTML = `<i class="fas fa-question-circle text-blue-500 text-2xl"></i><div class="help-content"><p class="select-none text-sm text-center text-gray-700">Python file will be deleted after download.<br> Link expires on <span class="font-bold">${new Date(result.expires).toLocaleDateString('en-US', dateformat)}</span></p></div>`;
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
				throw new Error('Failed to create share link');
			}
		})
		.catch(error => {
			Swal.fire({
				html: `${excir} ${error.message}, try again later`,
				icon: "error",
				confirmButtonColor: "#179fff"
			});
		});
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
		height: 128
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
		minifyButton.disabled = false;
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
		if (sourceEditor.getModel().getValue() !== '') {
			try {
				const response = await fetch(`https://api.python-minifier.com/minify?${build_query()}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain'
					},
					body: pysource.value
				});
				if (response.ok) {
					const minified = await response.text();
					minifiedEditor.getModel().setValue(minified);
					minifiedFileIndex = currentTabIndex;
					minifiedFilename = fileTabs.children[currentTabIndex].textContent;
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
	deleteAllTabs();
	updateNametoTab("File 1.py");
	disableTyping();
	disableDwSrCpBtn(true);
	handleErrorMessage();
	fileInput.value = '';
	pysource.textContent = '';
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
				throw new Error(`File size exceeds 1MB limit`);
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
	const response = await fetch("https://glad432.github.io/article/blog.json");
	const articleData = await response.json();
	document.getElementById('article').innerHTML = `<div id="display-content" class="hidden overflow-y-auto max-h-[100%]"><h1 class="sm:text-xl lg:text-3xl before:font-['Font_Awesome_6_Free'] before:content-['&#xf05a'] before:text-blue-500 before:pr-2 text-gray-600 text-left font-bold mb-4">${articleData?.article?.title}</h1>${articleData?.article?.sections.map(section => `<div class="mb-4"><h2 class="text-[15px] text-gray-500 before:font-['Font_Awesome_6_Free'] before:content-['&#xf219'] before:text-cyan-900 before:pr-2 lg:text-xl font-bold py-4">${section?.section_title}</h2><p class="text-[13px] lg:text-[15px]">${section?.section_content}</p></div>`).join('')}</div>`;
});

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

function updateEditorContent() {
	var encryptedSource = sessionStorage.getItem(sources[currentTabIndex]);
	if (encryptedSource && sourceEditor) {
		sourceEditor.getModel().setValue(CryptoJS.AES.decrypt(encryptedSource, '4#>5p[:/v,o2q/(\*=:6').toString(CryptoJS.enc.Utf8));
	}
}

function saveEditorContent() {
	sessionStorage.setItem(sources[currentTabIndex], CryptoJS.AES.encrypt(sourceEditor.getModel().getValue(), '4#>5p[:/v,o2q/(\*=:6').toString());
}

function editTabName() {
	var activeTab = fileTabs.children[currentTabIndex];
	var tabNameInput = document.createElement('input');
	tabNameInput.type = 'text';
	tabNameInput.placeholder = "Enter:";
	tabNameInput.value = activeTab.textContent.trim();
	tabNameInput.autocorrect = "off";
	tabNameInput.spellcheck = false;
	tabNameInput.id = 'tab-name-input';
	tabNameInput.className = "focus:outline-none bg-transparent";
	tabNameInput.style.width = `${activeTab.offsetWidth - 90}px`;
	tabNameInput.addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			updateTabName();
			handleAutoScroll();
		}
	});
	tabNameInput.addEventListener('blur', () => {
		updateTabName();
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

function updateTabName() {
	var tabNameInput = document.getElementById('tab-name-input');
	var newName = tabNameInput.value.trim();
	var cleanedStrnopy = newName.replace(/\.py$/, '');
	if (!(/^\s+$/.test(cleanedStrnopy)) && (cleanedStrnopy.length >= 1 && cleanedStrnopy.length <= 256)) {
		var cleanedString = cleanedStrnopy.replace(/[^a-zA-Z0-9,\s.]|,(?![a-zA-Z])|\.(?![a-zA-Z]|py$)/g, "_");
		if (cleanedString.indexOf('.py', cleanedString.indexOf('.py') + 1) !== -1) {
			cleanedString = cleanedString.replace(/\.py(?!.*\.py)/, '');
		}
		fileTabs.children[currentTabIndex].textContent = `${cleanedString}.py`;
		var icon = document.createElement('i');
		icon.className = "fa-solid fa-file-code text-blue-600 pr-2";
		fileTabs.children[currentTabIndex].insertBefore(icon, fileTabs.children[currentTabIndex].childNodes[0]);
		tabNameInput.value = cleanedString;
		if (minifiedFileIndex === currentTabIndex) {
			minifiedFilename = fileTabs.children[currentTabIndex].textContent;

		}
	} else if (newName === '') {
		return;
	} else {
		handleErrorMessage(`${exctri} File name shouldn't contain invalid characters`);
	}
}

function updateNametoTab(fileName) {
	var activeTabIndex = currentTabIndex;
	var tabToUpdate = fileTabs.children[activeTabIndex];
	if (tabToUpdate) {
		tabToUpdate.innerHTML = `${code_file + fileName}`;
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
	addNewTabBtn.classList.remove("hidden")
	var newFileIndex = sources.length;
	var newSourceId = `#PyFile-${newFileIndex + 1}`;
	var newTab = document.createElement('li');
	newTab.className = 'file-tab relative cursor-pointer bg-[#f0f0f0] border-[#ccc] px-[25px] py-[8px] mb-[5px] border-[1px] border-solid rounded-[5px] mr-[5px] [transition:background-color_0.3s_ease] select-none transition-opacity';
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
	animateIcon("addNewTab", "fa-fade", 600);
	setTimeout(addEmptyTab, 500);
});

function updateTabStyles() {
	handleAutoScroll();
	var tabs = document.querySelectorAll('.file-tab');
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

function deleteFile(index) {
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
}

function confirmDeleteFile(index) {
	const tabFileName = fileTabs.children[currentTabIndex].textContent.replace(/\.py$/, "");
	if (sources.length === 1) {
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
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Yes",
		cancelButtonText: "No",
		cancelButtonColor: "#d33",
	}).then((result) => {
		if (result.isConfirmed) {
			deleteFile(index);
		}
	});
}

function deleteAllTabs() {
	var numTabs = sources.length;
	if (numTabs > 1) {
		for (var i = numTabs - 1; i > 0; i--) {
			deleteFile(i);
		}
	}
	if (numTabs === 0) {
		addEmptyTab();
	}
}

function clearSessionStorage() {
	sessionStorage.clear();
}
window.addEventListener('beforeunload', clearSessionStorage);

function switchTab(index) {
	disableTyping();
	var previousIndex = currentTabIndex;
	currentTabIndex = Math.max(0, Math.min(index, sources.length - 1));
	animateIcon(`file-${currentTabIndex + 1}`, "animate-pulse", 700);
	updateEditorContent();
	updateTabStyles();
	if (previousIndex !== currentTabIndex) {
		if (fileTabs.children[previousIndex].querySelector('#tab-name-input')) {
			updateTabName();
		}
	}
}

document.getElementById("file-1").addEventListener('click', () => {
	switchTab(0);
})