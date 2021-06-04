import {AddressBar, Benchmark} from './core_classes.js';

import {handleError} from './core_errors.js';

import { events } from './core_events.js';

import { ajax } from './helper_ajax.js';

import { bindings } from './helper_binding.js';

import { modal } from './helper_modal.js';

import { template } from './helper_template.js';

// Some may prefer to just use this class as-is without the helper. 
import { Template } from './class_Template.js';

/**
 * The full AppLite app object with all optional modules. 
 */
export const app = {
    Template: Template,
    Benchmark: Benchmark,
    template: template,
    events: events,
    bindings: bindings,
    modal: modal,
    ajax: ajax,
    handleError: handleError,
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




