import { Transition } from "../scripts/class_Transition.js";
import { handleError } from "../scripts/core_errors.js";

let props = {
    opacity: [1, 0.5],
    backgroundColor: ["gray", "red"],
    height: ["*", "300px"],
    color: ["red"]
};

let animation = new Transition("p", props, ".5");

window._debug = animation;

document.body.addEventListener("click", () => {

    animation.toggle({ classes: "active", data: { foo: "bar" } });

});
