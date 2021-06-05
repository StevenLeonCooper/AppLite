import { app } from '../scripts/app.js';

const AjaxForm = {};

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
    app.ajax.postData(form.getAttribute("action"), formData)
        .then((result) => {
            window._debug = result;
            app.modal.alert("It Worked.");
        })
        .catch(error => app.handleError(error));

};

document.addEventListener("submit", (e) => {
    if (e.target.dataset.dynamic) {
        e.preventDefault();
        e.stopPropagation();
        AjaxForm.submit(e.target);
    }
});