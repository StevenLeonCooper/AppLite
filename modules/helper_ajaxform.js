import { Template } from "./class_Template.js";
import { AddressBar } from "./core_classes.js";
import { handleError } from "./core_errors.js";
import { events } from "./core_events.js";
import { ajax } from "./helper_ajax.js";
import { modal } from "./helper_modal.js";

/**
 * This Ajax Forms plugin allows you to easily submit forms
 * via XHR request. Without any additional JavaScript you can 
 * have the form render a template onto the page, open a modal
 * diaglogue window or redirect to a "thank you" page. 
 */
export const AjaxForm = {};

const actions = {
    // These are the most basic options. You could 
    // easily further customize this with other combinations
    // of functions/events like interrupts/confirmation diaglues. 
    render: (data, targetSelector) => {
        let t = new Template({
            target: targetSelector,
            context: data
        });
        t.load().render();
    },
    alert: (_data, message) => {
        modal.alert(message);
    },
    renderAlert: (data, templateSelector) => {
        let t = new Template({ context: data });
        t.load(templateSelector).render();
        modal.alert(t.rendered);
    },
    navigate: (_data, url) => {
        let loc = new AddressBar();
        loc.safeNavigate(url, async () => {
            return await modal.interrupt("Redirecting.");
        });
    },
    eventAction: (data, eventName) => {
        events.actions[eventName]?.(data);
    }
};

function doAction(key, parameter) {
    let toDo = key?.split?.(": ") ?? ["silent", "Error"]
    let action = toDo[0];
    let target = toDo[1];
    actions[action]?.(parameter, target);
}

AjaxForm.error = (form, error) => {
    doAction(form.dataset.onError, error);
    handleError(error);
    events.trigger(`${form.id}: Failure`, error, `#${form.id}`);
};

AjaxForm.success = (form, result) => {
    doAction(form.dataset.onSuccess, result);
    events.trigger(`${form.id}: Success`, result, `#${form.id}`);
};

AjaxForm.setup = () => {
    document.addEventListener("submit", (e) => {
        if (e.target.dataset.ajax) {
            e.preventDefault();
            e.stopPropagation();
            AjaxForm.submit(e.target);
        }
    });
};

/**
 * Submits the form. A "{FormId}: Success" or "{FormId}: Failure" event will
 * be triggered on the form itself after being submitted. 
 * @param {Node} form 
 * @returns 
 */
AjaxForm.submit = (form) => {

    let formData = {};

    if (!form) return false;

    //Standard inputs with value attributes. 
    form.querySelectorAll("input:not([type='radio']):not([type='checkbox']), select, textarea")
        .forEach((el) => {
            formData[el.id] = el.value;
        });

    // Complex inputs with no simple "value" element to aggregate data. 
    form.querySelectorAll("input[type='radio']:checked, input[type='checkbox']:checked")
        .forEach((el) => {
            formData[el.name] = el.value;
        });

    // Submit Data. 
    ajax.postData(form.getAttribute("action"), formData)
        .then((result) => {
            AjaxForm.success(form, result);
        })
        .catch(error => AjaxForm.error(form, error));

};