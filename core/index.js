import { effectWatch } from "../reactivity/index.js";
import { mountElement } from "./renderer/index.js"

export function createApp(rootComponent) {

    return {
        mount(rootContainer) {
            const context = rootComponent.setup();
            let isMounted = false;
            let prevSubTree;

            effectWatch(() => {
                console.log(context);
                if (!isMounted) {
                    // init
                    isMounted = true;
                    rootContainer.innerHtml = '';
                    const subTree = rootComponent.render(context);
                    mountElement(subTree, rootContainer);
                    prevSubTree = subTree;  
                } else {
                    // update
                    const subTree = rootComponent.render(context);
                    diff(prevSubTree, subTree);
                    prevSubTree = subTree;
                }

                // diff

                // rootContainer.append(element);
            })
        },
    }
}