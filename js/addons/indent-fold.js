! function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(l) {
	"use strict";

	function u(e, n) {
		var t = e.getLine(n),
			i = t.search(/\S/);
		return -1 == i || /\bcomment\b/.test(e.getTokenTypeAt(l.Pos(n, i + 1))) ? -1 : l.countColumn(t, null, e.getOption("tabSize"))
	}
	l.registerHelper("fold", "indent", function(e, n) {
		var t = u(e, n.line);
		if (!(t < 0)) {
			for (var i = null, o = n.line + 1, r = e.lastLine(); o <= r; ++o) {
				var f = u(e, o);
				if (-1 != f) {
					if (!(t < f)) break;
					i = o
				}
			}
			return i ? {
				from: l.Pos(n.line, e.getLine(n.line).length),
				to: l.Pos(i, e.getLine(i).length)
			} : void 0
		}
	})
});