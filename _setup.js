
// import {
//     Template, Modal, Benchmark, events, bindings, ui,
//     getHtmlPromise, getJsonPromise, postDataPromise
// } from './scripts/app.js';

import { app } from './modules/app.js';

// Here's one (bad) way you could handle errors beyond just logging them. 
document.addEventListener("Error", (event) => {

    app.modal.warn(`An Error Occured!<br>Error: ${event.detail.message} `);

});


document.body.onload = () => {

    debugger;

    app.ajax.getJSONP("/api/jsonp.php").then((data) => {

        window._jsonp = data;
        console.log("jsonp good");

    }).catch((error) => {
        window._jsonp = error;
        console.log("jsonp bad");
    });

    app.ajax.getScript("./modules/libs/jquery-3.6.0.js").then((res) => {

        if (res) {
            $("#test").html("WINNING!");
        }

    });

    // Example: Setup a template where the data AND template need to be downladed. 
    // In this example, are only do 1 function call and everything else is in the settings. 
    // You could leave the settings blank & setup everything with functions as well. 

    app.template
        .new({
            engine: "mustache",
            autoRender: true,
            dataUrl: "api/test.json",
            htmlUrl: "api/partial.html",
            target: "#TestArea",
            method: "appendOnce",
            stylesheets: ["css/test.css", "css/index.css"],
            scripts: "modules/libs/jquery-3.6.0.min.js"
        })
        .importPackage()
        .then((res) => {
            window._debug = res;
        })
        .catch((error) => {
            app.handleError(error);
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
    app.ajax.getJSON("api/test.json")
        .then((result) => {
            console.log(`We got this text: ${result.someText}`);
        }).catch((error) => {
            console.log(error);
        });


    // Let's use an async function to get some HTML data
    // Then let's pop it up on a modal window. 
    async function sayHello() {
        try {
            let url = "api/greeting.html";
            let result = await app.ajax.getAny(url);
            app.modal.show(result);

        }
        catch (error) {
            console.log(error);
        }
    }

    // Let's stick this in the click events so it only happens when you click a button. 
    // Normally I wouldn't set events here, just define them in custom_events.js
    app.events.click.hello = sayHello;

    app.bindings.setup("api/test.json");
};
