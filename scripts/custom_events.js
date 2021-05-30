import { Modal } from "./class_Modal.js";

export const events = {
    click: {},
    change: {},
    keyup: {},
    actions: {}
};

/**
 * - Trigger an event (like jQuery's $().trigger)
 * @param {string} name 
 * @param {object} data 
 * @param {HTMLElement} element 
 */
const triggerEvent = (name, data, element) => {
    let eventData = { detail: data };
    let event = new CustomEvent(name, eventData);

    element = element ?? document;

    element.dispatchEvent?.(event, eventData);
};

/**
 * - Trigger an event on all elements that match a query. 
 * @param {string} name 
 * @param {object} data 
 * @param {string} selector - Query that will return multiple elements
 */
const triggerEventAll = (name, data, selector) => {

    try {
        let elements = document.querySelectorAll(selector);

        elements.forEach((item) => {
            triggerEvent(name, data, item);
        });

    } catch (er) {
        let message = new Modal("Error!").show();
    }
};
