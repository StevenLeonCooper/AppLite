export const events = {};

events.click = {};
events.change = {};
events.keyup = {};
events.keydown = {};
events.actions = {};
events.mouseenter = {};
events.mouseleave = {};

/**
 * Converts input into an array of elements. 
 * @param {Array | String} input - Array of strings/elements, string selector or element. 
 * @returns 
 */
const findTargets = (input) => {
    if (!input || input === null) {
        return ["body"];
    }
    let output = [];
    if (Array.isArray(input)) {
        input.forEach((item) => {
            if (typeof item === "string") {
                return document.querySelectorAll(item).forEach((el) => {
                    output.push(el);
                });
            }
            output.push(item);
        });
        return output;
    }
    if (typeof input === "string") {
        output = Array.from(document.querySelectorAll(input));
        return output;
    }
    if (input instanceof Node) {
        output = [input];
    }
    return output;
};

/**
 * - Trigger an event (like jQuery's $().trigger)
 * @param {string} name 
 * @param {object} data 
 * @param {Array | String} element - A selector string, element or array of either. 
 */
events.trigger = (name, data, input) => {

    let targets = findTargets(input);

    let eventData = { detail: data };

    let event = new CustomEvent(name, eventData);

    targets.forEach((element) => {
        element.dispatchEvent?.(event, eventData);
    });
};

// Our unique implementation of "once" is different than the standard version. 
// We don't actually remove the eventListener, we just stop it from working on this
// particular element after the first run. This lets us use the document body as a 
// delegate so we can do one-time events on dynamically-generated elements. 
const setupListener = (type, selector, callback, once) => {

    document.body.addEventListener(type, (e) => {
        if (!e.target.matches(selector)) return false;
        if(once.once){
            let flag = once.flag ?? "once";
            if(e.target.dataset[flag]) return false;
            e.target.dataset[flag] = true;
        }
        callback.bind(this)(e);
    });
};

events.when = (selector) => {
    return {
        clicked: (callback, once) => {
            setupListener("click", selector, callback, once);
        },
        mouseenter: (callback, once) => {
            setupListener("mouseenter", selector, callback, once);
        },
        mouseleave: (callback, once) => {
            setupListener("mouseleave", selector, callback, once);
        },
        focus: (callback, once) => {
            setupListener("focus", selector, callback, once);
        }
    };
};



