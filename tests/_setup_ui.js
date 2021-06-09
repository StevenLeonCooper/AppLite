import { Transition } from "../scripts/class_Transition.js";

import { dom } from "../scripts/helper_dom.js";


document.body.addEventListener("click", (e) => {

    let source = e.target;

    if (!source.classList.contains("toggler")) return false;

    if(source.dataset.toggleSetup) return false;

    let toggleChild = dom.findSibling(source, ".toggle-child");

    let expand = new Transition(toggleChild, { height: ["0px", "*"] }, ".5");

    source.dataset.toggleSetup = true;

    source.addEventListener("click", expand.toggle.bind(expand));

});
