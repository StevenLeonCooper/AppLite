export const dom = {};

dom.findSibling = (element, selector) => {

    let next = element.nextElementSibling || false;

    if (next === false) return null;

    if (next.matches(selector)) return next;

    return findSibling(next, selector);
};