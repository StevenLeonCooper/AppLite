import mustache from './libs/mustache.js';

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

export class View extends Bindable {
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
        this[method]?.bind(this)?.(data);
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

export class Model extends Bindable {
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