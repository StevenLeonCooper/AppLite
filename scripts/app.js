import { events } from './helper_events.js';

import {Request, GET, POST, getJSON, postData} from './helper_ajax.js';

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

    getJSON("api/test.json", function(data){

        console.log(data);

    });


};

