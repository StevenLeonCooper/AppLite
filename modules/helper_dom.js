export const dom = {};

dom.findSibling = (element, selector, direction) => {

    direction = direction || "down";

    let methods = {
        up: "previous",
        down: "next"
    };

    let next = element[`${methods[direction]}ElementSibling`] || false;

    if (next === false) return null;

    if (next.matches(selector)) return next;

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
    clone.remove();
    return computed;
};

dom.toggleElement = (element) => {

    let currentDisplay = window.getComputedStyle(element).display;
    let defaultDisplay = getDefaultDisplay(element);
    element.style.display = currentDisplay === "none" ? defaultDisplay : "none";
};