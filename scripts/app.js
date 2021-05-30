import { events } from './custom_events.js';

import { getHtmlPromise, getJsonPromise } from './helper_ajax.js';

import { Template } from './class_Template.js';


/**
 * Here we add event listeners and setup the app. 
 */
document.body.addEventListener("keyup", (e) => {

    let source = e.target;

    events.keyup[source.dataset.keyup]?.(source, e);
});

document.body.addEventListener("change", (e) => {

    let source = e.target;

    events.change[source.dataset.change]?.(source, e);
});

document.body.addEventListener("click", (e) => {

    let source = e.target;

    events.click[source.dataset.click]?.(source, e);
});

document.body.onload = () => {

    let foo = new Template({
        engine: "mustache",
        autoRender: true,
        dataUrl: "api/test.json",
        htmlUrl: "api/partial.html",
        target: "#TestArea"
    });

    foo.importPackage().catch((error)=>{
        console.log(error);
    });

};

