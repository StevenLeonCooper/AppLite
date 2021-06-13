const validateOrder = (current, next) => {
    if (next == null) return true;
    current = current.toLowerCase();
    next = next.toLowerCase();
    const allowed = {
        h1: ["h1", "h2"],
        h2: ["h1", "h2", "h3"],
        h3: ["h1", "h2", "h3", "h4"],
        h4: ["h1", "h2", "h3", "h4", "h5"],
        h5: ["h1", "h2", "h3", "h4", "h5", "h6"],
        h6: ["h1", "h2", "h3", "h4", "h5", "h6"]
    }
    return allowed[current].some(x => x == next);
}

export const checkHeadings = () => {

    let headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headings.forEach((heading, i, data) => {

        let nextTag = data[i + 1];

        if (!validateOrder(heading.tagName, nextTag?.tagName ?? null)) {


            nextTag.style.color = "red";
            nextTag.style.fontWeight = "bold";
            nextTag.innerHTML = `(OUT OF ORDER) - ${nextTag.innerHTML}`;
            nextTag.style.cursor = "help";
            nextTag.title = "Do not skip headings, keep them in order (1, 2, 3, etc.)"
        }
    });
};
