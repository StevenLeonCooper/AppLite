import { Modal } from './class_Modal.js';

export const modal = {};

modal.message = (content) => {
    let modal = new Modal(content);
    modal.show();
}

modal.alert = (content) => {
    let modal = new Modal(content);
    modal.alert();
};

modal.warn = (content) => {
    let modal = new Modal(content);
    return modal.warn();
};

modal.confirm = async (content) => {

    try {
        let modal = new Modal(content);

        let result = await modal.confirm();

        return result;
    } catch (error) {
        return error;
    }
};

modal.textInput = async (content) => {
    try {
        let modal = new Modal(content);

        let result = await modal.textInput();

        return result;

    } catch (error) {
        return error;
    }
}