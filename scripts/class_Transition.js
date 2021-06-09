class PropList {
    constructor(properties, element) {
        this.states = 1;
        this.currentState = 1;
        this.properties = properties;
        this.element = element;

        const transform = {
            height: (_val) => {
                element.style.height = "auto";
                let calculated = element.clientHeight;
                element.style.height = `${calculated}px`;
                return `${calculated}px`;
            },
            width: (_val) => {
                element.style.width = "auto";
                let calculated = element.clientWidth;
                element.style.width = `${calculated}px`;
                return `${calculated}px`;
            },
            default: (val) => {
                return val;
            }
        };
        // Enure all arrays are the same size. If no values
        // were given for some, just repeat the first value. 
        for (const key in this.properties) {
            let item = this.properties[key];
            if (Array.isArray(item)) {
                if (item.length > this.states) {
                    this.states = item.length;
                }
                if (item.length < this.states) {
                    let diff = this.states - item.length,
                        i = 0;
                    for (i; i <= diff; i++) {
                        item[i] = item[0];
                    }
                }
                item.forEach((val, index) => {
                    if (val === "*") {
                        item[index] = (transform[key] ?? transform.default)(val);
                    }
                });
            }
        }
    }

    _get(key, index) {
        const self = this;
        return self.properties[key]?.[index] ?? self.properties[key] ?? null;
    }

    in(key) {

        return this._get(key, 0);
    }

    out(key) {

        return this._get(key, 1);
    }

    _advance(index) {

        if (index < this.states) {
            this.currentState = index + 1;
        }
        if (index === this.states) {
            this.currentState = 1;
        }
        if (index > this.states) {
            throw ("Invalid index used on _advance().");
        }
    }
    // TODO: Implement states for advanced animations
    state(key, index) {
        index = index ?? this.currentState;
        this._advance(index);
        return this._get(key, index);
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
        this.flip = false;
        this.props = {};
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

        this.elements.forEach((el) => {
            this.props[el] = new PropList(properties, el);
        });
    }

    _applyData(element, remove) {
        let data = this.toggleData || null;
        if (data === null) return false;
        let classes = data.classes?.split(" ") || [];
        let datasets = data.data || {};

        classes.forEach((className) => {
            element.classList[(remove ? "remove" : "add")](className);
        });

        for (const key in datasets) {
            let item = datasets[key];
            element[`${(remove ? "remove" : "set")}Attribute`](`data-${key}`, item);
        }
    }

    go(flip) {
        let self = this;
        this.elements.forEach((el) => {

            el.classList.add("in-transit");

            el.style.transition = el.style.transition || `all ${self.speed.in}s ease`

            el.addEventListener("transitionend", (e) => {

                el.classList.remove("in-transit");

                self._applyData.bind(self)(el, flip);

            }, { once: true });

            setTimeout(() => {
                for (const key in self.props[el].properties) {
                    el.style[key] = flip ? self.props[el].in(key, el) : self.props[el].out(key, el);
                }
            }, 0);
        });
    }

    /**
     * Toggle between in (default) and out (after) states. 
     * @param {Object} data - Classes/Data to add/remove to the element(s). Format: {classes: "class1 class2", data {prop: val}}
     */
    toggle(data) {
        this.toggleData = data;
        this.go(this.flip);
        this.flip = !this.flip;
    }

}