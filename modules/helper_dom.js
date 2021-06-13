export const dom = {};

dom.findSibling = (element, selector, direction) => {
    if(!element) return null;
    direction = direction || "down";
    let methods = {
        up: "previous",
        down: "next"
    };
    let next = element[`${methods[direction]}ElementSibling`];
    if (next?.matches?.(selector)) return next;
    return findSibling(next, selector);
};

dom.screenSize = () => {
    let w = window.outerWidth;
    return w >= 1050 ? "desktop" : (w >= 767 ? "tablet" : "mobile");
};

const getDefaultDisplay = (element) => {
    let computed = window.getComputedStyle(element).display;
    let clone = element.cloneNode();
    if (computed === "none") {
        document.body.append(clone);
        clone.style.removeProperty("display");
        computed = window.getComputedStyle(clone).display;
    }
    if (computed === "none") {
        clone.setAttribute("class", "");
        computed = window.getComputedStyle(clone).display;
    }
    if (computed === "none") {
        clone.remove();
        clone = document.createElement(element.tagName);
        document.body.append(clone);
        computed = window.getComputedStyle(clone).display;
    }

    computed = computed === "none" ? "block" : computed; // Last Resort

    clone.remove();
    return computed;
};

dom.toggleElement = (element, force) => {

    if (typeof element === "string") {
        element = document.querySelector(element) ?? false;
    }
    if (element === false) return false;
    let currentDisplay = force ?? window.getComputedStyle(element).display;
    let defaultDisplay = getDefaultDisplay(element);
    element.style.display = (currentDisplay === "none") ? defaultDisplay : "none";
};

dom.showElement = (element) => {
    dom.toggleElement(element, "none");
};

dom.hideElement = (element) => {
    dom.toggleElement(element, "visible");
};