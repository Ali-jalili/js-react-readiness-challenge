import { mount } from "./mount.js"


export const diff = function (oldVNode, newVNode, parentEl) {

    if (newVNode === null) {

        if (oldVNode) {
            parentEl.removeChild(oldVNode.el)
        }

        return
    }

    if (oldVNode === null) {
        mount(newVNode, parentEl);
        return;
    }

    if (oldVNode.type !== newVNode.type) {

        parentEl.removeChild(oldVNode.el)

        mount(newVNode, parentEl)

        return
    }




}