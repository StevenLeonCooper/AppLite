class PropList {
    constructor(properties) {
        this.properties = properties;
    }

    _get(key, element, index) {
        const self = this;
        const methods = {
            default: () => {
                return self.properties[key]?.[index] ?? self.properties[key] ?? null;
            },
            height: () => {
                let output = self.properties[key]?.[index] ?? self.properties[key] ?? null;
                if (output == "*") return `${element.clientHeight}px`;
                return output;
            },
            width: () => {
                let output = self.properties[key]?.[index] ?? self.properties[key] ?? null;
                if (output == "*") return `${element.clientHeight}px`;
                return output;
            }
        };

        return (methods[key] ?? methods.default)();
    }

    in(key, element) {

        return this._get(key, element, 0);
    }

    out(key, element) {

        return this._get(key, element, 1);
    }

}

export class Transition {
    /**
     * 
     * @param {string | Array | Node} element - HTML Node(s) to transition (Selector OK)
     * @param {Object} properties - CSS properties as {prop: ['in','out']}
     * @param {number} speedIn - transition duration for "in" (and "out")
     * @param {number} speedOut - (optional) transition duraton for "out"
     */
    constructor(element, properties, speedIn, speedOut) {
        this.props = new PropList(properties);

        this.speed = {
            in: speedIn,
            out: speedOut ?? speedIn
        };

        this.elements = [element];

        if (typeof element === "string") {
            this.elements = Array.from(document.querySelectorAll(element));
        }

        if (Array.isArray(element)) {
            this.elements = element;
        }

        this.flip = false;
    }

    go(flip) {
        let self = this;
        this.elements.forEach((el) => {
            el.style.opacity = 0;

            el.classList.add("in-transit");

            console.log("in transit");

            el.style.transition = el.style.transition || `all ${self.speed.in}s ease`

            el.addEventListener("transitionend", (e) => {

                el.classList.remove("in-transit");

                console.log("transition over");

            }, { once: true });

            setTimeout(() => {
                for (const key in self.props.properties) {

                    el.style[key] = flip ? self.props.in(key, el) : self.props.out(key, el);

                    console.log("prop changed");
                }
            }, 0);
        });
    }

    toggle() {

        this.go(this.flip);
        this.flip = !this.flip;

    }

}