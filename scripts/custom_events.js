import { Modal } from "./class_Modal.js";

export const events = {
    click: {},
    change: {},
    keyup: {},
    actions: {}
};

const triggerEvent = (name, data, element) => {
    let eventData = { detail: data };
    let event = new CustomEvent(name, eventData);

    element = element ?? document;

    element.dispatchEvent?.(event, eventData);
};

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
