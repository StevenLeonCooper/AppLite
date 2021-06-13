import { checkHeadings } from "../scripts/helper_wcag.js";

document.addEventListener("click", ()=>{

    checkHeadings();

}, 
{once: true});