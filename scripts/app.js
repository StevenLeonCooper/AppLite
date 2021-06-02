import { events } from './custom_events.js';

import { getHtmlPromise, getJsonPromise, postDataPromise } from './helper_ajax.js';

import { Template } from './class_Template.js';

import { Modal } from './class_Modal.js';

import { Benchmark } from './class_Benchmark.js';

import { bindings } from './helper_binding.js';

import { ui } from './helper_ui.js';

// Decide what you want to import/export for your own project's use. 
export default {
    Template, Modal, Benchmark,
    events, bindings, ui,
    getHtmlPromise, getJsonPromise, postDataPromise
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
    postData: postDataPromise
};

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

