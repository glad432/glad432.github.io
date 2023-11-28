! function(t) {
	"object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror"), require("./foldcode")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./foldcode"], t) : t(CodeMirror)
}(function(r) {
	"use strict";
	r.defineOption("foldGutter", !1, function(t, o, e) {
		e && e != r.Init && (t.clearGutter(t.state.foldGutter.options.gutter), t.state.foldGutter = null, t.off("gutterClick", d), t.off("changes", a), t.off("viewportChange", u), t.off("fold", l), t.off("unfold", l), t.off("swapDoc", a)), o && (t.state.foldGutter = new n(function(t) {
			!0 === t && (t = {});
			null == t.gutter && (t.gutter = "CodeMirror-foldgutter");
			null == t.indicatorOpen && (t.indicatorOpen = "CodeMirror-foldgutter-open");
			null == t.indicatorFolded && (t.indicatorFolded = "CodeMirror-foldgutter-folded");
			return t
		}(o)), f(t), t.on("gutterClick", d), t.on("changes", a), t.on("viewportChange", u), t.on("fold", l), t.on("unfold", l), t.on("swapDoc", a))
	});
	var c = r.Pos;

	function n(t) {
		this.options = t, this.from = this.to = 0
	}

	function s(t, o) {
		for (var e = t.findMarks(c(o, 0), c(o + 1, 0)), r = 0; r < e.length; ++r)
			if (e[r].__isFold) {
				var n = e[r].find(-1);
				if (n && n.line === o) return e[r]
			}
	}

	function p(t) {
		var o;
		return "string" == typeof t ? ((o = document.createElement("div")).className = t + " CodeMirror-guttermarker-subtle", o) : t.cloneNode(!0)
	}

	function i(n, t, o) {
		var i = n.state.foldGutter.options,
			f = t - 1,
			d = n.foldOption(i, "minFoldSize"),
			a = n.foldOption(i, "rangeFinder"),
			u = "string" == typeof i.indicatorFolded && e(i.indicatorFolded),
			l = "string" == typeof i.indicatorOpen && e(i.indicatorOpen);
		n.eachLine(t, o, function(t) {
			++f;
			var o = null,
				e = (e = t.gutterMarkers) && e[i.gutter];
			if (s(n, f)) {
				if (u && e && u.test(e.className)) return;
				o = p(i.indicatorFolded)
			} else {
				var r = c(f, 0),
					r = a && a(n, r);
				if (r && r.to.line - r.from.line >= d) {
					if (l && e && l.test(e.className)) return;
					o = p(i.indicatorOpen)
				}
			}(o || e) && n.setGutterMarker(t, i.gutter, o)
		})
	}

	function e(t) {
		return new RegExp("(^|\\s)" + t + "(?:$|\\s)\\s*")
	}

	function f(t) {
		var o = t.getViewport(),
			e = t.state.foldGutter;
		e && (t.operation(function() {
			i(t, o.from, o.to)
		}), e.from = o.from, e.to = o.to)
	}

	function d(t, o, e) {
		var r = t.state.foldGutter;
		!r || e == (e = r.options).gutter && ((r = s(t, o)) ? r.clear() : t.foldCode(c(o, 0), e))
	}

	function a(t) {
		var o, e = t.state.foldGutter;
		e && (o = e.options, e.from = e.to = 0, clearTimeout(e.changeUpdate), e.changeUpdate = setTimeout(function() {
			f(t)
		}, o.foldOnChangeTimeSpan || 600))
	}

	function u(o) {
		var t, e = o.state.foldGutter;
		e && (t = e.options, clearTimeout(e.changeUpdate), e.changeUpdate = setTimeout(function() {
			var t = o.getViewport();
			e.from == e.to || 20 < t.from - e.to || 20 < e.from - t.to ? f(o) : o.operation(function() {
				t.from < e.from && (i(o, t.from, e.from), e.from = t.from), t.to > e.to && (i(o, e.to, t.to), e.to = t.to)
			})
		}, t.updateViewportTimeSpan || 400))
	}

	function l(t, o) {
		var e = t.state.foldGutter;
		!e || (o = o.line) >= e.from && o < e.to && i(t, o, o + 1)
	}
});