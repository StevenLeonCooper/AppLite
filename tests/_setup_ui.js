import { Transition } from "../scripts/helper_ui.js";

let props = { 
    opacity: [1, 0.5],
    backgroundColor: ["gray","red"],
    height: ["*","300px"]
};

let animation = new Transition("#AppWrapper", props, ".5");

document.body.addEventListener("click", ()=>{

    animation.toggle();

});
