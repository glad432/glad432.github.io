! function(t) {
	"object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], t) : t(CodeMirror)
}(function(h) {
	"use strict";

	function i(t, e, o) {
		this.orientation = e, this.scroll = o, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = t + "-" + e, this.inner = this.node.appendChild(document.createElement("div"));
		var r = this;

		function i(t) {
			var e = h.wheelEventPixels(t)["horizontal" == r.orientation ? "x" : "y"],
				o = r.pos;
			r.moveTo(r.pos + e), r.pos != o && h.e_preventDefault(t)
		}
		h.on(this.inner, "mousedown", function(t) {
			var e, o, i;

			function n() {
				h.off(document, "mousemove", s), h.off(document, "mouseup", n)
			}

			function s(t) {
				if (1 != t.which) return n();
				r.moveTo(i + (t[e] - o) * (r.total / r.size))
			}
			1 == t.which && (h.e_preventDefault(t), e = "horizontal" == r.orientation ? "pageX" : "pageY", o = t[e], i = r.pos, h.on(document, "mousemove", s), h.on(document, "mouseup", n))
		}), h.on(this.node, "click", function(t) {
			h.e_preventDefault(t);
			var e = r.inner.getBoundingClientRect(),
				t = "horizontal" == r.orientation ? t.clientX < e.left ? -1 : t.clientX > e.right ? 1 : 0 : t.clientY < e.top ? -1 : t.clientY > e.bottom ? 1 : 0;
			r.moveTo(r.pos + t * r.screen)
		}), h.on(this.node, "mousewheel", i), h.on(this.node, "DOMMouseScroll", i)
	}
	i.prototype.setPos = function(t, e) {
		return (t = t < 0 ? 0 : t) > this.total - this.screen && (t = this.total - this.screen), !(!e && t == this.pos) && (this.pos = t, this.inner.style["horizontal" == this.orientation ? "left" : "top"] = t * (this.size / this.total) + "px", !0)
	}, i.prototype.moveTo = function(t) {
		this.setPos(t) && this.scroll(t, this.orientation)
	};

	function o(t, e, o) {
		this.addClass = t, this.horiz = new i(t, "horizontal", o), e(this.horiz.node), this.vert = new i(t, "vertical", o), e(this.vert.node), this.width = null
	}
	i.prototype.update = function(t, e, o) {
		var i = this.screen != e || this.total != t || this.size != o,
			e = (i && (this.screen = e, this.total = t, this.size = o), this.screen * (this.size / this.total));
		e < 10 && (this.size -= 10 - e, e = 10), this.inner.style["horizontal" == this.orientation ? "width" : "height"] = e + "px", this.setPos(this.pos, i)
	}, o.prototype.update = function(t) {
		null == this.width && (e = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle) && (this.width = parseInt(e.height));
		var e = this.width || 0,
			o = t.scrollWidth > t.clientWidth + 1,
			i = t.scrollHeight > t.clientHeight + 1;
		return this.vert.node.style.display = i ? "block" : "none", this.horiz.node.style.display = o ? "block" : "none", i && (this.vert.update(t.scrollHeight, t.clientHeight, t.viewHeight - (o ? e : 0)), this.vert.node.style.bottom = o ? e + "px" : "0"), o && (this.horiz.update(t.scrollWidth, t.clientWidth, t.viewWidth - (i ? e : 0) - t.barLeft), this.horiz.node.style.right = i ? e + "px" : "0", this.horiz.node.style.left = t.barLeft + "px"), {
			right: i ? e : 0,
			bottom: o ? e : 0
		}
	}, o.prototype.setScrollTop = function(t) {
		this.vert.setPos(t)
	}, o.prototype.setScrollLeft = function(t) {
		this.horiz.setPos(t)
	}, o.prototype.clear = function() {
		var t = this.horiz.node.parentNode;
		t.removeChild(this.horiz.node), t.removeChild(this.vert.node)
	}, h.scrollbarModel.simple = function(t, e) {
		return new o("CodeMirror-simplescroll", t, e)
	}, h.scrollbarModel.overlay = function(t, e) {
		return new o("CodeMirror-overlayscroll", t, e)
	}
});