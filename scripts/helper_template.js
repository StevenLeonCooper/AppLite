export const basicRender = (html, context) => {

    let workshop = document.createElement("div");

    workshop.innerHTML = html;

    workshop.querySelectorAll("[data-context]").forEach((el)=>{

        let binding = el.dataset.context?.split(".");

        let cache = context;

        binding.forEach((key)=>{
            cache = cache[key];
        });

        el.textContent = interpretData(cache);

    });
    return workshop.innerHTML;
};

const interpretData = (data) => {

    // This is where you would customize instead of just convert everything to a string.

    return `${data}`;
};