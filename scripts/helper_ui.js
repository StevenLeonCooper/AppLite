import mustache from "./libs/mustache.js";

import { events } from "./helper_events.js";

export const UI = {};

UI.get = {
    innerHTML: (source) => {
        return source.innerHTML;
    },
    textContent: (source) => {
        return source.textContent;
    },
    value: (source) => {
        return source.value;
    },
    template: (source) => {

        let selector = `[data-for='${source.id || source.name}']`;

        let html = document.querySelector(selector).innerHTML;

        //TODO: Implement Context
        let rendered = mustache.render(html, {});

        return rendered;
    }
}

UI.set = {
    innerHTML: (target, data) => {
        target.innerHTML = data;
        return `target HTML is now ${data}`;
    },
    textContent: (target, data) => {
        target.textContent = data;
        return `target text is now ${data}`;
    },
    value: (target, data) => {
        target.value = data;
        return `target value is now ${data}`;
    }
}

UI.add = {
    innerHTML: (target, data) => {
        target.innerHTML = target.innerHTML + data;
    },
    textContent: (target, data) => {
        target.textContent = target.textContent + data;
    },
    value: (target, data) => {
        target.value = target.value + data;
    }
}

const closeModal = () => {
    document.getElementById("ModalWrapper")?.remove();
};

UI.modal = (content) => {

    events.click.closeModal = events.click.closeModal || closeModal;

    let template = `<div data-click="closeModal" id="ModalContent">${content}</div>`;

    let wrapper = document.createElement("div");

    wrapper.id = "ModalWrapper";

    wrapper.dataset.click = "closeModal";

    wrapper.innerHTML = template;

    document.body.appendChild(wrapper);
};

UI.alert = (message) => {
    let template = `<h1>Alert</h1><hr><div id="Alert">${message}<hr><button data-click="closeModal">Okay</button></div>`;

    UI.modal(template);

};

UI.warning = (message) => {

    let template = `<h1>Warning</h1><hr><div id="Warning">${message}<hr><button data-click="closeModal">Okay</button></div>`;

    UI.modal(template);

    return false;
};

UI.confirm = (message, ifYes, ifNo) => {

    let template = `<h1>Confirm</h1><hr>
                    <div id="Confirm">${message}<hr>
                    <button data-click="confirmYes">Yes</button>
                    <button data-click="confirmNo">No</button>
                    </div>`;

    events.click.confirmYes = () => {
        closeModal();
        ifYes?.();
    };

    events.click.confirmNo = () => {
        closeModal();
        ifNo?.();
    };

    UI.modal(template);

};

UI.textInput = (callback) => {

    let template = `<h2>Input Text</h2>
                    <textarea id="TextInput" class="modal-input">Copy/Paste Here</textarea>
                    <hr>
                    <button data-click="processTextInput">Continue</button>
                    `;

    events.click.processTextInput = (e) => {

        let text = document.getElementById("TextInput").value;

        closeModal();

        callback.call(e.target, text);        
    };

    UI.modal(template);
};



// Mustache

// let exampleFunc =  function () {
//     return function (object, render) {
//         var rendered = render(object);
//          return rendered;          
//     };
// },