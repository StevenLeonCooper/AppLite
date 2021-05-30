import { events } from './custom_events.js';

import { getHtmlPromise, getJsonPromise } from './helper_ajax.js';

import { Template } from './class_Template.js';

import { Modal } from './class_Modal.js';

import { Benchmark } from './class_Benchmark.js';

import { ui } from './helper_ui.js';


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

    // Example: Setup a template where the data AND template need to be downladed. 
    // In this example, are only do 1 function call and everything else is in the settings. 
    // You could leave the settings blank & setup everything with functions as well. 

    let foo = new Template({
        engine: "mustache",
        autoRender: true,
        dataUrl: "api/test.json",
        htmlUrl: "api/partial.html",
        target: "#TestArea"
    });

    // importPackage returns a promise so we can use the standard then/catch syntax if we want.
    foo.importPackage().catch((error) => {
        console.log(error);
    });

    // Let's get some data asynchronously and log it
    getJsonPromise("api/test.json")
        .then((result) => {
            console.log(`We got this text: ${result.someText}`);
        }).catch((error) => {
            console.log(error);
        });

    // (async () => {

    //     try {
    //         let result = await getJsonPromise("api/test.json");
    //         let alert = new Modal(result);
    //         alert.alert();
    //     } catch (error) {
    //         let warning = new Modal(error);
    //         warning.warn();
    //     }
    // })();

    // Let's use an async function to get some HTML data
    // Then let's pop it up on a modal window. 
    async function sayHello() {
        try {
            let url = "api/greeting.html";
            let result = await getHtmlPromise(url);
            let message = new Modal(result);
            message.show();
        }
        catch (error) {
            console.log(error);
        }
    }

    // This function is the SAME as the one above except it doesn't use
    // the async/await syntax and it uses then/catch chaining instead. 
    // Otherwise they're IDENTICAL. Just FYI. 
    function sayHi() {
        let url = "api/greeting.html";
        getHtmlPromise(url)
            .then((result) => {
                let message = new Modal(result);
                message.show();
            }).catch((error) => {
                console.log(error);
            });
    }

    // Let's stick this in the click events so it only happens when you click a button. 
    // Normally I wouldn't set events here, just define them in custom_events.js
    events.click.hello = sayHello;

    // For fun, let's do an async operation and then calculate how long it took: 
    async function doStuff(url) {
        let result = await getJsonPromise(`api/test.json?_=${Math.random()}`);
        console.log(result);
    }

    // Start the timer
    let test = new Benchmark("Doing Stuff");
    doStuff().then(() => {
        test.stop(); //Aaaaand TIME!
        console.log(test.detailedResults)
    });

    ui.textInput("Say Something").then((result)=>{
        document.body.innerHTML = result;
    });

};

