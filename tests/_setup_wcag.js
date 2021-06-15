import { checkHeadings } from "../modules/helper_wcag.js";

document.addEventListener("click", () => {

    checkHeadings();

},
    { once: true });

import { ajax } from "../modules/helper_ajax.js";

window.ajax = ajax;