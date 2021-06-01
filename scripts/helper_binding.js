
import mustache from './libs/mustache.js';

import { getJsonPromise, getHtmlPromise } from './helper_ajax.js';

export const bindings = {
    models: [],
    views: []
};

class Bindable {
    constructor() {
        this.subscribers = [];
        this.subscriptions = [];
    }

    send() {
        this.subscribers.forEach((item) => {
            item.receive?.(this.getData());
        });
    }

    receive(data) {
        this.setData(data);
    }

    getData() {
        // Implemented at the View/Model level
    }

    setData() {
        // Implemented at the View/Modal level
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        subscriber.subscriptions?.push(this);
    }

    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter(x => x == subscriber);
        subscriber.subscriptions = subscriber.subscriptions.filter(x => x == this);
    }
}

class View extends Bindable {
    constructor(element) {
        super();
        let bindInfo = element.dataset.bind?.split(":");
        this.quiet = false; // prevents sends on an update
        this.element = element;
        this.action = bindInfo?.[0];
        this.target = bindInfo?.[1];
        this.subContext = element.dataset.context;
        this.template = this.element.querySelector("template")?.innerHTML;

        if (element.dataset.bindOn) {
            element.addEventListener(element.dataset.bindOn, this.send.bind(this));
        }
    }

    setData(data) {
        let method = `render_${this.target}`;
        this[method]?.(data);
    }

    getData() {
        let data = this.element[this.target] ?? null;

        let wrapper = {};

        wrapper[this.subContext ?? "data"] = data;

        return wrapper;
    }

    setContext(context) {
        this.subscriptions = [context];
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

    send() {
        if (this.quiet === true) return false;
        super.send();
    }
}

class Model extends Bindable {
    constructor(data) {
        super();
        this.data = data;
        this.quiet = false; // prevents sends on an update
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = { ...this.data, ...data }
        this.send();
    }

    replaceData(newData) {
        this.data = newData;
        this.send();
    }

    send() {
        if (this.quiet === true) return false;
        super.send();
    }
}

const getViews = () => {

    try {
        let viewList = [];

        let targetList = document.querySelectorAll("[data-bind]");

        targetList.forEach((el) => {

            viewList.push(new View(el));

        });
        return viewList;
    } catch (error) {

        return [error];
    }
};

const getModel = async (context) => {

    try {
        if (typeof context === "object") {
            return new Model(context);
        }

        let imported = await getJsonPromise(context);

        return new Model(imported);

    } catch (error) {
        return error;
    }
};

const subscribeViews = (views, sender) => {
    views.forEach((item) => {
        if (item.action === "receive") {
            sender.subscribe(item);
        }
        // give views the initial data value.
        item.receive(sender.getData());
    });
}

const subscribeModels = (models, sender) => {
    models.forEach((item) => {
        if (sender.action === "send") {
            sender.subscribe(item);
        }
    });
}

/**
 * - Setup Bindings
 * @param {any} context 
 */
bindings.setup = async (context) => {

    bindings.models.push(await getModel(context));

    bindings.views = getViews(bindings.pageContext);

    bindings.models.forEach((model) => {
        subscribeViews(bindings.views, model);
    });

    bindings.views.forEach((view) => {
        subscribeModels(bindings.models, view);
    });

    // Updating isn't necessary since the initial setup injects the values

};

bindings.update = (item) => {
    item.send();
}

bindings.updateAll = () => {

    bindings.models.forEach((model) => {
        model.send();
    });

    bindings.views.forEach((view) => {
        view.send();
    });

};



