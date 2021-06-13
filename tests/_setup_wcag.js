import { checkHeadings } from "../modules/helper_wcag.js";

document.addEventListener("click", ()=>{

    checkHeadings();

}, 
{once: true});