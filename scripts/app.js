import { events } from './custom_events.js';

import { getHtmlPromise, getJsonPromise, postDataPromise, getScriptPromise } from './helper_ajax.js';

import { Template } from './class_Template.js';

import { Modal } from './class_Modal.js';

import { Benchmark } from './class_Benchmark.js';

import { bindings } from './helper_binding.js';

import { ui } from './helper_ui.js';

class AddressBar {
    constructor() {
        this.urlParameters = {};
    }

    get params() {
        let queryString = window.location.search.replace("?", "");
        let params = queryString.split("&");
        params.forEach((pair) => {
            let arr = pair.split("=");
            this.urlParameters[arr[0]] = arr[1];
        });

        return this.urlParameters;
    }

    param(key) {
        return this.params[key] ?? null;
    }

}

// Decide what you want to import/export for your own project's use. 
export default {
    Template, Modal, Benchmark,
    events, bindings, ui,
    getHtmlPromise, getJsonPromise, postDataPromise, getScriptPromise
};

export const app = {
    Template: Template,
    Modal: Modal,
    Benchmark: Benchmark,
    events: events,
    bindings: bindings,
    ui: ui,
    getHTML: getHtmlPromise,
    getJSON: getJsonPromise,
    postData: postDataPromise,
    getScript: getScriptPromise,
    addressBar: new AddressBar(),

    setup: (() => {

        window.isModule = true;

        /**
        * Here we add event listeners and setup the app. 
        */
        document.body.addEventListener("keyup", (e) => {

            events.keyup[e.target.dataset.keyup]?.(e.target, e);
        });

        document.body.addEventListener("change", (e) => {

            events.change[e.target.dataset.change]?.(e.target, e);
        });

        document.body.addEventListener("click", (e) => {

            events.click[e.target.dataset.click]?.(e.target, e);
        });
        return true;
    })()
};




