! function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(S) {
	var n = {
			pairs: "()[]{}''\"\"",
			closeBefore: ")]}'\":;>",
			triples: "",
			explode: "[]{}"
		},
		k = S.Pos;

	function y(e, t) {
		return "pairs" == t && "string" == typeof e ? e : ("object" == typeof e && null != e[t] ? e : n)[t]
	}
	S.defineOption("autoCloseBrackets", !1, function(e, t, n) {
		n && n != S.Init && (e.removeKeyMap(i), e.state.closeBrackets = null), t && (r(y(t, "pairs")), e.state.closeBrackets = t, e.addKeyMap(i))
	});
	var i = {
		Backspace: function(e) {
			var t = O(e);
			if (!t || e.getOption("disableInput")) return S.Pass;
			for (var n = y(t, "pairs"), r = e.listSelections(), i = 0; i < r.length; i++) {
				if (!r[i].empty()) return S.Pass;
				var a = s(e, r[i].head);
				if (!a || n.indexOf(a) % 2 != 0) return S.Pass
			}
			for (i = r.length - 1; 0 <= i; i--) {
				var o = r[i].head;
				e.replaceRange("", k(o.line, o.ch - 1), k(o.line, o.ch + 1), "+delete")
			}
		},
		Enter: function(r) {
			var e = O(r),
				t = e && y(e, "explode");
			if (!t || r.getOption("disableInput")) return S.Pass;
			for (var i = r.listSelections(), n = 0; n < i.length; n++) {
				if (!i[n].empty()) return S.Pass;
				var a = s(r, i[n].head);
				if (!a || t.indexOf(a) % 2 != 0) return S.Pass
			}
			r.operation(function() {
				var e = r.lineSeparator() || "\n";
				r.replaceSelection(e + e, null), m(r, -1), i = r.listSelections();
				for (var t = 0; t < i.length; t++) {
					var n = i[t].head.line;
					r.indentLine(n, null, !0), r.indentLine(n + 1, null, !0)
				}
			})
		}
	};

	function r(e) {
		for (var t = 0; t < e.length; t++) {
			var n = e.charAt(t),
				r = "'" + n + "'";
			i[r] || (i[r] = function(P) {
				return function(e) {
					var i = e,
						t = P,
						e = O(i);
					if (!e || i.getOption("disableInput")) return S.Pass;
					var n = y(e, "pairs"),
						r = n.indexOf(t);
					if (-1 == r) return S.Pass;
					for (var a, o = y(e, "closeBefore"), s = y(e, "triples"), l = n.charAt(r + 1) == t, c = i.listSelections(), h = r % 2 == 0, f = 0; f < c.length; f++) {
						var u, d = c[f],
							p = d.head,
							g = i.getRange(p, k(p.line, p.ch + 1));
						if (h && !d.empty()) u = "surround";
						else if (!l && h || g != t)
							if (l && 1 < p.ch && 0 <= s.indexOf(t) && i.getRange(k(p.line, p.ch - 2), p) == t + t) {
								if (2 < p.ch && /\bstring/.test(i.getTokenTypeAt(k(p.line, p.ch - 2)))) return S.Pass;
								u = "addFour"
							} else if (l) {
							d = 0 == p.ch ? " " : i.getRange(k(p.line, p.ch - 1), p);
							if (S.isWordChar(g) || d == t || S.isWordChar(d)) return S.Pass;
							u = "both"
						} else {
							if (!h || !(0 === g.length || /\s/.test(g) || -1 < o.indexOf(g))) return S.Pass;
							u = "both"
						} else u = l && function(e, t) {
							var n = e.getTokenAt(k(t.line, t.ch + 1));
							return /\bstring/.test(n.type) && n.start == t.ch && (0 == t.ch || !/\bstring/.test(e.getTokenTypeAt(t)))
						}(i, p) ? "both" : 0 <= s.indexOf(t) && i.getRange(p, k(p.line, p.ch + 3)) == t + t + t ? "skipThree" : "skip";
						if (a) {
							if (a != u) return S.Pass
						} else a = u
					}
					var v = r % 2 ? n.charAt(r - 1) : t,
						b = r % 2 ? t : n.charAt(r + 1);
					i.operation(function() {
						if ("skip" == a) m(i, 1);
						else if ("skipThree" == a) m(i, 3);
						else if ("surround" == a) {
							for (var e = i.getSelections(), t = 0; t < e.length; t++) e[t] = v + e[t] + b;
							i.replaceSelections(e, "around");
							for (e = i.listSelections().slice(), t = 0; t < e.length; t++) e[t] = (n = e[t], r = void 0, r = 0 < S.cmpPos(n.anchor, n.head), {
								anchor: new k(n.anchor.line, n.anchor.ch + (r ? -1 : 1)),
								head: new k(n.head.line, n.head.ch + (r ? 1 : -1))
							});
							i.setSelections(e)
						} else "both" == a ? (i.replaceSelection(v + b, null), i.triggerElectric(v + b), m(i, -1)) : "addFour" == a && (i.replaceSelection(v + v + v + v, "before"), m(i, 1));
						var n, r
					})
				}
			}(n))
		}
	}

	function O(e) {
		var t = e.state.closeBrackets;
		return t && !t.override && e.getModeAt(e.getCursor()).closeBrackets || t
	}

	function m(e, t) {
		for (var n = [], r = e.listSelections(), i = 0, a = 0; a < r.length; a++) {
			var o = r[a],
				o = (o.head == e.getCursor() && (i = a), o.head.ch || 0 < t ? {
					line: o.head.line,
					ch: o.head.ch + t
				} : {
					line: o.head.line - 1
				});
			n.push({
				anchor: o,
				head: o
			})
		}
		e.setSelections(n, i)
	}

	function s(e, t) {
		e = e.getRange(k(t.line, t.ch - 1), k(t.line, t.ch + 1));
		return 2 == e.length ? e : null
	}
	r(n.pairs + "`")
});