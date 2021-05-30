import { events } from './helper_events.js';

import { getJSON, postData, getAsync } from './helper_ajax.js';

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

    // let req = new GET("JSON")
    // .from("api/test.json")
    // .then((data)=>{

    //     console.log(data);

    // }).now();

    let settings = {
        context: {},
        engine: "mustache",
        autoRender: true,
        target: "#TestArea2"
    }

    let test = new Template(settings);

    test.importPackage("api/test.json", "api/partial.html"); //ASYNC

    let foo = new Template({
        context: { value: "BAR" },
        autoRender: false
    });

    foo.load("#TestTemplate").render("#TestArea");


    const asyncData = getAsync("api/test.json")
        .then((result) => {

            console.log(`Text: ${result.someText}`);

        }).catch((e) => {

            console.log(e ?? "Uh Oh!");
        });


};

