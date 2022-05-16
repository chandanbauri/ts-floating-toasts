type POSITIONS = "top-left" | "top-right" | "bottom-left" | "bottom-right"
type TOAST = {
  text: string
  timeOutId?: number
  el: HTMLElement
}

interface OPTIONS {
  position: POSITIONS
  autoClose: boolean
  autoCloseDuration?: number
}

const DEFAULT_OPTIONS: OPTIONS = {
  position: "bottom-left",
  autoClose: false,
  autoCloseDuration: 8000,
}

class TsToast {
  private element: HTMLElement
  private options: OPTIONS
  private toasts: Array<TOAST> = []
  constructor(options: OPTIONS = DEFAULT_OPTIONS) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.element = document.querySelector(".ts-toasts-container") as HTMLElement
    this.element.classList.add(options.position)
  }
  private createToastElement(text: string): HTMLElement {
    let toastElement = document.createElement("div")
    let toastElementInnerContainer = document.createElement("div")
    let toastTextContainer = document.createElement("span")
    toastTextContainer.innerText = text
    toastElementInnerContainer.append(toastTextContainer)
    toastElement.appendChild(toastElementInnerContainer)
    toastElement.classList.add("ts-toast-container")
    let showTimeout = setTimeout(() => {
      toastElement.classList.add("show")
      clearTimeout(showTimeout)
    }, 500)
    toastElement.addEventListener("click", () => {
      this.remove(text)
    })
    return toastElement
  }
  private show(text: string) {
    let toastElement = this.createToastElement(text)

    this.toasts.push({
      text: text,
      el: toastElement,
      timeOutId: this.options.autoClose
        ? this.autoRemove(() => {
            this.remove(text)
          })
        : Number.MAX_VALUE,
    })

    this.element.append(toastElement)
  }
  private autoRemove(cb: () => void): number | undefined {
    return setTimeout(cb, 8000)
  }
  private remove(text: string) {
    let toastIndex = this.toasts.findIndex((toast) => toast.text == text)
    let toast = this.toasts[toastIndex]
    this.toasts.splice(toastIndex, 1)
    toast.el.classList.remove("show")
    let removeSetTimeout = setTimeout(() => {
      toast.el.remove()
      clearTimeout(removeSetTimeout)
    }, 500)
    if (this.options.autoClose) clearTimeout(toast.timeOutId)
  }
  message(text: string) {
    if (text == "") return
    this.show(text)
  }
}

let tsToast = new TsToast({ position: "top-right", autoClose: true })

tsToast.message("User has logged in")
setTimeout(() => {
  tsToast.message("updates have been installed")
}, 1000)
setTimeout(() => {
  tsToast.message("game on")
}, 2000)
setTimeout(() => {
  tsToast.message("thank you for visiting")
}, 3000)
