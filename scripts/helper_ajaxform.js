import { Template } from "./class_Template.js";
import { AddressBar } from "./core_classes.js";
import { handleError } from "./core_errors.js";
import { events } from "./core_events.js";
import { ajax } from "./helper_ajax.js";
import { modal } from "./helper_modal.js";


export const AjaxForm = {};

const actions = {
    render: (data, targetSelector) => {
        let t = new Template({
            target: targetSelector,
            context: data,
            engine: "mustache"
        });
        t.load().render();
    },
    alert: (_data, message) => {
        modal.alert(message);
    },
    redirect: (_data, url) => {
        let loc = new AddressBar();
        loc.redirect(url);
    },
    execute: (data, eventName) => {
        events.actions[eventName]?.(data);
    }
};

AjaxForm.error = (form, error) => {
    let toDo = [];
    toDo = form.dataset.onError?.split(":") ?? ["alert","Error"]
    let action = toDo[0];
    let target = toDo[1];
    actions[action]?.(error, target);
    handleError(error);
    events.trigger(`${form.id}: Failure`, error, `#${form.id}`);
};

AjaxForm.success = (form, result) => {
    let toDo = [];
    toDo = form.dataset.onSuccess?.split(":") ?? ["alert","Success"]
    let action = toDo[0];
    let target = toDo[1];
    actions[action]?.(result, target);
    events.trigger(`${form.id}: Success`, result, `#${form.id}`);
};


AjaxForm.setup = () => {
    document.addEventListener("submit", (e) => {
        if (e.target.dataset.dynamic) {
            e.preventDefault();
            e.stopPropagation();
            AjaxForm.submit(e.target);
            events.trigger();
        }
    });
};

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

    //Submit Data (TODO: what happens after?)
    ajax.postData(form.getAttribute("action"), formData)
        .then((result) => {
            AjaxForm.success(form, result);
        })
        .catch(error => AjaxForm.error(form, error));

};