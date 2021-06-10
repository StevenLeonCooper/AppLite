import { Transition } from "../scripts/class_Transition.js";

import { dom } from "../scripts/helper_dom.js";


document.querySelectorAll(".toggler").forEach((toggler) => {
    toggler.addEventListener("click", () => {
        let toggleChild = dom.findSibling(toggler, ".toggle-child");
        let expand = new Transition({
            target: toggleChild,
            easing: "ease-out",
            speedIn: ".6s",
            speedOut: ".2s",
            css: {
                height: ["0px", "*"],
                backgroundColor: ["transparent", "yellow"]
            }
        });
        toggler.addEventListener("click", expand.toggle.bind(expand));
        toggler.click();
    }, { once: true }
    );
});
