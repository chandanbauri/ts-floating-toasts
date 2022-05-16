"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var DEFAULT_OPTIONS = {
    position: "bottom-left",
    autoClose: false,
    autoCloseDuration: 8000,
};
var TsToast = /** @class */ (function () {
    function TsToast(options) {
        if (options === void 0) { options = DEFAULT_OPTIONS; }
        this.toasts = [];
        this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);
        this.element = document.querySelector(".ts-toasts-container");
        this.element.classList.add(options.position);
    }
    TsToast.prototype.createToastElement = function (text) {
        var _this = this;
        var toastElement = document.createElement("div");
        var toastElementInnerContainer = document.createElement("div");
        var toastTextContainer = document.createElement("span");
        toastTextContainer.innerText = text;
        toastElementInnerContainer.append(toastTextContainer);
        toastElement.appendChild(toastElementInnerContainer);
        toastElement.classList.add("ts-toast-container");
        var showTimeout = setTimeout(function () {
            toastElement.classList.add("show");
            clearTimeout(showTimeout);
        }, 500);
        toastElement.addEventListener("click", function () {
            _this.remove(text);
        });
        return toastElement;
    };
    TsToast.prototype.show = function (text) {
        var _this = this;
        var toastElement = this.createToastElement(text);
        this.toasts.push({
            text: text,
            el: toastElement,
            timeOutId: this.options.autoClose
                ? this.autoRemove(function () {
                    _this.remove(text);
                })
                : Number.MAX_VALUE,
        });
        this.element.append(toastElement);
    };
    TsToast.prototype.autoRemove = function (cb) {
        return setTimeout(cb, 8000);
    };
    TsToast.prototype.remove = function (text) {
        var toastIndex = this.toasts.findIndex(function (toast) { return toast.text == text; });
        var toast = this.toasts[toastIndex];
        this.toasts.splice(toastIndex, 1);
        toast.el.classList.remove("show");
        var removeSetTimeout = setTimeout(function () {
            toast.el.remove();
            clearTimeout(removeSetTimeout);
        }, 500);
        if (this.options.autoClose)
            clearTimeout(toast.timeOutId);
    };
    TsToast.prototype.message = function (text) {
        if (text == "")
            return;
        this.show(text);
    };
    return TsToast;
}());
var tsToast = new TsToast({ position: "top-right", autoClose: true });
tsToast.message("User has logged in");
setTimeout(function () {
    tsToast.message("updates have been installed");
}, 1000);
setTimeout(function () {
    tsToast.message("game on");
}, 2000);
setTimeout(function () {
    tsToast.message("thank you for visiting");
}, 3000);
