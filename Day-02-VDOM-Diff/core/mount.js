
import { h } from "./h.js"


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

    container.appendChild(el);
    return el;

}



