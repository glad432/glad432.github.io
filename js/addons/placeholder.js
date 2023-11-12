! function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(r) {
	function n(e) {
		e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
	}

	function i(e) {
		n(e);
		var o = e.state.placeholder = document.createElement("pre"),
			t = (o.style.cssText = "height: 0; overflow: visible", o.style.direction = e.getOption("direction"), o.className = "CodeMirror-placeholder CodeMirror-line-like", e.getOption("placeholder"));
		"string" == typeof t && (t = document.createTextNode(t)), o.appendChild(t), e.display.lineSpace.insertBefore(o, e.display.lineSpace.firstChild)
	}

	function l(e) {
		c(e) && i(e)
	}

	function a(e) {
		var o = e.getWrapperElement(),
			t = c(e);
		o.className = o.className.replace(" CodeMirror-empty", "") + (t ? " CodeMirror-empty" : ""), (t ? i : n)(e)
	}

	function c(e) {
		return 1 === e.lineCount() && "" === e.getLine(0)
	}
	r.defineOption("placeholder", "", function(e, o, t) {
		var t = t && t != r.Init;
		o && !t ? (e.on("blur", l), e.on("change", a), e.on("swapDoc", a), r.on(e.getInputField(), "compositionupdate", e.state.placeholderCompose = function() {
			var t;
			t = e, setTimeout(function() {
				var e, o = !1;
				((o = 1 == t.lineCount() ? "TEXTAREA" == (e = t.getInputField()).nodeName ? !t.getLine(0).length : !/[^\u200b]/.test(e.querySelector(".CodeMirror-line").textContent) : o) ? i : n)(t)
			}, 20)
		}), a(e)) : !o && t && (e.off("blur", l), e.off("change", a), e.off("swapDoc", a), r.off(e.getInputField(), "compositionupdate", e.state.placeholderCompose), n(e), (t = e.getWrapperElement()).className = t.className.replace(" CodeMirror-empty", "")), o && !e.hasFocus() && l(e)
	})
});