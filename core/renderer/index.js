// n1:old n2:new
export function diff(n1, n2) {
    // 1. tag
    if (n1.tag !== n2.tag) {
        n1.el.replaceWith(document.createElement(n2.tag))
    } else {
        // 2. props
        n2.el = n1.el;

        // 3. children -> (暴力的解法)
    }
}

export function mountElement(vnode, container) {
    const { tag, props, children } = vnode;
    // tag
    const el = (vnode.el = document.createElement(tag));

    // props
    if (props) {
        for (const key in props) {
            const val = props[key];
            el.setAttribute(key, val);
        }
    }

    // children
    // 1.接受一个 String
    if (typeof children === "string") {
        const textNode = document.createTextNode(children);
        el.append(textNode);
    }
    // 2.接受一个 数组
    if (Array.isArray(children)) {
        children.forEach((v) => {
            mountElement(v, el);
        })
    }


    // 插入
    container.append(el);
}