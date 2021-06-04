import { events } from './custom_events.js';

import { getHtmlPromise, getJsonPromise, postDataPromise, getScriptPromise } from './helper_ajax.js';

import { ui } from './helper_ui.js';

/**
 * Class representing the browser's address bar values
 */
class AddressBar {
    constructor() {
        this.urlParameters = {};
        this.initialValue = window.location.href;
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
/**
 * The lite AppLite app object with only the essentials. 
 */
export const app = {
    events: events,
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




