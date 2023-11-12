! function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(y) {
	"use strict";
	var b = /[\w$]+/;
	y.registerHelper("hint", "anyword", function(e, r) {
		for (var t = r && r.word || b, o = r && r.range || 500, i = e.getCursor(), n = e.getLine(i.line), f = i.ch, s = f; s && t.test(n.charAt(s - 1));) --s;
		for (var a = s != f && n.slice(s, f), c = r && r.list || [], l = {}, d = new RegExp(t.source, "g"), u = -1; u <= 1; u += 2)
			for (var p = i.line, g = Math.min(Math.max(p + u * o, e.firstLine()), e.lastLine()) + u; p != g; p += u)
				for (var h, m = e.getLine(p); h = d.exec(m);) p == i.line && h[0] === a || a && 0 != h[0].lastIndexOf(a, 0) || Object.prototype.hasOwnProperty.call(l, h[0]) || (l[h[0]] = !0, c.push(h[0]));
		return {
			list: c,
			from: y.Pos(i.line, s),
			to: y.Pos(i.line, f)
		}
	})
});