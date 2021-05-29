import { UI } from './helper_ui.js';

export const appBindings = {};

export class binding {
    constructor(sourceElement, bindingString) {

        let values = bindingString.split(" of ").join(",").split(" with ").join(",").split(": ").join(",").split(",");

        this.method = values[0];
        this.targetData = values[1];
        this.targetSelector = values[2].replace("{", "").replace("}", "");
        this.sourceData = values[3];
        this.source = sourceElement;
        this.history = [];
        appBindings[this.source.id || this.source.name] = this;
    }

    replace() {

        let target = document.querySelector(this.targetSelector);

        let data = UI.get[this.sourceData]?.(this.source);

        let result = UI.set[this.targetData]?.(target, data);

        this.history.push(result);
    };

    insert() {

        let target = document.querySelector(this.targetSelector);

        let data = UI.get[this.sourceData]?.(this.source);

        let result = UI.add[this.targetData]?.(target, data);

        this.history.push(result);
    }

    update() {
        this[this.method]?.();
    }

}