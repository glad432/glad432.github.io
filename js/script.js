/*https://gist.github.com/gladw-in/4a6dfe72d580442a40efa1d8ad43ef02*/
const btn = document.getElementById("mode");
var darkMode = localStorage.getItem("dark-mode");
btn.classList.add("s-light");
localStorage.setItem("dark-mode", "disabled");

const enableDarkMode = () => {
    btn.classList.remove("s-light");
    btn.classList.add("s-dark");
    localStorage.setItem("dark-mode", "enabled");
    var head = document.getElementsByTagName("HEAD")[0];
    var link = document.createElement("link");
    link.id = "dark-mode";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "css/dark.css";
    head.appendChild(link);
};

const disableDarkMode = () => {
    btn.classList.add("s-light");
    btn.classList.remove("s-dark");
    localStorage.setItem("dark-mode", "disabled");
    const rm = document.getElementById("dark-mode");
    if (rm) {
        rm.remove();
    }
};

if (darkMode === "enabled") {
    enableDarkMode();
}

btn.addEventListener("click", (e) => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});


class aa {
    constructor(element) {
        this.minifyButton = document.getElementById("minify");
        this.sourceTextArea = document.getElementById("source");
        this.minifiedTextArea = document.getElementById("minified");
        this.sourceSizeSpan = document.getElementById("source-size");
        this.minifiedSizeSpan = document.getElementById("minified-size");
        this.copyButton = document.getElementById("copy");
        this.api_url = "https://api.python-minifier.com/minifypython38";
        this.minifyButton.addEventListener("click", this.minifyClick.bind(this));
        this.copyButton.addEventListener("click", this.copyClick.bind(this));
        this.sourceTextArea.addEventListener("input", this.updateSourceSize.bind(this));
        const options = ["combine_imports", "remove_pass", "remove_literal_statements", "remove_annotations", "hoist_literals", "rename_locals", "rename_globals", "preserve_globals", "preserve_locals", "convert_posargs_to_args"];
        for (let option of options) {
            document.getElementById(option).addEventListener("change", this.optionsChange.bind(this));
        }
        this.sourceSizeSpan.innerHTML = this.sourceTextArea.value.length + " Bytes";
        this.minifyButton.disabled = false;
    }
    build_query() {
        const options = ["combine_imports", "remove_pass", "remove_literal_statements", "remove_annotations", "hoist_literals", "rename_locals", "rename_globals", "convert_posargs_to_args"];
        let query = options.map((option) => `${option}=${document.getElementById(option).checked}`).join("&");
        const preserve_globals = document.getElementById("preserve_globals").value;
        if (preserve_globals) {
            query += "&preserve_globals=" + encodeURIComponent(preserve_globals);
        }
        const preserve_locals = document.getElementById("preserve_locals").value;
        if (preserve_locals) {
            query += "&preserve_locals=" + encodeURIComponent(preserve_locals);
        }
        return query;
    }
    optionsChange(event) {
        this.minifiedTextArea.disabled = true;
    }
    copyClick() {
        navigator.clipboard.writeText(this.minifiedTextArea.value);
    }
    async minifyClick(event) {
        this.minifyButton.disabled = true;
        this.minifiedSizeSpan.innerHTML = "Working....";
        try {
            const response = await fetch(this.api_url + "?" + this.build_query(), {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: this.sourceTextArea.value
            });
            if (response.ok) {
                const minified = await response.text();
                this.minifiedTextArea.value = minified;
                this.minifiedSizeSpan.innerHTML = minified.length + " Bytes";
                this.minifiedTextArea.disabled = false;
                this.copyButton.disabled = false;
            } else {
                this.copyButton.disabled = true;
                this.minifiedTextArea.value = "";
                this.minifiedSizeSpan.innerHTML = "Error";
                try {
                    const error = await response.json();
                    this.minifiedSizeSpan.innerHTML = error["message"];
                } catch {}
            }
        } catch {
            this.copyButton.disabled = true;
            this.minifiedTextArea.value = "";
            this.minifiedSizeSpan.innerHTML = "Timeout.";
        }
        this.minifyButton.disabled = false;
    }
    updateSourceSize(event) {
        this.sourceSizeSpan.innerHTML = this.sourceTextArea.value.length + " Bytes";
        this.minifiedTextArea.disabled = true;
    }
}
const minifier = new aa(document);