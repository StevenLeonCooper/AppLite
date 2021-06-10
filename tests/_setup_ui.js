import { Transition } from "../modules/class_Transition.js";

import { dom } from "../modules/helper_dom.js";

import { events } from "../modules/core_events.js";


events.when(".toggler").clicked((e) => {
    let toggler = e.target;
    let toggleChild = dom.findSibling(toggler, ".toggle-child");
    let expand = new Transition({
        target: toggleChild,
        speedIn: ".6s",
        speedOut: ".2s",
        css: {
            height: ["0px", "*"],
        }
    });
    toggler.addEventListener("click", expand.toggle.bind(expand));
    toggler.click();
}, { once: true });
