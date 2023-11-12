! function(t) {
	"object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], t) : t(CodeMirror)
}(function(r) {
	var u = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
		k = r.Pos,
		p = {
			"(": ")>",
			")": "(<",
			"[": "]>",
			"]": "[<",
			"{": "}>",
			"}": "{<",
			"<": ">>",
			">": "<<"
		};

	function y(t) {
		return t && t.bracketRegex || /[(){}[\]]/
	}

	function f(t, e, n) {
		var r = t.getLineHandle(e.line),
			i = e.ch - 1,
			c = n && n.afterCursor,
			a = (null == c && (c = /(^| )cm-fat-cursor($| )/.test(t.getWrapperElement().className)), y(n)),
			c = !c && 0 <= i && a.test(r.text.charAt(i)) && p[r.text.charAt(i)] || a.test(r.text.charAt(i + 1)) && p[r.text.charAt(++i)];
		if (!c) return null;
		a = ">" == c.charAt(1) ? 1 : -1;
		if (n && n.strict && 0 < a != (i == e.ch)) return null;
		r = t.getTokenTypeAt(k(e.line, i + 1)), t = o(t, k(e.line, i + (0 < a ? 1 : 0)), a, r, n);
		return null == t ? null : {
			from: k(e.line, i),
			to: t && t.pos,
			match: t && t.ch == c.charAt(0),
			forward: 0 < a
		}
	}

	function o(t, e, n, r, i) {
		for (var c = i && i.maxScanLineLength || 1e4, a = i && i.maxScanLines || 1e3, o = [], h = y(i), l = 0 < n ? Math.min(e.line + a, t.lastLine() + 1) : Math.max(t.firstLine() - 1, e.line - a), s = e.line; s != l; s += n) {
			var u = t.getLine(s);
			if (u) {
				var f = 0 < n ? 0 : u.length - 1,
					m = 0 < n ? u.length : -1;
				if (!(u.length > c))
					for (s == e.line && (f = e.ch - (n < 0 ? 1 : 0)); f != m; f += n) {
						var g = u.charAt(f);
						if (h.test(g) && (void 0 === r || (t.getTokenTypeAt(k(s, f + 1)) || "") == (r || ""))) {
							var d = p[g];
							if (d && ">" == d.charAt(1) == 0 < n) o.push(g);
							else {
								if (!o.length) return {
									pos: k(s, f),
									ch: g
								};
								o.pop()
							}
						}
					}
			}
		}
		return s - n != (0 < n ? t.lastLine() : t.firstLine()) && null
	}

	function e(t, e, n) {
		for (var r = t.state.matchBrackets.maxHighlightLineLength || 1e3, i = n && n.highlightNonMatching, c = [], a = t.listSelections(), o = 0; o < a.length; o++) {
			var h, l = a[o].empty() && f(t, a[o].head, n);
			l && (l.match || !1 !== i) && t.getLine(l.from.line).length <= r && (h = l.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket", c.push(t.markText(l.from, k(l.from.line, l.from.ch + 1), {
				className: h
			})), l.to && t.getLine(l.to.line).length <= r && c.push(t.markText(l.to, k(l.to.line, l.to.ch + 1), {
				className: h
			})))
		}
		if (c.length) {
			u && t.state.focused && t.focus();

			function s() {
				t.operation(function() {
					for (var t = 0; t < c.length; t++) c[t].clear()
				})
			}
			if (!e) return s;
			setTimeout(s, 800)
		}
	}

	function i(t) {
		t.operation(function() {
			t.state.matchBrackets.currentlyHighlighted && (t.state.matchBrackets.currentlyHighlighted(), t.state.matchBrackets.currentlyHighlighted = null), t.state.matchBrackets.currentlyHighlighted = e(t, !1, t.state.matchBrackets)
		})
	}

	function c(t) {
		t.state.matchBrackets && t.state.matchBrackets.currentlyHighlighted && (t.state.matchBrackets.currentlyHighlighted(), t.state.matchBrackets.currentlyHighlighted = null)
	}
	r.defineOption("matchBrackets", !1, function(t, e, n) {
		n && n != r.Init && (t.off("cursorActivity", i), t.off("focus", i), t.off("blur", c), c(t)), e && (t.state.matchBrackets = "object" == typeof e ? e : {}, t.on("cursorActivity", i), t.on("focus", i), t.on("blur", c))
	}), r.defineExtension("matchBrackets", function() {
		e(this, !0)
	}), r.defineExtension("findMatchingBracket", function(t, e, n) {
		return f(this, t, e = !n && "boolean" != typeof e ? e : n ? (n.strict = e, n) : e ? {
			strict: !0
		} : null)
	}), r.defineExtension("scanForBracket", function(t, e, n, r) {
		return o(this, t, e, n, r)
	})
});