import { Modal } from './class_Modal.js';

import { handleError } from './core_errors.js';

export const modal = {};

/**
 * Show content in a modal window. 
 * @param {HTML} content 
 */
modal.show = (content) => {
    let modalWindow = new Modal(content);
    modalWindow.show();
}

/**
 * Show content in an alert box with an "okay" button.
 * This does NOT interrupt program flow. 
 * @param {HTML} content 
 */
modal.alert = (content) => {
    let modalWindow = new Modal(content);
    modalWindow.alert();
};

/**
 * Show content in an alert box with warning dialogue. 
 * This does NOT interrupt program flow. 
 * @param {HTML} content 
 * @returns FALSE (Always)
 */
modal.warn = (content) => {
    let modalWindow = new Modal(content);
    return modalWindow.warn();
};

// Internal function for executing async operations
const asyncOperation = async (op, content) => {
    try {
        let modalWindow = new Modal(content);

        let result = await modalWindow[op]?.();

        return result;

    } catch (error) {
        handleError(error);
        return false;
    }
};

/**
 * Show content in a modal window with a "Continue" button. 
 * This is asynchronus so it can be used to interrupt program flow. 
 * @param {HTML} content 
 * @returns a Promise object (True for normal, False for Error)
 */
modal.interrupt = async (content) => {
    return await asyncOperation("interrupt", content);
};

/**
 * Show content in a modal window with "Yes" and "No" buttons. 
 * Can be used to interrupt program flow.
 * @param {HTML} content 
 * @returns a Promise object, True for "Yes" and False for "No". 
 */
modal.confirm = async (content) => {
    return await asyncOperation("confirm", content);
};

/**
 * Show content in a modal window with a <textarea> for input. 
 * Can be sued to interrupt program flow. 
 * @param {HTML} content 
 * @returns a Promise object with the text entered or False on error. 
 */
modal.textInput = async (content) => {
    return await asyncOperation("textInput", content);
}

