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

