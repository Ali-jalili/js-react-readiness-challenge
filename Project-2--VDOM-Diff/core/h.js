// Day-02-VDOM-Diff/core/h.js (نهایی)
export const h = function (type, props = null, children = []) {

    if (!Array.isArray(children)) {
        children = [children];
    }

    return {
        type: type,
        props: props,
        children: children,
        el: null
    }
}