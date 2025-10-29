
export const mount = function (vnode, container) {

    const el = document.createElement(vnode.type);

    for (let key in vnode.props) {

        const value = vnode.props[key];

        if (key.startsWith('on')) {
            const eventName = key.substring(2).toLowerCase();

            el.addEventListener(eventName, value);
        }
        else {
            el.setAttribute(key, value)
        }
    }

    for (const child of vnode.children) {

        if (typeof child === 'string') {

            const textNode = document.createTextNode(child);
            el.appendChild(textNode)
        }

        else {
            mount(child, el);
        }
    }

    container.appendChild(el);
    return el;

}



