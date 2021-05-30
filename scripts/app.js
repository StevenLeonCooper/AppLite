import { events } from './helper_events.js';

import { getJSON, postData } from './helper_ajax.js';

import { Template } from './helper_templates.js';

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

        let test = new Template("mustache");
        test.context = data;

        test.import("api/partial.html").then((self) => {
    
            test.render("#TestArea");
    
            
        });

    });




};

