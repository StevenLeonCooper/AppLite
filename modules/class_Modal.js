/**
 * - A class representing a modal window. This is an alternative to using 
 * window.alert() or window.confirm() to provide a better, more consistent
 * browsing experience for users. 
 */
export class Modal {
    constructor(content) {

        let modalWindow = document.createElement("div");

        this.element = modalWindow;

        this.content = content;

        this.callbacks = {
            close: () => { this.element.remove(); }
        };

        this.templates = {
            alert: null,
            warn: null,
            interrupt: null,
            confirm: null,
            textInput: null
        };

        modalWindow.id = "ModalWrapper";

        modalWindow.dataset.mclick = "close";

        modalWindow.addEventListener("click", (e, z) => {
            let action = e.target?.dataset?.mclick;

            this.callbacks[action]?.(e.target);
        });

    }

    /**
     * - Closes the active modal window.
     */
    close() {
        this.element.remove();
    }

    /**
     * - Render the modal window to the page. 
     */
    show() {

        let modalContent = `<div id="ModalContent">${this.content}</div>`;

        this.element.innerHTML = modalContent;

        document.body.appendChild(this.element);
    }

    /**
     * This implementation simply uses an alternate template for the content.
     */
    alert() {
        let template = this.templates.alert ??
            `<h1>Alert</h1><hr>
            <div id="Alert">${this.content}<hr>
                <button data-mclick="close" id="CloseModal">Okay</button>
            </div>`;

        this.content = template;

        this.show();
    }

    /**
     * This implementation includes warning text and returns false. 
     */
    warn() {
        let template = this.templates.warn ??
            `<h1>Warning</h1><hr>
            <div id="Warning">${this.content}<hr>
                <button data-mclick="close" id="CloseModal">Okay</button>
            </div>`;

        this.content = template;

        this.show();

        return false;
    }

    /**
     * Waits for user input before continuing, good for redirecting. 
     * @returns True or Error
     */
    async interrupt() {
        const self = this;

        return new Promise((resolve, reject) => {
            try {
                let template = self.templates.interrupt ??
                    `<h1>Notice</h1><hr>
                    <div id="Notice">${self.content}<hr>
                        <button data-mclick="continueOperation">Continue</button>
                    </div>`;

                self.content = template;

                self.callbacks.continueOperation = () => {
                    resolve(true);
                };

                self.show();

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * - This implementation creates a confirm/decline dialogue and invokes callbacks for each. 
     * @param {function} ifYes 
     * @param {function} ifNo 
     * @returns - a promise object
     */
    async confirm() {

        const self = this;

        return new Promise((resolve, reject) => {

            try {
                let template = self.templates.confirm ??
                    `<h1>Confirm</h1><hr>
                    <div id="Confirm">${self.content}<hr>
                        <button data-mclick="confirmYes">Yes</button>
                        <button data-mclick="confirmNo">No</button>
                    </div>`;

                self.content = template;

                self.callbacks.confirmYes = () => {
                    try {
                        self.close();
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                };

                self.callbacks.confirmNo = () => {
                    try {
                        self.close();
                        resolve(false);
                    } catch (error) {
                        reject(error);
                    }
                };

                self.show();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * This implementation provides text input for the user and then sends it to the provided callback for use. 
     * @returns - a promise object
     */
    async textInput() {

        const self = this;

        return new Promise((resolve, reject) => {
            try {
                let template = self.templates.textInput ??
                    `<h2>Input Text</h2>
                    <textarea id="TextInput" class="modal-input">${self.content}</textarea><hr>
                    <button data-mclick="processTextInput">Continue</button>`;

                self.content = template;

                self.callbacks.processTextInput = (e) => {

                    try {
                        let text = document.getElementById("TextInput").value;

                        self.close();

                        resolve(text);
                    } catch (error) {
                        reject(error);
                    }
                };

                this.show();

            } catch (error) {
                reject(error);
            }

        });


    }
}
