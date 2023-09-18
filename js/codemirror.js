! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).CodeMirror = t()
}(this, function() {
	"use strict";
	var e = navigator.userAgent,
		t = navigator.platform,
		n = /gecko\/\d/i.test(e),
		r = /MSIE \d/.test(e),
		i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
		o = /Edge\/(\d+)/.exec(e),
		l = r || i || o,
		s = l && (r ? document.documentMode || 6 : +(o || i)[1]),
		a = !o && /WebKit\//.test(e),
		i = a && /Qt\/\d+\.\d+/.test(e),
		u = !o && /Chrome\//.test(e),
		c = /Opera\//.test(e),
		h = /Apple Computer/.test(navigator.vendor),
		d = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
		f = /PhantomJS/.test(e),
		p = h && (/Mobile\/\w+/.test(e) || 2 < navigator.maxTouchPoints),
		g = /Android/.test(e),
		m = p || g || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
		v = p || /Mac/.test(t),
		$ = /\bCrOS\b/.test(e),
		y = /win/i.test(t),
		e = c && e.match(/Version\/(\d*\.\d*)/);
	(e = e && Number(e[1])) && 15 <= e && (a = (c = !1, !0));
	var _ = v && (i || c && (null == e || e < 12.11)),
		b = n || l && 9 <= s;

	function x(e) {
		return RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
	}
	var w = function(e, t) {
		var n = e.className,
			r = x(t).exec(n);
		r && (t = n.slice(r.index + r[0].length), e.className = n.slice(0, r.index) + (t ? r[1] + t : ""))
	};

	function C(e) {
		for (var t = e.childNodes.length; 0 < t; --t) e.removeChild(e.firstChild);
		return e
	}

	function S(e, t) {
		return C(e).appendChild(t)
	}

	function L(e, t, n, r) {
		var i = document.createElement(e);
		if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t));
		else if (t)
			for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
		return i
	}

	function k(e, t, n, r) {
		return (r = L(e, t, n, r)).setAttribute("role", "presentation"), r
	}

	function T(e, t) {
		if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
		do
			if ((t = 11 == t.nodeType ? t.host : t) == e) return !0; while (t = t.parentNode)
	}

	function N() {
		var e;
		try {
			e = document.activeElement
		} catch (t) {
			e = document.body || null
		}
		for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
		return e
	}

	function O(e, t) {
		var n = e.className;
		x(t).test(n) || (e.className += (n ? " " : "") + t)
	}

	function M(e, t) {
		for (var n = e.split(" "), r = 0; r < n.length; r++) n[r] && !x(n[r]).test(t) && (t += " " + n[r]);
		return t
	}
	var A = document.createRange ? function(e, t, n, r) {
			var i = document.createRange();
			return i.setEnd(r || e, n), i.setStart(e, t), i
		} : function(e, t, n) {
			var r = document.body.createTextRange();
			try {
				r.moveToElementText(e.parentNode)
			} catch (i) {
				return r
			}
			return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
		},
		W = function(e) {
			e.select()
		};

	function D(e) {
		var t = Array.prototype.slice.call(arguments, 1);
		return function() {
			return e.apply(null, t)
		}
	}

	function H(e, t, n) {
		for (var r in t = t || {}, e) !e.hasOwnProperty(r) || !1 === n && t.hasOwnProperty(r) || (t[r] = e[r]);
		return t
	}

	function F(e, t, n, r, i) {
		null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
		for (var o = r || 0, l = i || 0;;) {
			var s = e.indexOf("	", o);
			if (s < 0 || t <= s) return l + (t - o);
			l += s - o, l += n - l % n, o = s + 1
		}
	}

	function P() {
		this.id = null, this.f = null, this.time = 0, this.handler = D(this.onTimeout, this)
	}

	function E(e, t) {
		for (var n = 0; n < e.length; ++n)
			if (e[n] == t) return n;
		return -1
	}
	p ? W = function(e) {
		e.selectionStart = 0, e.selectionEnd = e.value.length
	} : l && (W = function(e) {
		try {
			e.select()
		} catch (t) {}
	}), P.prototype.onTimeout = function(e) {
		e.id = 0, e.time <= +new Date ? e.f() : setTimeout(e.handler, e.time - +new Date)
	};
	var z = {
			toString: function() {
				return "CodeMirror.Pass"
			}
		},
		I = {
			scroll: (P.prototype.set = function(e, t) {
				this.f = t, t = +new Date + e, (!this.id || t < this.time) && (clearTimeout(this.id), this.id = setTimeout(this.handler, e), this.time = t)
			}, !1)
		},
		R = {
			origin: "*mouse"
		},
		B = {
			origin: "+move"
		};

	function G(e, t, n) {
		for (var r = 0, i = 0;;) {
			var o = e.indexOf("	", r),
				l = (o = -1 == o ? e.length : o) - r;
			if (o == e.length || t <= i + l) return r + Math.min(l, t - i);
			if (i += o - r, r = o + 1, t <= (i += n - i % n)) return r
		}
	}
	var U = [""];

	function V(e) {
		for (; U.length <= e;) U.push(K(U) + " ");
		return U[e]
	}

	function K(e) {
		return e[e.length - 1]
	}

	function X(e, t) {
		for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
		return n
	}

	function j() {}

	function Y(e, t) {
		return e = Object.create ? Object.create(e) : (j.prototype = e, new j), t && H(t, e), e
	}
	var q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

	function Z(e) {
		return /\w/.test(e) || "\x80" < e && (e.toUpperCase() != e.toLowerCase() || q.test(e))
	}

	function Q(e, t) {
		return t ? !!(-1 < t.source.indexOf("\\w") && Z(e)) || t.test(e) : Z(e)
	}

	function J(e) {
		for (var t in e)
			if (e.hasOwnProperty(t) && e[t]) return;
		return 1
	}
	var ee = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

	function et(e) {
		return 768 <= e.charCodeAt(0) && ee.test(e)
	}

	function en(e, t, n) {
		for (;
			(n < 0 ? 0 < t : t < e.length) && et(e.charAt(t));) t += n;
		return t
	}

	function er(e, t, n) {
		for (var r = n < t ? -1 : 1;;) {
			if (t == n) return t;
			var i = (t + n) / 2,
				i = r < 0 ? Math.ceil(i) : Math.floor(i);
			if (i == t) return e(i) ? t : n;
			e(i) ? n = i : t = i + r
		}
	}
	var ei = null;

	function eo(e, t, n) {
		var r;
		ei = null;
		for (var i = 0; i < e.length; ++i) {
			var o = e[i];
			if (o.from < t && o.to > t) return i;
			o.to == t && (o.from != o.to && "before" == n ? r = i : ei = i), o.from == t && (o.from != o.to && "before" != n ? r = i : ei = i)
		}
		return null != r ? r : ei
	}
	var el, es, ea, eu, ec, eh = (el = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, es = /[stwN]/, ea = /[LRr]/, eu = /[Lb1n]/, ec = /[1n]/, function(e, t) {
		var n = "ltr" == t ? "L" : "R";
		if (0 == e.length || "ltr" == t && !el.test(e)) return !1;
		for (var r, i = e.length, o = [], l = 0; l < i; ++l) o.push((r = e.charCodeAt(l)) <= 247 ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(r) : 1424 <= r && r <= 1524 ? "R" : 1536 <= r && r <= 1785 ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(r - 1536) : 1774 <= r && r <= 2220 ? "r" : 8192 <= r && r <= 8203 ? "w" : 8204 == r ? "b" : "L");
		for (var s = 0, a = n; s < i; ++s) {
			var u = o[s];
			"m" == u ? o[s] = a : a = u
		}
		for (var c = 0, h = n; c < i; ++c) {
			var d = o[c];
			"1" == d && "r" == h ? o[c] = "n" : ea.test(d) && "r" == (h = d) && (o[c] = "R")
		}
		for (var f = 1, p = o[0]; f < i - 1; ++f) {
			var g = o[f];
			"+" == g && "1" == p && "1" == o[f + 1] ? o[f] = "1" : "," != g || p != o[f + 1] || "1" != p && "n" != p || (o[f] = p), p = g
		}
		for (var m = 0; m < i; ++m) {
			var v = o[m];
			if ("," == v) o[m] = "N";
			else if ("%" == v) {
				for (var $ = void 0, $ = m + 1; $ < i && "%" == o[$]; ++$);
				for (var y = m && "!" == o[m - 1] || $ < i && "1" == o[$] ? "1" : "N", _ = m; _ < $; ++_) o[_] = y;
				m = $ - 1
			}
		}
		for (var b = 0, x = n; b < i; ++b) {
			var w = o[b];
			"L" == x && "1" == w ? o[b] = "L" : ea.test(w) && (x = w)
		}
		for (var C = 0; C < i; ++C)
			if (es.test(o[C])) {
				for (var S = void 0, S = C + 1; S < i && es.test(o[S]); ++S);
				for (var L = "L" == (C ? o[C - 1] : n), k = L == ("L" == (S < i ? o[S] : n)) ? L ? "L" : "R" : n, T = C; T < S; ++T) o[T] = k;
				C = S - 1
			} for (var N, O = [], M = 0; M < i;)
			if (eu.test(o[M])) {
				var A = M;
				for (++M; M < i && eu.test(o[M]); ++M);
				O.push(new ed(0, A, M))
			} else {
				var W = M,
					D = O.length,
					H = "rtl" == t ? 1 : 0;
				for (++M; M < i && "L" != o[M]; ++M);
				for (var F = W; F < M;)
					if (ec.test(o[F])) {
						W < F && (O.splice(D, 0, new ed(1, W, F)), D += H);
						var P = F;
						for (++F; F < M && ec.test(o[F]); ++F);
						O.splice(D, 0, new ed(2, P, F)), D += H, W = F
					} else ++F;
				W < M && O.splice(D, 0, new ed(1, W, M))
			} return "ltr" == t && (1 == O[0].level && (N = e.match(/^\s+/)) && (O[0].from = N[0].length, O.unshift(new ed(0, 0, N[0].length))), 1 == K(O).level && (N = e.match(/\s+$/)) && (K(O).to -= N[0].length, O.push(new ed(0, i - N[0].length, i)))), "rtl" == t ? O.reverse() : O
	});

	function ed(e, t, n) {
		this.level = e, this.from = t, this.to = n
	}

	function ef(e, t) {
		var n = e.order;
		return null == n ? e.order = eh(e.text, t) : n
	}
	var ep = [],
		eg = function(e, t, n) {
			e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : (e = e._handlers || (e._handlers = {}))[t] = (e[t] || ep).concat(n)
		};

	function em(e, t) {
		return e._handlers && e._handlers[t] || ep
	}

	function ev(e, t, n) {
		var r;
		e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : (e = (r = e._handlers) && r[t]) && -1 < (n = E(e, n)) && (r[t] = e.slice(0, n).concat(e.slice(n + 1)))
	}

	function e$(e, t) {
		var n = em(e, t);
		if (n.length)
			for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
	}

	function ey(e, t, n) {
		return "string" == typeof t && (t = {
			type: t,
			preventDefault: function() {
				this.defaultPrevented = !0
			}
		}), e$(e, n || t.type, e, t), eS(t) || t.codemirrorIgnore
	}

	function e_(e) {
		var t = e._handlers && e._handlers.cursorActivity;
		if (t)
			for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) - 1 == E(n, t[r]) && n.push(t[r])
	}

	function eb(e, t) {
		return 0 < em(e, t).length
	}

	function ex(e) {
		e.prototype.on = function(e, t) {
			eg(this, e, t)
		}, e.prototype.off = function(e, t) {
			ev(this, e, t)
		}
	}

	function ew(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = !1
	}

	function eC(e) {
		e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
	}

	function eS(e) {
		return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
	}

	function eL(e) {
		ew(e), eC(e)
	}

	function ek(e) {
		return e.target || e.srcElement
	}

	function eT(e) {
		var t = e.which;
		return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), t = v && e.ctrlKey && 1 == t ? 3 : t
	}
	var eN, eO, eM = function() {
			if (l && s < 9) return !1;
			var e = L("div");
			return "draggable" in e || "dragDrop" in e
		}(),
		eA = 3 != "\n\nb".split(/\n/).length ? function(e) {
			for (var t = 0, n = [], r = e.length; t <= r;) {
				var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
				var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
					l = o.indexOf("\r"); - 1 != l ? (n.push(o.slice(0, l)), t += l + 1) : (n.push(o), t = i + 1)
			}
			return n
		} : function(e) {
			return e.split(/\r\n?|\n/)
		},
		eW = window.getSelection ? function(e) {
			try {
				return e.selectionStart != e.selectionEnd
			} catch (t) {
				return !1
			}
		} : function(e) {
			var t;
			try {
				t = e.ownerDocument.selection.createRange()
			} catch (n) {}
			return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
		},
		e0 = "oncopy" in (i = L("div")) || (i.setAttribute("oncopy", "return;"), "function" == typeof i.oncopy),
		eD = null,
		eH = {},
		eF = {};

	function e1(e) {
		if ("string" == typeof e && eF.hasOwnProperty(e)) e = eF[e];
		else if (e && "string" == typeof e.name && eF.hasOwnProperty(e.name)) {
			var t = eF[e.name];
			(e = Y(t = "string" == typeof t ? {
				name: t
			} : t, e)).name = t.name
		} else {
			if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return e1("application/xml");
			if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return e1("application/json")
		}
		return "string" == typeof e ? {
			name: e
		} : e || {
			name: "null"
		}
	}

	function eP(e, t) {
		var n = eH[(t = e1(t)).name];
		if (!n) return eP(e, "text/plain");
		var r = n(e, t);
		if (eE.hasOwnProperty(t.name)) {
			var i, o = eE[t.name];
			for (i in o) o.hasOwnProperty(i) && (r.hasOwnProperty(i) && (r["_" + i] = r[i]), r[i] = o[i])
		}
		if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
			for (var l in t.modeProps) r[l] = t.modeProps[l];
		return r
	}
	var eE = {};

	function ez(e, t) {
		if (!0 === t) return t;
		if (e.copyState) return e.copyState(t);
		var n, r = {};
		for (n in t) {
			var i = t[n];
			i instanceof Array && (i = i.concat([])), r[n] = i
		}
		return r
	}

	function eI(e, t) {
		for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e;) t = n.state, e = n.mode;
		return n || {
			mode: e,
			state: t
		}
	}

	function eR(e, t, n) {
		return !e.startState || e.startState(t, n)
	}
	var e3 = function(e, t, n) {
		this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n
	};

	function eB(e, t) {
		if ((t -= e.first) < 0 || t >= e.size) throw Error("There is no line " + (t + e.first) + " in the document.");
		for (var n = e; !n.lines;)
			for (var r = 0;; ++r) {
				var i = n.children[r],
					o = i.chunkSize();
				if (t < o) {
					n = i;
					break
				}
				t -= o
			}
		return n.lines[t]
	}

	function e7(e, t, n) {
		var r = [],
			i = t.line;
		return e.iter(t.line, n.line + 1, function(e) {
			e = e.text, i == n.line && (e = e.slice(0, n.ch)), i == t.line && (e = e.slice(t.ch)), r.push(e), ++i
		}), r
	}

	function e4(e, t, n) {
		var r = [];
		return e.iter(t, n, function(e) {
			r.push(e.text)
		}), r
	}

	function e6(e, t) {
		var n = t - e.height;
		if (n)
			for (var r = e; r; r = r.parent) r.height += n
	}

	function e2(e) {
		if (null == e.parent) return null;
		for (var t = e.parent, n = E(t.lines, e), r = t.parent; r; r = (t = r).parent)
			for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
		return n + t.first
	}

	function e5(e, t) {
		var n = e.first;
		e: do {
			for (var r = 0; r < e.children.length; ++r) {
				var i = e.children[r],
					o = i.height;
				if (t < o) {
					e = i;
					continue e
				}
				t -= o, n += i.chunkSize()
			}
			return n
		} while (!e.lines);
		for (var l = 0; l < e.lines.length; ++l) {
			var s = e.lines[l].height;
			if (t < s) break;
			t -= s
		}
		return n + l
	}

	function eG(e, t) {
		return t >= e.first && t < e.first + e.size
	}

	function eU(e, t) {
		return String(e.lineNumberFormatter(t + e.firstLineNumber))
	}

	function eV(e, t, n) {
		if (void 0 === n && (n = null), !(this instanceof eV)) return new eV(e, t, n);
		this.line = e, this.ch = t, this.sticky = n
	}

	function eK(e, t) {
		return e.line - t.line || e.ch - t.ch
	}

	function eX(e, t) {
		return e.sticky == t.sticky && 0 == eK(e, t)
	}

	function ej(e) {
		return eV(e.line, e.ch)
	}

	function eY(e, t) {
		return 0 > eK(e, t) ? t : e
	}

	function e8(e, t) {
		return 0 > eK(e, t) ? e : t
	}

	function e9(e, t) {
		return Math.max(e.first, Math.min(t, e.first + e.size - 1))
	}

	function eq(e, t) {
		if (t.line < e.first) return eV(e.first, 0);
		var n = e.first + e.size - 1;
		return t.line > n ? eV(n, eB(e, n).text.length) : (e = eB(e, (n = t).line).text.length, null == (t = n.ch) || e < t ? eV(n.line, e) : t < 0 ? eV(n.line, 0) : n)
	}

	function eZ(e, t) {
		for (var n = [], r = 0; r < t.length; r++) n[r] = eq(e, t[r]);
		return n
	}

	function eQ(e, t) {
		this.state = e, this.lookAhead = t
	}
	e3.prototype.eol = function() {
		return this.pos >= this.string.length
	}, e3.prototype.sol = function() {
		return this.pos == this.lineStart
	}, e3.prototype.peek = function() {
		return this.string.charAt(this.pos) || void 0
	}, e3.prototype.next = function() {
		if (this.pos < this.string.length) return this.string.charAt(this.pos++)
	}, e3.prototype.eat = function(e) {
		var t = this.string.charAt(this.pos),
			e = "string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t));
		if (e) return ++this.pos, t
	}, e3.prototype.eatWhile = function(e) {
		for (var t = this.pos; this.eat(e););
		return this.pos > t
	}, e3.prototype.eatSpace = function() {
		for (var e = this.pos;
			/[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
		return this.pos > e
	}, e3.prototype.skipToEnd = function() {
		this.pos = this.string.length
	}, e3.prototype.skipTo = function(e) {
		if (-1 < (e = this.string.indexOf(e, this.pos))) return this.pos = e, !0
	}, e3.prototype.backUp = function(e) {
		this.pos -= e
	}, e3.prototype.column = function() {
		return this.lastColumnPos < this.start && (this.lastColumnValue = F(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? F(this.string, this.lineStart, this.tabSize) : 0)
	}, e3.prototype.indentation = function() {
		return F(this.string, null, this.tabSize) - (this.lineStart ? F(this.string, this.lineStart, this.tabSize) : 0)
	}, e3.prototype.match = function(e, t, n) {
		if ("string" != typeof e) {
			var r = this.string.slice(this.pos).match(e);
			return r && 0 < r.index ? null : (r && !1 !== t && (this.pos += r[0].length), r)
		}
		if ((r = function(e) {
				return n ? e.toLowerCase() : e
			})(this.string.substr(this.pos, e.length)) == r(e)) return !1 !== t && (this.pos += e.length), !0
	}, e3.prototype.current = function() {
		return this.string.slice(this.start, this.pos)
	}, e3.prototype.hideFirstChars = function(e, t) {
		this.lineStart += e;
		try {
			return t()
		} finally {
			this.lineStart -= e
		}
	}, e3.prototype.lookAhead = function(e) {
		var t = this.lineOracle;
		return t && t.lookAhead(e)
	}, e3.prototype.baseToken = function() {
		var e = this.lineOracle;
		return e && e.baseToken(this.pos)
	};
	var eJ = function(e, t, n, r) {
		this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1
	};

	function te(e, t, n, r) {
		var i = [e.state.modeGen],
			o = {};
		tu(e, t.text, e.doc.mode, n, function(e, t) {
			return i.push(e, t)
		}, o, r);
		for (var l = n.state, s = 0; s < e.state.overlays.length; ++s) ! function(r) {
			n.baseTokens = i;
			var s = e.state.overlays[r],
				a = 1,
				u = 0;
			n.state = !0, tu(e, t.text, s.mode, n, function(e, t) {
				for (var n = a; u < e;) {
					var r = i[a];
					e < r && i.splice(a, 1, e, i[a + 1], r), a += 2, u = Math.min(e, r)
				}
				if (t) {
					if (s.opaque) i.splice(n, a - n, e, "overlay " + t), a = n + 2;
					else
						for (; n < a; n += 2) {
							var o = i[n + 1];
							i[n + 1] = (o ? o + " " : "") + "overlay " + t
						}
				}
			}, o), n.state = l, n.baseTokens = null, n.baseTokenPos = 1
		}(s);
		return {
			styles: i,
			classes: o.bgClass || o.textClass ? o : null
		}
	}

	function tt(e, t, n) {
		var r, i, o;
		return t.styles && t.styles[0] == e.state.modeGen || (r = tn(e, e2(t)), i = t.text.length > e.options.maxHighlightLength && ez(e.doc.mode, r.state), o = te(e, t, r), i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))), t.styles
	}

	function tn(e, t, n) {
		var r = e.doc,
			i = e.display;
		if (!r.mode.startState) return new eJ(r, !0, t);
		var o = function(e, t, n) {
				for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), s = t; l < s; --s) {
					if (s <= o.first) return o.first;
					var a = eB(o, s - 1),
						u = a.stateAfter;
					if (u && (!n || s + (u instanceof eQ ? u.lookAhead : 0) <= o.modeFrontier)) return s;
					a = F(a.text, null, e.options.tabSize), (null == i || a < r) && (i = s - 1, r = a)
				}
				return i
			}(e, t, n),
			l = o > r.first && eB(r, o - 1).stateAfter,
			s = l ? eJ.fromSaved(r, l, o) : new eJ(r, eR(r.mode), o);
		return r.iter(o, t, function(n) {
			tr(e, n.text, s);
			var r = s.line;
			n.stateAfter = r == t - 1 || r % 5 == 0 || r >= i.viewFrom && r < i.viewTo ? s.save() : null, s.nextLine()
		}), n && (r.modeFrontier = s.line), s
	}

	function tr(e, t, n, r) {
		var i = e.doc.mode,
			o = new e3(t, e.options.tabSize, n);
		for (o.start = o.pos = r || 0, "" == t && ti(i, n.state); !o.eol();) to(i, o, n.state), o.start = o.pos
	}

	function ti(e, t) {
		return e.blankLine ? e.blankLine(t) : e.innerMode && (t = eI(e, t)).mode.blankLine ? t.mode.blankLine(t.state) : void 0
	}

	function to(e, t, n, r) {
		for (var i = 0; i < 10; i++) {
			r && (r[0] = eI(e, n).mode);
			var o = e.token(t, n);
			if (t.pos > t.start) return o
		}
		throw Error("Mode " + e.name + " failed to advance stream.")
	}
	eJ.prototype.lookAhead = function(e) {
		var t = this.doc.getLine(this.line + e);
		return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
	}, eJ.prototype.baseToken = function(e) {
		if (!this.baseTokens) return null;
		for (; this.baseTokens[this.baseTokenPos] <= e;) this.baseTokenPos += 2;
		var t = this.baseTokens[this.baseTokenPos + 1];
		return {
			type: t && t.replace(/( |^)overlay .*/, ""),
			size: this.baseTokens[this.baseTokenPos] - e
		}
	}, eJ.prototype.nextLine = function() {
		this.line++, 0 < this.maxLookAhead && this.maxLookAhead--
	}, eJ.fromSaved = function(e, t, n) {
		return t instanceof eQ ? new eJ(e, ez(e.mode, t.state), n, t.lookAhead) : new eJ(e, ez(e.mode, t), n)
	}, eJ.prototype.save = function(e) {
		return e = !1 !== e ? ez(this.doc.mode, this.state) : this.state, 0 < this.maxLookAhead ? new eQ(e, this.maxLookAhead) : e
	};
	var tl = function(e, t, n) {
		this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n
	};

	function ts(e, t, n, r) {
		var i, o, l = e.doc,
			s = l.mode,
			a = eB(l, (t = eq(l, t)).line),
			u = tn(e, t.line, n),
			c = new e3(a.text, e.options.tabSize, u);
		for (r && (o = []);
			(r || c.pos < t.ch) && !c.eol();) c.start = c.pos, i = to(s, c, u.state), r && o.push(new tl(c, i, ez(l.mode, u.state)));
		return r ? o : new tl(c, i, u.state)
	}

	function ta(e, t) {
		if (e)
			for (;;) {
				var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
				if (!n) break;
				e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
				var r = n[1] ? "bgClass" : "textClass";
				null == t[r] ? t[r] = n[2] : RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + n[2])
			}
		return e
	}

	function tu(e, t, n, r, i, o, l) {
		var s = n.flattenSpans;
		null == s && (s = e.options.flattenSpans);
		var a = 0,
			u = null,
			c = new e3(t, e.options.tabSize, r),
			h = e.options.addModeClass && [null];
		for ("" == t && ta(ti(n, r.state), o); !c.eol();) {
			var d, f = c.pos > e.options.maxHighlightLength ? (s = !1, l && tr(e, t, r, c.pos), c.pos = t.length, null) : ta(to(n, c, r.state, h), o);
			if (!h || (d = h[0].name) && (f = "m-" + (f ? d + " " + f : d)), !s || u != f) {
				for (; a < c.start;) i(a = Math.min(c.start, a + 5e3), u);
				u = f
			}
			c.start = c.pos
		}
		for (; a < c.pos;) {
			var p = Math.min(c.pos, a + 5e3);
			i(p, u), a = p
		}
	}
	var tc = !1,
		th = !1;

	function td(e, t, n) {
		this.marker = e, this.from = t, this.to = n
	}

	function tf(e, t) {
		if (e)
			for (var n = 0; n < e.length; ++n) {
				var r = e[n];
				if (r.marker == t) return r
			}
	}

	function tp(e, t) {
		if (t.full) return null;
		var n = eG(e, t.from.line) && eB(e, t.from.line).markedSpans,
			r = eG(e, t.to.line) && eB(e, t.to.line).markedSpans;
		if (!n && !r) return null;
		var i = t.from.ch,
			o = t.to.ch,
			e = 0 == eK(t.from, t.to),
			l = function(e, t, n) {
				var r;
				if (e)
					for (var i = 0; i < e.length; ++i) {
						var o, l = e[i],
							s = l.marker;
						!(null == l.from || (s.inclusiveLeft ? l.from <= t : l.from < t)) && (l.from != t || "bookmark" != s.type || n && l.marker.insertLeft) || (o = null == l.to || (s.inclusiveRight ? l.to >= t : l.to > t), (r = r || []).push(new td(s, l.from, o ? null : l.to)))
					}
				return r
			}(n, i, e),
			s = function(e, t, n) {
				var r;
				if (e)
					for (var i = 0; i < e.length; ++i) {
						var o, l = e[i],
							s = l.marker;
						(null == l.to || (s.inclusiveRight ? l.to >= t : l.to > t) || l.from == t && "bookmark" == s.type && (!n || l.marker.insertLeft)) && (o = null == l.from || (s.inclusiveLeft ? l.from <= t : l.from < t), (r = r || []).push(new td(s, o ? null : l.from - t, null == l.to ? null : l.to - t)))
					}
				return r
			}(r, o, e),
			a = 1 == t.text.length,
			u = K(t.text).length + (a ? i : 0);
		if (l)
			for (var c = 0; c < l.length; ++c) {
				var h, d = l[c];
				null == d.to && ((h = tf(s, d.marker)) ? a && (d.to = null == h.to ? null : h.to + u) : d.to = i)
			}
		if (s)
			for (var f = 0; f < s.length; ++f) {
				var p = s[f];
				null != p.to && (p.to += u), null == p.from ? tf(l, p.marker) || (p.from = u, a && (l = l || []).push(p)) : (p.from += u, a && (l = l || []).push(p))
			}
		l = l && tg(l), s && s != l && (s = tg(s));
		var g = [l];
		if (!a) {
			var m, v = t.text.length - 2;
			if (0 < v && l)
				for (var $ = 0; $ < l.length; ++$) null == l[$].to && (m = m || []).push(new td(l[$].marker, null, null));
			for (var y = 0; y < v; ++y) g.push(m);
			g.push(s)
		}
		return g
	}

	function tg(e) {
		for (var t = 0; t < e.length; ++t) {
			var n = e[t];
			null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1)
		}
		return e.length ? e : null
	}

	function tm(e) {
		var t = e.markedSpans;
		if (t) {
			for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
			e.markedSpans = null
		}
	}

	function tv(e, t) {
		if (t) {
			for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
			e.markedSpans = t
		}
	}

	function t$(e) {
		return e.inclusiveLeft ? -1 : 0
	}

	function ty(e) {
		return e.inclusiveRight ? 1 : 0
	}

	function t_(e, t) {
		var n = e.lines.length - t.lines.length;
		if (0 != n) return n;
		var r = e.find(),
			i = t.find(),
			n = eK(r.from, i.from) || t$(e) - t$(t);
		return n ? -n : (i = eK(r.to, i.to) || ty(e) - ty(t)) || t.id - e.id
	}

	function tb(e, t) {
		var n, r = th && e.markedSpans;
		if (r)
			for (var i, o = 0; o < r.length; ++o)(i = r[o]).marker.collapsed && null == (t ? i.from : i.to) && (!n || 0 > t_(n, i.marker)) && (n = i.marker);
		return n
	}

	function tx(e) {
		return tb(e, !0)
	}

	function tw(e) {
		return tb(e, !1)
	}

	function tC(e, t, n, r, i) {
		var t = eB(e, t),
			o = th && t.markedSpans;
		if (o)
			for (var l = 0; l < o.length; ++l) {
				var s = o[l];
				if (s.marker.collapsed) {
					var a = s.marker.find(0),
						u = eK(a.from, n) || t$(s.marker) - t$(i),
						c = eK(a.to, r) || ty(s.marker) - ty(i);
					if (!(0 <= u && c <= 0 || u <= 0 && 0 <= c) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? 0 <= eK(a.to, n) : 0 < eK(a.to, n)) || 0 <= u && (s.marker.inclusiveRight && i.inclusiveLeft ? 0 >= eK(a.from, r) : 0 > eK(a.from, r)))) return 1
				}
			}
	}

	function tS(e) {
		for (var t; t = tx(e);) e = t.find(-1, !0).line;
		return e
	}

	function tL(e, t) {
		var n = eB(e, t),
			e = tS(n);
		return n == e ? t : e2(e)
	}

	function tk(e, t) {
		if (t > e.lastLine()) return t;
		var n, r = eB(e, t);
		if (!tT(e, r)) return t;
		for (; n = tw(r);) r = n.find(1, !0).line;
		return e2(r) + 1
	}

	function tT(e, t) {
		var n = th && t.markedSpans;
		if (n) {
			for (var r, i = 0; i < n.length; ++i)
				if ((r = n[i]).marker.collapsed && (null == r.from || !r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && function e(t, n, r) {
						if (null == r.to) {
							var i = r.marker.find(1, !0);
							return e(t, i.line, tf(i.line.markedSpans, r.marker))
						}
						if (r.marker.inclusiveRight && r.to == n.text.length) return !0;
						for (var o = void 0, l = 0; l < n.markedSpans.length; ++l)
							if ((o = n.markedSpans[l]).marker.collapsed && !o.marker.widgetNode && o.from == r.to && (null == o.to || o.to != r.from) && (o.marker.inclusiveLeft || r.marker.inclusiveRight) && e(t, n, o)) return !0
					}(e, t, r))) return !0
		}
	}

	function tN(e) {
		for (var t = 0, n = (e = tS(e)).parent, r = 0; r < n.lines.length; ++r) {
			var i = n.lines[r];
			if (i == e) break;
			t += i.height
		}
		for (var o = n.parent; o; o = (n = o).parent)
			for (var l = 0; l < o.children.length; ++l) {
				var s = o.children[l];
				if (s == n) break;
				t += s.height
			}
		return t
	}

	function tO(e) {
		if (0 == e.height) return 0;
		for (var t, n = e.text.length, r = e; t = tx(r);) {
			var i = t.find(0, !0),
				r = i.from.line;
			n += i.from.ch - i.to.ch
		}
		for (r = e; t = tw(r);) {
			var o = t.find(0, !0);
			n -= r.text.length - o.from.ch, n += (r = o.to.line).text.length - o.to.ch
		}
		return n
	}

	function tM(e) {
		var t = e.display,
			e = e.doc;
		t.maxLine = eB(e, e.first), t.maxLineLength = tO(t.maxLine), t.maxLineChanged = !0, e.iter(function(e) {
			var n = tO(e);
			n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
		})
	}
	var tA = function(e, t, n) {
		this.text = e, tv(this, t), this.height = n ? n(this) : 1
	};
	tA.prototype.lineNo = function() {
		return e2(this)
	}, ex(tA);
	var tW = {},
		t0 = {};

	function tD(e, t) {
		return !e || /^\s*$/.test(e) ? null : (t = t.addModeClass ? t0 : tW)[e] || (t[e] = e.replace(/\S+/g, "cm-$&"))
	}

	function tH(e, t) {
		var n = k("span", null, null, a ? "padding-right: .1px" : null),
			r = {
				pre: k("pre", [n], "CodeMirror-line"),
				content: n,
				col: 0,
				pos: 0,
				cm: e,
				trailingSpace: !1,
				splitSpaces: e.getOption("lineWrapping")
			};
		t.measure = {};
		for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
			var o = i ? t.rest[i - 1] : t.line,
				u = void 0;
			r.pos = 0, r.addToken = tF,
				function(e) {
					if (null != eO) return eO;
					var t = S(e, document.createTextNode("AخA")),
						n = A(t, 0, 1).getBoundingClientRect(),
						t = A(t, 1, 2).getBoundingClientRect();
					return C(e), n && n.left != n.right && (eO = t.right - n.right < 3)
				}(e.display.measure) && (u = ef(o, e.doc.direction)) && (r.addToken = function(e, t) {
					return function(n, r, i, o, l, s, a) {
						i = i ? i + " cm-force-border" : "cm-force-border";
						for (var u = n.pos, c = u + r.length;;) {
							for (var h = void 0, d = 0; d < t.length && !((h = t[d]).to > u && h.from <= u); d++);
							if (h.to >= c) return e(n, r, i, o, l, s, a);
							e(n, r.slice(0, h.to - u), i, o, null, s, a), o = null, r = r.slice(h.to - u), u = h.to
						}
					}
				}(r.addToken, u)), r.map = [],
				function(e, t, n) {
					var r = e.markedSpans,
						i = e.text,
						o = 0;
					if (r)
						for (var l, s, a, u, c, h, d, f = i.length, p = 0, g = 1, m = "", v = 0;;) {
							if (v == p) {
								a = u = c = s = "", h = d = null, v = 1 / 0;
								for (var $ = [], y = void 0, _ = 0; _ < r.length; ++_) {
									var b = r[_],
										x = b.marker;
									if ("bookmark" == x.type && b.from == p && x.widgetNode) $.push(x);
									else if (b.from <= p && (null == b.to || b.to > p || x.collapsed && b.to == p && b.from == p)) {
										if (null != b.to && b.to != p && v > b.to && (v = b.to, u = ""), x.className && (a += " " + x.className), x.css && (s = (s ? s + ";" : "") + x.css), x.startStyle && b.from == p && (c += " " + x.startStyle), x.endStyle && b.to == v && (y = y || []).push(x.endStyle, b.to), x.title && ((d = d || {}).title = x.title), x.attributes)
											for (var w in x.attributes)(d = d || {})[w] = x.attributes[w];
										x.collapsed && (!h || 0 > t_(h.marker, x)) && (h = b)
									} else b.from > p && v > b.from && (v = b.from)
								}
								if (y)
									for (var C = 0; C < y.length; C += 2) y[C + 1] == v && (u += " " + y[C]);
								if (!h || h.from == p)
									for (var S = 0; S < $.length; ++S) t1(t, 0, $[S]);
								if (h && (h.from || 0) == p) {
									if (t1(t, (null == h.to ? f + 1 : h.to) - p, h.marker, null == h.from), null == h.to) return;
									h.to == p && (h = !1)
								}
							}
							if (f <= p) break;
							for (var L = Math.min(f, v);;) {
								if (m) {
									var k, T = p + m.length;
									if (h || (k = L < T ? m.slice(0, L - p) : m, t.addToken(t, k, l ? l + a : a, c, p + k.length == v ? u : "", s, d)), L <= T) {
										m = m.slice(L - p), p = L;
										break
									}
									p = T, c = ""
								}
								m = i.slice(o, o = n[g++]), l = tD(n[g++], t.cm.options)
							}
						} else
							for (var N = 1; N < n.length; N += 2) t.addToken(t, i.slice(o, o = n[N]), tD(n[N + 1], t.cm.options))
				}(o, r, tt(e, o, t != e.display.externalMeasured && e2(o))), o.styleClasses && (o.styleClasses.bgClass && (r.bgClass = M(o.styleClasses.bgClass, r.bgClass || "")), o.styleClasses.textClass && (r.textClass = M(o.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(function(e) {
					null == eN && (t = L("span", "​"), S(e, L("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (eN = t.offsetWidth <= 1 && 2 < t.offsetHeight && !(l && s < 8)));
					var t = eN ? L("span", "​") : L("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
					return t.setAttribute("cm-text", ""), t
				}(e.display.measure))), 0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}))
		}
		return a && (n = r.content.lastChild, (/\bcm-tab\b/.test(n.className) || n.querySelector && n.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack")), e$(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = M(r.pre.className, r.textClass || "")), r
	}

	function tF(e, t, n, r, i, o, a) {
		if (t) {
			var u = e.splitSpaces ? function(e, t) {
					if (1 < e.length && !/  /.test(e)) return e;
					for (var n = t, r = "", i = 0; i < e.length; i++) {
						var o = e.charAt(i);
						" " == o && n && (i == e.length - 1 || 32 == e.charCodeAt(i + 1)) && (o = "\xa0"), r += o, n = " " == o
					}
					return r
				}(t, e.trailingSpace) : t,
				c = e.cm.state.specialChars,
				h = !1;
			if (c.test(t))
				for (var d = document.createDocumentFragment(), f = 0;;) {
					c.lastIndex = f;
					var p = c.exec(t),
						g = p ? p.index - f : t.length - f;
					if (g && (m = document.createTextNode(u.slice(f, f + g)), l && s < 9 ? d.appendChild(L("span", [m])) : d.appendChild(m), e.map.push(e.pos, e.pos + g, m), e.col += g, e.pos += g), !p) break;
					f += 1 + g;
					var m = void 0;
					"	" == p[0] ? (g = (g = e.cm.options.tabSize) - e.col % g, (m = d.appendChild(L("span", V(g), "cm-tab"))).setAttribute("role", "presentation"), m.setAttribute("cm-text", "	"), e.col += g) : ("\r" == p[0] || "\n" == p[0] ? (m = d.appendChild(L("span", "\r" == p[0] ? "␍" : "␤", "cm-invalidchar"))).setAttribute("cm-text", p[0]) : ((m = e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text", p[0]), l && s < 9 ? d.appendChild(L("span", [m])) : d.appendChild(m)), e.col += 1), e.map.push(e.pos, e.pos + 1, m), e.pos++
				} else e.col += t.length, d = document.createTextNode(u), e.map.push(e.pos, e.pos + t.length, d), l && s < 9 && (h = !0), e.pos += t.length;
			if (e.trailingSpace = 32 == u.charCodeAt(t.length - 1), n || r || i || h || o || a) {
				n = n || "", r && (n += r), i && (n += i);
				var v = L("span", [d], n, o);
				if (a)
					for (var $ in a) a.hasOwnProperty($) && "style" != $ && "class" != $ && v.setAttribute($, a[$]);
				return e.content.appendChild(v)
			}
			e.content.appendChild(d)
		}
	}

	function t1(e, t, n, r) {
		var i = !r && n.widgetNode;
		i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i = i || e.content.appendChild(document.createElement("span"))).setAttribute("cm-marker", n.id), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
	}

	function tP(e, t, n) {
		this.line = t, this.rest = function(e) {
			for (var t, n; t = tw(e);) e = t.find(1, !0).line, (n = n || []).push(e);
			return n
		}(t), this.size = this.rest ? e2(K(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = tT(e, t)
	}

	function tE(e, t, n) {
		for (var r = [], i = t; i < n; i = l) {
			var o = new tP(e.doc, eB(e.doc, i), i),
				l = i + o.size;
			r.push(o)
		}
		return r
	}
	var tz = null,
		tI = null;

	function tR(e, t) {
		var n = em(e, t);
		if (n.length) {
			var r, i = Array.prototype.slice.call(arguments, 2);
			tz ? r = tz.delayedCallbacks : tI ? r = tI : (r = tI = [], setTimeout(t3, 0));
			for (var o = 0; o < n.length; ++o) ! function(e) {
				r.push(function() {
					return n[e].apply(null, i)
				})
			}(o)
		}
	}

	function t3() {
		var e = tI;
		tI = null;
		for (var t = 0; t < e.length; ++t) e[t]()
	}

	function tB(e, t, n, r) {
		for (var i = 0; i < t.changes.length; i++) {
			var o = t.changes[i];
			"text" == o ? function(e, t) {
				var n = t.text.className,
					r = t4(e, t);
				t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, t6(e, t)) : n && (t.text.className = n)
			}(e, t) : "gutter" == o ? t2(e, t, n, r) : "class" == o ? t6(e, t) : "widget" == o && function(e, t, n) {
				t.alignable && (t.alignable = null);
				for (var r = x("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o) o = i.nextSibling, r.test(i.className) && t.node.removeChild(i);
				t5(e, t, n)
			}(e, t, r)
		}
		t.changes = null
	}

	function t7(e) {
		return e.node == e.text && (e.node = L("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), l && s < 8 && (e.node.style.zIndex = 2)), e.node
	}

	function t4(e, t) {
		var n = e.display.externalMeasured;
		return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : tH(e, t)
	}

	function t6(e, t) {
		n = e, (r = (i = t).bgClass ? i.bgClass + " " + (i.line.bgClass || "") : i.line.bgClass) && (r += " CodeMirror-linebackground"), i.background ? r ? i.background.className = r : (i.background.parentNode.removeChild(i.background), i.background = null) : r && (e = t7(i), i.background = e.insertBefore(L("div", null, r), e.firstChild), n.display.input.setUneditable(i.background)), t.line.wrapClass ? t7(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
		var n, r, i = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
		t.text.className = i || ""
	}

	function t2(e, t, n, r) {
		t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass && (o = t7(t), t.gutterBackground = L("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), o.insertBefore(t.gutterBackground, t.text));
		var i = t.line.gutterMarkers;
		if (e.options.lineNumbers || i) {
			var o = t7(t),
				l = t.gutter = L("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
			if (l.setAttribute("aria-hidden", "true"), e.display.input.setUneditable(l), o.insertBefore(l, t.text), t.line.gutterClass && (l.className += " " + t.line.gutterClass), !e.options.lineNumbers || i && i["CodeMirror-linenumbers"] || (t.lineNumber = l.appendChild(L("div", eU(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), i)
				for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
					var a = e.display.gutterSpecs[s].className,
						u = i.hasOwnProperty(a) && i[a];
					u && l.appendChild(L("div", [u], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[a] + "px; width: " + r.gutterWidth[a] + "px"))
				}
		}
	}

	function t5(e, t, n) {
		if (tG(e, t.line, t, n, !0), t.rest)
			for (var r = 0; r < t.rest.length; r++) tG(e, t.rest[r], t, n, !1)
	}

	function tG(e, t, n, r, i) {
		if (t.widgets)
			for (var o = t7(n), l = 0, s = t.widgets; l < s.length; ++l) {
				var a, u, c, h, d = s[l],
					f = L("div", [d.node], "CodeMirror-linewidget" + (d.className ? " " + d.className : ""));
				d.handleMouseEvents || f.setAttribute("cm-ignore-events", "true"), a = d, u = f, c = n, h = r, a.noHScroll && ((c.alignable || (c.alignable = [])).push(u), c = h.wrapperWidth, u.style.left = h.fixedPos + "px", a.coverGutter || (c -= h.gutterTotalWidth, u.style.paddingLeft = h.gutterTotalWidth + "px"), u.style.width = c + "px"), a.coverGutter && (u.style.zIndex = 5, u.style.position = "relative", a.noHScroll || (u.style.marginLeft = -h.gutterTotalWidth + "px")), e.display.input.setUneditable(f), i && d.above ? o.insertBefore(f, n.gutter || n.text) : o.appendChild(f), tR(d, "redraw")
			}
	}

	function tU(e) {
		if (null != e.height) return e.height;
		var t, n = e.doc.cm;
		return n ? (T(document.body, e.node) || (t = "position: relative;", e.coverGutter && (t += "margin-left: -" + n.display.gutters.offsetWidth + "px;"), e.noHScroll && (t += "width: " + n.display.wrapper.clientWidth + "px;"), S(n.display.measure, L("div", [e.node], null, t))), e.height = e.node.parentNode.offsetHeight) : 0
	}

	function tV(e, t) {
		for (var n = ek(t); n != e.wrapper; n = n.parentNode)
			if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return 1
	}

	function tK(e) {
		return e.lineSpace.offsetTop
	}

	function tX(e) {
		return e.mover.offsetHeight - e.lineSpace.offsetHeight
	}

	function tj(e) {
		if (e.cachedPaddingH) return e.cachedPaddingH;
		var t = S(e.measure, L("pre", "x", "CodeMirror-line-like")),
			t = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
			t = {
				left: parseInt(t.paddingLeft),
				right: parseInt(t.paddingRight)
			};
		return isNaN(t.left) || isNaN(t.right) || (e.cachedPaddingH = t), t
	}

	function tY(e) {
		return 50 - e.display.nativeBarWidth
	}

	function t8(e) {
		return e.display.scroller.clientWidth - tY(e) - e.display.barWidth
	}

	function t9(e) {
		return e.display.scroller.clientHeight - tY(e) - e.display.barHeight
	}

	function tq(e, t, n) {
		if (e.line == t) return {
			map: e.measure.map,
			cache: e.measure.cache
		};
		for (var r = 0; r < e.rest.length; r++)
			if (e.rest[r] == t) return {
				map: e.measure.maps[r],
				cache: e.measure.caches[r]
			};
		for (var i = 0; i < e.rest.length; i++)
			if (e2(e.rest[i]) > n) return {
				map: e.measure.maps[i],
				cache: e.measure.caches[i],
				before: !0
			}
	}

	function tZ(e, t, n, r) {
		return ne(e, tJ(e, t), n, r)
	}

	function tQ(e, t) {
		return t >= e.display.viewFrom && t < e.display.viewTo ? e.display.view[nN(e, t)] : (e = e.display.externalMeasured) && t >= e.lineN && t < e.lineN + e.size ? e : void 0
	}

	function tJ(e, t) {
		var n, r, i = e2(t),
			o = tQ(e, i);
		return o && !o.text ? o = null : o && o.changes && (tB(e, o, i, nC(e)), e.curOp.forceUpdate = !0), o || (n = e, e = e2(r = tS(r = t)), (r = n.display.externalMeasured = new tP(n.doc, r, e)).lineN = e, e = r.built = tH(n, r), r.text = e.pre, S(n.display.lineMeasure, e.pre), o = r), i = tq(o, t, i), {
			line: t,
			view: o,
			rect: null,
			map: i.map,
			cache: i.cache,
			before: i.before,
			hasHeights: !1
		}
	}

	function ne(e, t, n, r, i) {
		var o, a = (n = t.before ? -1 : n) + (r || "");
		return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (function(e, t, n) {
			var r = e.options.lineWrapping,
				e = r && t8(e);
			if (!t.measure.heights || r && t.measure.width != e) {
				var i = t.measure.heights = [];
				if (r) {
					t.measure.width = e;
					for (var o = t.text.firstChild.getClientRects(), l = 0; l < o.length - 1; l++) {
						var s = o[l],
							a = o[l + 1];
						2 < Math.abs(s.bottom - a.bottom) && i.push((s.bottom + a.top) / 2 - n.top)
					}
				}
				i.push(n.bottom - n.top)
			}
		}(e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, n, r) {
			var i, o = nr(t.map, n, r),
				a = o.node,
				u = o.start,
				c = o.end,
				h = o.collapse;
			if (3 == a.nodeType) {
				for (var d = 0; d < 4; d++) {
					for (; u && et(t.line.text.charAt(o.coverStart + u));) --u;
					for (; o.coverStart + c < o.coverEnd && et(t.line.text.charAt(o.coverStart + c));) ++c;
					if ((i = l && s < 9 && 0 == u && c == o.coverEnd - o.coverStart ? a.parentNode.getBoundingClientRect() : function(e, t) {
							var n = nn;
							if ("left" == t)
								for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
							else
								for (var i = e.length - 1; 0 <= i && (n = e[i]).left == n.right; i--);
							return n
						}(A(a, u, c).getClientRects(), r)).left || i.right || 0 == u) break;
					c = u, u -= 1, h = "right"
				}
				l && s < 11 && (i = function(e, t) {
					if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || ! function(e) {
							if (null != eD) return eD;
							var e = (t = S(e, L("span", "x"))).getBoundingClientRect(),
								t = A(t, 0, 1).getBoundingClientRect();
							return eD = 1 < Math.abs(e.left - t.left)
						}(e)) return t;
					var n = screen.logicalXDPI / screen.deviceXDPI,
						e = screen.logicalYDPI / screen.deviceYDPI;
					return {
						left: t.left * n,
						right: t.right * n,
						top: t.top * e,
						bottom: t.bottom * e
					}
				}(e.display.measure, i))
			} else 0 < u && (h = r = "right"), i = e.options.lineWrapping && 1 < (v = a.getClientRects()).length ? v["right" == r ? v.length - 1 : 0] : a.getBoundingClientRect();
			!(l && s < 9) || u || i && (i.left || i.right) || (i = ($ = a.parentNode.getClientRects()[0]) ? {
				left: $.left,
				right: $.left + nw(e.display),
				top: $.top,
				bottom: $.bottom
			} : nn);
			for (var f = i.top - t.rect.top, n = i.bottom - t.rect.top, p = (f + n) / 2, g = t.view.measure.heights, m = 0; m < g.length - 1 && !(p < g[m]); m++);
			var v = m ? g[m - 1] : 0,
				$ = g[m],
				$ = {
					left: ("right" == h ? i.right : i.left) - t.rect.left,
					right: ("left" == h ? i.left : i.right) - t.rect.left,
					top: v,
					bottom: $
				};
			return i.left || i.right || ($.bogus = !0), e.options.singleCursorHeightPerLine || ($.rtop = f, $.rbottom = n), $
		}(e, t, n, r)).bogus || (t.cache[a] = o)), {
			left: o.left,
			right: o.right,
			top: i ? o.rtop : o.top,
			bottom: i ? o.rbottom : o.bottom
		}
	}
	var nt, nn = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	};

	function nr(e, t, n) {
		for (var r, i, o, l, s, a, u = 0; u < e.length; u += 3)
			if (s = e[u], a = e[u + 1], t < s ? (i = 0, o = 1, l = "left") : t < a ? o = (i = t - s) + 1 : (u == e.length - 3 || t == a && e[u + 3] > t) && (i = (o = a - s) - 1, a <= t && (l = "right")), null != i) {
				if (r = e[u + 2], s == a && n == (r.insertLeft ? "left" : "right") && (l = n), "left" == n && 0 == i)
					for (; u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft;) r = e[2 + (u -= 3)], l = "left";
				if ("right" == n && i == a - s)
					for (; u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft;) r = e[(u += 3) + 2], l = "right";
				break
			} return {
			node: r,
			start: i,
			end: o,
			collapse: l,
			coverStart: s,
			coverEnd: a
		}
	}

	function ni(e) {
		if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
			for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
	}

	function no(e) {
		e.display.externalMeasure = null, C(e.display.lineMeasure);
		for (var t = 0; t < e.display.view.length; t++) ni(e.display.view[t])
	}

	function nl(e) {
		no(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
	}

	function ns() {
		return u && g ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
	}

	function na() {
		return u && g ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
	}

	function nu(e) {
		var t = 0;
		if (e.widgets)
			for (var n = 0; n < e.widgets.length; ++n) e.widgets[n].above && (t += tU(e.widgets[n]));
		return t
	}

	function nc(e, t, n, r, i) {
		return i || (i = nu(t), n.top += i, n.bottom += i), "line" == r || (r = r || "local", t = tN(t), "local" == r ? t += tK(e.display) : t -= e.display.viewOffset, "page" != r && "window" != r || (t += (e = e.display.lineSpace.getBoundingClientRect()).top + ("window" == r ? 0 : na()), r = e.left + ("window" == r ? 0 : ns()), n.left += r, n.right += r), n.top += t, n.bottom += t), n
	}

	function nh(e, t, n) {
		if ("div" == n) return t;
		var r = t.left,
			t = t.top;
		return "page" == n ? (r -= ns(), t -= na()) : "local" != n && n || (r += (n = e.display.sizer.getBoundingClientRect()).left, t += n.top), {
			left: r - (e = e.display.lineSpace.getBoundingClientRect()).left,
			top: t - e.top
		}
	}

	function nd(e, t, n, r, i) {
		return nc(e, r = r || eB(e.doc, t.line), tZ(e, r, t.ch, i), n)
	}

	function nf(e, t, n, r, i, o) {
		function l(t, l) {
			return t = ne(e, i, t, l ? "right" : "left", o), l ? t.left = t.right : t.right = t.left, nc(e, r, t, n)
		}
		r = r || eB(e.doc, t.line), i = i || tJ(e, r);
		var s = ef(r, e.doc.direction),
			a = t.ch,
			u = t.sticky;
		if (a >= r.text.length ? (a = r.text.length, u = "before") : a <= 0 && (a = 0, u = "after"), !s) return l("before" == u ? a - 1 : a, "before" == u);

		function c(e, t, n) {
			return l(n ? e - 1 : e, 1 == s[t].level != n)
		}
		var h = eo(s, a, u),
			t = ei,
			h = c(a, h, "before" == u);
		return null != t && (h.other = c(a, t, "before" != u)), h
	}

	function np(e, t) {
		var n = 0;
		return t = eq(e.doc, t), e.options.lineWrapping || (n = nw(e.display) * t.ch), t = eB(e.doc, t.line), e = tN(t) + tK(e.display), {
			left: n,
			right: n,
			top: e,
			bottom: e + t.height
		}
	}

	function ng(e, t, n, r, i) {
		return (n = eV(e, t, n)).xRel = i, r && (n.outside = r), n
	}

	function nm(e, t, n) {
		var r = e.doc;
		if ((n += e.display.viewOffset) < 0) return ng(r.first, 0, null, -1, -1);
		var i = e5(r, n),
			o = r.first + r.size - 1;
		if (o < i) return ng(r.first + r.size - 1, eB(r, o).text.length, null, 1, 1);
		t < 0 && (t = 0);
		for (var l = eB(r, i);;) {
			var s = function(e, t, n, r, i) {
					i -= tN(t);
					var o, l, s = tJ(e, t),
						a = nu(t),
						u = 0,
						c = t.text.length,
						h = !0,
						d = ef(t, e.doc.direction);
					d && (u = (h = 1 != (g = (e.options.lineWrapping ? nb : n_)(e, t, n, s, d, r, i)).level) ? g.from : g.to - 1, c = h ? g.to : g.from - 1);
					var f = null,
						p = null,
						d = er(function(t) {
							var n = ne(e, s, t);
							return n.top += a, n.bottom += a, ny(n, r, i, !1) && (n.top <= i && n.left <= r && (f = t, p = n), 1)
						}, u, c),
						g = !1;
					return p ? (d = f + ((l = (o = r - p.left < p.right - r) == h) ? 0 : 1), l = l ? "after" : "before", o = o ? p.left : p.right) : (h || d != c && d != u || d++, l = 0 == d || d != t.text.length && ne(e, s, d - (h ? 1 : 0)).bottom + a <= i == h ? "after" : "before", o = (h = nf(e, eV(n, d, l), "line", t, s)).left, g = i < h.top ? -1 : i >= h.bottom ? 1 : 0), d = en(t.text, d, 1), ng(n, d, l, g, r - o)
				}(e, l, i, t, n),
				a = function(e, t) {
					var n, r = th && e.markedSpans;
					if (r)
						for (var i = 0; i < r.length; ++i) {
							var o = r[i];
							o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!n || 0 > t_(n, o.marker)) && (n = o.marker)
						}
					return n
				}(l, s.ch + (0 < s.xRel || 0 < s.outside ? 1 : 0));
			if (!a) return s;
			if ((a = a.find(1)).line == i) return a;
			l = eB(r, i = a.line)
		}
	}

	function nv(e, t, n, r) {
		r -= nu(t);
		var i = t.text.length,
			t = er(function(t) {
				return ne(e, n, t - 1).bottom <= r
			}, i, 0);
		return {
			begin: t,
			end: i = er(function(t) {
				return ne(e, n, t).top > r
			}, t, i)
		}
	}

	function n$(e, t, n, r) {
		return nv(e, t, n = n || tJ(e, t), nc(e, t, ne(e, n, r), "line").top)
	}

	function ny(e, t, n, r) {
		return !(e.bottom <= n) && (e.top > n || (r ? e.left : e.right) > t)
	}

	function n_(e, t, n, r, i, o, l) {
		var s, a = er(function(s) {
				var a = i[s],
					s = 1 != a.level;
				return ny(nf(e, eV(n, s ? a.to : a.from, s ? "before" : "after"), "line", t, r), o, l, !0)
			}, 0, i.length - 1),
			u = i[a];
		return 0 < a && ny(s = nf(e, eV(n, (s = 1 != u.level) ? u.from : u.to, s ? "after" : "before"), "line", t, r), o, l, !0) && s.top > l && (u = i[a - 1]), u
	}

	function nb(e, t, n, r, i, o, l) {
		var l = nv(e, t, r, l),
			s = l.begin,
			a = l.end;
		/\s/.test(t.text.charAt(a - 1)) && a--;
		for (var u = null, c = null, h = 0; h < i.length; h++) {
			var d, f = i[h];
			f.from >= a || f.to <= s || (d = (d = ne(e, r, 1 != f.level ? Math.min(a, f.to) - 1 : Math.max(s, f.from)).right) < o ? o - d + 1e9 : d - o, (!u || d < c) && (u = f, c = d))
		}
		return (u = (u = u || i[i.length - 1]).from < s ? {
			from: s,
			to: u.to,
			level: u.level
		} : u).to > a ? {
			from: u.from,
			to: a,
			level: u.level
		} : u
	}

	function nx(e) {
		if (null != e.cachedTextHeight) return e.cachedTextHeight;
		if (null == nt) {
			nt = L("pre", null, "CodeMirror-line-like");
			for (var t = 0; t < 49; ++t) nt.appendChild(document.createTextNode("x")), nt.appendChild(L("br"));
			nt.appendChild(document.createTextNode("x"))
		}
		S(e.measure, nt);
		var n = nt.offsetHeight / 50;
		return 3 < n && (e.cachedTextHeight = n), C(e.measure), n || 1
	}

	function nw(e) {
		if (null != e.cachedCharWidth) return e.cachedCharWidth;
		var t = L("span", "xxxxxxxxxx"),
			n = L("pre", [t], "CodeMirror-line-like");
		return S(e.measure, n), 2 < (t = ((t = t.getBoundingClientRect()).right - t.left) / 10) && (e.cachedCharWidth = t), t || 10
	}

	function nC(e) {
		for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling, ++l) {
			var s = e.display.gutterSpecs[l].className;
			n[s] = o.offsetLeft + o.clientLeft + i, r[s] = o.clientWidth
		}
		return {
			fixedPos: nS(t),
			gutterTotalWidth: t.gutters.offsetWidth,
			gutterLeft: n,
			gutterWidth: r,
			wrapperWidth: t.wrapper.clientWidth
		}
	}

	function nS(e) {
		return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
	}

	function nL(e) {
		var t = nx(e.display),
			n = e.options.lineWrapping,
			r = n && Math.max(5, e.display.scroller.clientWidth / nw(e.display) - 3);
		return function(i) {
			if (tT(e.doc, i)) return 0;
			var o = 0;
			if (i.widgets)
				for (var l = 0; l < i.widgets.length; l++) i.widgets[l].height && (o += i.widgets[l].height);
			return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
		}
	}

	function nk(e) {
		var t = e.doc,
			n = nL(e);
		t.iter(function(e) {
			var t = n(e);
			t != e.height && e6(e, t)
		})
	}

	function nT(e, t, n, r) {
		var i = e.display;
		if (!n && "true" == ek(t).getAttribute("cm-not-content")) return null;
		var o, i = i.lineSpace.getBoundingClientRect();
		try {
			o = t.clientX - i.left, a = t.clientY - i.top
		} catch (l) {
			return null
		}
		var s, a = nm(e, o, a);
		return r && 0 < a.xRel && (s = eB(e.doc, a.line).text).length == a.ch && (s = F(s, s.length, e.options.tabSize) - s.length, a = eV(a.line, Math.max(0, Math.round((o - tj(e.display).left) / nw(e.display)) - s))), a
	}

	function nN(e, t) {
		if (t >= e.display.viewTo || (t -= e.display.viewFrom) < 0) return null;
		for (var n = e.display.view, r = 0; r < n.length; r++)
			if ((t -= n[r].size) < 0) return r
	}

	function nO(e, t, n, r) {
		null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size);
		var i, o, l = e.display;
		(r = r || 0) && n < l.viewTo && (null == l.updateLineNumbers || l.updateLineNumbers > t) && (l.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= l.viewTo ? th && tL(e.doc, t) < l.viewTo && nA(e) : n <= l.viewFrom ? th && tk(e.doc, n + r) > l.viewFrom ? nA(e) : (l.viewFrom += r, l.viewTo += r) : t <= l.viewFrom && n >= l.viewTo ? nA(e) : t <= l.viewFrom ? (i = nW(e, n, n + r, 1)) ? (l.view = l.view.slice(i.index), l.viewFrom = i.lineN, l.viewTo += r) : nA(e) : n >= l.viewTo ? (o = nW(e, t, t, -1)) ? (l.view = l.view.slice(0, o.index), l.viewTo = o.lineN) : nA(e) : (i = nW(e, t, t, -1), o = nW(e, n, n + r, 1), i && o ? (l.view = l.view.slice(0, i.index).concat(tE(e, i.lineN, o.lineN)).concat(l.view.slice(o.index)), l.viewTo += r) : nA(e)), (e = l.externalMeasured) && (n < e.lineN ? e.lineN += r : t < e.lineN + e.size && (l.externalMeasured = null))
	}

	function nM(e, t, n) {
		e.curOp.viewChanged = !0;
		var r = e.display,
			i = e.display.externalMeasured;
		i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), t < r.viewFrom || t >= r.viewTo || null == (t = r.view[nN(e, t)]).node || -1 == E(t = t.changes || (t.changes = []), n) && t.push(n)
	}

	function nA(e) {
		e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
	}

	function nW(e, t, n, r) {
		var i, o = nN(e, t),
			l = e.display.view;
		if (!th || n == e.doc.first + e.doc.size) return {
			index: o,
			lineN: n
		};
		for (var s = e.display.viewFrom, a = 0; a < o; a++) s += l[a].size;
		if (s != t) {
			if (0 < r) {
				if (o == l.length - 1) return null;
				i = s + l[o].size - t, o++
			} else i = s - t;
			t += i, n += i
		}
		for (; tL(e.doc, n) != n;) {
			if (o == (r < 0 ? 0 : l.length - 1)) return null;
			n += r * l[o - (r < 0 ? 1 : 0)].size, o += r
		}
		return {
			index: o,
			lineN: n
		}
	}

	function n0(e) {
		for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
			var i = t[r];
			i.hidden || i.node && !i.changes || ++n
		}
		return n
	}

	function nD(e) {
		e.display.input.showSelection(e.display.input.prepareSelection())
	}

	function nH(e, t) {
		void 0 === t && (t = !0);
		for (var n, r, i = e.doc, o = {}, l = o.cursors = document.createDocumentFragment(), s = o.selection = document.createDocumentFragment(), a = 0; a < i.sel.ranges.length; a++) !t && a == i.sel.primIndex || (n = i.sel.ranges[a]).from().line >= e.display.viewTo || n.to().line < e.display.viewFrom || (((r = n.empty()) || e.options.showCursorWhenSelecting) && nF(e, n.head, l), r || function(e, t, n) {
			var r = e.display,
				i = e.doc,
				o = document.createDocumentFragment(),
				l = tj(e.display),
				s = l.left,
				a = Math.max(r.sizerWidth, t8(e) - r.sizer.offsetLeft) - l.right,
				u = "ltr" == i.direction;

			function c(e, t, n, r) {
				t < 0 && (t = 0), t = Math.round(t), r = Math.round(r), o.appendChild(L("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == n ? a - e : n) + "px;\n                             height: " + (r - t) + "px"))
			}

			function h(t, n, r) {
				var o, l, h = eB(i, t),
					d = h.text.length;

				function f(n, r) {
					return nd(e, eV(t, n), "div", h, r)
				}

				function p(t, n, r) {
					return t = n$(e, h, null, t), n = "ltr" == n == ("after" == r) ? "left" : "right", f("after" == r ? t.begin : t.end - (/\s/.test(h.text.charAt(t.end - 1)) ? 2 : 1), n)[n]
				}
				var g = ef(h, i.direction);
				return function(e, t, n, r) {
					if (!e) return r(t, n, "ltr", 0);
					for (var i = !1, o = 0; o < e.length; ++o) {
						var l = e[o];
						(l.from < n && l.to > t || t == n && l.to == t) && (r(Math.max(l.from, t), Math.min(l.to, n), 1 == l.level ? "rtl" : "ltr", o), i = !0)
					}
					i || r(t, n, "ltr")
				}(g, n || 0, null == r ? d : r, function(e, t, i, h) {
					var m, v, $, y, _ = "ltr" == i,
						b = f(e, _ ? "left" : "right"),
						x = f(t - 1, _ ? "right" : "left"),
						w = null == n && 0 == e,
						C = null == r && t == d,
						S = 0 == h,
						L = !g || h == g.length - 1;
					x.top - b.top <= 3 ? (m = (u ? w : C) && S ? s : (_ ? b : x).left, h = (u ? C : w) && L ? a : (_ ? x : b).right, c(m, b.top, h - m, b.bottom)) : (i = _ ? (v = u && w && S ? s : b.left, $ = u ? a : p(e, i, "before"), y = u ? s : p(t, i, "after"), u && C && L ? a : x.right) : (v = u ? p(e, i, "before") : s, $ = !u && w && S ? a : b.right, y = !u && C && L ? s : x.left, u ? p(t, i, "after") : a), c(v, b.top, $ - v, b.bottom), b.bottom < x.top && c(s, b.bottom, null, x.top), c(y, x.top, i - y, x.bottom)), (!o || 0 > n1(b, o)) && (o = b), 0 > n1(x, o) && (o = x), (!l || 0 > n1(b, l)) && (l = b), 0 > n1(x, l) && (l = x)
				}), {
					start: o,
					end: l
				}
			}
			var d = t.from(),
				r = t.to();
			d.line == r.line ? h(d.line, d.ch, r.ch) : (l = eB(i, d.line), t = eB(i, r.line), t = tS(l) == tS(t), l = h(d.line, d.ch, t ? l.text.length + 1 : null).end, r = h(r.line, t ? 0 : null, r.ch).start, t && (l.top < r.top - 2 ? (c(l.right, l.top, null, l.bottom), c(s, r.top, r.left, r.bottom)) : c(l.right, l.top, r.left - l.right, l.bottom)), l.bottom < r.top && c(s, l.bottom, null, r.top)), n.appendChild(o)
		}(e, n, s));
		return o
	}

	function nF(e, t, n) {
		var r = nf(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
			i = n.appendChild(L("div", "\xa0", "CodeMirror-cursor"));
		i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px", !/\bcm-fat-cursor\b/.test(e.getWrapperElement().className) || 0 < (t = nd(e, t, "div", null, null)).right - t.left && (i.style.width = t.right - t.left + "px"), r.other && ((n = n.appendChild(L("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"))).style.display = "", n.style.left = r.other.left + "px", n.style.top = r.other.top + "px", n.style.height = .85 * (r.other.bottom - r.other.top) + "px")
	}

	function n1(e, t) {
		return e.top - t.top || e.left - t.left
	}

	function nP(e) {
		var t, n;
		e.state.focused && (clearInterval((t = e.display).blinker), n = !0, t.cursorDiv.style.visibility = "", 0 < e.options.cursorBlinkRate ? t.blinker = setInterval(function() {
			e.hasFocus() || nR(e), t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
		}, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden"))
	}

	function nE(e) {
		e.hasFocus() || (e.display.input.focus(), e.state.focused || nI(e))
	}

	function nz(e) {
		e.state.delayingBlurEvent = !0, setTimeout(function() {
			e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, e.state.focused && nR(e))
		}, 100)
	}

	function nI(e, t) {
		e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (e$(e, "focus", e, t), e.state.focused = !0, O(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), a && setTimeout(function() {
			return e.display.input.reset(!0)
		}, 20)), e.display.input.receivedFocus()), nP(e))
	}

	function nR(e, t) {
		e.state.delayingBlurEvent || (e.state.focused && (e$(e, "blur", e, t), e.state.focused = !1, w(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
			e.state.focused || (e.display.shift = !1)
		}, 150))
	}

	function n3(e) {
		for (var t = e.display, n = t.lineDiv.offsetTop, r = Math.max(0, t.scroller.getBoundingClientRect().top), i = t.lineDiv.getBoundingClientRect().top, o = 0, a = 0; a < t.view.length; a++) {
			var u, c = t.view[a],
				h = e.options.lineWrapping,
				d = void 0,
				f = 0;
			if (!c.hidden) {
				i += c.line.height, l && s < 8 ? (d = (u = c.node.offsetTop + c.node.offsetHeight) - n, n = u) : (d = (p = c.node.getBoundingClientRect()).bottom - p.top, !h && c.text.firstChild && (f = c.text.firstChild.getBoundingClientRect().right - p.left - 1));
				var p = c.line.height - d;
				if ((.005 < p || p < -.005) && (i < r && (o -= p), e6(c.line, d), nB(c.line), c.rest))
					for (var g = 0; g < c.rest.length; g++) nB(c.rest[g]);
				f > e.display.sizerWidth && (f = Math.ceil(f / nw(e.display))) > e.display.maxLineLength && (e.display.maxLineLength = f, e.display.maxLine = c.line, e.display.maxLineChanged = !0)
			}
		}
		2 < Math.abs(o) && (t.scroller.scrollTop += o)
	}

	function nB(e) {
		if (e.widgets)
			for (var t = 0; t < e.widgets.length; ++t) {
				var n = e.widgets[t],
					r = n.node.parentNode;
				r && (n.height = r.offsetHeight)
			}
	}

	function n7(e, t, n) {
		var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop,
			r = Math.floor(r - tK(e)),
			i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
			o = e5(t, r),
			r = e5(t, i);
		return n && n.ensure && (i = n.ensure.from.line, n = n.ensure.to.line, i < o ? r = e5(t, tN(eB(t, o = i)) + e.wrapper.clientHeight) : Math.min(n, t.lastLine()) >= r && (o = e5(t, tN(eB(t, n)) - e.wrapper.clientHeight), r = n)), {
			from: o,
			to: Math.max(r, o + 1)
		}
	}

	function n4(e, t) {
		var n = e.display,
			r = nx(e.display);
		t.top < 0 && (t.top = 0);
		var i = (e.curOp && null != e.curOp.scrollTop ? e.curOp : n.scroller).scrollTop,
			o = t9(e),
			l = {};
		t.bottom - t.top > o && (t.bottom = t.top + o);
		var s = e.doc.height + tX(n),
			a = t.top < r,
			r = t.bottom > s - r;
		t.top < i ? l.scrollTop = a ? 0 : t.top : t.bottom > i + o && (u = Math.min(t.top, (r ? s : t.bottom) - o)) != i && (l.scrollTop = u);
		var i = e.options.fixedGutter ? 0 : n.gutters.offsetWidth,
			u = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft - i,
			e = t8(e) - n.gutters.offsetWidth,
			n = t.right - t.left > e;
		return n && (t.right = t.left + e), t.left < 10 ? l.scrollLeft = 0 : t.left < u ? l.scrollLeft = Math.max(0, t.left + i - (n ? 0 : 10)) : t.right > e + u - 3 && (l.scrollLeft = t.right + (n ? 0 : 10) - e), l
	}

	function n6(e, t) {
		null != t && (nG(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc : e.curOp).scrollTop + t)
	}

	function n2(e) {
		nG(e);
		var t = e.getCursor();
		e.curOp.scrollToPos = {
			from: t,
			to: t,
			margin: e.options.cursorScrollMargin
		}
	}

	function n5(e, t, n) {
		null == t && null == n || nG(e), null != t && (e.curOp.scrollLeft = t), null != n && (e.curOp.scrollTop = n)
	}

	function nG(e) {
		var t = e.curOp.scrollToPos;
		t && (e.curOp.scrollToPos = null, nU(e, np(e, t.from), np(e, t.to), t.margin))
	}

	function nU(e, t, n, r) {
		r = n4(e, {
			left: Math.min(t.left, n.left),
			top: Math.min(t.top, n.top) - r,
			right: Math.max(t.right, n.right),
			bottom: Math.max(t.bottom, n.bottom) + r
		}), n5(e, r.scrollLeft, r.scrollTop)
	}

	function nV(e, t) {
		2 > Math.abs(e.doc.scrollTop - t) || (n || ru(e, {
			top: t
		}), nK(e, t, !0), n && ru(e), ri(e, 100))
	}

	function nK(e, t, n) {
		t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t)), (e.display.scroller.scrollTop != t || n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop == t || (e.display.scroller.scrollTop = t))
	}

	function nX(e, t, n, r) {
		t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth)), (n ? t == e.doc.scrollLeft : 2 > Math.abs(e.doc.scrollLeft - t)) && !r || (e.doc.scrollLeft = t, rd(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
	}

	function nj(e) {
		var t = e.display,
			n = t.gutters.offsetWidth,
			r = Math.round(e.doc.height + tX(e.display));
		return {
			clientHeight: t.scroller.clientHeight,
			viewHeight: t.wrapper.clientHeight,
			scrollWidth: t.scroller.scrollWidth,
			clientWidth: t.scroller.clientWidth,
			viewWidth: t.wrapper.clientWidth,
			barLeft: e.options.fixedGutter ? n : 0,
			docHeight: r,
			scrollHeight: r + tY(e) + t.barHeight,
			nativeBarWidth: t.nativeBarWidth,
			gutterWidth: n
		}
	}

	function nY(e, t) {
		t = t || nj(e);
		var n = e.display.barWidth,
			r = e.display.barHeight;
		n8(e, t);
		for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && n3(e), n8(e, nj(e)), n = e.display.barWidth, r = e.display.barHeight
	}

	function n8(e, t) {
		var n = e.display,
			r = n.scrollbars.update(t);
		n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
	}(e = function(e, t, n) {
		this.cm = n;
		var r = this.vert = L("div", [L("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
			i = this.horiz = L("div", [L("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
		r.tabIndex = i.tabIndex = -1, e(r), e(i), eg(r, "scroll", function() {
			r.clientHeight && t(r.scrollTop, "vertical")
		}), eg(i, "scroll", function() {
			i.clientWidth && t(i.scrollLeft, "horizontal")
		}), this.checkedZeroWidth = !1, l && s < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
	}).prototype.update = function(e) {
		var t, n = e.scrollWidth > e.clientWidth + 1,
			r = e.scrollHeight > e.clientHeight + 1,
			i = e.nativeBarWidth;
		return r ? (this.vert.style.display = "block", this.vert.style.bottom = n ? i + "px" : "0", t = e.viewHeight - (n ? i : 0), this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + t) + "px") : (this.vert.style.display = "", this.vert.firstChild.style.height = "0"), n ? (this.horiz.style.display = "block", this.horiz.style.right = r ? i + "px" : "0", this.horiz.style.left = e.barLeft + "px", t = e.viewWidth - e.barLeft - (r ? i : 0), this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + t) + "px") : (this.horiz.style.display = "", this.horiz.firstChild.style.width = "0"), !this.checkedZeroWidth && 0 < e.clientHeight && (0 == i && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
			right: r ? i : 0,
			bottom: n ? i : 0
		}
	}, e.prototype.setScrollLeft = function(e) {
		this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
	}, e.prototype.setScrollTop = function(e) {
		this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
	}, e.prototype.zeroWidthHack = function() {
		this.horiz.style.height = this.vert.style.width = v && !d ? "12px" : "18px", this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new P, this.disableVert = new P
	}, e.prototype.enableZeroWidthBar = function(e, t, n) {
		e.style.pointerEvents = "auto", t.set(1e3, function r() {
			var i = e.getBoundingClientRect();
			("vert" == n ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, r)
		})
	}, e.prototype.clear = function() {
		var e = this.horiz.parentNode;
		e.removeChild(this.horiz), e.removeChild(this.vert)
	}, (i = function() {}).prototype.update = function() {
		return {
			bottom: 0,
			right: 0
		}
	}, i.prototype.setScrollLeft = function() {}, i.prototype.setScrollTop = function() {}, i.prototype.clear = function() {};
	var n9 = {
		native: e,
		null: i
	};

	function nq(e) {
		e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && w(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new n9[e.options.scrollbarStyle](function(t) {
			e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), eg(t, "mousedown", function() {
				e.state.focused && setTimeout(function() {
					return e.display.input.focus()
				}, 0)
			}), t.setAttribute("cm-not-content", "true")
		}, function(t, n) {
			("horizontal" == n ? nX : nV)(e, t)
		}, e), e.display.scrollbars.addClass && O(e.display.wrapper, e.display.scrollbars.addClass)
	}
	var nZ = 0;

	function nQ(e) {
		e.curOp = {
			cm: e,
			viewChanged: !1,
			startHeight: e.doc.height,
			forceUpdate: !1,
			updateInput: 0,
			typing: !1,
			changeObjs: null,
			cursorActivityHandlers: null,
			cursorActivityCalled: 0,
			selectionChanged: !1,
			updateMaxLine: !1,
			scrollLeft: null,
			scrollTop: null,
			scrollToPos: null,
			focus: !1,
			id: ++nZ,
			markArrays: null
		}, e = e.curOp, tz ? tz.ops.push(e) : e.ownsGroup = tz = {
			ops: [e],
			delayedCallbacks: []
		}
	}

	function nJ(e) {
		(e = e.curOp) && function e(t, n) {
			if (t = t.ownsGroup) try {
				! function(e) {
					var t = e.delayedCallbacks,
						n = 0;
					do {
						for (; n < t.length; n++) t[n].call(null);
						for (var r = 0; r < e.ops.length; r++) {
							var i = e.ops[r];
							if (i.cursorActivityHandlers)
								for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
						}
					} while (n < t.length)
				}(t)
			} finally {
				tz = null, n(t)
			}
		}(e, function(e) {
			for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
			! function(e) {
				for (var t, n = e.ops, r = 0; r < n.length; r++) ! function(e) {
					var t = e.cm,
						n = t.display;
					(function(e) {
						var t = e.display;
						!t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = tY(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = tY(e) + "px", t.scrollbarsClipped = !0)
					})(t), e.updateMaxLine && tM(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new rl(t, e.mustUpdate && {
						top: e.scrollTop,
						ensure: e.scrollToPos
					}, e.forceUpdate)
				}(n[r]);
				for (var i = 0; i < n.length; i++)(t = n[i]).updatedDisplay = t.mustUpdate && rs(t.cm, t.update);
				for (var o = 0; o < n.length; o++) ! function(e) {
					var t = e.cm,
						n = t.display;
					e.updatedDisplay && n3(t), e.barMeasure = nj(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = tZ(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + tY(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - t8(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
				}(n[o]);
				for (var l = 0; l < n.length; l++) ! function(e) {
					var t = e.cm;
					null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && nX(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
					var n = e.focus && e.focus == N();
					e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && nY(t, e.barMeasure), e.updatedDisplay && rh(t, e.barMeasure), e.selectionChanged && nP(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && nE(e.cm)
				}(n[l]);
				for (var s = 0; s < n.length; s++) ! function(e) {
					var t, n = e.cm,
						r = n.display,
						i = n.doc;
					e.updatedDisplay && ra(n, e.update), null != r.wheelStartX && (null != e.scrollTop || null != e.scrollLeft || e.scrollToPos) && (r.wheelStartX = r.wheelStartY = null), null != e.scrollTop && nK(n, e.scrollTop, e.forceScroll), null != e.scrollLeft && nX(n, e.scrollLeft, !0, !0), e.scrollToPos && (t = function(e, t, n, r) {
						null == r && (r = 0), e.options.lineWrapping || t != n || (n = "before" == t.sticky ? eV(t.line, t.ch + 1, "before") : t, t = t.ch ? eV(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t);
						for (var i = 0; i < 5; i++) {
							var o, l = !1,
								s = nf(e, t),
								a = n && n != t ? nf(e, n) : s,
								u = n4(e, o = {
									left: Math.min(s.left, a.left),
									top: Math.min(s.top, a.top) - r,
									right: Math.max(s.left, a.left),
									bottom: Math.max(s.bottom, a.bottom) + r
								}),
								s = e.doc.scrollTop,
								a = e.doc.scrollLeft;
							if (null != u.scrollTop && (nV(e, u.scrollTop), 1 < Math.abs(e.doc.scrollTop - s) && (l = !0)), null != u.scrollLeft && (nX(e, u.scrollLeft), 1 < Math.abs(e.doc.scrollLeft - a) && (l = !0)), !l) break
						}
						return o
					}(n, eq(i, e.scrollToPos.from), eq(i, e.scrollToPos.to), e.scrollToPos.margin), function(e, t) {
						var n, r, i;
						ey(e, "scrollCursorIntoView") || (r = (n = e.display).sizer.getBoundingClientRect(), i = null, t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1), null == i || f || (t = L("div", "​", null, "position: absolute;\n                         top: " + (t.top - n.viewOffset - tK(e.display)) + "px;\n                         height: " + (t.bottom - t.top + tY(e) + n.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;"), e.display.lineSpace.appendChild(t), t.scrollIntoView(i), e.display.lineSpace.removeChild(t)))
					}(n, t));
					var o = e.maybeHiddenMarkers,
						l = e.maybeUnhiddenMarkers;
					if (o)
						for (var s = 0; s < o.length; ++s) o[s].lines.length || e$(o[s], "hide");
					if (l)
						for (var a = 0; a < l.length; ++a) l[a].lines.length && e$(l[a], "unhide");
					r.wrapper.offsetHeight && (i.scrollTop = n.display.scroller.scrollTop), e.changeObjs && e$(n, "changes", n, e.changeObjs), e.update && e.update.finish()
				}(n[s])
			}(e)
		})
	}

	function re(e, t) {
		if (e.curOp) return t();
		nQ(e);
		try {
			return t()
		} finally {
			nJ(e)
		}
	}

	function rt(e, t) {
		return function() {
			if (e.curOp) return t.apply(e, arguments);
			nQ(e);
			try {
				return t.apply(e, arguments)
			} finally {
				nJ(e)
			}
		}
	}

	function rn(e) {
		return function() {
			if (this.curOp) return e.apply(this, arguments);
			nQ(this);
			try {
				return e.apply(this, arguments)
			} finally {
				nJ(this)
			}
		}
	}

	function rr(e) {
		return function() {
			var t = this.cm;
			if (!t || t.curOp) return e.apply(this, arguments);
			nQ(t);
			try {
				return e.apply(this, arguments)
			} finally {
				nJ(t)
			}
		}
	}

	function ri(e, t) {
		e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, D(ro, e))
	}

	function ro(e) {
		var t, n, r, i = e.doc;
		i.highlightFrontier >= e.display.viewTo || (t = +new Date + e.options.workTime, n = tn(e, i.highlightFrontier), r = [], i.iter(n.line, Math.min(i.first + i.size, e.display.viewTo + 500), function(o) {
			if (n.line >= e.display.viewFrom) {
				var l = o.styles,
					s = o.text.length > e.options.maxHighlightLength ? ez(i.mode, n.state) : null,
					a = te(e, o, n, !0);
				s && (n.state = s), o.styles = a.styles, s = o.styleClasses, (a = a.classes) ? o.styleClasses = a : s && (o.styleClasses = null);
				for (var u = !l || l.length != o.styles.length || s != a && (!s || !a || s.bgClass != a.bgClass || s.textClass != a.textClass), c = 0; !u && c < l.length; ++c) u = l[c] != o.styles[c];
				u && r.push(n.line), o.stateAfter = n.save(), n.nextLine()
			} else o.text.length <= e.options.maxHighlightLength && tr(e, o.text, n), o.stateAfter = n.line % 5 == 0 ? n.save() : null, n.nextLine();
			if (+new Date > t) return ri(e, e.options.workDelay), !0
		}), i.highlightFrontier = n.line, i.modeFrontier = Math.max(i.modeFrontier, n.line), r.length && re(e, function() {
			for (var t = 0; t < r.length; t++) nM(e, r[t], "text")
		}))
	}
	var rl = function(e, t, n) {
		var r = e.display;
		this.viewport = t, this.visible = n7(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = t8(e), this.force = n, this.dims = nC(e), this.events = []
	};

	function rs(e, t) {
		var n = e.display,
			r = e.doc;
		if (t.editorIsHidden) return nA(e), !1;
		if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == n0(e)) return !1;
		rf(e) && (nA(e), t.dims = nC(e));
		var i = r.first + r.size,
			o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
			l = Math.min(i, t.visible.to + e.options.viewportMargin);
		n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)), th && (o = tL(e.doc, o), l = tk(e.doc, l));
		var s = o != n.viewFrom || l != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
		return r = o, i = l, 0 == (l = (o = e).display).view.length || r >= l.viewTo || i <= l.viewFrom ? (l.view = tE(o, r, i), l.viewFrom = r) : (l.viewFrom > r ? l.view = tE(o, r, l.viewFrom).concat(l.view) : l.viewFrom < r && (l.view = l.view.slice(nN(o, r))), l.viewFrom = r, l.viewTo < i ? l.view = l.view.concat(tE(o, l.viewTo, i)) : l.viewTo > i && (l.view = l.view.slice(0, nN(o, i)))), l.viewTo = i, n.viewOffset = tN(eB(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px", o = n0(e), (!!s || 0 != o || !!t.force || n.renderedView != n.view || null != n.updateLineNumbers && !(n.updateLineNumbers >= n.viewTo)) && (l = function(e) {
			if (e.hasFocus()) return null;
			var t = N();
			if (!t || !T(e.display.lineDiv, t)) return null;
			var n = {
				activeElt: t
			};
			return !window.getSelection || (t = window.getSelection()).anchorNode && t.extend && T(e.display.lineDiv, t.anchorNode) && (n.anchorNode = t.anchorNode, n.anchorOffset = t.anchorOffset, n.focusNode = t.focusNode, n.focusOffset = t.focusOffset), n
		}(e), 4 < o && (n.lineDiv.style.display = "none"), function(e, t, n) {
			var r = e.display,
				i = e.options.lineNumbers,
				o = r.lineDiv,
				l = o.firstChild;

			function s(t) {
				var n = t.nextSibling;
				return a && v && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
			}
			for (var u = r.view, c = r.viewFrom, h = 0; h < u.length; h++) {
				var d = u[h];
				if (!d.hidden) {
					if (d.node && d.node.parentNode == o) {
						for (; l != d.node;) l = s(l);
						var f = i && null != t && t <= c && d.lineNumber;
						d.changes && (-1 < E(d.changes, "gutter") && (f = !1), tB(e, d, c, n)), f && (C(d.lineNumber), d.lineNumber.appendChild(document.createTextNode(eU(e.options, c)))), l = d.node.nextSibling
					} else f = function(e, t, n, r) {
						var i = t4(e, t);
						return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), t6(e, t), t2(e, t, n, r), t5(e, t, r), t.node
					}(e, d, c, n), o.insertBefore(f, l)
				}
				c += d.size
			}
			for (; l;) l = s(l)
		}(e, n.updateLineNumbers, t.dims), 4 < o && (n.lineDiv.style.display = ""), n.renderedView = n.view, (i = l) && i.activeElt && i.activeElt != N() && (i.activeElt.focus(), !/^(INPUT|TEXTAREA)$/.test(i.activeElt.nodeName) && i.anchorNode && T(document.body, i.anchorNode) && T(document.body, i.focusNode) && (o = window.getSelection(), (l = document.createRange()).setEnd(i.anchorNode, i.anchorOffset), l.collapse(!1), o.removeAllRanges(), o.addRange(l), o.extend(i.focusNode, i.focusOffset))), C(n.cursorDiv), C(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0, s && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, ri(e, 400)), n.updateLineNumbers = null, !0)
	}

	function ra(e, t) {
		for (var n = t.viewport, r = !0;; r = !1) {
			if (r && e.options.lineWrapping && t.oldDisplayWidth != t8(e)) r && (t.visible = n7(e.display, e.doc, n));
			else if (n && null != n.top && (n = {
					top: Math.min(e.doc.height + tX(e.display) - t9(e), n.top)
				}), t.visible = n7(e.display, e.doc, n), t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo) break;
			if (!rs(e, t)) break;
			n3(e);
			var i = nj(e);
			nD(e), nY(e, i), rh(e, i), t.force = !1
		}
		t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
	}

	function ru(e, t) {
		var n = new rl(e, t);
		rs(e, n) && (n3(e), ra(e, n), t = nj(e), nD(e), nY(e, t), rh(e, t), n.finish())
	}

	function rc(e) {
		var t = e.gutters.offsetWidth;
		e.sizer.style.marginLeft = t + "px", tR(e, "gutterChanged", e)
	}

	function rh(e, t) {
		e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + tY(e) + "px"
	}

	function rd(e) {
		var t = e.display,
			n = t.view;
		if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
			for (var r = nS(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++)
				if (!n[l].hidden) {
					e.options.fixedGutter && (n[l].gutter && (n[l].gutter.style.left = o), n[l].gutterBackground && (n[l].gutterBackground.style.left = o));
					var s = n[l].alignable;
					if (s)
						for (var a = 0; a < s.length; a++) s[a].style.left = o
				} e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
		}
	}

	function rf(e) {
		if (e.options.lineNumbers) {
			var t = e.doc,
				n = eU(e.options, t.first + t.size - 1),
				r = e.display;
			if (n.length != r.lineNumChars) {
				var i = r.measure.appendChild(L("div", [L("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
					t = i.firstChild.offsetWidth,
					i = i.offsetWidth - t;
				return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(t, r.lineGutter.offsetWidth - i) + 1, r.lineNumWidth = r.lineNumInnerWidth + i, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1, r.lineGutter.style.width = r.lineNumWidth + "px", rc(e.display), 1
			}
		}
	}

	function rp(e, t) {
		for (var n = [], r = !1, i = 0; i < e.length; i++) {
			var o = e[i],
				l = null;
			if ("string" != typeof o && (l = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
				if (!t) continue;
				r = !0
			}
			n.push({
				className: o,
				style: l
			})
		}
		return t && !r && n.push({
			className: "CodeMirror-linenumbers",
			style: null
		}), n
	}

	function rg(e) {
		var t = e.gutters,
			n = e.gutterSpecs;
		C(t), e.lineGutter = null;
		for (var r = 0; r < n.length; ++r) {
			var i = n[r],
				o = i.className,
				l = i.style,
				i = t.appendChild(L("div", null, "CodeMirror-gutter " + o));
			l && (i.style.cssText = l), "CodeMirror-linenumbers" == o && ((e.lineGutter = i).style.width = (e.lineNumWidth || 1) + "px")
		}
		t.style.display = n.length ? "" : "none", rc(e)
	}

	function rm(e) {
		rg(e.display), nO(e), rd(e)
	}

	function rv(e, t, r, i) {
		var o = this;
		this.input = r, o.scrollbarFiller = L("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = L("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = k("div", null, "CodeMirror-code"), o.selectionDiv = L("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = L("div", null, "CodeMirror-cursors"), o.measure = L("div", null, "CodeMirror-measure"), o.lineMeasure = L("div", null, "CodeMirror-measure"), o.lineSpace = k("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");
		var u = k("div", [o.lineSpace], "CodeMirror-lines");
		o.mover = L("div", [u], null, "position: relative"), o.sizer = L("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = L("div", null, null, "position: absolute; height: 50px; width: 1px;"), o.gutters = L("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = L("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = L("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), o.wrapper.setAttribute("translate", "no"), l && s < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), a || n && m || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, o.gutterSpecs = rp(i.gutters, i.lineNumbers), rg(o), r.init(o)
	}
	rl.prototype.signal = function(e, t) {
		eb(e, t) && this.events.push(arguments)
	}, rl.prototype.finish = function() {
		for (var e = 0; e < this.events.length; e++) e$.apply(null, this.events[e])
	};
	var r$ = 0,
		ry = null;

	function r_(e) {
		var t = e.wheelDeltaX,
			n = e.wheelDeltaY;
		return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
			x: t,
			y: n
		}
	}

	function rb(e, t) {
		var r = r_(t),
			i = r.x,
			o = r.y,
			l = ry;
		0 === event.deltaMode && (i = t.deltaX, o = t.deltaY, l = 1);
		var s = e.display,
			u = s.scroller,
			h = u.scrollWidth > u.clientWidth,
			r = u.scrollHeight > u.clientHeight;
		if (i && h || o && r) {
			if (o && v && a) {
				e: for (var d = t.target, f = s.view; d != u; d = d.parentNode)
					for (var p = 0; p < f.length; p++)
						if (f[p].node == d) {
							e.display.currentWheelTarget = d;
							break e
						}
			}
			if (i && !n && !c && null != l) return o && r && nV(e, Math.max(0, u.scrollTop + o * l)), nX(e, Math.max(0, u.scrollLeft + i * l)), o && !r || ew(t), void(s.wheelStartX = null);
			o && null != l && (r = (h = e.doc.scrollTop) + s.wrapper.clientHeight, (l *= o) < 0 ? h = Math.max(0, h + l - 50) : r = Math.min(e.doc.height, r + l + 50), ru(e, {
				top: h,
				bottom: r
			})), r$ < 20 && 0 !== t.deltaMode && (null == s.wheelStartX ? (s.wheelStartX = u.scrollLeft, s.wheelStartY = u.scrollTop, s.wheelDX = i, s.wheelDY = o, setTimeout(function() {
				var e, t;
				null != s.wheelStartX && (t = u.scrollLeft - s.wheelStartX, t = (e = u.scrollTop - s.wheelStartY) && s.wheelDY && e / s.wheelDY || t && s.wheelDX && t / s.wheelDX, s.wheelStartX = s.wheelStartY = null, t && (ry = (ry * r$ + t) / (r$ + 1), ++r$))
			}, 200)) : (s.wheelDX += i, s.wheelDY += o))
		}
	}
	l ? ry = -.53 : n ? ry = 15 : u ? ry = -.7 : h && (ry = -1 / 3);
	var rx = function(e, t) {
		this.ranges = e, this.primIndex = t
	};
	rx.prototype.primary = function() {
		return this.ranges[this.primIndex]
	}, rx.prototype.equals = function(e) {
		if (e == this) return !0;
		if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
		for (var t = 0; t < this.ranges.length; t++) {
			var n = this.ranges[t],
				r = e.ranges[t];
			if (!eX(n.anchor, r.anchor) || !eX(n.head, r.head)) return !1
		}
		return !0
	}, rx.prototype.deepCopy = function() {
		for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new rw(ej(this.ranges[t].anchor), ej(this.ranges[t].head));
		return new rx(e, this.primIndex)
	}, rx.prototype.somethingSelected = function() {
		for (var e = 0; e < this.ranges.length; e++)
			if (!this.ranges[e].empty()) return !0;
		return !1
	}, rx.prototype.contains = function(e, t) {
		t = t || e;
		for (var n = 0; n < this.ranges.length; n++) {
			var r = this.ranges[n];
			if (0 <= eK(t, r.from()) && 0 >= eK(e, r.to())) return n
		}
		return -1
	};
	var rw = function(e, t) {
		this.anchor = e, this.head = t
	};

	function rC(e, t, n) {
		var r = e && e.options.selectionsMayTouch,
			e = t[n];
		t.sort(function(e, t) {
			return eK(e.from(), t.from())
		}), n = E(t, e);
		for (var i = 1; i < t.length; i++) {
			var o, l = t[i],
				s = t[i - 1],
				a = eK(s.to(), l.from());
			(r && !l.empty() ? 0 < a : 0 <= a) && (o = e8(s.from(), l.from()), a = eY(s.to(), l.to()), s = s.empty() ? l.from() == l.head : s.from() == s.head, i <= n && --n, t.splice(--i, 2, new rw(s ? a : o, s ? o : a)))
		}
		return new rx(t, n)
	}

	function rS(e, t) {
		return new rx([new rw(e, t || e)], 0)
	}

	function rL(e) {
		return e.text ? eV(e.from.line + e.text.length - 1, K(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
	}

	function rk(e, t) {
		if (0 > eK(e, t.from)) return e;
		if (0 >= eK(e, t.to)) return rL(t);
		var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
			r = e.ch;
		return e.line == t.to.line && (r += rL(t).ch - t.to.ch), eV(n, r)
	}

	function rT(e, t) {
		for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
			var i = e.sel.ranges[r];
			n.push(new rw(rk(i.anchor, t), rk(i.head, t)))
		}
		return rC(e.cm, n, e.sel.primIndex)
	}

	function rN(e, t, n) {
		return e.line == t.line ? eV(n.line, e.ch - t.ch + n.ch) : eV(n.line + (e.line - t.line), e.ch)
	}

	function rO(e) {
		e.doc.mode = eP(e.options, e.doc.modeOption), rM(e)
	}

	function rM(e) {
		e.doc.iter(function(e) {
			e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
		}), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, ri(e, 100), e.state.modeGen++, e.curOp && nO(e)
	}

	function rA(e, t) {
		return 0 == t.from.ch && 0 == t.to.ch && "" == K(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
	}

	function rW(e, t, n, r) {
		function i(e) {
			return n ? n[e] : null
		}

		function o(e, n, i) {
			var o, l;
			o = i, l = r, (i = e).text = n, i.stateAfter && (i.stateAfter = null), i.styles && (i.styles = null), null != i.order && (i.order = null), tm(i), tv(i, o), (l = l ? l(i) : 1) != i.height && e6(i, l), tR(e, "change", e, t)
		}

		function l(e, t) {
			for (var n = [], o = e; o < t; ++o) n.push(new tA(c[o], i(o), r));
			return n
		}
		var s, a = t.from,
			u = t.to,
			c = t.text,
			h = eB(e, a.line),
			d = eB(e, u.line),
			f = K(c),
			p = i(c.length - 1),
			g = u.line - a.line;
		t.full ? (e.insert(0, l(0, c.length)), e.remove(c.length, e.size - c.length)) : rA(e, t) ? (s = l(0, c.length - 1), o(d, d.text, p), g && e.remove(a.line, g), s.length && e.insert(a.line, s)) : h == d ? 1 == c.length ? o(h, h.text.slice(0, a.ch) + f + h.text.slice(u.ch), p) : ((s = l(1, c.length - 1)).push(new tA(f + h.text.slice(u.ch), p, r)), o(h, h.text.slice(0, a.ch) + c[0], i(0)), e.insert(a.line + 1, s)) : 1 == c.length ? (o(h, h.text.slice(0, a.ch) + c[0] + d.text.slice(u.ch), i(0)), e.remove(a.line + 1, g)) : (o(h, h.text.slice(0, a.ch) + c[0], i(0)), o(d, f + d.text.slice(u.ch), p), p = l(1, c.length - 1), 1 < g && e.remove(a.line + 1, g - 1), e.insert(a.line + 1, p)), tR(e, "change", e, t)
	}

	function r0(e, t, n) {
		! function e(r, i, o) {
			if (r.linked)
				for (var l = 0; l < r.linked.length; ++l) {
					var s, a = r.linked[l];
					null != a.doc && (s = o && a.sharedHist, n && !s || (t(a.doc, s), e(a.doc, r, s)))
				}
		}(e, null, !0)
	}

	function rD(e, t) {
		if (t.cm) throw Error("This document is already in use.");
		nk((e.doc = t).cm = e), rO(e), rH(e), e.options.direction = t.direction, e.options.lineWrapping || tM(e), e.options.mode = t.modeOption, nO(e)
	}

	function rH(e) {
		("rtl" == e.doc.direction ? O : w)(e.display.lineDiv, "CodeMirror-rtl")
	}

	function rF(e) {
		this.done = [], this.undone = [], this.undoDepth = e ? e.undoDepth : 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e ? e.maxGeneration : 1
	}

	function r1(e, t) {
		var n = {
			from: ej(t.from),
			to: rL(t),
			text: e7(e, t.from, t.to)
		};
		return rI(e, n, t.from.line, t.to.line + 1), r0(e, function(e) {
			return rI(e, n, t.from.line, t.to.line + 1), 0
		}, !0), n
	}

	function rP(e) {
		for (; e.length && K(e).ranges;) e.pop()
	}

	function rE(e, t, n, r) {
		var i = e.history;
		i.undone.length = 0;
		var o, l, s = +new Date;
		if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > s - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = (a = i).lastOp == r ? (rP(a.done), K(a.done)) : a.done.length && !K(a.done).ranges ? K(a.done) : 1 < a.done.length && !a.done[a.done.length - 2].ranges ? (a.done.pop(), K(a.done)) : void 0)) l = K(o.changes), 0 == eK(t.from, t.to) && 0 == eK(t.from, l.to) ? l.to = rL(t) : o.changes.push(r1(e, t));
		else {
			var a = K(i.done);
			for (a && a.ranges || rz(e.sel, i.done), o = {
					changes: [r1(e, t)],
					generation: i.generation
				}, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
		}
		i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = s, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, l || e$(e, "historyAdded")
	}

	function rz(e, t) {
		var n = K(t);
		n && n.ranges && n.equals(e) || t.push(e)
	}

	function rI(e, t, n, r) {
		var i = t["spans_" + e.id],
			o = 0;
		e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(n) {
			n.markedSpans && ((i = i || (t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
		})
	}

	function rR(e, t) {
		var n = function e(t, n) {
				var r = n["spans_" + t.id];
				if (!r) return null;
				for (var i = [], o = 0; o < n.text.length; ++o) i.push(function(e) {
					if (!e) return null;
					for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t = t || e.slice(0, n) : t && t.push(e[n]);
					return t ? t.length ? t : null : e
				}(r[o]));
				return i
			}(e, t),
			r = tp(e, t);
		if (!n) return r;
		if (!r) return n;
		for (var i = 0; i < n.length; ++i) {
			var o = n[i],
				l = r[i];
			if (o && l) e: for (var s = 0; s < l.length; ++s) {
				for (var a = l[s], u = 0; u < o.length; ++u)
					if (o[u].marker == a.marker) continue e;
				o.push(a)
			} else l && (n[i] = l)
		}
		return n
	}

	function r3(e, t, n) {
		for (var r = [], i = 0; i < e.length; ++i) {
			var o = e[i];
			if (o.ranges) r.push(n ? rx.prototype.deepCopy.call(o) : o);
			else {
				var l = o.changes,
					s = [];
				r.push({
					changes: s
				});
				for (var a = 0; a < l.length; ++a) {
					var u, c = l[a];
					if (s.push({
							from: c.from,
							to: c.to,
							text: c.text
						}), t)
						for (var h in c)(u = h.match(/^spans_(\d+)$/)) && -1 < E(t, Number(u[1])) && (K(s)[h] = c[h], delete c[h])
				}
			}
		}
		return r
	}

	function rB(e, t, n, r) {
		return r ? (r = e.anchor, n && ((e = 0 > eK(t, r)) != 0 > eK(n, r) ? (r = t, t = n) : e != 0 > eK(t, n) && (t = n)), new rw(r, t)) : new rw(n || t, t)
	}

	function r7(e, t, n, r, i) {
		null == i && (i = e.cm && (e.cm.display.shift || e.extend)), rG(e, new rx([rB(e.sel.primary(), t, n, i)], 0), r)
	}

	function r4(e, t, n) {
		for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) r[o] = rB(e.sel.ranges[o], t[o], null, i);
		rG(e, rC(e.cm, r, e.sel.primIndex), n)
	}

	function r6(e, t, n, r) {
		var i = e.sel.ranges.slice(0);
		i[t] = n, rG(e, rC(e.cm, i, e.sel.primIndex), r)
	}

	function r2(e, t, n, r) {
		rG(e, rS(t, n), r)
	}

	function r5(e, t, n) {
		var r = e.history.done,
			i = K(r);
		i && i.ranges ? rU(e, r[r.length - 1] = t, n) : rG(e, t, n)
	}

	function rG(e, t, n) {
		var r, i, o, l, s, a, u, c, h;
		rU(e, t, n), r = e, i = e.sel, o = e.cm ? e.cm.curOp.id : NaN, l = n, c = r.history, h = l && l.origin, o == c.lastSelOp || h && c.lastSelOrigin == h && (c.lastModTime == c.lastSelTime && c.lastOrigin == h || (s = r, a = h, u = K(c.done), r = i, "*" == (a = a.charAt(0)) || "+" == a && u.ranges.length == r.ranges.length && u.somethingSelected() == r.somethingSelected() && new Date - s.history.lastSelTime <= (s.cm ? s.cm.options.historyEventDelay : 500))) ? c.done[c.done.length - 1] = i : rz(i, c.done), c.lastSelTime = +new Date, c.lastSelOrigin = h, c.lastSelOp = o, l && !1 !== l.clearRedo && rP(c.undone)
	}

	function rU(e, t, n) {
		(eb(e, "beforeSelectionChange") || e.cm && eb(e.cm, "beforeSelectionChange")) && (r = e, i = n, i = {
			ranges: (o = t).ranges,
			update: function(e) {
				this.ranges = [];
				for (var t = 0; t < e.length; t++) this.ranges[t] = new rw(eq(r, e[t].anchor), eq(r, e[t].head))
			},
			origin: i && i.origin
		}, e$(r, "beforeSelectionChange", r, i), r.cm && e$(r.cm, "beforeSelectionChange", r.cm, i), t = i.ranges != o.ranges ? rC(r.cm, i.ranges, i.ranges.length - 1) : o);
		var r, i, o = n && n.bias || (0 > eK(t.primary().head, e.sel.primary().head) ? -1 : 1);
		rV(e, rX(e, t, o, !0)), n && !1 === n.scroll || !e.cm || "nocursor" == e.cm.getOption("readOnly") || n2(e.cm)
	}

	function rV(e, t) {
		t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0, e_(e.cm)), tR(e, "cursorActivity", e))
	}

	function rK(e) {
		rV(e, rX(e, e.sel, null, !1))
	}

	function rX(e, t, n, r) {
		for (var i, o = 0; o < t.ranges.length; o++) {
			var l = t.ranges[o],
				s = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
				a = rY(e, l.anchor, s && s.anchor, n, r),
				s = rY(e, l.head, s && s.head, n, r);
			(i || a != l.anchor || s != l.head) && ((i = i || t.ranges.slice(0, o))[o] = new rw(a, s))
		}
		return i ? rC(e.cm, i, t.primIndex) : t
	}

	function rj(e, t, n, r, i) {
		var o = eB(e, t.line);
		if (o.markedSpans)
			for (var l = 0; l < o.markedSpans.length; ++l) {
				var s = o.markedSpans[l],
					a = s.marker,
					u = "selectLeft" in a ? !a.selectLeft : a.inclusiveLeft,
					c = "selectRight" in a ? !a.selectRight : a.inclusiveRight;
				if ((null == s.from || (u ? s.from <= t.ch : s.from < t.ch)) && (null == s.to || (c ? s.to >= t.ch : s.to > t.ch))) {
					if (i && (e$(a, "beforeCursorEnter"), a.explicitlyCleared)) {
						if (o.markedSpans) {
							--l;
							continue
						}
						break
					}
					if (a.atomic) {
						if (n) {
							var h = a.find(r < 0 ? 1 : -1),
								s = void 0;
							if ((h = (r < 0 ? c : u) ? r8(e, h, -r, h && h.line == t.line ? o : null) : h) && h.line == t.line && (s = eK(h, n)) && (r < 0 ? s < 0 : 0 < s)) return rj(e, h, t, r, i)
						}
						return a = a.find(r < 0 ? -1 : 1), (a = (r < 0 ? u : c) ? r8(e, a, r, a.line == t.line ? o : null) : a) ? rj(e, a, t, r, i) : null
					}
				}
			}
		return t
	}

	function rY(e, t, n, r, i) {
		return (r = rj(e, t, n, r = r || 1, i) || !i && rj(e, t, n, r, !0) || rj(e, t, n, -r, i) || !i && rj(e, t, n, -r, !0)) || (e.cantEdit = !0, eV(e.first, 0))
	}

	function r8(e, t, n, r) {
		return n < 0 && 0 == t.ch ? t.line > e.first ? eq(e, eV(t.line - 1)) : null : 0 < n && t.ch == (r || eB(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? eV(t.line + 1, 0) : null : new eV(t.line, t.ch + n)
	}

	function r9(e) {
		e.setSelection(eV(e.firstLine(), 0), eV(e.lastLine()), I)
	}

	function rq(e, t, n) {
		var r = {
			canceled: !1,
			from: t.from,
			to: t.to,
			text: t.text,
			origin: t.origin,
			cancel: function() {
				return r.canceled = !0
			}
		};
		return n && (r.update = function(t, n, i, o) {
			t && (r.from = eq(e, t)), n && (r.to = eq(e, n)), i && (r.text = i), void 0 !== o && (r.origin = o)
		}), e$(e, "beforeChange", e, r), e.cm && e$(e.cm, "beforeChange", e.cm, r), r.canceled ? (e.cm && (e.cm.curOp.updateInput = 2), null) : {
			from: r.from,
			to: r.to,
			text: r.text,
			origin: r.origin
		}
	}

	function rZ(e, t, n) {
		if (e.cm) {
			if (!e.cm.curOp) return rt(e.cm, rZ)(e, t, n);
			if (e.cm.state.suppressEdits) return
		}
		if (!(eb(e, "beforeChange") || e.cm && eb(e.cm, "beforeChange")) || (t = rq(e, t, !0))) {
			var r = tc && !n && function(e, t, n) {
				var r = null;
				if (e.iter(t.line, n.line + 1, function(e) {
						if (e.markedSpans)
							for (var t = 0; t < e.markedSpans.length; ++t) {
								var n = e.markedSpans[t].marker;
								!n.readOnly || r && -1 != E(r, n) || (r = r || []).push(n)
							}
					}), !r) return null;
				for (var i = [{
						from: t,
						to: n
					}], o = 0; o < r.length; ++o)
					for (var l = r[o], s = l.find(0), a = 0; a < i.length; ++a) {
						var u, c, h, d = i[a];
						0 > eK(d.to, s.from) || 0 < eK(d.from, s.to) || (u = [a, 1], c = eK(d.from, s.from), h = eK(d.to, s.to), !(c < 0) && (l.inclusiveLeft || c) || u.push({
							from: d.from,
							to: s.from
						}), !(0 < h) && (l.inclusiveRight || h) || u.push({
							from: s.to,
							to: d.to
						}), i.splice.apply(i, u), a += u.length - 3)
					}
				return i
			}(e, t.from, t.to);
			if (r)
				for (var i = r.length - 1; 0 <= i; --i) rQ(e, {
					from: r[i].from,
					to: r[i].to,
					text: i ? [""] : t.text,
					origin: t.origin
				});
			else rQ(e, t)
		}
	}

	function rQ(e, t) {
		var n, r;
		1 == t.text.length && "" == t.text[0] && 0 == eK(t.from, t.to) || (n = rT(e, t), rE(e, t, n, e.cm ? e.cm.curOp.id : NaN), it(e, t, n, tp(e, t)), r = [], r0(e, function(e, n) {
			n || -1 != E(r, e.history) || (il(e.history, t), r.push(e.history)), it(e, t, null, tp(e, t))
		}))
	}

	function rJ(e, t, n) {
		var r = e.cm && e.cm.state.suppressEdits;
		if (!r || n) {
			for (var i, o = e.history, l = e.sel, s = "undo" == t ? o.done : o.undone, a = "undo" == t ? o.undone : o.done, u = 0; u < s.length && (i = s[u], n ? !i.ranges || i.equals(e.sel) : i.ranges); u++);
			if (u != s.length) {
				for (o.lastOrigin = o.lastSelOrigin = null;;) {
					if (!(i = s.pop()).ranges) {
						if (r) return void s.push(i);
						break
					}
					if (rz(i, a), n && !i.equals(e.sel)) return void rG(e, i, {
						clearRedo: !1
					});
					l = i
				}
				var c = [];
				rz(l, a), a.push({
					changes: c,
					generation: o.generation
				}), o.generation = i.generation || ++o.maxGeneration;
				for (var h = eb(e, "beforeChange") || e.cm && eb(e.cm, "beforeChange"), d = i.changes.length - 1; 0 <= d; --d) {
					var f = function(n) {
						var r = i.changes[n];
						if (r.origin = t, h && !rq(e, r, !1)) return s.length = 0, {};
						c.push(r1(e, r));
						var o = n ? rT(e, r) : K(s);
						it(e, r, o, rR(e, r)), !n && e.cm && e.cm.scrollIntoView({
							from: r.from,
							to: rL(r)
						});
						var l = [];
						r0(e, function(e, t) {
							t || -1 != E(l, e.history) || (il(e.history, r), l.push(e.history)), it(e, r, null, rR(e, r))
						})
					}(d);
					if (f) return f.v
				}
			}
		}
	}

	function ie(e, t) {
		if (0 != t && (e.first += t, e.sel = new rx(X(e.sel.ranges, function(e) {
				return new rw(eV(e.anchor.line + t, e.anchor.ch), eV(e.head.line + t, e.head.ch))
			}), e.sel.primIndex), e.cm)) {
			nO(e.cm, e.first, e.first - t, t);
			for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) nM(e.cm, r, "gutter")
		}
	}

	function it(e, t, n, r) {
		var i, o, l, s, a, u, c, h, d, f;
		if (e.cm && !e.cm.curOp) return rt(e.cm, it)(e, t, n, r);
		t.to.line < e.first ? ie(e, t.text.length - 1 - (t.to.line - t.from.line)) : t.from.line > e.lastLine() || (t.from.line < e.first && (ie(e, i = t.text.length - 1 - (e.first - t.from.line)), t = {
			from: eV(e.first, 0),
			to: eV(t.to.line + i, t.to.ch),
			text: [K(t.text)],
			origin: t.origin
		}), i = e.lastLine(), (t = t.to.line > i ? {
			from: t.from,
			to: eV(i, eB(e, i).text.length),
			text: [t.text[0]],
			origin: t.origin
		} : t).removed = e7(e, t.from, t.to), n = n || rT(e, t), e.cm ? (o = e.cm, l = t, s = r, a = o.doc, u = o.display, c = l.from, h = l.to, d = !1, f = c.line, o.options.lineWrapping || (f = e2(tS(eB(a, c.line))), a.iter(f, h.line + 1, function(e) {
			if (e == u.maxLine) return d = !0
		})), -1 < a.sel.contains(l.from, l.to) && e_(o), rW(a, l, s, nL(o)), o.options.lineWrapping || (a.iter(f, c.line + l.text.length, function(e) {
			var t = tO(e);
			t > u.maxLineLength && (u.maxLine = e, u.maxLineLength = t, u.maxLineChanged = !0, d = !1)
		}), d && (o.curOp.updateMaxLine = !0)), function(e, t) {
			if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
				for (var n = e.first, r = t - 1; n < r; r--) {
					var i = eB(e, r).stateAfter;
					if (i && (!(i instanceof eQ) || r + i.lookAhead < t)) {
						n = r + 1;
						break
					}
				}
				e.highlightFrontier = Math.min(e.highlightFrontier, n)
			}
		}(a, c.line), ri(o, 400), f = l.text.length - (h.line - c.line) - 1, l.full ? nO(o) : c.line != h.line || 1 != l.text.length || rA(o.doc, l) ? nO(o, c.line, h.line + 1, f) : nM(o, c.line, "text"), a = eb(o, "changes"), ((f = eb(o, "change")) || a) && (l = {
			from: c,
			to: h,
			text: l.text,
			removed: l.removed,
			origin: l.origin
		}, f && tR(o, "change", o, l), a && (o.curOp.changeObjs || (o.curOp.changeObjs = [])).push(l)), o.display.selForContextMenu = null) : rW(e, t, r), rU(e, n, I), e.cantEdit && rY(e, eV(e.firstLine(), 0)) && (e.cantEdit = !1))
	}

	function ir(e, t, n, r, i) {
		var o;
		0 > eK(r = r || n, n) && (n = (o = [r, n])[0], r = o[1]), "string" == typeof t && (t = e.splitLines(t)), rZ(e, {
			from: n,
			to: r,
			text: t,
			origin: i
		})
	}

	function ii(e, t, n, r) {
		n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
	}

	function io(e, t, n, r) {
		for (var i = 0; i < e.length; ++i) {
			var o = e[i],
				l = !0;
			if (o.ranges) {
				o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
				for (var s = 0; s < o.ranges.length; s++) ii(o.ranges[s].anchor, t, n, r), ii(o.ranges[s].head, t, n, r)
			} else {
				for (var a = 0; a < o.changes.length; ++a) {
					var u = o.changes[a];
					if (n < u.from.line) u.from = eV(u.from.line + r, u.from.ch), u.to = eV(u.to.line + r, u.to.ch);
					else if (t <= u.to.line) {
						l = !1;
						break
					}
				}
				l || (e.splice(0, i + 1), i = 0)
			}
		}
	}

	function il(e, t) {
		var n = t.from.line,
			r = t.to.line,
			t = t.text.length - (r - n) - 1;
		io(e.done, n, r, t), io(e.undone, n, r, t)
	}

	function is(e, t, n, r) {
		var i = t,
			o = t;
		return "number" == typeof t ? o = eB(e, e9(e, t)) : i = e2(t), null == i ? null : (r(o, i) && e.cm && nM(e.cm, i, n), o)
	}

	function ia(e) {
		this.lines = e, this.parent = null;
		for (var t = 0, n = 0; n < e.length; ++n) e[n].parent = this, t += e[n].height;
		this.height = t
	}

	function iu(e) {
		this.children = e;
		for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
			var i = e[r];
			t += i.chunkSize(), n += i.height, i.parent = this
		}
		this.size = t, this.height = n, this.parent = null
	}

	function ic(e, t, n) {
		if (n)
			for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
		this.doc = e, this.node = t
	}

	function ih(e, t, n) {
		tN(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && n6(e, n)
	}

	function id(e, t) {
		this.lines = [], this.type = t, this.doc = e, this.id = ++ip
	}
	rw.prototype.from = function() {
		return e8(this.anchor, this.head)
	}, rw.prototype.to = function() {
		return eY(this.anchor, this.head)
	}, rw.prototype.empty = function() {
		return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
	}, ia.prototype = {
		chunkSize: function() {
			return this.lines.length
		},
		removeInner: function(e, t) {
			for (var n, r = e, i = e + t; r < i; ++r) {
				var o = this.lines[r];
				this.height -= o.height, (n = o).parent = null, tm(n), tR(o, "delete")
			}
			this.lines.splice(e, t)
		},
		collapse: function(e) {
			e.push.apply(e, this.lines)
		},
		insertInner: function(e, t, n) {
			this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
			for (var r = 0; r < t.length; ++r) t[r].parent = this
		},
		iterN: function(e, t, n) {
			for (var r = e + t; e < r; ++e)
				if (n(this.lines[e])) return !0
		}
	}, iu.prototype = {
		chunkSize: function() {
			return this.size
		},
		removeInner: function(e, t) {
			this.size -= t;
			for (var n, r = 0; r < this.children.length; ++r) {
				var i = this.children[r],
					o = i.chunkSize();
				if (e < o) {
					var l = Math.min(t, o - e),
						s = i.height;
					if (i.removeInner(e, l), this.height -= s - i.height, o == l && (this.children.splice(r--, 1), i.parent = null), 0 == (t -= l)) break;
					e = 0
				} else e -= o
			}!(this.size - t < 25) || !(1 < this.children.length) && this.children[0] instanceof ia || (this.collapse(n = []), this.children = [new ia(n)], this.children[0].parent = this)
		},
		collapse: function(e) {
			for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
		},
		insertInner: function(e, t, n) {
			this.size += t.length, this.height += n;
			for (var r = 0; r < this.children.length; ++r) {
				var i = this.children[r],
					o = i.chunkSize();
				if (e <= o) {
					if (i.insertInner(e, t, n), i.lines && 50 < i.lines.length) {
						for (var l = i.lines.length % 25 + 25, s = l; s < i.lines.length;) {
							var a = new ia(i.lines.slice(s, s += 25));
							i.height -= a.height, this.children.splice(++r, 0, a), a.parent = this
						}
						i.lines = i.lines.slice(0, l), this.maybeSpill()
					}
					break
				}
				e -= o
			}
		},
		maybeSpill: function() {
			if (!(this.children.length <= 10)) {
				var e = this;
				do var t, n = new iu(e.children.splice(e.children.length - 5, 5)); while (e.parent ? (e.size -= n.size, e.height -= n.height, t = E(e.parent.children, e), e.parent.children.splice(t + 1, 0, n)) : (((t = new iu(e.children)).parent = e).children = [t, n], e = t), n.parent = e.parent, 10 < e.children.length);
				e.parent.maybeSpill()
			}
		},
		iterN: function(e, t, n) {
			for (var r = 0; r < this.children.length; ++r) {
				var i = this.children[r],
					o = i.chunkSize();
				if (e < o) {
					var l = Math.min(t, o - e);
					if (i.iterN(e, l, n)) return !0;
					if (0 == (t -= l)) break;
					e = 0
				} else e -= o
			}
		}
	}, ic.prototype.clear = function() {
		var e = this.doc.cm,
			t = this.line.widgets,
			n = this.line,
			r = e2(n);
		if (null != r && t) {
			for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
			t.length || (n.widgets = null);
			var o = tU(this);
			e6(n, Math.max(0, n.height - o)), e && (re(e, function() {
				ih(e, n, -o), nM(e, r, "widget")
			}), tR(e, "lineWidgetCleared", e, this, r))
		}
	}, ic.prototype.changed = function() {
		var e = this,
			t = this.height,
			n = this.doc.cm,
			r = this.line;
		this.height = null;
		var i = tU(this) - t;
		i && (tT(this.doc, r) || e6(r, r.height + i), n && re(n, function() {
			n.curOp.forceUpdate = !0, ih(n, r, i), tR(n, "lineWidgetChanged", n, e, e2(r))
		}))
	}, ex(ic);
	var ip = 0;

	function ig(e, t, n, r, i) {
		if (r && r.shared) {
			var o, l, s, a, u, c, h, d;
			return o = e, l = t, s = n, a = r, u = i, (a = H(a)).shared = !1, h = (c = [ig(o, l, s, a, u)])[0], d = a.widgetNode, r0(o, function(e) {
				d && (a.widgetNode = d.cloneNode(!0)), c.push(ig(e, eq(e, l), eq(e, s), a, u));
				for (var t = 0; t < e.linked.length; ++t)
					if (e.linked[t].isParent) return;
				h = K(c)
			}), new im(c, h)
		}
		if (e.cm && !e.cm.curOp) return rt(e.cm, ig)(e, t, n, r, i);
		var f = new id(e, i),
			i = eK(t, n);
		if (r && H(r, f, !1), 0 < i || 0 == i && !1 !== f.clearWhenEmpty) return f;
		if (f.replacedWith && (f.collapsed = !0, f.widgetNode = k("span", [f.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || f.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (f.widgetNode.insertLeft = !0)), f.collapsed) {
			if (tC(e, t.line, t, n, f) || t.line != n.line && tC(e, n.line, t, n, f)) throw Error("Inserting collapsed marker partially overlapping an existing one");
			th = !0
		}
		f.addToHistory && rE(e, {
			from: t,
			to: n,
			origin: "markText"
		}, e.sel, NaN);
		var p, g = t.line,
			m = e.cm;
		if (e.iter(g, n.line + 1, function(r) {
				var i, o;
				m && f.collapsed && !m.options.lineWrapping && tS(r) == m.display.maxLine && (p = !0), f.collapsed && g != t.line && e6(r, 0), i = r, o = new td(f, g == t.line ? t.ch : null, g == n.line ? n.ch : null), (r = (r = e.cm && e.cm.curOp) && window.WeakSet && (r.markedSpans || (r.markedSpans = new WeakSet))) && r.has(i.markedSpans) ? i.markedSpans.push(o) : (i.markedSpans = i.markedSpans ? i.markedSpans.concat([o]) : [o], r && r.add(i.markedSpans)), o.marker.attachLine(i), ++g
			}), f.collapsed && e.iter(t.line, n.line + 1, function(t) {
				tT(e, t) && e6(t, 0)
			}), f.clearOnEnter && eg(f, "beforeCursorEnter", function() {
				return f.clear()
			}), f.readOnly && (tc = !0, (e.history.done.length || e.history.undone.length) && e.clearHistory()), f.collapsed && (f.id = ++ip, f.atomic = !0), m) {
			if (p && (m.curOp.updateMaxLine = !0), f.collapsed) nO(m, t.line, n.line + 1);
			else if (f.className || f.startStyle || f.endStyle || f.css || f.attributes || f.title)
				for (var v = t.line; v <= n.line; v++) nM(m, v, "text");
			f.atomic && rK(m.doc), tR(m, "markerAdded", m, f)
		}
		return f
	}
	id.prototype.clear = function() {
		if (!this.explicitlyCleared) {
			var e, t = this.doc.cm,
				n = t && !t.curOp;
			n && nQ(t), !eb(this, "clear") || (e = this.find()) && tR(this, "clear", e.from, e.to);
			for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
				var l = this.lines[o],
					s = tf(l.markedSpans, this);
				t && !this.collapsed ? nM(t, e2(l), "text") : t && (null != s.to && (i = e2(l)), null != s.from && (r = e2(l))), l.markedSpans = function(e, t) {
					for (var n, r = 0; r < e.length; ++r) e[r] != t && (n = n || []).push(e[r]);
					return n
				}(l.markedSpans, s), null == s.from && this.collapsed && !tT(this.doc, l) && t && e6(l, nx(t.display))
			}
			if (t && this.collapsed && !t.options.lineWrapping)
				for (var a = 0; a < this.lines.length; ++a) {
					var u = tS(this.lines[a]),
						c = tO(u);
					c > t.display.maxLineLength && (t.display.maxLine = u, t.display.maxLineLength = c, t.display.maxLineChanged = !0)
				}
			null != r && t && this.collapsed && nO(t, r, i + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && rK(t.doc)), t && tR(t, "markerCleared", t, this, r, i), n && nJ(t), this.parent && this.parent.clear()
		}
	}, id.prototype.find = function(e, t) {
		var n, r;
		null == e && "bookmark" == this.type && (e = 1);
		for (var i = 0; i < this.lines.length; ++i) {
			var o = this.lines[i],
				l = tf(o.markedSpans, this);
			if (null != l.from && (n = eV(t ? o : e2(o), l.from), -1 == e)) return n;
			if (null != l.to && (r = eV(t ? o : e2(o), l.to), 1 == e)) return r
		}
		return n && {
			from: n,
			to: r
		}
	}, id.prototype.changed = function() {
		var e = this,
			t = this.find(-1, !0),
			n = this,
			r = this.doc.cm;
		t && r && re(r, function() {
			var i = t.line,
				o = e2(t.line),
				o = tQ(r, o);
			o && (ni(o), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, tT(n.doc, i) || null == n.height || (o = n.height, n.height = null, (o = tU(n) - o) && e6(i, i.height + o)), tR(r, "markerChanged", r, e)
		})
	}, id.prototype.attachLine = function(e) {
		var t;
		!this.lines.length && this.doc.cm && ((t = this.doc.cm.curOp).maybeHiddenMarkers && -1 != E(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)), this.lines.push(e)
	}, id.prototype.detachLine = function(e) {
		this.lines.splice(E(this.lines, e), 1), !this.lines.length && this.doc.cm && ((e = this.doc.cm.curOp).maybeHiddenMarkers || (e.maybeHiddenMarkers = [])).push(this)
	}, ex(id);
	var im = function(e, t) {
		this.markers = e, this.primary = t;
		for (var n = 0; n < e.length; ++n) e[n].parent = this
	};

	function iv(e) {
		return e.findMarks(eV(e.first, 0), e.clipPos(eV(e.lastLine())), function(e) {
			return e.parent
		})
	}

	function i$(e) {
		for (var t = 0; t < e.length; t++) ! function(t) {
			var n = e[t],
				r = [n.primary.doc];
			r0(n.primary.doc, function(e) {
				return r.push(e)
			});
			for (var i = 0; i < n.markers.length; i++) {
				var o = n.markers[i]; - 1 == E(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1))
			}
		}(t)
	}

	function iy(e, t, n, r, i) {
		if (!(this instanceof iy)) return new iy(e, t, n, r, i);
		null == n && (n = 0), iu.call(this, [new ia([new tA("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, n = eV(this.modeFrontier = this.highlightFrontier = n, 0), this.sel = rS(n), this.history = new rF(null), this.id = ++i_, this.modeOption = t, this.lineSep = r, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), rW(this, {
			from: n,
			to: n,
			text: e
		}), rG(this, rS(n), I)
	}
	im.prototype.clear = function() {
		if (!this.explicitlyCleared) {
			this.explicitlyCleared = !0;
			for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
			tR(this, "clear")
		}
	}, im.prototype.find = function(e, t) {
		return this.primary.find(e, t)
	}, ex(im);
	var i_ = 0;
	(iy.prototype = Y(iu.prototype, {
		constructor: iy,
		iter: function(e, t, n) {
			n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
		},
		insert: function(e, t) {
			for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
			this.insertInner(e - this.first, t, n)
		},
		remove: function(e, t) {
			this.removeInner(e - this.first, t)
		},
		getValue: function(e) {
			var t = e4(this, this.first, this.first + this.size);
			return !1 === e ? t : t.join(e || this.lineSeparator())
		},
		setValue: rr(function(e) {
			var t = eV(this.first, 0),
				n = this.first + this.size - 1;
			rZ(this, {
				from: t,
				to: eV(n, eB(this, n).text.length),
				text: this.splitLines(e),
				origin: "setValue",
				full: !0
			}, !0), this.cm && n5(this.cm, 0, 0), rG(this, rS(t), I)
		}),
		replaceRange: function(e, t, n, r) {
			ir(this, e, t = eq(this, t), n = n ? eq(this, n) : t, r)
		},
		getRange: function(e, t, n) {
			return t = e7(this, eq(this, e), eq(this, t)), !1 === n ? t : "" === n ? t.join("") : t.join(n || this.lineSeparator())
		},
		getLine: function(e) {
			return (e = this.getLineHandle(e)) && e.text
		},
		getLineHandle: function(e) {
			if (eG(this, e)) return eB(this, e)
		},
		getLineNumber: e2,
		getLineHandleVisualStart: function(e) {
			return tS(e = "number" == typeof e ? eB(this, e) : e)
		},
		lineCount: function() {
			return this.size
		},
		firstLine: function() {
			return this.first
		},
		lastLine: function() {
			return this.first + this.size - 1
		},
		clipPos: function(e) {
			return eq(this, e)
		},
		getCursor: function(e) {
			var t = this.sel.primary(),
				t = null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from();
			return t
		},
		listSelections: function() {
			return this.sel.ranges
		},
		somethingSelected: function() {
			return this.sel.somethingSelected()
		},
		setCursor: rr(function(e, t, n) {
			r2(this, eq(this, "number" == typeof e ? eV(e, t || 0) : e), null, n)
		}),
		setSelection: rr(function(e, t, n) {
			r2(this, eq(this, e), eq(this, t || e), n)
		}),
		extendSelection: rr(function(e, t, n) {
			r7(this, eq(this, e), t && eq(this, t), n)
		}),
		extendSelections: rr(function(e, t) {
			r4(this, eZ(this, e), t)
		}),
		extendSelectionsBy: rr(function(e, t) {
			r4(this, eZ(this, X(this.sel.ranges, e)), t)
		}),
		setSelections: rr(function(e, t, n) {
			if (e.length) {
				for (var r = [], i = 0; i < e.length; i++) r[i] = new rw(eq(this, e[i].anchor), eq(this, e[i].head || e[i].anchor));
				null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), rG(this, rC(this.cm, r, t), n)
			}
		}),
		addSelection: rr(function(e, t, n) {
			var r = this.sel.ranges.slice(0);
			r.push(new rw(eq(this, e), eq(this, t || e))), rG(this, rC(this.cm, r, r.length - 1), n)
		}),
		getSelection: function(e) {
			for (var t = this.sel.ranges, n = 0; n < t.length; n++) var r = e7(this, t[n].from(), t[n].to()),
				i = i ? i.concat(r) : r;
			return !1 === e ? i : i.join(e || this.lineSeparator())
		},
		getSelections: function(e) {
			for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
				var i = e7(this, n[r].from(), n[r].to());
				!1 !== e && (i = i.join(e || this.lineSeparator())), t[r] = i
			}
			return t
		},
		replaceSelection: function(e, t, n) {
			for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
			this.replaceSelections(r, t, n || "+input")
		},
		replaceSelections: rr(function(e, t, n) {
			for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
				var l = i.ranges[o];
				r[o] = {
					from: l.from(),
					to: l.to(),
					text: this.splitLines(e[o]),
					origin: n
				}
			}
			for (var t = t && "end" != t && function(e, t, n) {
					for (var r = [], i = u = eV(e.first, 0), o = 0; o < t.length; o++) {
						var l = t[o],
							s = rN(l.from, u, i),
							a = rN(rL(l), u, i),
							u = l.to,
							i = a;
						"around" == n ? (l = 0 > eK((l = e.sel.ranges[o]).head, l.anchor), r[o] = new rw(l ? a : s, l ? s : a)) : r[o] = new rw(s, s)
					}
					return new rx(r, e.sel.primIndex)
				}(this, r, t), s = r.length - 1; 0 <= s; s--) rZ(this, r[s]);
			t ? r5(this, t) : this.cm && n2(this.cm)
		}),
		undo: rr(function() {
			rJ(this, "undo")
		}),
		redo: rr(function() {
			rJ(this, "redo")
		}),
		undoSelection: rr(function() {
			rJ(this, "undo", !0)
		}),
		redoSelection: rr(function() {
			rJ(this, "redo", !0)
		}),
		setExtending: function(e) {
			this.extend = e
		},
		getExtending: function() {
			return this.extend
		},
		historySize: function() {
			for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
			for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
			return {
				undo: t,
				redo: n
			}
		},
		clearHistory: function() {
			var e = this;
			this.history = new rF(this.history), r0(this, function(t) {
				return t.history = e.history
			}, !0)
		},
		markClean: function() {
			this.cleanGeneration = this.changeGeneration(!0)
		},
		changeGeneration: function(e) {
			return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
		},
		isClean: function(e) {
			return this.history.generation == (e || this.cleanGeneration)
		},
		getHistory: function() {
			return {
				done: r3(this.history.done),
				undone: r3(this.history.undone)
			}
		},
		setHistory: function(e) {
			var t = this.history = new rF(this.history);
			t.done = r3(e.done.slice(0), null, !0), t.undone = r3(e.undone.slice(0), null, !0)
		},
		setGutterMarker: rr(function(e, t, n) {
			return is(this, e, "gutter", function(e) {
				var r = e.gutterMarkers || (e.gutterMarkers = {});
				return !(r[t] = n) && J(r) && (e.gutterMarkers = null), 1
			})
		}),
		clearGutter: rr(function(e) {
			var t = this;
			this.iter(function(n) {
				n.gutterMarkers && n.gutterMarkers[e] && is(t, n, "gutter", function() {
					return n.gutterMarkers[e] = null, J(n.gutterMarkers) && (n.gutterMarkers = null), 1
				})
			})
		}),
		lineInfo: function(e) {
			var t;
			if ("number" == typeof e) {
				if (!eG(this, e) || !(e = eB(this, t = e))) return null
			} else if (null == (t = e2(e))) return null;
			return {
				line: t,
				handle: e,
				text: e.text,
				gutterMarkers: e.gutterMarkers,
				textClass: e.textClass,
				bgClass: e.bgClass,
				wrapClass: e.wrapClass,
				widgets: e.widgets
			}
		},
		addLineClass: rr(function(e, t, n) {
			return is(this, e, "gutter" == t ? "gutter" : "class", function(e) {
				var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass";
				if (e[r]) {
					if (x(n).test(e[r])) return;
					e[r] += " " + n
				} else e[r] = n;
				return 1
			})
		}),
		removeLineClass: rr(function(e, t, n) {
			return is(this, e, "gutter" == t ? "gutter" : "class", function(e) {
				var r = "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass",
					i = e[r];
				if (i) {
					if (null == n) e[r] = null;
					else {
						var o = i.match(x(n));
						if (!o) return;
						var l = o.index + o[0].length;
						e[r] = i.slice(0, o.index) + (o.index && l != i.length ? " " : "") + i.slice(l) || null
					}
					return 1
				}
			})
		}),
		addLineWidget: rr(function(e, t, n) {
			var r, i, o;
			return i = new ic(r = this, t, n), (o = r.cm) && i.noHScroll && (o.display.alignWidgets = !0), is(r, e, "widget", function(e) {
				var t = e.widgets || (e.widgets = []);
				return null == i.insertAt ? t.push(i) : t.splice(Math.min(t.length, Math.max(0, i.insertAt)), 0, i), i.line = e, o && !tT(r, e) && (t = tN(e) < r.scrollTop, e6(e, e.height + tU(i)), t && n6(o, i.height), o.curOp.forceUpdate = !0), 1
			}), o && tR(o, "lineWidgetAdded", o, i, "number" == typeof e ? e : e2(e)), i
		}),
		removeLineWidget: function(e) {
			e.clear()
		},
		markText: function(e, t, n) {
			return ig(this, eq(this, e), eq(this, t), n, n && n.type || "range")
		},
		setBookmark: function(e, t) {
			return t = {
				replacedWith: t && (null == t.nodeType ? t.widget : t),
				insertLeft: t && t.insertLeft,
				clearWhenEmpty: !1,
				shared: t && t.shared,
				handleMouseEvents: t && t.handleMouseEvents
			}, ig(this, e = eq(this, e), e, t, "bookmark")
		},
		findMarksAt: function(e) {
			var t = [],
				n = eB(this, (e = eq(this, e)).line).markedSpans;
			if (n)
				for (var r = 0; r < n.length; ++r) {
					var i = n[r];
					(null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
				}
			return t
		},
		findMarks: function(e, t, n) {
			e = eq(this, e), t = eq(this, t);
			var r = [],
				i = e.line;
			return this.iter(e.line, t.line + 1, function(o) {
				var l = o.markedSpans;
				if (l)
					for (var s = 0; s < l.length; s++) {
						var a = l[s];
						null != a.to && i == e.line && e.ch >= a.to || null == a.from && i != e.line || null != a.from && i == t.line && a.from >= t.ch || n && !n(a.marker) || r.push(a.marker.parent || a.marker)
					}++i
			}), r
		},
		getAllMarks: function() {
			var e = [];
			return this.iter(function(t) {
				var n = t.markedSpans;
				if (n)
					for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
			}), e
		},
		posFromIndex: function(e) {
			var t, n = this.first,
				r = this.lineSeparator().length;
			return this.iter(function(i) {
				if (e < (i = i.text.length + r)) return t = e, !0;
				e -= i, ++n
			}), eq(this, eV(n, t))
		},
		indexFromPos: function(e) {
			var t = (e = eq(this, e)).ch;
			if (e.line < this.first || e.ch < 0) return 0;
			var n = this.lineSeparator().length;
			return this.iter(this.first, e.line, function(e) {
				t += e.text.length + n
			}), t
		},
		copy: function(e) {
			var t = new iy(e4(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
			return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
		},
		linkedDoc: function(e) {
			var t = this.first,
				n = this.first + this.size;
			return null != (e = e || {}).from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to), t = new iy(e4(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction), e.sharedHist && (t.history = this.history), (this.linked || (this.linked = [])).push({
					doc: t,
					sharedHist: e.sharedHist
				}), t.linked = [{
					doc: this,
					isParent: !0,
					sharedHist: e.sharedHist
				}],
				function(e, t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n],
							i = r.find(),
							o = e.clipPos(i.from),
							i = e.clipPos(i.to);
						eK(o, i) && (i = ig(e, o, i, r.primary, r.primary.type), r.markers.push(i), i.parent = r)
					}
				}(t, iv(this)), t
		},
		unlinkDoc: function(e) {
			if (e instanceof ot && (e = e.doc), this.linked) {
				for (var t, n = 0; n < this.linked.length; ++n)
					if (this.linked[n].doc == e) {
						this.linked.splice(n, 1), e.unlinkDoc(this), i$(iv(this));
						break
					}
			}
			e.history == this.history && (t = [e.id], r0(e, function(e) {
				return t.push(e.id)
			}, !0), e.history = new rF(null), e.history.done = r3(this.history.done, t), e.history.undone = r3(this.history.undone, t))
		},
		iterLinkedDocs: function(e) {
			r0(this, e)
		},
		getMode: function() {
			return this.mode
		},
		getEditor: function() {
			return this.cm
		},
		splitLines: function(e) {
			return this.lineSep ? e.split(this.lineSep) : eA(e)
		},
		lineSeparator: function() {
			return this.lineSep || "\n"
		},
		setDirection: rr(function(e) {
			var t;
			(e = "rtl" != e ? "ltr" : e) != this.direction && (this.direction = e, this.iter(function(e) {
				return e.order = null
			}), this.cm && re(t = this.cm, function() {
				rH(t), nO(t)
			}))
		})
	})).eachLine = iy.prototype.iter;
	var ib = 0;

	function ix(e) {
		var t = this;
		if (iw(t), !ey(t, e) && !tV(t.display, e)) {
			ew(e), l && (ib = +new Date);
			var n = nT(t, e, !0),
				r = e.dataTransfer.files;
			if (n && !t.isReadOnly()) {
				if (r && r.length && window.FileReader && window.File)
					for (var i = r.length, o = Array(i), s = 0, a = function() {
							++s == i && rt(t, function() {
								var e = {
									from: n = eq(t.doc, n),
									to: n,
									text: t.doc.splitLines(o.filter(function(e) {
										return null != e
									}).join(t.doc.lineSeparator())),
									origin: "paste"
								};
								rZ(t.doc, e), r5(t.doc, rS(eq(t.doc, n), eq(t.doc, rL(e))))
							})()
						}, u = 0; u < r.length; u++) ! function(e, n) {
						var r;
						t.options.allowDropFileTypes && -1 == E(t.options.allowDropFileTypes, e.type) ? a() : ((r = new FileReader).onerror = function() {
							return a()
						}, r.onload = function() {
							var e = r.result;
							/[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[n] = e), a()
						}, r.readAsText(e))
					}(r[u], u);
				else {
					if (t.state.draggingText && -1 < t.doc.sel.contains(n)) return t.state.draggingText(e), void setTimeout(function() {
						return t.display.input.focus()
					}, 20);
					try {
						var c, h = e.dataTransfer.getData("Text");
						if (h) {
							if (t.state.draggingText && !t.state.draggingText.copy && (c = t.listSelections()), rU(t.doc, rS(n, n)), c)
								for (var d = 0; d < c.length; ++d) ir(t.doc, "", c[d].anchor, c[d].head, "drag");
							t.replaceSelection(h, "around", "paste"), t.display.input.focus()
						}
					} catch (f) {}
				}
			}
		}
	}

	function iw(e) {
		e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
	}

	function iC(e) {
		if (document.getElementsByClassName) {
			for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
				var i = t[r].CodeMirror;
				i && n.push(i)
			}
			n.length && n[0].operation(function() {
				for (var t = 0; t < n.length; t++) e(n[t])
			})
		}
	}
	var iS = !1;

	function iL() {
		var e;
		iS || (eg(window, "resize", function() {
			null == e && (e = setTimeout(function() {
				e = null, iC(ik)
			}, 100))
		}), eg(window, "blur", function() {
			return iC(nR)
		}), iS = !0)
	}

	function ik(e) {
		var t = e.display;
		t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
	}
	for (var iT = {
			3: "Pause",
			8: "Backspace",
			9: "Tab",
			13: "Enter",
			16: "Shift",
			17: "Ctrl",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Esc",
			32: "Space",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "Left",
			38: "Up",
			39: "Right",
			40: "Down",
			44: "PrintScrn",
			45: "Insert",
			46: "Delete",
			59: ";",
			61: "=",
			91: "Mod",
			92: "Mod",
			93: "Mod",
			106: "*",
			107: "=",
			109: "-",
			110: ".",
			111: "/",
			145: "ScrollLock",
			173: "-",
			186: ";",
			187: "=",
			188: ",",
			189: "-",
			190: ".",
			191: "/",
			192: "`",
			219: "[",
			220: "\\",
			221: "]",
			222: "'",
			224: "Mod",
			63232: "Up",
			63233: "Down",
			63234: "Left",
			63235: "Right",
			63272: "Delete",
			63273: "Home",
			63275: "End",
			63276: "PageUp",
			63277: "PageDown",
			63302: "Insert"
		}, iN = 0; iN < 10; iN++) iT[iN + 48] = iT[iN + 96] = String(iN);
	for (var iO = 65; iO <= 90; iO++) iT[iO] = String.fromCharCode(iO);
	for (var iM = 1; iM <= 12; iM++) iT[iM + 111] = iT[iM + 63235] = "F" + iM;
	var iA = {};

	function iW(e) {
		var t, n, r, i, o = e.split(/-(?!$)/);
		e = o[o.length - 1];
		for (var l = 0; l < o.length - 1; l++) {
			var s = o[l];
			if (/^(cmd|meta|m)$/i.test(s)) i = !0;
			else if (/^a(lt)?$/i.test(s)) t = !0;
			else if (/^(c|ctrl|control)$/i.test(s)) n = !0;
			else {
				if (!/^s(hift)?$/i.test(s)) throw Error("Unrecognized modifier name: " + s);
				r = !0
			}
		}
		return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), e = r ? "Shift-" + e : e
	}

	function i0(e, t, n, r) {
		var i = (t = i1(t)).call ? t.call(e, r) : t[e];
		if (!1 === i) return "nothing";
		if ("..." === i) return "multi";
		if (null != i && n(i)) return "handled";
		if (t.fallthrough) {
			if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return i0(e, t.fallthrough, n, r);
			for (var o = 0; o < t.fallthrough.length; o++) {
				var l = i0(e, t.fallthrough[o], n, r);
				if (l) return l
			}
		}
	}

	function iD(e) {
		return "Ctrl" == (e = "string" == typeof e ? e : iT[e.keyCode]) || "Alt" == e || "Shift" == e || "Mod" == e
	}

	function iH(e, t, n) {
		var r = e;
		return t.altKey && "Alt" != r && (e = "Alt-" + e), (_ ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e), (_ ? t.ctrlKey : t.metaKey) && "Mod" != r && (e = "Cmd-" + e), e = !n && t.shiftKey && "Shift" != r ? "Shift-" + e : e
	}

	function iF(e, t) {
		if (c && 34 == e.keyCode && e.char) return !1;
		var n = iT[e.keyCode];
		return null != n && !e.altGraphKey && iH(n = 3 == e.keyCode && e.code ? e.code : n, e, t)
	}

	function i1(e) {
		return "string" == typeof e ? iA[e] : e
	}

	function iP(e, t) {
		for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
			for (var o = t(n[i]); r.length && 0 >= eK(o.from, K(r).to);) {
				var l = r.pop();
				if (0 > eK(l.from, o.from)) {
					o.from = l.from;
					break
				}
			}
			r.push(o)
		}
		re(e, function() {
			for (var t = r.length - 1; 0 <= t; t--) ir(e.doc, "", r[t].from, r[t].to, "+delete");
			n2(e)
		})
	}

	function iE(e, t, n) {
		return (n = en(e.text, t + n, n)) < 0 || n > e.text.length ? null : n
	}

	function iz(e, t, n) {
		return null == (e = iE(e, t.ch, n)) ? null : new eV(t.line, e, n < 0 ? "after" : "before")
	}

	function iI(e, t, n, r, i) {
		if (e) {
			"rtl" == t.doc.direction && (i = -i);
			var o = ef(n, t.doc.direction);
			if (o) {
				var l, s, a, e = i < 0 ? K(o) : o[0],
					o = i < 0 == (1 == e.level) ? "after" : "before";
				return 0 < e.level || "rtl" == t.doc.direction ? (l = tJ(t, n), a = ne(t, l, s = i < 0 ? n.text.length - 1 : 0).top, s = er(function(e) {
					return ne(t, l, e).top == a
				}, i < 0 == (1 == e.level) ? e.from : e.to - 1, s), "before" == o && (s = iE(n, s, 1))) : s = i < 0 ? e.to : e.from, new eV(r, s, o)
			}
		}
		return new eV(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after")
	}
	iA.basic = {
		Left: "goCharLeft",
		Right: "goCharRight",
		Up: "goLineUp",
		Down: "goLineDown",
		End: "goLineEnd",
		Home: "goLineStartSmart",
		PageUp: "goPageUp",
		PageDown: "goPageDown",
		Delete: "delCharAfter",
		Backspace: "delCharBefore",
		"Shift-Backspace": "delCharBefore",
		Tab: "defaultTab",
		"Shift-Tab": "indentAuto",
		Enter: "newlineAndIndent",
		Insert: "toggleOverwrite",
		Esc: "singleSelection"
	}, iA.pcDefault = {
		"Ctrl-A": "selectAll",
		"Ctrl-D": "deleteLine",
		"Ctrl-Z": "undo",
		"Shift-Ctrl-Z": "redo",
		"Ctrl-Y": "redo",
		"Ctrl-Home": "goDocStart",
		"Ctrl-End": "goDocEnd",
		"Ctrl-Up": "goLineUp",
		"Ctrl-Down": "goLineDown",
		"Ctrl-Left": "goGroupLeft",
		"Ctrl-Right": "goGroupRight",
		"Alt-Left": "goLineStart",
		"Alt-Right": "goLineEnd",
		"Ctrl-Backspace": "delGroupBefore",
		"Ctrl-Delete": "delGroupAfter",
		"Ctrl-S": "save",
		"Ctrl-F": "find",
		"Ctrl-G": "findNext",
		"Shift-Ctrl-G": "findPrev",
		"Shift-Ctrl-F": "replace",
		"Shift-Ctrl-R": "replaceAll",
		"Ctrl-[": "indentLess",
		"Ctrl-]": "indentMore",
		"Ctrl-U": "undoSelection",
		"Shift-Ctrl-U": "redoSelection",
		"Alt-U": "redoSelection",
		fallthrough: "basic"
	}, iA.emacsy = {
		"Ctrl-F": "goCharRight",
		"Ctrl-B": "goCharLeft",
		"Ctrl-P": "goLineUp",
		"Ctrl-N": "goLineDown",
		"Ctrl-A": "goLineStart",
		"Ctrl-E": "goLineEnd",
		"Ctrl-V": "goPageDown",
		"Shift-Ctrl-V": "goPageUp",
		"Ctrl-D": "delCharAfter",
		"Ctrl-H": "delCharBefore",
		"Alt-Backspace": "delWordBefore",
		"Ctrl-K": "killLine",
		"Ctrl-T": "transposeChars",
		"Ctrl-O": "openLine"
	}, iA.macDefault = {
		"Cmd-A": "selectAll",
		"Cmd-D": "deleteLine",
		"Cmd-Z": "undo",
		"Shift-Cmd-Z": "redo",
		"Cmd-Y": "redo",
		"Cmd-Home": "goDocStart",
		"Cmd-Up": "goDocStart",
		"Cmd-End": "goDocEnd",
		"Cmd-Down": "goDocEnd",
		"Alt-Left": "goGroupLeft",
		"Alt-Right": "goGroupRight",
		"Cmd-Left": "goLineLeft",
		"Cmd-Right": "goLineRight",
		"Alt-Backspace": "delGroupBefore",
		"Ctrl-Alt-Backspace": "delGroupAfter",
		"Alt-Delete": "delGroupAfter",
		"Cmd-S": "save",
		"Cmd-F": "find",
		"Cmd-G": "findNext",
		"Shift-Cmd-G": "findPrev",
		"Cmd-Alt-F": "replace",
		"Shift-Cmd-Alt-F": "replaceAll",
		"Cmd-[": "indentLess",
		"Cmd-]": "indentMore",
		"Cmd-Backspace": "delWrappedLineLeft",
		"Cmd-Delete": "delWrappedLineRight",
		"Cmd-U": "undoSelection",
		"Shift-Cmd-U": "redoSelection",
		"Ctrl-Up": "goDocStart",
		"Ctrl-Down": "goDocEnd",
		fallthrough: ["basic", "emacsy"]
	}, iA.default = v ? iA.macDefault : iA.pcDefault;
	var iR = {
		selectAll: r9,
		singleSelection: function(e) {
			return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), I)
		},
		killLine: function(e) {
			return iP(e, function(t) {
				if (t.empty()) {
					var n = eB(e.doc, t.head.line).text.length;
					return t.head.ch == n && t.head.line < e.lastLine() ? {
						from: t.head,
						to: eV(t.head.line + 1, 0)
					} : {
						from: t.head,
						to: eV(t.head.line, n)
					}
				}
				return {
					from: t.from(),
					to: t.to()
				}
			})
		},
		deleteLine: function(e) {
			return iP(e, function(t) {
				return {
					from: eV(t.from().line, 0),
					to: eq(e.doc, eV(t.to().line + 1, 0))
				}
			})
		},
		delLineLeft: function(e) {
			return iP(e, function(e) {
				return {
					from: eV(e.from().line, 0),
					to: e.from()
				}
			})
		},
		delWrappedLineLeft: function(e) {
			return iP(e, function(t) {
				var n = e.charCoords(t.head, "div").top + 5;
				return {
					from: e.coordsChar({
						left: 0,
						top: n
					}, "div"),
					to: t.from()
				}
			})
		},
		delWrappedLineRight: function(e) {
			return iP(e, function(t) {
				var n = e.charCoords(t.head, "div").top + 5,
					n = e.coordsChar({
						left: e.display.lineDiv.offsetWidth + 100,
						top: n
					}, "div");
				return {
					from: t.from(),
					to: n
				}
			})
		},
		undo: function(e) {
			return e.undo()
		},
		redo: function(e) {
			return e.redo()
		},
		undoSelection: function(e) {
			return e.undoSelection()
		},
		redoSelection: function(e) {
			return e.redoSelection()
		},
		goDocStart: function(e) {
			return e.extendSelection(eV(e.firstLine(), 0))
		},
		goDocEnd: function(e) {
			return e.extendSelection(eV(e.lastLine()))
		},
		goLineStart: function(e) {
			return e.extendSelectionsBy(function(t) {
				return i3(e, t.head.line)
			}, {
				origin: "+move",
				bias: 1
			})
		},
		goLineStartSmart: function(e) {
			return e.extendSelectionsBy(function(t) {
				return iB(e, t.head)
			}, {
				origin: "+move",
				bias: 1
			})
		},
		goLineEnd: function(e) {
			return e.extendSelectionsBy(function(t) {
				var n, r, i, o;
				return n = e, r = t.head.line, (o = function(e) {
					for (var t; t = tw(e);) e = t.find(1, !0).line;
					return e
				}(i = eB(n.doc, r))) != i && (r = e2(o)), iI(!0, n, i, r, -1)
			}, {
				origin: "+move",
				bias: -1
			})
		},
		goLineRight: function(e) {
			return e.extendSelectionsBy(function(t) {
				return t = e.cursorCoords(t.head, "div").top + 5, e.coordsChar({
					left: e.display.lineDiv.offsetWidth + 100,
					top: t
				}, "div")
			}, B)
		},
		goLineLeft: function(e) {
			return e.extendSelectionsBy(function(t) {
				return t = e.cursorCoords(t.head, "div").top + 5, e.coordsChar({
					left: 0,
					top: t
				}, "div")
			}, B)
		},
		goLineLeftSmart: function(e) {
			return e.extendSelectionsBy(function(t) {
				var n = e.cursorCoords(t.head, "div").top + 5,
					n = e.coordsChar({
						left: 0,
						top: n
					}, "div");
				return n.ch < e.getLine(n.line).search(/\S/) ? iB(e, t.head) : n
			}, B)
		},
		goLineUp: function(e) {
			return e.moveV(-1, "line")
		},
		goLineDown: function(e) {
			return e.moveV(1, "line")
		},
		goPageUp: function(e) {
			return e.moveV(-1, "page")
		},
		goPageDown: function(e) {
			return e.moveV(1, "page")
		},
		goCharLeft: function(e) {
			return e.moveH(-1, "char")
		},
		goCharRight: function(e) {
			return e.moveH(1, "char")
		},
		goColumnLeft: function(e) {
			return e.moveH(-1, "column")
		},
		goColumnRight: function(e) {
			return e.moveH(1, "column")
		},
		goWordLeft: function(e) {
			return e.moveH(-1, "word")
		},
		goGroupRight: function(e) {
			return e.moveH(1, "group")
		},
		goGroupLeft: function(e) {
			return e.moveH(-1, "group")
		},
		goWordRight: function(e) {
			return e.moveH(1, "word")
		},
		delCharBefore: function(e) {
			return e.deleteH(-1, "codepoint")
		},
		delCharAfter: function(e) {
			return e.deleteH(1, "char")
		},
		delWordBefore: function(e) {
			return e.deleteH(-1, "word")
		},
		delWordAfter: function(e) {
			return e.deleteH(1, "word")
		},
		delGroupBefore: function(e) {
			return e.deleteH(-1, "group")
		},
		delGroupAfter: function(e) {
			return e.deleteH(1, "group")
		},
		indentAuto: function(e) {
			return e.indentSelection("smart")
		},
		indentMore: function(e) {
			return e.indentSelection("add")
		},
		indentLess: function(e) {
			return e.indentSelection("subtract")
		},
		insertTab: function(e) {
			return e.replaceSelection("	")
		},
		insertSoftTab: function(e) {
			for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
				var o = n[i].from(),
					o = F(e.getLine(o.line), o.ch, r);
				t.push(V(r - o % r))
			}
			e.replaceSelections(t)
		},
		defaultTab: function(e) {
			e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
		},
		transposeChars: function(e) {
			return re(e, function() {
				for (var t, n, r, i = e.listSelections(), o = [], l = 0; l < i.length; l++) i[l].empty() && (t = i[l].head, (n = eB(e.doc, t.line).text) && (0 < (t = t.ch == n.length ? new eV(t.line, t.ch - 1) : t).ch ? (t = new eV(t.line, t.ch + 1), e.replaceRange(n.charAt(t.ch - 1) + n.charAt(t.ch - 2), eV(t.line, t.ch - 2), t, "+transpose")) : t.line > e.doc.first && (r = eB(e.doc, t.line - 1).text) && (t = new eV(t.line, 1), e.replaceRange(n.charAt(0) + e.doc.lineSeparator() + r.charAt(r.length - 1), eV(t.line - 1, r.length - 1), t, "+transpose"))), o.push(new rw(t, t)));
				e.setSelections(o)
			})
		},
		newlineAndIndent: function(e) {
			return re(e, function() {
				for (var t = (n = e.listSelections()).length - 1; 0 <= t; t--) e.replaceRange(e.doc.lineSeparator(), n[t].anchor, n[t].head, "+input");
				for (var n = e.listSelections(), r = 0; r < n.length; r++) e.indentLine(n[r].from().line, null, !0);
				n2(e)
			})
		},
		openLine: function(e) {
			return e.replaceSelection("\n", "start")
		},
		toggleOverwrite: function(e) {
			return e.toggleOverwrite()
		}
	};

	function i3(e, t) {
		var n = eB(e.doc, t),
			r = tS(n);
		return iI(!0, e, r, t = r != n ? e2(r) : t, 1)
	}

	function iB(e, t) {
		var n = i3(e, t.line),
			r = eB(e.doc, n.line),
			e = ef(r, e.doc.direction);
		return e && 0 != e[0].level ? n : (r = Math.max(n.ch, r.text.search(/\S/)), t = t.line == n.line && t.ch <= r && t.ch, eV(n.line, t ? 0 : r, n.sticky))
	}

	function i7(e, t, n) {
		if ("string" == typeof t && !(t = iR[t])) return !1;
		e.display.input.ensurePolled();
		var r = e.display.shift,
			i = !1;
		try {
			e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != z
		} finally {
			e.display.shift = r, e.state.suppressEdits = !1
		}
		return i
	}
	var i4 = new P;

	function i6(e, t, n, r) {
		var i = e.state.keySeq;
		if (i) {
			if (iD(t)) return "handled";
			if (/\'$/.test(t) ? e.state.keySeq = null : i4.set(50, function() {
					e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
				}), i2(e, i + " " + t, n, r)) return !0
		}
		return i2(e, t, n, r)
	}

	function i2(e, t, n, r) {
		return "multi" == (r = function(e, t, n) {
			for (var r = 0; r < e.state.keyMaps.length; r++) {
				var i = i0(t, e.state.keyMaps[r], n, e);
				if (i) return i
			}
			return e.options.extraKeys && i0(t, e.options.extraKeys, n, e) || i0(t, e.options.keyMap, n, e)
		}(e, t, r)) && (e.state.keySeq = t), "handled" == r && tR(e, "keyHandled", e, t, n), "handled" != r && "multi" != r || (ew(n), nP(e)), !!r
	}

	function i5(e, t) {
		var n = iF(t, !0);
		return !!n && (t.shiftKey && !e.state.keySeq ? i6(e, "Shift-" + n, t, function(t) {
			return i7(e, t, !0)
		}) || i6(e, n, t, function(t) {
			if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return i7(e, t)
		}) : i6(e, n, t, function(t) {
			return i7(e, t)
		}))
	}
	var iG = null;

	function iU(e) {
		var t, r, i, o = this;

		function a(e) {
			18 != e.keyCode && e.altKey || (w(i, "CodeMirror-crosshair"), ev(document, "keyup", a), ev(document, "mouseover", a))
		}
		e.target && e.target != o.display.input.getField() || (o.curOp.focus = N(), ey(o, e) || (l && s < 11 && 27 == e.keyCode && (e.returnValue = !1), t = e.keyCode, o.display.shift = 16 == t || e.shiftKey, r = i5(o, e), c && (iG = r ? t : null, !r && 88 == t && !e0 && (v ? e.metaKey : e.ctrlKey) && o.replaceSelection("", null, "cut")), n && !v && !r && 46 == t && e.shiftKey && !e.ctrlKey && document.execCommand && document.execCommand("cut"), 18 != t || /\bCodeMirror-crosshair\b/.test(o.display.lineDiv.className) || (O(i = o.display.lineDiv, "CodeMirror-crosshair"), eg(document, "keyup", a), eg(document, "mouseover", a))))
	}

	function iV(e) {
		16 == e.keyCode && (this.doc.sel.shift = !1), ey(this, e)
	}

	function iK(e) {
		if (!(e.target && e.target != this.display.input.getField() || tV(this.display, e) || ey(this, e) || e.ctrlKey && !e.altKey || v && e.metaKey)) {
			var t, n = e.keyCode,
				r = e.charCode;
			if (c && n == iG) return iG = null, void ew(e);
			c && (!e.which || e.which < 10) && i5(this, e) || "\b" != (r = String.fromCharCode(null == r ? n : r)) && (i6(t = this, "'" + r + "'", e, function(e) {
				return i7(t, e, !0)
			}) || this.display.input.onKeyPress(e))
		}
	}

	function iX(e, t, n) {
		this.time = e, this.pos = t, this.button = n
	}

	function ij(e) {
		var t, n, r, i, o, u, c, d, f, p, g, m, y, _, x, w, C, S, L, k, T, O, M, A = this.display;
		ey(this, e) || A.activeTouch && A.input.supportsTouch() || (A.input.ensurePolled(), A.shift = e.shiftKey, tV(A, e) ? a || (A.scroller.draggable = !1, setTimeout(function() {
			return A.scroller.draggable = !0
		}, 100)) : i9(this, e) || (t = nT(this, e), n = eT(e), i = t ? (r = t, i = n, o = +new Date, o$ && o$.compare(o, r, i) ? (ov = o$ = null, "triple") : ov && ov.compare(o, r, i) ? (o$ = new iX(o, r, i), ov = null, "double") : (ov = new iX(o, r, i), o$ = null, "single")) : "single", window.focus(), 1 == n && this.state.selectingText && this.state.selectingText(e), t && (u = this, c = n, d = t, f = i, p = e, g = "Click", "double" == f ? g = "Double" + g : "triple" == f && (g = "Triple" + g), i6(u, iH(g = (1 == c ? "Left" : 2 == c ? "Middle" : "Right") + g, p), p, function(e) {
			if (!(e = "string" == typeof e ? iR[e] : e)) return !1;
			var t = !1;
			try {
				u.isReadOnly() && (u.state.suppressEdits = !0), t = e(u, d) != z
			} finally {
				u.state.suppressEdits = !1
			}
			return t
		})) || (1 == n ? t ? (m = this, y = t, _ = i, x = e, l ? setTimeout(D(nE, m), 0) : m.curOp.focus = N(), O = (w = m, C = _, S = x, null == (k = (L = w.getOption("configureMouse")) ? L(w, C, S) : {}).unit && (L = $ ? S.shiftKey && S.metaKey : S.altKey, k.unit = L ? "rectangle" : "single" == C ? "char" : "double" == C ? "word" : "line"), (null == k.extend || w.doc.extend) && (k.extend = w.doc.extend || S.shiftKey), null == k.addNew && (k.addNew = v ? S.metaKey : S.ctrlKey), null == k.moveOnDrag && (k.moveOnDrag = !(v ? S.altKey : S.ctrlKey)), k), M = m.doc.sel, (m.options.dragDrop && eM && !m.isReadOnly() && "single" == _ && -1 < (T = M.contains(y)) && (0 > eK((T = M.ranges[T]).from(), y) || 0 < y.xRel) && (0 < eK(T.to(), y) || y.xRel < 0) ? function(e, t, n, r) {
			var i = e.display,
				o = !1,
				u = rt(e, function(t) {
					a && (i.scroller.draggable = !1), e.state.draggingText = !1, e.state.delayingBlurEvent && (e.hasFocus() ? e.state.delayingBlurEvent = !1 : nz(e)), ev(i.wrapper.ownerDocument, "mouseup", u), ev(i.wrapper.ownerDocument, "mousemove", c), ev(i.scroller, "dragstart", d), ev(i.scroller, "drop", u), o || (ew(t), r.addNew || r7(e.doc, n, null, null, r.extend), a && !h || l && 9 == s ? setTimeout(function() {
						i.wrapper.ownerDocument.body.focus({
							preventScroll: !0
						}), i.input.focus()
					}, 20) : i.input.focus())
				}),
				c = function(e) {
					o = o || 10 <= Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY)
				},
				d = function() {
					return o = !0
				};
			a && (i.scroller.draggable = !0), (e.state.draggingText = u).copy = !r.moveOnDrag, eg(i.wrapper.ownerDocument, "mouseup", u), eg(i.wrapper.ownerDocument, "mousemove", c), eg(i.scroller, "dragstart", d), eg(i.scroller, "drop", u), e.state.delayingBlurEvent = !0, setTimeout(function() {
				return i.input.focus()
			}, 20), i.scroller.dragDrop && i.scroller.dragDrop()
		} : function(e, t, n, r) {
			l && nz(e);
			var i = e.display,
				o = e.doc;
			ew(t);
			var s, a, u = o.sel,
				c = u.ranges;
			r.addNew && !r.extend ? s = -1 < (a = o.sel.contains(n)) ? c[a] : new rw(n, n) : (s = o.sel.primary(), a = o.sel.primIndex), "rectangle" == r.unit ? (r.addNew || (s = new rw(n, n)), n = nT(e, t, !0, !0), a = -1) : (t = iY(e, n, r.unit), s = r.extend ? rB(s, t.anchor, t.head, r.extend) : t), r.addNew ? -1 == a ? (a = c.length, rG(o, rC(e, c.concat([s]), a), {
				scroll: !1,
				origin: "*mouse"
			})) : 1 < c.length && c[a].empty() && "char" == r.unit && !r.extend ? (rG(o, rC(e, c.slice(0, a).concat(c.slice(a + 1)), 0), {
				scroll: !1,
				origin: "*mouse"
			}), u = o.sel) : r6(o, a, s, R) : (rG(o, new rx([s], a = 0), R), u = o.sel);
			var h = n,
				d = i.wrapper.getBoundingClientRect(),
				f = 0;

			function p(t) {
				e.state.selectingText = !1, f = 1 / 0, t && (ew(t), i.input.focus()), ev(i.wrapper.ownerDocument, "mousemove", g), ev(i.wrapper.ownerDocument, "mouseup", m), o.history.lastSelOrigin = null
			}
			var g = rt(e, function(t) {
					(0 !== t.buttons && eT(t) ? function t(l) {
						var c, p, g = ++f,
							m = nT(e, l, !0, "rectangle" == r.unit);
						m && (0 != eK(m, h) ? (e.curOp.focus = N(), function t(i) {
							if (0 != eK(h, i)) {
								if (h = i, "rectangle" == r.unit) {
									for (var l = [], c = e.options.tabSize, d = F(eB(o, n.line).text, n.ch, c), f = F(eB(o, i.line).text, i.ch, c), p = Math.min(d, f), g = Math.max(d, f), m = Math.min(n.line, i.line), v = Math.min(e.lastLine(), Math.max(n.line, i.line)); m <= v; m++) {
										var $ = eB(o, m).text,
											y = G($, p, c);
										p == g ? l.push(new rw(eV(m, y), eV(m, y))) : $.length > y && l.push(new rw(eV(m, y), eV(m, G($, g, c))))
									}
									l.length || l.push(new rw(n, n)), rG(o, rC(e, u.ranges.slice(0, a).concat(l), a), {
										origin: "*mouse",
										scroll: !1
									}), e.scrollIntoView(i)
								} else {
									var _, d = s,
										f = iY(e, i, r.unit),
										i = d.anchor,
										i = 0 < eK(f.anchor, i) ? (_ = f.head, e8(d.from(), f.anchor)) : (_ = f.anchor, eY(d.to(), f.head)),
										f = u.ranges.slice(0);
									f[a] = function(e, t) {
										var n = t.anchor,
											r = t.head,
											i = eB(e.doc, n.line);
										if (0 == eK(n, r) && n.sticky == r.sticky) return t;
										var o = ef(i);
										if (!o) return t;
										var l = eo(o, n.ch, n.sticky),
											s = o[l];
										if (s.from != n.ch && s.to != n.ch || 0 == (i = l + (s.from == n.ch == (1 != s.level) ? 0 : 1)) || i == o.length) return t;
										a = r.line != n.line ? 0 < (r.line - n.line) * ("ltr" == e.doc.direction ? 1 : -1) : (a = (e = eo(o, r.ch, r.sticky)) - l || (r.ch - n.ch) * (1 == s.level ? -1 : 1), e == i - 1 || e == i ? a < 0 : 0 < a);
										var i = o[i + (a ? -1 : 0)],
											a = a == (1 == i.level),
											i = a ? i.from : i.to,
											a = a ? "after" : "before";
										return n.ch == i && n.sticky == a ? t : new rw(new eV(n.line, i, a), r)
									}(e, new rw(eq(o, i), _)), rG(o, rC(e, f, a), R)
								}
							}
						}(m), c = n7(i, o), (m.line >= c.to || m.line < c.from) && setTimeout(rt(e, function() {
							f == g && t(l)
						}), 150)) : (p = l.clientY < d.top ? -20 : l.clientY > d.bottom ? 20 : 0) && setTimeout(rt(e, function() {
							f == g && (i.scroller.scrollTop += p, t(l))
						}), 50))
					} : p)(t)
				}),
				m = rt(e, p);
			e.state.selectingText = m, eg(i.wrapper.ownerDocument, "mousemove", g), eg(i.wrapper.ownerDocument, "mouseup", m)
		})(m, x, y, O)) : ek(e) == A.scroller && ew(e) : 2 == n ? (t && r7(this.doc, t), setTimeout(function() {
			return A.input.focus()
		}, 20)) : 3 == n && (b ? this.display.input.onContextMenu(e) : nz(this)))))
	}

	function iY(e, t, n) {
		return "char" == n ? new rw(t, t) : "word" == n ? e.findWordAt(t) : "line" == n ? new rw(eV(t.line, 0), eq(e.doc, eV(t.line + 1, 0))) : (t = n(e, t), new rw(t.from, t.to))
	}

	function i8(e, t, n, r) {
		if (t.touches) o = t.touches[0].clientX, l = t.touches[0].clientY;
		else try {
			o = t.clientX, l = t.clientY
		} catch (i) {
			return !1
		}
		if (o >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
		r && ew(t);
		var o, l, s = e.display,
			r = s.lineDiv.getBoundingClientRect();
		if (l > r.bottom || !eb(e, n)) return eS(t);
		l -= r.top - s.viewOffset;
		for (var a = 0; a < e.display.gutterSpecs.length; ++a) {
			var u = s.gutters.childNodes[a];
			if (u && u.getBoundingClientRect().right >= o) return e$(e, n, e, e5(e.doc, l), e.display.gutterSpecs[a].className, t), eS(t)
		}
	}

	function i9(e, t) {
		return i8(e, t, "gutterClick", !0)
	}

	function iq(e, t) {
		var n, r;
		tV(e.display, t) || (r = t, eb(n = e, "gutterContextMenu") && i8(n, r, "gutterContextMenu", !1)) || ey(e, t, "contextmenu") || b || e.display.input.onContextMenu(t)
	}

	function iZ(e) {
		e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), nl(e)
	}
	iX.prototype.compare = function(e, t, n) {
		return this.time + 400 > e && 0 == eK(t, this.pos) && n == this.button
	};
	var iQ = {
			toString: function() {
				return "CodeMirror.Init"
			}
		},
		iJ = {},
		oe = {};

	function ot(e, t) {
		var n = this;
		if (!(this instanceof ot)) return new ot(e, t);
		this.options = t = t ? H(t) : {}, H(iJ, t, !1);
		var r = t.value;
		"string" == typeof r ? r = new iy(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
		var i, o = new ot.inputStyles[t.inputStyle](this),
			o = this.display = new rv(e, r, o, t);
		for (i in iZ(o.wrapper.CodeMirror = this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), nq(this), this.state = {
				keyMaps: [],
				overlays: [],
				modeGen: 0,
				overwrite: !1,
				delayingBlurEvent: !1,
				focused: !1,
				suppressEdits: !1,
				pasteIncoming: -1,
				cutIncoming: -1,
				selectingText: !1,
				draggingText: !1,
				highlight: new P,
				keySeq: null,
				specialChars: null
			}, t.autofocus && !m && o.input.focus(), l && s < 11 && setTimeout(function() {
				return n.display.input.reset(!0)
			}, 20), function(e) {
				var t = e.display;
				eg(t.scroller, "mousedown", rt(e, ij)), eg(t.scroller, "dblclick", l && s < 11 ? rt(e, function(t) {
					var n;
					ey(e, t) || !(n = nT(e, t)) || i9(e, t) || tV(e.display, t) || (ew(t), n = e.findWordAt(n), r7(e.doc, n.anchor, n.head))
				}) : function(t) {
					return ey(e, t) || ew(t)
				}), eg(t.scroller, "contextmenu", function(t) {
					return iq(e, t)
				}), eg(t.input.getField(), "contextmenu", function(n) {
					t.scroller.contains(n.target) || iq(e, n)
				});
				var n, r = {
					end: 0
				};

				function i() {
					t.activeTouch && (n = setTimeout(function() {
						return t.activeTouch = null
					}, 1e3), (r = t.activeTouch).end = +new Date)
				}

				function o(e, t) {
					if (null == t.left) return 1;
					var n = t.left - e.left,
						e = t.top - e.top;
					return 400 < n * n + e * e
				}
				eg(t.scroller, "touchstart", function(i) {
					var o;
					ey(e, i) || function(e) {
						if (1 == e.touches.length) return (e = e.touches[0]).radiusX <= 1 && e.radiusY <= 1
					}(i) || i9(e, i) || (t.input.ensurePolled(), clearTimeout(n), o = +new Date, t.activeTouch = {
						start: o,
						moved: !1,
						prev: o - r.end <= 300 ? r : null
					}, 1 == i.touches.length && (t.activeTouch.left = i.touches[0].pageX, t.activeTouch.top = i.touches[0].pageY))
				}), eg(t.scroller, "touchmove", function() {
					t.activeTouch && (t.activeTouch.moved = !0)
				}), eg(t.scroller, "touchend", function(n) {
					var r, l = t.activeTouch;
					l && !tV(t, n) && null != l.left && !l.moved && new Date - l.start < 300 && (r = e.coordsChar(t.activeTouch, "page"), r = !l.prev || o(l, l.prev) ? new rw(r, r) : !l.prev.prev || o(l, l.prev.prev) ? e.findWordAt(r) : new rw(eV(r.line, 0), eq(e.doc, eV(r.line + 1, 0))), e.setSelection(r.anchor, r.head), e.focus(), ew(n)), i()
				}), eg(t.scroller, "touchcancel", i), eg(t.scroller, "scroll", function() {
					t.scroller.clientHeight && (nV(e, t.scroller.scrollTop), nX(e, t.scroller.scrollLeft, !0), e$(e, "scroll", e))
				}), eg(t.scroller, "mousewheel", function(t) {
					return rb(e, t)
				}), eg(t.scroller, "DOMMouseScroll", function(t) {
					return rb(e, t)
				}), eg(t.wrapper, "scroll", function() {
					return t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
				}), t.dragFunctions = {
					enter: function(t) {
						ey(e, t) || eL(t)
					},
					over: function(t) {
						var n, r;
						ey(e, t) || ((r = nT(n = e, r = t)) && (nF(n, r, r = document.createDocumentFragment()), n.display.dragCursor || (n.display.dragCursor = L("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), n.display.lineSpace.insertBefore(n.display.dragCursor, n.display.cursorDiv)), S(n.display.dragCursor, r)), eL(t))
					},
					start: function(t) {
						var n, r;
						n = e, r = t, l && (!n.state.draggingText || +new Date - ib < 100) ? eL(r) : ey(n, r) || tV(n.display, r) || (r.dataTransfer.setData("Text", n.getSelection()), r.dataTransfer.effectAllowed = "copyMove", r.dataTransfer.setDragImage && !h && ((t = L("img", null, null, "position: fixed; left: 0; top: 0;")).src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", c && (t.width = t.height = 1, n.display.wrapper.appendChild(t), t._top = t.offsetTop), r.dataTransfer.setDragImage(t, 0, 0), c && t.parentNode.removeChild(t)))
					},
					drop: rt(e, ix),
					leave: function(t) {
						ey(e, t) || iw(e)
					}
				};
				var a = t.input.getField();
				eg(a, "keyup", function(t) {
					return iV.call(e, t)
				}), eg(a, "keydown", rt(e, iU)), eg(a, "keypress", rt(e, iK)), eg(a, "focus", function(t) {
					return nI(e, t)
				}), eg(a, "blur", function(t) {
					return nR(e, t)
				})
			}(this), iL(), nQ(this), this.curOp.forceUpdate = !0, rD(this, r), t.autofocus && !m || this.hasFocus() ? setTimeout(function() {
				n.hasFocus() && !n.state.focused && nI(n)
			}, 20) : nR(this), oe) oe.hasOwnProperty(i) && oe[i](this, t[i], iQ);
		rf(this), t.finishInit && t.finishInit(this);
		for (var u = 0; u < on.length; ++u) on[u](this);
		nJ(this), a && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto")
	}
	ot.defaults = iJ, ot.optionHandlers = oe;
	var on = [];

	function or(e, t, n, r) {
		var i, o = e.doc;
		"smart" == (n = null == n ? "add" : n) && (o.mode.indent ? i = tn(e, t).state : n = "prev");
		var l = e.options.tabSize,
			s = eB(o, t),
			a = F(s.text, null, l);
		s.stateAfter && (s.stateAfter = null);
		var u = s.text.match(/^\s*/)[0];
		if (r || /\S/.test(s.text)) {
			if ("smart" == n && ((c = o.mode.indent(i, s.text.slice(u.length), s.text)) == z || 150 < c)) {
				if (!r) return;
				n = "prev"
			}
		} else c = 0, n = "not";
		"prev" == n ? c = t > o.first ? F(eB(o, t - 1).text, null, l) : 0 : "add" == n ? c = a + e.options.indentUnit : "subtract" == n ? c = a - e.options.indentUnit : "number" == typeof n && (c = a + n);
		var c = Math.max(0, c),
			h = "",
			d = 0;
		if (e.options.indentWithTabs)
			for (var f = Math.floor(c / l); f; --f) d += l, h += "	";
		if (d < c && (h += V(c - d)), h != u) return ir(o, h, eV(t, 0), eV(t, u.length), "+input"), s.stateAfter = null, !0;
		for (var p = 0; p < o.sel.ranges.length; p++) {
			var g = o.sel.ranges[p];
			if (g.head.line == t && g.head.ch < u.length) {
				g = eV(t, u.length), r6(o, p, new rw(g, g));
				break
			}
		}
	}
	ot.defineInitHook = function(e) {
		return on.push(e)
	};
	var oi = null;

	function oo(e) {
		oi = e
	}

	function ol(e, t, n, r, i) {
		var o = e.doc;
		e.display.shift = !1, r = r || o.sel;
		var l = +new Date - 200,
			s = "paste" == i || e.state.pasteIncoming > l,
			a = eA(t),
			u = null;
		if (s && 1 < r.ranges.length) {
			if (oi && oi.text.join("\n") == t) {
				if (r.ranges.length % oi.text.length == 0)
					for (var u = [], c = 0; c < oi.text.length; c++) u.push(o.splitLines(oi.text[c]))
			} else a.length == r.ranges.length && e.options.pasteLinesPerSelection && (u = X(a, function(e) {
				return [e]
			}))
		}
		for (var h = e.curOp.updateInput, d = r.ranges.length - 1; 0 <= d; d--) {
			var f = r.ranges[d],
				p = f.from(),
				g = f.to();
			f.empty() && (n && 0 < n ? p = eV(p.line, p.ch - n) : e.state.overwrite && !s ? g = eV(g.line, Math.min(eB(o, g.line).text.length, g.ch + K(a).length)) : s && oi && oi.lineWise && oi.text.join("\n") == a.join("\n") && (p = g = eV(p.line, 0))), g = {
				from: p,
				to: g,
				text: u ? u[d % u.length] : a,
				origin: i || (s ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
			}, rZ(e.doc, g), tR(e, "inputRead", e, g)
		}
		t && !s && oa(e, t), n2(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = h), e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1
	}

	function os(e, t) {
		var n = e.clipboardData && e.clipboardData.getData("Text");
		return n && (e.preventDefault(), t.isReadOnly() || t.options.disableInput || re(t, function() {
			return ol(t, n, 0, null, "paste")
		}), 1)
	}

	function oa(e, t) {
		if (e.options.electricChars && e.options.smartIndent)
			for (var n = e.doc.sel, r = n.ranges.length - 1; 0 <= r; r--) {
				var i = n.ranges[r];
				if (!(100 < i.head.ch || r && n.ranges[r - 1].head.line == i.head.line)) {
					var o = e.getModeAt(i.head),
						l = !1;
					if (o.electricChars) {
						for (var s = 0; s < o.electricChars.length; s++)
							if (-1 < t.indexOf(o.electricChars.charAt(s))) {
								l = or(e, i.head.line, "smart");
								break
							}
					} else o.electricInput && o.electricInput.test(eB(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = or(e, i.head.line, "smart"));
					l && tR(e, "electricInput", e, i.head.line)
				}
			}
	}

	function ou(e) {
		for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
			var i = e.doc.sel.ranges[r].head.line,
				i = {
					anchor: eV(i, 0),
					head: eV(i + 1, 0)
				};
			n.push(i), t.push(e.getRange(i.anchor, i.head))
		}
		return {
			text: t,
			ranges: n
		}
	}

	function oc(e, t, n, r) {
		e.setAttribute("autocorrect", n ? "" : "off"), e.setAttribute("autocapitalize", r ? "" : "off"), e.setAttribute("spellcheck", !!t)
	}

	function oh() {
		var e = L("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
			t = L("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
		return a ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), p && (e.style.border = "1px solid black"), oc(e), t
	}

	function od(e, t, n, r, i) {
		var o = t,
			l = n,
			s = eB(e, t.line),
			a = i && "rtl" == e.direction ? -n : n;

		function u(o) {
			var l, u, c;
			if (null == (u = "codepoint" == r ? isNaN(l = s.text.charCodeAt(t.ch + (0 < n ? 0 : -1))) ? null : (u = 0 < n ? 55296 <= l && l < 56320 : 56320 <= l && l < 57343, new eV(t.line, Math.max(0, Math.min(s.text.length, t.ch + n * (u ? 2 : 1))), -n)) : i ? function e(t, n, r, i) {
					var o = ef(n, t.doc.direction);
					if (!o) return iz(n, r, i);
					r.ch >= n.text.length ? (r.ch = n.text.length, r.sticky = "before") : r.ch <= 0 && (r.ch = 0, r.sticky = "after");
					var l = eo(o, r.ch, r.sticky),
						s = o[l];
					if ("ltr" == t.doc.direction && s.level % 2 == 0 && (0 < i ? s.to > r.ch : s.from < r.ch)) return iz(n, r, i);

					function a(e, t) {
						return iE(n, e instanceof eV ? e.ch : e, t)
					}

					function u(e) {
						return t.options.lineWrapping ? (c = c || tJ(t, n), n$(t, n, c, e)) : {
							begin: 0,
							end: n.text.length
						}
					}
					var c, h = u("before" == r.sticky ? a(r, -1) : r.ch);
					if ("rtl" == t.doc.direction || 1 == s.level) {
						var d = 1 == s.level == i < 0,
							f = a(r, d ? 1 : -1);
						if (null != f && (d ? f <= s.to && f <= h.end : f >= s.from && f >= h.begin)) return new eV(r.line, f, d ? "before" : "after")
					}
					return (l = (d = function(e, t, n) {
						for (var i = function(e, t) {
								return t ? new eV(r.line, a(e, 1), "before") : new eV(r.line, e, "after")
							}; 0 <= e && e < o.length; e += t) {
							var l = o[e],
								s = 0 < t == (1 != l.level),
								u = s ? n.begin : a(n.end, -1);
							if (l.from <= u && u < l.to || (u = s ? l.from : a(l.to, -1), n.begin <= u && u < n.end)) return i(u, s)
						}
					})(l + i, i, h)) ? l : null != (h = 0 < i ? h.end : a(h.begin, -1)) && (!(0 < i) || h != n.text.length) && (l = d(0 < i ? 0 : o.length - 1, i, u(h))) ? l : null
				}(e.cm, s, t, n) : iz(s, t, n))) {
				if (o || (c = t.line + a) < e.first || c >= e.first + e.size || (t = new eV(c, t.ch, t.sticky), !(s = eB(e, c)))) return;
				t = iI(i, e.cm, s, t.line, a)
			} else t = u;
			return 1
		}
		if ("char" == r || "codepoint" == r) u();
		else if ("column" == r) u(!0);
		else if ("word" == r || "group" == r)
			for (var c = null, h = "group" == r, d = e.cm && e.cm.getHelper(t, "wordChars"), f = !0; !(n < 0) || u(!f); f = !1) {
				var p = s.text.charAt(t.ch) || "\n",
					p = Q(p, d) ? "w" : h && "\n" == p ? "n" : !h || /\s/.test(p) ? null : "p";
				if (!h || f || p || (p = "s"), c && c != p) {
					n < 0 && (n = 1, u(), t.sticky = "after");
					break
				}
				if (p && (c = p), 0 < n && !u(!f)) break
			}
		return l = rY(e, t, o, l, !0), eX(o, l) && (l.hitSide = !0), l
	}

	function of(e, t, n, r) {
		var i, o, l, s = e.doc,
			a = t.left;
		for ("page" == r ? (i = Math.max((i = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight)) - .5 * nx(e.display), 3), o = (0 < n ? t.bottom : t.top) + n * i) : "line" == r && (o = 0 < n ? t.bottom + 3 : t.top - 3);
			(l = nm(e, a, o)).outside;) {
			if (n < 0 ? o <= 0 : o >= s.height) {
				l.hitSide = !0;
				break
			}
			o += 5 * n
		}
		return l
	}

	function op(e, t) {
		var n = tQ(e, t.line);
		if (!n || n.hidden) return null;
		var r = eB(e.doc, t.line),
			n = tq(n, r, t.line),
			r = ef(r, e.doc.direction),
			e = "left";
		return r && (e = eo(r, t.ch) % 2 ? "right" : "left"), (e = nr(n.map, t.ch, e)).offset = "right" == e.collapse ? e.end : e.start, e
	}

	function og(e, t) {
		return t && (e.bad = !0), e
	}

	function om(e, t, n) {
		var r;
		if (t == e.display.lineDiv) {
			if (!(r = e.display.lineDiv.childNodes[n])) return og(e.clipPos(eV(e.display.viewTo - 1)), !0);
			t = null, n = 0
		} else
			for (r = t;; r = r.parentNode) {
				if (!r || r == e.display.lineDiv) return null;
				if (r.parentNode && r.parentNode == e.display.lineDiv) break
			}
		for (var i = 0; i < e.display.view.length; i++) {
			var o = e.display.view[i];
			if (o.node == r) return function(e, t, n) {
				var r = e.text.firstChild,
					i = !1;
				if (!t || !T(r, t)) return og(eV(e2(e.line), 0), !0);
				if (t == r && (i = !0, t = r.childNodes[n], n = 0, !t)) {
					var o = e.rest ? K(e.rest) : e.line;
					return og(eV(e2(o), o.text.length), i)
				}
				var o = 3 == t.nodeType ? t : null,
					l = t;
				for (o || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (o = t.firstChild, n = n && o.nodeValue.length); l.parentNode != r;) l = l.parentNode;
				var s = e.measure,
					a = s.maps;

				function u(t, n, r) {
					for (var i = -1; i < (a ? a.length : 0); i++)
						for (var o = i < 0 ? s.map : a[i], l = 0; l < o.length; l += 3) {
							var u = o[l + 2];
							if (u == t || u == n) {
								var c = e2(i < 0 ? e.line : e.rest[i]),
									h = o[l] + r;
								return eV(c, h = r < 0 || u != t ? o[l + (r ? 1 : 0)] : h)
							}
						}
				}
				var c = u(o, l, n);
				if (c) return og(c, i);
				for (var h = l.nextSibling, d = o ? o.nodeValue.length - n : 0; h; h = h.nextSibling) {
					if (c = u(h, h.firstChild, 0)) return og(eV(c.line, c.ch - d), i);
					d += h.textContent.length
				}
				for (var f = l.previousSibling, p = n; f; f = f.previousSibling) {
					if (c = u(f, f.firstChild, -1)) return og(eV(c.line, c.ch + p), i);
					p += f.textContent.length
				}
			}(o, t, n)
		}
	}(e = function(e) {
		this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new P, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
	}).prototype.init = function(e) {
		var t = this,
			n = this,
			r = n.cm,
			i = n.div = e.lineDiv;

		function o(e) {
			for (var t = e.target; t; t = t.parentNode) {
				if (t == i) return 1;
				if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break
			}
		}

		function l(e) {
			if (o(e) && !ey(r, e)) {
				if (r.somethingSelected()) {
					var t;
					oi = {
						lineWise: !1,
						text: r.getSelections()
					}, "cut" == e.type && r.replaceSelection("", null, "cut")
				} else {
					if (!r.options.lineWiseCopyCut) return;
					var l, s = ou(r);
					oi = {
						lineWise: !0,
						text: s.text
					}, "cut" == e.type && r.operation(function() {
						r.setSelections(s.ranges, 0, I), r.replaceSelection("", null, "cut")
					})
				}
				if (e.clipboardData) {
					e.clipboardData.clearData();
					var a = oi.text.join("\n");
					if (e.clipboardData.setData("Text", a), e.clipboardData.getData("Text") == a) return void e.preventDefault()
				}
				var u = oh(),
					e = u.firstChild;
				r.display.lineSpace.insertBefore(u, r.display.lineSpace.firstChild), e.value = oi.text.join("\n");
				var c = N();
				W(e), setTimeout(function() {
					r.display.lineSpace.removeChild(u), c.focus(), c == i && n.showPrimarySelection()
				}, 50)
			}
		}
		i.contentEditable = !0, oc(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize), eg(i, "paste", function(e) {
			!o(e) || ey(r, e) || os(e, r) || s <= 11 && setTimeout(rt(r, function() {
				return t.updateFromDOM()
			}), 20)
		}), eg(i, "compositionstart", function(e) {
			t.composing = {
				data: e.data,
				done: !1
			}
		}), eg(i, "compositionupdate", function(e) {
			t.composing || (t.composing = {
				data: e.data,
				done: !1
			})
		}), eg(i, "compositionend", function(e) {
			t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0)
		}), eg(i, "touchstart", function() {
			return n.forceCompositionEnd()
		}), eg(i, "input", function() {
			t.composing || t.readFromDOMSoon()
		}), eg(i, "copy", l), eg(i, "cut", l)
	}, e.prototype.screenReaderLabelChanged = function(e) {
		e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label")
	}, e.prototype.prepareSelection = function() {
		var e = nH(this.cm, !1);
		return e.focus = N() == this.div, e
	}, e.prototype.showSelection = function(e, t) {
		e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
	}, e.prototype.getSelection = function() {
		return this.cm.display.wrapper.ownerDocument.getSelection()
	}, e.prototype.showPrimarySelection = function() {
		var e = this.getSelection(),
			t = this.cm,
			r = t.doc.sel.primary(),
			i = r.from(),
			o = r.to();
		if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom) e.removeAllRanges();
		else {
			var l = om(t, e.anchorNode, e.anchorOffset),
				r = om(t, e.focusNode, e.focusOffset);
			if (!l || l.bad || !r || r.bad || 0 != eK(e8(l, r), i) || 0 != eK(eY(l, r), o)) {
				if (r = t.display.view, i = i.line >= t.display.viewFrom && op(t, i) || {
						node: r[0].measure.map[2],
						offset: 0
					}, (o = o.line < t.display.viewTo && op(t, o)) || (o = {
						node: (a = (a = r[r.length - 1].measure).maps ? a.maps[a.maps.length - 1] : a.map)[a.length - 1],
						offset: a[a.length - 2] - a[a.length - 3]
					}), i && o) {
					var s, a = e.rangeCount && e.getRangeAt(0);
					try {
						s = A(i.node, i.offset, o.offset, o.node)
					} catch (u) {}
					s && (!n && t.state.focused ? (e.collapse(i.node, i.offset), s.collapsed || (e.removeAllRanges(), e.addRange(s))) : (e.removeAllRanges(), e.addRange(s)), a && null == e.anchorNode ? e.addRange(a) : n && this.startGracePeriod()), this.rememberSelection()
				} else e.removeAllRanges()
			}
		}
	}, e.prototype.startGracePeriod = function() {
		var e = this;
		clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
			e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
				return e.cm.curOp.selectionChanged = !0
			})
		}, 20)
	}, e.prototype.showMultipleSelections = function(e) {
		S(this.cm.display.cursorDiv, e.cursors), S(this.cm.display.selectionDiv, e.selection)
	}, e.prototype.rememberSelection = function() {
		var e = this.getSelection();
		this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
	}, e.prototype.selectionInEditor = function() {
		var e = this.getSelection();
		return !!e.rangeCount && (e = e.getRangeAt(0).commonAncestorContainer, T(this.div, e))
	}, e.prototype.focus = function() {
		"nocursor" != this.cm.options.readOnly && (this.selectionInEditor() && N() == this.div || this.showSelection(this.prepareSelection(), !0), this.div.focus())
	}, e.prototype.blur = function() {
		this.div.blur()
	}, e.prototype.getField = function() {
		return this.div
	}, e.prototype.supportsTouch = function() {
		return !0
	}, e.prototype.receivedFocus = function() {
		var e = this,
			t = this;
		this.selectionInEditor() ? setTimeout(function() {
			return e.pollSelection()
		}, 20) : re(this.cm, function() {
			return t.cm.curOp.selectionChanged = !0
		}), this.polling.set(this.cm.options.pollInterval, function e() {
			t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e))
		})
	}, e.prototype.selectionChanged = function() {
		var e = this.getSelection();
		return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
	}, e.prototype.pollSelection = function() {
		if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
			var e, t, n = this.getSelection(),
				r = this.cm;
			if (g && u && this.cm.display.gutterSpecs.length && function(e) {
					for (var t = e; t; t = t.parentNode)
						if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
					return !1
				}(n.anchorNode)) return this.cm.triggerOnKeyDown({
				type: "keydown",
				keyCode: 8,
				preventDefault: Math.abs
			}), this.blur(), void this.focus();
			this.composing || (this.rememberSelection(), e = om(r, n.anchorNode, n.anchorOffset), t = om(r, n.focusNode, n.focusOffset), e && t && re(r, function() {
				rG(r.doc, rS(e, t), I), (e.bad || t.bad) && (r.curOp.selectionChanged = !0)
			}))
		}
	}, e.prototype.pollContent = function() {
		null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
		var e, t = this.cm,
			n = t.display,
			r = t.doc.sel.primary(),
			i = r.from(),
			r = r.to();
		if (0 == i.ch && i.line > t.firstLine() && (i = eV(i.line - 1, eB(t.doc, i.line - 1).length)), r.ch == eB(t.doc, r.line).text.length && r.line < t.lastLine() && (r = eV(r.line + 1, 0)), i.line < n.viewFrom || r.line > n.viewTo - 1) return !1;
		var o, l = i.line == n.viewFrom || 0 == (l = nN(t, i.line)) ? (e = e2(n.view[0].line), n.view[0].node) : (e = e2(n.view[l].line), n.view[l - 1].node.nextSibling),
			r = nN(t, r.line),
			r = r == n.view.length - 1 ? (o = n.viewTo - 1, n.lineDiv.lastChild) : (o = e2(n.view[r + 1].line) - 1, n.view[r + 1].node.previousSibling);
		if (!l) return !1;
		for (var s = t.doc.splitLines(function(e, t, n, r, i) {
				var o = "",
					l = !1,
					s = e.doc.lineSeparator(),
					a = !1;

				function u() {
					l && (o += s, a && (o += s), l = a = !1)
				}

				function c(e) {
					e && (u(), o += e)
				}
				for (;

					function t(n) {
						if (1 == n.nodeType) {
							var o, h = n.getAttribute("cm-text");
							if (h) c(h);
							else if (h = n.getAttribute("cm-marker"))(h = e.findMarks(eV(r, 0), eV(i + 1, 0), (o = +h, function(e) {
								return e.id == o
							}))).length && (d = h[0].find(0)) && c(e7(e.doc, d.from, d.to).join(s));
							else if ("false" != n.getAttribute("contenteditable")) {
								var d = /^(pre|div|p|li|table|br)$/i.test(n.nodeName);
								if (/^br$/i.test(n.nodeName) || 0 != n.textContent.length) {
									d && u();
									for (var f = 0; f < n.childNodes.length; f++) t(n.childNodes[f]);
									/^(pre|p)$/i.test(n.nodeName) && (a = !0), d && (l = !0)
								}
							}
						} else 3 == n.nodeType && c(n.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "))
					}(t), t != n;) t = t.nextSibling, a = !1;
				return o
			}(t, l, r, e, o)), a = e7(t.doc, eV(e, 0), eV(o, eB(t.doc, o).text.length)); 1 < s.length && 1 < a.length;)
			if (K(s) == K(a)) s.pop(), a.pop(), o--;
			else {
				if (s[0] != a[0]) break;
				s.shift(), a.shift(), e++
			} for (var u = 0, c = 0, h = s[0], d = a[0], f = Math.min(h.length, d.length); u < f && h.charCodeAt(u) == d.charCodeAt(u);) ++u;
		for (var p = K(s), g = K(a), m = Math.min(p.length - (1 == s.length ? u : 0), g.length - (1 == a.length ? u : 0)); c < m && p.charCodeAt(p.length - c - 1) == g.charCodeAt(g.length - c - 1);) ++c;
		if (1 == s.length && 1 == a.length && e == i.line)
			for (; u && u > i.ch && p.charCodeAt(p.length - c - 1) == g.charCodeAt(g.length - c - 1);) u--, c++;
		return s[s.length - 1] = p.slice(0, p.length - c).replace(/^\u200b+/, ""), s[0] = s[0].slice(u).replace(/\u200b+$/, ""), l = eV(e, u), r = eV(o, a.length ? K(a).length - c : 0), 1 < s.length || s[0] || eK(l, r) ? (ir(t.doc, s, l, r, "+input"), !0) : void 0
	}, e.prototype.ensurePolled = function() {
		this.forceCompositionEnd()
	}, e.prototype.reset = function() {
		this.forceCompositionEnd()
	}, e.prototype.forceCompositionEnd = function() {
		this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
	}, e.prototype.readFromDOMSoon = function() {
		var e = this;
		null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function() {
			if (e.readDOMTimeout = null, e.composing) {
				if (!e.composing.done) return;
				e.composing = null
			}
			e.updateFromDOM()
		}, 80))
	}, e.prototype.updateFromDOM = function() {
		var e = this;
		!this.cm.isReadOnly() && this.pollContent() || re(this.cm, function() {
			return nO(e.cm)
		})
	}, e.prototype.setUneditable = function(e) {
		e.contentEditable = "false"
	}, e.prototype.onKeyPress = function(e) {
		0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || rt(this.cm, ol)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
	}, e.prototype.readOnlyChanged = function(e) {
		this.div.contentEditable = String("nocursor" != e)
	}, e.prototype.onContextMenu = function() {}, e.prototype.resetPosition = function() {}, e.prototype.needsContentAttribute = !0;
	var ov, o$, oy, o_, ob, ox, ow, i = function(e) {
		this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new P, this.hasSelection = !1, this.composing = null
	};

	function oC(e, t, n, r) {
		oy.defaults[e] = t, n && (o_[e] = r ? function(e, t, r) {
			r != iQ && n(e, t, r)
		} : n)
	}
	i.prototype.init = function(e) {
		var t = this,
			n = this,
			r = this.cm;
		this.createField(e);
		var i = this.textarea;

		function o(e) {
			if (!ey(r, e)) {
				if (r.somethingSelected()) {
					var t;
					oi = t = {
						lineWise: !1,
						text: r.getSelections()
					}
				} else {
					if (!r.options.lineWiseCopyCut) return;
					var o, l = ou(r);
					oi = {
						lineWise: !0,
						text: l.text
					}, "cut" == e.type ? r.setSelections(l.ranges, null, I) : (n.prevInput = "", i.value = l.text.join("\n"), W(i))
				}
				"cut" == e.type && (r.state.cutIncoming = +new Date)
			}
		}
		e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), p && (i.style.width = "0px"), eg(i, "input", function() {
			l && 9 <= s && t.hasSelection && (t.hasSelection = null), n.poll()
		}), eg(i, "paste", function(e) {
			ey(r, e) || os(e, r) || (r.state.pasteIncoming = +new Date, n.fastPoll())
		}), eg(i, "cut", o), eg(i, "copy", o), eg(e.scroller, "paste", function(t) {
			if (!tV(e, t) && !ey(r, t)) {
				if (!i.dispatchEvent) return r.state.pasteIncoming = +new Date, void n.focus();
				var o = new Event("paste");
				o.clipboardData = t.clipboardData, i.dispatchEvent(o)
			}
		}), eg(e.lineSpace, "selectstart", function(t) {
			tV(e, t) || ew(t)
		}), eg(i, "compositionstart", function() {
			var e = r.getCursor("from");
			n.composing && n.composing.range.clear(), n.composing = {
				start: e,
				range: r.markText(e, r.getCursor("to"), {
					className: "CodeMirror-composing"
				})
			}
		}), eg(i, "compositionend", function() {
			n.composing && (n.poll(), n.composing.range.clear(), n.composing = null)
		})
	}, i.prototype.createField = function(e) {
		this.wrapper = oh(), this.textarea = this.wrapper.firstChild
	}, i.prototype.screenReaderLabelChanged = function(e) {
		e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label")
	}, i.prototype.prepareSelection = function() {
		var e, t = this.cm,
			n = t.display,
			r = t.doc,
			i = nH(t);
		return t.options.moveInputWithCursor && (e = nf(t, r.sel.primary().head, "div"), t = n.wrapper.getBoundingClientRect(), r = n.lineDiv.getBoundingClientRect(), i.teTop = Math.max(0, Math.min(n.wrapper.clientHeight - 10, e.top + r.top - t.top)), i.teLeft = Math.max(0, Math.min(n.wrapper.clientWidth - 10, e.left + r.left - t.left))), i
	}, i.prototype.showSelection = function(e) {
		var t = this.cm.display;
		S(t.cursorDiv, e.cursors), S(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
	}, i.prototype.reset = function(e) {
		var t, n;
		this.contextMenuPending || this.composing || ((t = this.cm).somethingSelected() ? (this.prevInput = "", n = t.getSelection(), this.textarea.value = n, t.state.focused && W(this.textarea), l && 9 <= s && (this.hasSelection = n)) : e || (this.prevInput = this.textarea.value = "", l && 9 <= s && (this.hasSelection = null)))
	}, i.prototype.getField = function() {
		return this.textarea
	}, i.prototype.supportsTouch = function() {
		return !1
	}, i.prototype.focus = function() {
		if ("nocursor" != this.cm.options.readOnly && (!m || N() != this.textarea)) try {
			this.textarea.focus()
		} catch (e) {}
	}, i.prototype.blur = function() {
		this.textarea.blur()
	}, i.prototype.resetPosition = function() {
		this.wrapper.style.top = this.wrapper.style.left = 0
	}, i.prototype.receivedFocus = function() {
		this.slowPoll()
	}, i.prototype.slowPoll = function() {
		var e = this;
		this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
			e.poll(), e.cm.state.focused && e.slowPoll()
		})
	}, i.prototype.fastPoll = function() {
		var e = !1,
			t = this;
		t.pollingFast = !0, t.polling.set(20, function n() {
			t.poll() || e ? (t.pollingFast = !1, t.slowPoll()) : (e = !0, t.polling.set(60, n))
		})
	}, i.prototype.poll = function() {
		var e = this,
			t = this.cm,
			n = this.textarea,
			r = this.prevInput;
		if (this.contextMenuPending || !t.state.focused || eW(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
		var i = n.value;
		if (i == r && !t.somethingSelected()) return !1;
		if (l && 9 <= s && this.hasSelection === i || v && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
		if (t.doc.sel == t.display.selForContextMenu) {
			var o = i.charCodeAt(0);
			if (8203 != o || r || (r = "​"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
		}
		for (var a = 0, u = Math.min(r.length, i.length); a < u && r.charCodeAt(a) == i.charCodeAt(a);) ++a;
		return re(t, function() {
			ol(t, i.slice(a), r.length - a, null, e.composing ? "*compose" : null), 1e3 < i.length || -1 < i.indexOf("\n") ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
				className: "CodeMirror-composing"
			}))
		}), !0
	}, i.prototype.ensurePolled = function() {
		this.pollingFast && this.poll() && (this.pollingFast = !1)
	}, i.prototype.onKeyPress = function() {
		l && 9 <= s && (this.hasSelection = null), this.fastPoll()
	}, i.prototype.onContextMenu = function(e) {
		var t = this,
			n = t.cm,
			r = n.display,
			i = t.textarea;
		t.contextMenuPending && t.contextMenuPending();
		var o, u, h, d, f = nT(n, e),
			p = r.scroller.scrollTop;

		function g() {
			var e, o;
			null != i.selectionStart && (o = "​" + ((e = n.somethingSelected()) ? i.value : ""), i.value = "⇚", i.value = o, t.prevInput = e ? "" : "​", i.selectionStart = 1, i.selectionEnd = o.length, r.selForContextMenu = n.doc.sel)
		}

		function m() {
			var e, a;
			t.contextMenuPending == m && (t.contextMenuPending = !1, t.wrapper.style.cssText = u, i.style.cssText = o, l && s < 9 && r.scrollbars.setScrollTop(r.scroller.scrollTop = p), null != i.selectionStart && ((!l || s < 9) && g(), e = 0, a = function() {
				r.selForContextMenu == n.doc.sel && 0 == i.selectionStart && 0 < i.selectionEnd && "​" == t.prevInput ? rt(n, r9)(n) : e++ < 10 ? r.detectingSelectAll = setTimeout(a, 500) : (r.selForContextMenu = null, r.input.reset())
			}, r.detectingSelectAll = setTimeout(a, 200)))
		}
		f && !c && (n.options.resetSelectionOnContextMenu && -1 == n.doc.sel.contains(f) && rt(n, rG)(n.doc, rS(f), I), o = i.style.cssText, u = t.wrapper.style.cssText, f = t.wrapper.offsetParent.getBoundingClientRect(), t.wrapper.style.cssText = "position: static", i.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - f.top - 5) + "px; left: " + (e.clientX - f.left - 5) + "px;\n      z-index: 1000; background: " + (l ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", a && (h = window.scrollY), r.input.focus(), a && window.scrollTo(null, h), r.input.reset(), n.somethingSelected() || (i.value = t.prevInput = " "), t.contextMenuPending = m, r.selForContextMenu = n.doc.sel, clearTimeout(r.detectingSelectAll), l && 9 <= s && g(), b ? (eL(e), d = function() {
			ev(window, "mouseup", d), setTimeout(m, 20)
		}, eg(window, "mouseup", d)) : setTimeout(m, 50))
	}, i.prototype.readOnlyChanged = function(e) {
		e || this.reset(), this.textarea.disabled = "nocursor" == e, this.textarea.readOnly = !!e
	}, i.prototype.setUneditable = function() {}, i.prototype.needsContentAttribute = !1, o_ = (oy = ot).optionHandlers, oy.defineOption = oC, oy.Init = iQ, oC("value", "", function(e, t) {
		return e.setValue(t)
	}, !0), oC("mode", null, function(e, t) {
		e.doc.modeOption = t, rO(e)
	}, !0), oC("indentUnit", 2, rO, !0), oC("indentWithTabs", !1), oC("smartIndent", !0), oC("tabSize", 4, function(e) {
		rM(e), nl(e), nO(e)
	}, !0), oC("lineSeparator", null, function(e, t) {
		if (e.doc.lineSep = t) {
			var n = [],
				r = e.doc.first;
			e.doc.iter(function(e) {
				for (var i = 0;;) {
					var o = e.text.indexOf(t, i);
					if (-1 == o) break;
					i = o + t.length, n.push(eV(r, o))
				}
				r++
			});
			for (var i = n.length - 1; 0 <= i; i--) ir(e.doc, t, n[i], eV(n[i].line, n[i].ch + t.length))
		}
	}), oC("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function(e, t, n) {
		e.state.specialChars = RegExp(t.source + (t.test("	") ? "" : "|	"), "g"), n != iQ && e.refresh()
	}), oC("specialCharPlaceholder", function e(t) {
		var n = L("span", "•", "cm-invalidchar");
		return n.title = "\\u" + t.charCodeAt(0).toString(16), n.setAttribute("aria-label", n.title), n
	}, function(e) {
		return e.refresh()
	}, !0), oC("electricChars", !0), oC("inputStyle", m ? "contenteditable" : "textarea", function() {
		throw Error("inputStyle can not (yet) be changed in a running editor")
	}, !0), oC("spellcheck", !1, function(e, t) {
		return e.getInputField().spellcheck = t
	}, !0), oC("autocorrect", !1, function(e, t) {
		return e.getInputField().autocorrect = t
	}, !0), oC("autocapitalize", !1, function(e, t) {
		return e.getInputField().autocapitalize = t
	}, !0), oC("rtlMoveVisually", !y), oC("wholeLineUpdateBefore", !0), oC("theme", "default", function(e) {
		iZ(e), rm(e)
	}, !0), oC("keyMap", "default", function(e, t, n) {
		t = i1(t), (n = n != iQ && i1(n)) && n.detach && n.detach(e, t), t.attach && t.attach(e, n || null)
	}), oC("extraKeys", null), oC("configureMouse", null), oC("lineWrapping", !1, function e(t) {
		t.options.lineWrapping ? (O(t.display.wrapper, "CodeMirror-wrap"), t.display.sizer.style.minWidth = "", t.display.sizerWidth = null) : (w(t.display.wrapper, "CodeMirror-wrap"), tM(t)), nk(t), nO(t), nl(t), setTimeout(function() {
			return nY(t)
		}, 100)
	}, !0), oC("gutters", [], function(e, t) {
		e.display.gutterSpecs = rp(t, e.options.lineNumbers), rm(e)
	}, !0), oC("fixedGutter", !0, function(e, t) {
		e.display.gutters.style.left = t ? nS(e.display) + "px" : "0", e.refresh()
	}, !0), oC("coverGutterNextToScrollbar", !1, function(e) {
		return nY(e)
	}, !0), oC("scrollbarStyle", "native", function(e) {
		nq(e), nY(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
	}, !0), oC("lineNumbers", !1, function(e, t) {
		e.display.gutterSpecs = rp(e.options.gutters, t), rm(e)
	}, !0), oC("firstLineNumber", 1, rm, !0), oC("lineNumberFormatter", function(e) {
		return e
	}, rm, !0), oC("showCursorWhenSelecting", !1, nD, !0), oC("resetSelectionOnContextMenu", !0), oC("lineWiseCopyCut", !0), oC("pasteLinesPerSelection", !0), oC("selectionsMayTouch", !1), oC("readOnly", !1, function(e, t) {
		"nocursor" == t && (nR(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
	}), oC("screenReaderLabel", null, function(e, t) {
		e.display.input.screenReaderLabelChanged(t = "" === t ? null : t)
	}), oC("disableInput", !1, function(e, t) {
		t || e.display.input.reset()
	}, !0), oC("dragDrop", !0, function e(t, n, r) {
		!n != !(r && r != iQ) && (r = t.display.dragFunctions, (n = n ? eg : ev)(t.display.scroller, "dragstart", r.start), n(t.display.scroller, "dragenter", r.enter), n(t.display.scroller, "dragover", r.over), n(t.display.scroller, "dragleave", r.leave), n(t.display.scroller, "drop", r.drop))
	}), oC("allowDropFileTypes", null), oC("cursorBlinkRate", 530), oC("cursorScrollMargin", 0), oC("cursorHeight", 1, nD, !0), oC("singleCursorHeightPerLine", !0, nD, !0), oC("workTime", 100), oC("workDelay", 100), oC("flattenSpans", !0, rM, !0), oC("addModeClass", !1, rM, !0), oC("pollInterval", 100), oC("undoDepth", 200, function(e, t) {
		return e.doc.history.undoDepth = t
	}), oC("historyEventDelay", 1250), oC("viewportMargin", 10, function(e) {
		return e.refresh()
	}, !0), oC("maxHighlightLength", 1e4, rM, !0), oC("moveInputWithCursor", !0, function(e, t) {
		t || e.display.input.resetPosition()
	}), oC("tabindex", null, function(e, t) {
		return e.display.input.getField().tabIndex = t || ""
	}), oC("autofocus", null), oC("direction", "ltr", function(e, t) {
		return e.doc.setDirection(t)
	}, !0), oC("phrases", null), ox = (ob = ot).optionHandlers, ow = ob.helpers = {}, ob.prototype = {
		constructor: ob,
		focus: function() {
			window.focus(), this.display.input.focus()
		},
		setOption: function(e, t) {
			var n = this.options,
				r = n[e];
			n[e] == t && "mode" != e || (n[e] = t, ox.hasOwnProperty(e) && rt(this, ox[e])(this, t, r), e$(this, "optionChange", this, e))
		},
		getOption: function(e) {
			return this.options[e]
		},
		getDoc: function() {
			return this.doc
		},
		addKeyMap: function(e, t) {
			this.state.keyMaps[t ? "push" : "unshift"](i1(e))
		},
		removeKeyMap: function(e) {
			for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
				if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0
		},
		addOverlay: rn(function(e, t) {
			var n = e.token ? e : ob.getMode(this.options, e);
			if (n.startState) throw Error("Overlays may not be stateful.");
			(function(e, t, n) {
				for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i;) r++;
				e.splice(r, 0, t)
			})(this.state.overlays, {
				mode: n,
				modeSpec: e,
				opaque: t && t.opaque,
				priority: t && t.priority || 0
			}, function(e) {
				return e.priority
			}), this.state.modeGen++, nO(this)
		}),
		removeOverlay: rn(function(e) {
			for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
				var r = t[n].modeSpec;
				if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++, void nO(this)
			}
		}),
		indentLine: rn(function(e, t, n) {
			"string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), eG(this.doc, e) && or(this, e, t, n)
		}),
		indentSelection: rn(function(e) {
			for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
				var i = t[r];
				if (i.empty()) i.head.line > n && (or(this, i.head.line, e, !0), n = i.head.line, r == this.doc.sel.primIndex && n2(this));
				else {
					for (var o = i.from(), l = i.to(), i = Math.max(n, o.line), n = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1, s = i; s < n; ++s) or(this, s, e);
					i = this.doc.sel.ranges, 0 == o.ch && t.length == i.length && 0 < i[r].from().ch && r6(this.doc, r, new rw(o, i[r].to()), I)
				}
			}
		}),
		getTokenAt: function(e, t) {
			return ts(this, e, t)
		},
		getLineTokens: function(e, t) {
			return ts(this, eV(e), t, !0)
		},
		getTokenTypeAt: function(e) {
			e = eq(this.doc, e);
			var t, n = tt(this, eB(this.doc, e.line)),
				r = 0,
				i = (n.length - 1) / 2,
				o = e.ch;
			if (0 == o) t = n[2];
			else
				for (;;) {
					var l = r + i >> 1;
					if ((l ? n[2 * l - 1] : 0) >= o) i = l;
					else {
						if (!(n[2 * l + 1] < o)) {
							t = n[2 * l + 2];
							break
						}
						r = 1 + l
					}
				}
			return (e = t ? t.indexOf("overlay ") : -1) < 0 ? t : 0 == e ? null : t.slice(0, e - 1)
		},
		getModeAt: function(e) {
			var t = this.doc.mode;
			return t.innerMode ? ob.innerMode(t, this.getTokenAt(e).state).mode : t
		},
		getHelper: function(e, t) {
			return this.getHelpers(e, t)[0]
		},
		getHelpers: function(e, t) {
			var n = [];
			if (!ow.hasOwnProperty(t)) return n;
			var r = ow[t],
				i = this.getModeAt(e);
			if ("string" == typeof i[t]) r[i[t]] && n.push(r[i[t]]);
			else if (i[t])
				for (var o = 0; o < i[t].length; o++) {
					var l = r[i[t][o]];
					l && n.push(l)
				} else i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);
			for (var s = 0; s < r._global.length; s++) {
				var a = r._global[s];
				a.pred(i, this) && -1 == E(n, a.val) && n.push(a.val)
			}
			return n
		},
		getStateAfter: function(e, t) {
			var n = this.doc;
			return tn(this, (e = e9(n, null == e ? n.first + n.size - 1 : e)) + 1, t).state
		},
		cursorCoords: function(e, t) {
			var n = this.doc.sel.primary(),
				n = null == e ? n.head : "object" == typeof e ? eq(this.doc, e) : e ? n.from() : n.to();
			return nf(this, n, t || "page")
		},
		charCoords: function(e, t) {
			return nd(this, eq(this.doc, e), t || "page")
		},
		coordsChar: function(e, t) {
			return nm(this, (e = nh(this, e, t || "page")).left, e.top)
		},
		lineAtHeight: function(e, t) {
			return e = nh(this, {
				top: e,
				left: 0
			}, t || "page").top, e5(this.doc, e + this.display.viewOffset)
		},
		heightAtLine: function(e, t, n) {
			var r, i = !1,
				e = "number" == typeof e ? (r = this.doc.first + this.doc.size - 1, e < this.doc.first ? e = this.doc.first : r < e && (e = r, i = !0), eB(this.doc, e)) : e;
			return nc(this, e, {
				top: 0,
				left: 0
			}, t || "page", n || i).top + (i ? this.doc.height - tN(e) : 0)
		},
		defaultTextHeight: function() {
			return nx(this.display)
		},
		defaultCharWidth: function() {
			return nw(this.display)
		},
		getViewport: function() {
			return {
				from: this.display.viewFrom,
				to: this.display.viewTo
			}
		},
		addWidget: function(e, t, n, r, i) {
			var o, l, s = this.display,
				a = (e = nf(this, eq(this.doc, e))).bottom,
				u = e.left;
			t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), s.sizer.appendChild(t), "over" == r ? a = e.top : "above" != r && "near" != r || (o = Math.max(s.wrapper.clientHeight, this.doc.height), l = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth), ("above" == r || e.bottom + t.offsetHeight > o) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= o && (a = e.bottom), u + t.offsetWidth > l && (u = l - t.offsetWidth)), t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (u = s.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? u = 0 : "middle" == i && (u = (s.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = u + "px"), n && (n = this, t = {
				left: u,
				top: a,
				right: u + t.offsetWidth,
				bottom: a + t.offsetHeight
			}, null != (t = n4(n, t)).scrollTop && nV(n, t.scrollTop), null != t.scrollLeft && nX(n, t.scrollLeft))
		},
		triggerOnKeyDown: rn(iU),
		triggerOnKeyPress: rn(iK),
		triggerOnKeyUp: iV,
		triggerOnMouseDown: rn(ij),
		execCommand: function(e) {
			if (iR.hasOwnProperty(e)) return iR[e].call(null, this)
		},
		triggerElectric: rn(function(e) {
			oa(this, e)
		}),
		findPosH: function(e, t, n, r) {
			var i = 1;
			t < 0 && (i = -1, t = -t);
			for (var o = eq(this.doc, e), l = 0; l < t && !(o = od(this.doc, o, i, n, r)).hitSide; ++l);
			return o
		},
		moveH: rn(function(e, t) {
			var n = this;
			this.extendSelectionsBy(function(r) {
				return n.display.shift || n.doc.extend || r.empty() ? od(n.doc, r.head, e, t, n.options.rtlMoveVisually) : e < 0 ? r.from() : r.to()
			}, B)
		}),
		deleteH: rn(function(e, t) {
			var n = this.doc.sel,
				r = this.doc;
			n.somethingSelected() ? r.replaceSelection("", null, "+delete") : iP(this, function(n) {
				var i = od(r, n.head, e, t, !1);
				return e < 0 ? {
					from: i,
					to: n.head
				} : {
					from: n.head,
					to: i
				}
			})
		}),
		findPosV: function(e, t, n, r) {
			var i = 1,
				o = r;
			t < 0 && (i = -1, t = -t);
			for (var l = eq(this.doc, e), s = 0; s < t; ++s) {
				var a = nf(this, l, "div");
				if (null == o ? o = a.left : a.left = o, (l = of(this, a, i, n)).hitSide) break
			}
			return l
		},
		moveV: rn(function(e, t) {
			var n = this,
				r = this.doc,
				i = [],
				o = !this.display.shift && !r.extend && r.sel.somethingSelected();
			if (r.extendSelectionsBy(function(l) {
					if (o) return e < 0 ? l.from() : l.to();
					var s = nf(n, l.head, "div");
					null != l.goalColumn && (s.left = l.goalColumn), i.push(s.left);
					var a = of(n, s, e, t);
					return "page" == t && l == r.sel.primary() && n6(n, nd(n, a, "div").top - s.top), a
				}, B), i.length)
				for (var l = 0; l < r.sel.ranges.length; l++) r.sel.ranges[l].goalColumn = i[l]
		}),
		findWordAt: function(e) {
			var t = eB(this.doc, e.line).text,
				n = e.ch,
				r = e.ch;
			if (t) {
				var i = this.getHelper(e, "wordChars");
				("before" == e.sticky || r == t.length) && n ? --n : ++r;
				for (var o = t.charAt(n), l = Q(o, i) ? function(e) {
						return Q(e, i)
					} : /\s/.test(o) ? function(e) {
						return /\s/.test(e)
					} : function(e) {
						return !/\s/.test(e) && !Q(e)
					}; 0 < n && l(t.charAt(n - 1));) --n;
				for (; r < t.length && l(t.charAt(r));) ++r
			}
			return new rw(eV(e.line, n), eV(e.line, r))
		},
		toggleOverwrite: function(e) {
			null != e && e == this.state.overwrite || (((this.state.overwrite = !this.state.overwrite) ? O : w)(this.display.cursorDiv, "CodeMirror-overwrite"), e$(this, "overwriteToggle", this, this.state.overwrite))
		},
		hasFocus: function() {
			return this.display.input.getField() == N()
		},
		isReadOnly: function() {
			return !(!this.options.readOnly && !this.doc.cantEdit)
		},
		scrollTo: rn(function(e, t) {
			n5(this, e, t)
		}),
		getScrollInfo: function() {
			var e = this.display.scroller;
			return {
				left: e.scrollLeft,
				top: e.scrollTop,
				height: e.scrollHeight - tY(this) - this.display.barHeight,
				width: e.scrollWidth - tY(this) - this.display.barWidth,
				clientHeight: t9(this),
				clientWidth: t8(this)
			}
		},
		scrollIntoView: rn(function(e, t) {
			var n;
			null == e ? (e = {
				from: this.doc.sel.primary().head,
				to: null
			}, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
				from: eV(e, 0),
				to: null
			} : null == e.from && (e = {
				from: e,
				to: null
			}), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? (n = e, nG(t = this), t.curOp.scrollToPos = n) : nU(this, e.from, e.to, e.margin)
		}),
		setSize: rn(function(e, t) {
			function n(e) {
				return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
			}
			var r = this;
			null != e && (this.display.wrapper.style.width = n(e)), null != t && (this.display.wrapper.style.height = n(t)), this.options.lineWrapping && no(this);
			var i = this.display.viewFrom;
			this.doc.iter(i, this.display.viewTo, function(e) {
				if (e.widgets) {
					for (var t = 0; t < e.widgets.length; t++)
						if (e.widgets[t].noHScroll) {
							nM(r, i, "widget");
							break
						}
				}++i
			}), this.curOp.forceUpdate = !0, e$(this, "refresh", this)
		}),
		operation: function(e) {
			return re(this, e)
		},
		startOperation: function() {
			return nQ(this)
		},
		endOperation: function() {
			return nJ(this)
		},
		refresh: rn(function() {
			var e = this.display.cachedTextHeight;
			nO(this), this.curOp.forceUpdate = !0, nl(this), n5(this, this.doc.scrollLeft, this.doc.scrollTop), rc(this.display), (null == e || .5 < Math.abs(e - nx(this.display)) || this.options.lineWrapping) && nk(this), e$(this, "refresh", this)
		}),
		swapDoc: rn(function(e) {
			var t = this.doc;
			return t.cm = null, this.state.selectingText && this.state.selectingText(), rD(this, e), nl(this), this.display.input.reset(), n5(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, tR(this, "swapDoc", this, t), t
		}),
		phrase: function(e) {
			var t = this.options.phrases;
			return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
		},
		getInputField: function() {
			return this.display.input.getField()
		},
		getWrapperElement: function() {
			return this.display.wrapper
		},
		getScrollerElement: function() {
			return this.display.scroller
		},
		getGutterElement: function() {
			return this.display.gutters
		}
	}, ex(ob), ob.registerHelper = function(e, t, n) {
		ow.hasOwnProperty(e) || (ow[e] = ob[e] = {
			_global: []
		}), ow[e][t] = n
	}, ob.registerGlobalHelper = function(e, t, n, r) {
		ob.registerHelper(e, t, r), ow[e]._global.push({
			pred: n,
			val: r
		})
	};
	var oS, oL, ok = "iter insert remove copy getEditor constructor".split(" ");
	for (oS in iy.prototype) iy.prototype.hasOwnProperty(oS) && 0 > E(ok, oS) && (ot.prototype[oS] = function(e) {
		return function() {
			return e.apply(this.doc, arguments)
		}
	}(iy.prototype[oS]));
	return ex(iy), ot.inputStyles = {
		textarea: i,
		contenteditable: e
	}, ot.defineMode = function(e) {
		ot.defaults.mode || "null" == e || (ot.defaults.mode = e), (function(e, t) {
			2 < arguments.length && (t.dependencies = Array.prototype.slice.call(arguments, 2)), eH[e] = t
		}).apply(this, arguments)
	}, ot.defineMIME = function(e, t) {
		eF[e] = t
	}, ot.defineMode("null", function() {
		return {
			token: function(e) {
				return e.skipToEnd()
			}
		}
	}), ot.defineMIME("text/plain", "null"), ot.defineExtension = function(e, t) {
		ot.prototype[e] = t
	}, ot.defineDocExtension = function(e, t) {
		iy.prototype[e] = t
	}, ot.fromTextArea = function(e, t) {
		function n() {
			e.value = a.getValue()
		}
		if ((t = t ? H(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus && (r = N(), t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body), e.form && (eg(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
			var r, i = e.form,
				o = i.submit;
			try {
				var l = i.submit = function() {
					n(), i.submit = o, i.submit(), i.submit = l
				}
			} catch (s) {}
		}
		t.finishInit = function(r) {
			r.save = n, r.getTextArea = function() {
				return e
			}, r.toTextArea = function() {
				r.toTextArea = isNaN, n(), e.parentNode.removeChild(r.getWrapperElement()), e.style.display = "", e.form && (ev(e.form, "submit", n), t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = o))
			}
		}, e.style.display = "none";
		var a = ot(function(t) {
			return e.parentNode.insertBefore(t, e.nextSibling)
		}, t);
		return a
	}, (oL = ot).off = ev, oL.on = eg, oL.wheelEventPixels = function e(t) {
		return t = r_(t), t.x *= ry, t.y *= ry, t
	}, oL.Doc = iy, oL.splitLines = eA, oL.countColumn = F, oL.findColumn = G, oL.isWordChar = Z, oL.Pass = z, oL.signal = e$, oL.Line = tA, oL.changeEnd = rL, oL.scrollbarModel = n9, oL.Pos = eV, oL.cmpPos = eK, oL.modes = eH, oL.mimeModes = eF, oL.resolveMode = e1, oL.getMode = eP, oL.modeExtensions = eE, oL.extendMode = function e(t, n) {
		H(n, eE.hasOwnProperty(t) ? eE[t] : eE[t] = {})
	}, oL.copyState = ez, oL.startState = eR, oL.innerMode = eI, oL.commands = iR, oL.keyMap = iA, oL.keyName = iF, oL.isModifierKey = iD, oL.lookupKey = i0, oL.normalizeKeyMap = function e(t) {
		var n, r, i = {};
		for (n in t)
			if (t.hasOwnProperty(n)) {
				var o = t[n];
				if (!/^(name|fallthrough|(de|at)tach)$/.test(n)) {
					if ("..." != o) {
						for (var l = X(n.split(" "), iW), s = 0; s < l.length; s++) {
							var a = void 0,
								u = void 0,
								a = s == l.length - 1 ? (u = l.join(" "), o) : (u = l.slice(0, s + 1).join(" "), "..."),
								c = i[u];
							if (c) {
								if (c != a) throw Error("Inconsistent bindings for " + u)
							} else i[u] = a
						}
						delete t[n]
					} else delete t[n]
				}
			} for (r in i) t[r] = i[r];
		return t
	}, oL.StringStream = e3, oL.SharedTextMarker = im, oL.TextMarker = id, oL.LineWidget = ic, oL.e_preventDefault = ew, oL.e_stopPropagation = eC, oL.e_stop = eL, oL.addClass = O, oL.contains = T, oL.rmClass = w, oL.keyNames = iT, ot.version = "5.63.1", ot
}),
function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
	function t(e) {
		e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
	}

	function n(e) {
		t(e);
		var n = e.state.placeholder = document.createElement("pre");
		n.style.cssText = "height: 0; overflow: visible", n.style.direction = e.getOption("direction"), n.className = "CodeMirror-placeholder CodeMirror-line-like";
		var r = e.getOption("placeholder");
		"string" == typeof r && (r = document.createTextNode(r)), n.appendChild(r), e.display.lineSpace.insertBefore(n, e.display.lineSpace.firstChild)
	}

	function r(e) {
		o(e) && n(e)
	}

	function i(e) {
		var r = e.getWrapperElement(),
			i = o(e);
		r.className = r.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? n(e) : t(e)
	}

	function o(e) {
		return 1 === e.lineCount() && "" === e.getLine(0)
	}
	e.defineOption("placeholder", "", function(o, l, s) {
		var a = s && s != e.Init;
		if (l && !a) o.on("blur", r), o.on("change", i), o.on("swapDoc", i), e.on(o.getInputField(), "compositionupdate", o.state.placeholderCompose = function() {
			var e;
			e = o, setTimeout(function() {
				var r = !1;
				if (1 == e.lineCount()) {
					var i = e.getInputField();
					r = "TEXTAREA" == i.nodeName ? !e.getLine(0).length : !/[^\u200b]/.test(i.querySelector(".CodeMirror-line").textContent)
				}
				r ? n(e) : t(e)
			}, 20)
		}), i(o);
		else if (!l && a) {
			o.off("blur", r), o.off("change", i), o.off("swapDoc", i), e.off(o.getInputField(), "compositionupdate", o.state.placeholderCompose), t(o);
			var u = o.getWrapperElement();
			u.className = u.className.replace(" CodeMirror-empty", "")
		}
		l && !o.hasFocus() && r(o)
	})
});