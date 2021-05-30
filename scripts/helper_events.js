import { Modal } from "./class_Modal.js";

export const events = {
    click: {},
    change: {},
    keyup: {},
    actions: {}
};

events.click.hello = () => {

    let message = new Modal("<strong>HELLO</strong>");

    message.confirm(() => {
        
        let yes = new Modal("YOU SAID YES!");
        yes.alert();

    }, () => {

        let no = new Modal("YOU SAID NO!!");

        no.warn();

    });

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
