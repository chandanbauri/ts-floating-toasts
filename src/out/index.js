"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_OPTIONS = {
    position: "bottom-left",
    autoClose: false,
    autoCloseDuration: 4000,
};
class TsToast {
    constructor(options = DEFAULT_OPTIONS) {
        this.toasts = [];
        this.options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.element = document.querySelector(".ts-toasts-container");
        this.element.classList.add(options.position);
    }
    createToastElement(text) {
        let toastElement = document.createElement("div");
        let toastElementInnerContainer = document.createElement("div");
        let toastTextContainer = document.createElement("span");
        toastTextContainer.innerText = text;
        toastElementInnerContainer.append(toastTextContainer);
        toastElement.appendChild(toastElementInnerContainer);
        toastElement.classList.add("ts-toast-container");
        let showTimeout = setTimeout(() => {
            toastElement.classList.add("show");
            clearTimeout(showTimeout);
        }, 500);
        toastElement.addEventListener("click", () => {
            this.remove(text);
        });
        return toastElement;
    }
    show(text) {
        let toastElement = this.createToastElement(text);
        this.toasts.push({
            text: text,
            el: toastElement,
            timeOutId: this.options.autoClose
                ? this.autoRemove(() => {
                    this.remove(text);
                })
                : Number.MAX_VALUE,
        });
        this.element.append(toastElement);
    }
    autoRemove(cb) {
        return setTimeout(cb, 8000);
    }
    remove(text) {
        let toastIndex = this.toasts.findIndex((toast) => toast.text == text);
        let toast = this.toasts[toastIndex];
        this.toasts.splice(toastIndex, 1);
        toast.el.classList.remove("show");
        let removeSetTimeout = setTimeout(() => {
            toast.el.remove();
            clearTimeout(removeSetTimeout);
        }, 500);
        if (this.options.autoClose)
            clearTimeout(toast.timeOutId);
    }
    message(text) {
        if (text == "")
            return;
        this.show(text);
    }
}
if (!window.tsToast) {
    window.tsToast = TsToast;
}
// window.tsToast.message('Hello')
// let tsToast = new TsToast({ position: "top-right", autoClose: true })
// tsToast.message("User has logged in")
// setTimeout(() => {
//   tsToast.message("updates have been installed")
// }, 1000)
// setTimeout(() => {
//   tsToast.message("game on")
// }, 2000)
// setTimeout(() => {
//   tsToast.message("thank you for visiting")
// }, 3000)
