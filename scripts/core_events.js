export const events = {
    click: {},
    change: {},
    keyup: {},
    actions: {}
};

/**
 * Converts input into an array of elements. 
 * @param {Array | String} input - Array of strings/elements, string selector or element. 
 * @returns 
 */
const findTargets = (input) => {
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
    if ("innerHTML" in input) {
        output = [input];
    }
    return output;
}

/**
 * - Trigger an event (like jQuery's $().trigger)
 * @param {string} name 
 * @param {object} data 
 * @param {Array | String} element - A selector string, element or array of either. 
 */
events.trigger = (name, data, input) => {

    let targets = findTargets(input);

    console.log(targets);

    let eventData = { detail: data };

    let event = new CustomEvent(name, eventData);

    targets.forEach((element) => {
        element.dispatchEvent?.(event, eventData);
    });
};
