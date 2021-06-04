import { Template } from "./class_Template.js";

import { handleError } from "./core_errors.js";

export const template = {};

/**
 * Creates a new Template object. Convenience function for chaining.
 * @param {Object} settings 
 * @returns 
 */
template.new = (settings) => {
    return new Template(settings);
}

export const basicRender = (html, context) => {

    try {
        let workshop = document.createElement("div");

        workshop.innerHTML = html;

        workshop.querySelectorAll("[data-context]").forEach((el) => {

            let binding = el.dataset.context?.split(".");

            let cache = context;

            binding.forEach((key) => {
                cache = cache[key] ?? {};
            });

            interpretData(el, cache);

        });
        return workshop.innerHTML;
    }
    catch (error) {
        handleError(error);
    }
};

const interpretData = (element, data) => {
    // This is where you would customize instead of assigning a string to textContent. 
    let rendered = `${data}`;
    element.textContent = rendered;
};