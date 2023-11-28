! function(n) {
	"object" == typeof exports && "object" == typeof module ? n(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], n) : n(CodeMirror)
}(function(c) {
	"use strict";

	function t(t, i, n, f) {
		n && n.call ? (l = n, n = null) : l = a(t, n, "rangeFinder"), "number" == typeof i && (i = c.Pos(i, 0));
		var l, d = a(t, n, "minFoldSize");

		function o(n) {
			var o = l(t, i);
			if (!o || o.to.line - o.from.line < d) return null;
			if ("fold" === f) return o;
			for (var e = t.findMarksAt(o.from), r = 0; r < e.length; ++r)
				if (e[r].__isFold) {
					if (!n) return null;
					o.cleared = !0, e[r].clear()
				} return o
		}
		var e, r, u = o(!0);
		if (a(t, n, "scanUp"))
			for (; !u && i.line > t.firstLine();) i = c.Pos(i.line - 1, 0), u = o(!1);
		u && !u.cleared && "unfold" !== f && (e = function(n, o, e) {
			n = a(n, o, "widget");
			"function" == typeof n && (n = n(e.from, e.to));
			"string" == typeof n ? (o = document.createTextNode(n), (n = document.createElement("span")).appendChild(o), n.className = "CodeMirror-foldmarker") : n = n && n.cloneNode(!0);
			return n
		}(t, n, u), c.on(e, "mousedown", function(n) {
			r.clear(), c.e_preventDefault(n)
		}), (r = t.markText(u.from, u.to, {
			replacedWith: e,
			clearOnEnter: a(t, n, "clearOnEnter"),
			__isFold: !0
		})).on("clear", function(n, o) {
			c.signal(t, "unfold", t, n, o)
		}), c.signal(t, "fold", t, u.from, u.to))
	}
	c.newFoldFunction = function(e, r) {
		return function(n, o) {
			t(n, o, {
				rangeFinder: e,
				widget: r
			})
		}
	}, c.defineExtension("foldCode", function(n, o, e) {
		t(this, n, o, e)
	}), c.defineExtension("isFolded", function(n) {
		for (var o = this.findMarksAt(n), e = 0; e < o.length; ++e)
			if (o[e].__isFold) return !0
	}), c.commands.toggleFold = function(n) {
		n.foldCode(n.getCursor())
	}, c.commands.fold = function(n) {
		n.foldCode(n.getCursor(), null, "fold")
	}, c.commands.unfold = function(n) {
		n.foldCode(n.getCursor(), {
			scanUp: !1
		}, "unfold")
	}, c.commands.foldAll = function(e) {
		e.operation(function() {
			for (var n = e.firstLine(), o = e.lastLine(); n <= o; n++) e.foldCode(c.Pos(n, 0), {
				scanUp: !1
			}, "fold")
		})
	}, c.commands.unfoldAll = function(e) {
		e.operation(function() {
			for (var n = e.firstLine(), o = e.lastLine(); n <= o; n++) e.foldCode(c.Pos(n, 0), {
				scanUp: !1
			}, "unfold")
		})
	}, c.registerHelper("fold", "combine", function() {
		var t = Array.prototype.slice.call(arguments, 0);
		return function(n, o) {
			for (var e = 0; e < t.length; ++e) {
				var r = t[e](n, o);
				if (r) return r
			}
		}
	}), c.registerHelper("fold", "auto", function(n, o) {
		for (var e = n.getHelpers(o, "fold"), r = 0; r < e.length; r++) {
			var t = e[r](n, o);
			if (t) return t
		}
	});
	var r = {
		rangeFinder: c.fold.auto,
		widget: "↔",
		minFoldSize: 0,
		scanUp: !1,
		clearOnEnter: !0
	};

	function a(n, o, e) {
		if (o && void 0 !== o[e]) return o[e];
		o = n.options.foldOptions;
		return (o && void 0 !== o[e] ? o : r)[e]
	}
	c.defineOption("foldOptions", null), c.defineExtension("foldOption", function(n, o) {
		return a(this, n, o)
	})
});