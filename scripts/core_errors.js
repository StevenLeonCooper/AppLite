import { events } from "./core_events.js";

export const handleError = (error) => {

    try {
        console.log(error);

        window._errors = window._errors || [];

        window._errors.push(error);

        events.trigger("Error", error, document);
    }
    catch (newError) {
        console.log(newError);
    }
};