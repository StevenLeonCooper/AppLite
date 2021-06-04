
// import {
//     Template, Modal, Benchmark, events, bindings, ui,
//     getHtmlPromise, getJsonPromise, postDataPromise
// } from './scripts/app.js';

import { app } from './scripts/app.js';

document.body.onload = () => {

    console.log(app.addressBar.param("bitch"));


    app.getScript("./scripts/libs/jquery-3.6.0.js").then((res) => {

        if (res) {
            $("#test").html("WINNING!");
        }

    });

    // Example: Setup a template where the data AND template need to be downladed. 
    // In this example, are only do 1 function call and everything else is in the settings. 
    // You could leave the settings blank & setup everything with functions as well. 

    let foo = new app.Template({
        engine: "mustache",
        autoRender: true,
        dataUrl: "api/test.json",
        htmlUrl: "api/partial.html",
        target: "#TestArea",
        stylesheets: ["css/test.css", "css/index.css"],
        scripts: "scripts/libs/jquery-3.6.0.min.js"
    });

    // importPackage returns a promise so we can use the standard then/catch syntax if we want.
    foo.importPackage()
        .then(() => {
            window._debug = foo;
        }).catch((error) => {
            console.log(error);

        });

    let bar = new app.Template({
        engine: "default",
        autoRender: true,
        target: "#TestArea3"
    });

    bar.importContext("api/test.json", true).then(() => {
        bar.load();
    }).catch((error) => {

        console.log(error);
    });

    // Let's get some data asynchronously and log it
    app.getJSON("api/test.json")
        .then((result) => {
            console.log(`We got this text: ${result.someText}`);
        }).catch((error) => {
            console.log(error);
        });

    // (async () => {

    //     try {
    //         let result = await app.getJSON("api/test.json");
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
            let result = await app.getHTML(url);
            let message = new app.Modal(result);
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
        app.getHTML(url)
            .then((result) => {
                let message = new app.Modal(result);
                message.show();
            }).catch((error) => {
                console.log(error);
            });
    }

    // Let's stick this in the click events so it only happens when you click a button. 
    // Normally I wouldn't set events here, just define them in custom_events.js
    app.events.click.hello = sayHello;

    // For fun, let's do an async operation and then calculate how long it took: 
    async function doStuff(url) {
        let result = await app.getJSON(`api/test.json?_=${Math.random()}`);
        console.log(result);
    }

    // Start the timer
    let test = new app.Benchmark("Doing Stuff");
    doStuff().then(() => {
        test.stop(); //Aaaaand TIME!
        console.log(test.detailedResults)
    });

    app.bindings.setup("api/test.json");
};
