import { Transition } from "../scripts/class_Transition.js";

let props = {
    opacity: [1, 0.5],
    backgroundColor: ["", "yellow"],
    height: ["*", "300px"],
    color: ["black", "red"],
    width: ["*","350px"]
};

let animation = new Transition("p", props, ".5");

document.body.addEventListener("click", () => {

    animation.toggle({ classes: "active", data: { foo: "bar" } });

});
