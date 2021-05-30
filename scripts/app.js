import { events } from './helper_events.js';

import { getJSON, postData } from './helper_ajax.js';

import { Template } from './helper_templates.js';
import mustache from './libs/mustache.js';

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

    // let req = new GET("JSON")
    // .from("api/test.json")
    // .then((data)=>{

    //     console.log(data);

    // }).now();

    getJSON("api/test.json", function (data) {

        let settings = {
            context: data,
            engine: "mustache"
        }

        let test = new Template(settings);
        
        test.import("api/partial.html")
            .then(() => {
                test.render("#TestArea");
            });

    });




};

