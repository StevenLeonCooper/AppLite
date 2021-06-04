import {AddressBar, Benchmark} from './core_classes.js';

import {handleError} from './core_errors.js';

import { events } from './core_events.js';


/**
 * The bare minimum files for applite to function. This version
 * Only has event delegation, error handling, URL parameters and
 * the Benchmark class for testing speed. 
 */
export const app = {
    Benchmark: Benchmark,
    events: events,
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




