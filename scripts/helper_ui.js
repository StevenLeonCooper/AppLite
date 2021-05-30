import { Modal } from './class_Modal.js';

export const ui = {};

ui.message(content){
    let modal = new Modal(content);
    modal.show();
}

ui.alert = (content) => {
    let modal = new Modal(content);
    modal.alert();
};

ui.warn = (content) => {
    let modal = new Modal(content);
    return modal.warn();
};

ui.confirm = async (content) => {

    try {
        let modal = new Modal(content);

        let result = await modal.confirm();

        return result;
    } catch (error) {
        return error;
    }
};

ui.textInput = async (content) => {
    try {
        let modal = new Modal(content);

        let result = await modal.textInput();

        return result;

    } catch (error) {
        return error;
    }
}