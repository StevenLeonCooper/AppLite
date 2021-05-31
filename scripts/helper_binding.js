import { events } from './custom_events.js';

import mustache from './libs/mustache.js';

import { getJsonPromise, getHtmlPromise } from './helper_ajax.js';

export const bindings = {
    pageContext: {},
    elements: []
};

class Binding {
    constructor(element, action, target, subContext) {
        this.element = element;
        this.action = action;
        this.target = target;
        this.subContext = subContext;
        this.template = this.element.querySelector("template")?.innerHTML;
    }

    render_innerHTML(context) {
        context = context[this.subContext] ?? context;
        this.element.innerHTML = context;
    }

    render_template(context) {
        context = context[this.subContext] ?? context;
        if (this.template) {
            this.element.innerHTML = mustache.render(this.template, context);
        }
    }

    render_value(context) {
        context = context[this.subContext] ?? context;
        this.element.value = context;
    }
}

const buildItemLIst = () => {

    try {
        let targetList = document.querySelectorAll("[data-bind]");
        let elementList = [];

        targetList.forEach((el) => {

            let bindInfo = el.dataset.bind?.split(":");
            let bindAction = bindInfo[0] ?? false;
            let bindTarget = bindInfo[1] ?? false;
            let subContext = el.dataset.context ?? "";

            elementList.push(new Binding(el, bindAction, bindTarget, subContext));

        });
        return elementList;
    } catch (error) {
        return false;
    }
};

const getContext = async (context) => {

    try {
        if (typeof context === "object") {
            return context;
        }

        let imported = await getJsonPromise(context);

        return imported;
    } catch (error) {
        return error;
    }
};

/**
 * - Setup Bindings
 * @param {any} context 
 */
bindings.setup = async (context) => {

    bindings.elements = buildItemLIst();

    bindings.pageContext = await getContext(context);

    bindings.update();
};


const Actions = {
    sync: (binding, context) => {
        console.log("Sync Not Defined Yet.");
    },
    send: (binding, context) => {
        console.log("Send Not Defined Yet.");
    },
    receive: (binding, context) => {

        let t = binding[binding.target];

        binding?.["render_" + binding.target]?.(context);
    }
};

bindings.update = () => {

    bindings.elements.map((item) => {

        let action = Actions[item.action];

        action?.(item, bindings.pageContext);

    });

};



