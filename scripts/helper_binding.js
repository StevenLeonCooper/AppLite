import { View, Model } from './class_Bindable.js';

import { getJsonPromise, getHtmlPromise } from './helper_ajax.js';

export const bindings = {
    models: [],
    views: []
};

const getViews = () => {

    try {
        let viewList = [];

        let targetList = document.querySelectorAll("[data-bind]");

        targetList.forEach((el) => {

            viewList.push(new View(el));

        });
        return viewList;
    } catch (error) {

        return [error];
    }
};

const getModel = async (context) => {

    try {
        if (typeof context === "object") {
            return new Model(context);
        }

        let imported = await getJsonPromise(context);

        return new Model(imported);

    } catch (error) {
        return error;
    }
};

const subscribeViews = (views, sender) => {
    views.forEach((item) => {
        if (item.action === "receive") {
            sender.subscribe(item);
        }
        // give views the initial data value.
        item.receive(sender.getData());
    });
}

const subscribeModels = (models, sender) => {
    models.forEach((item) => {
        if (sender.action === "send") {
            sender.subscribe(item);
        }
    });
}

/**
 * - Setup Bindings
 * @param {any} context 
 */
bindings.setup = async (context) => {

    bindings.models.push(await getModel(context));

    bindings.views = getViews(bindings.pageContext);

    bindings.models.forEach((model) => {
        subscribeViews(bindings.views, model);
    });

    bindings.views.forEach((view) => {
        subscribeModels(bindings.models, view);
    });

    // Updating isn't necessary since the initial setup injects the values

};

bindings.update = (item) => {
    item.send();
}

bindings.updateAll = () => {

    bindings.models.forEach((model) => {
        model.send();
    });

    bindings.views.forEach((view) => {
        view.send();
    });

};



