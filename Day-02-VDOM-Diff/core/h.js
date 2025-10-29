//ساخت درخت مجازی (VNode Object).

export const h = function (type, props, children) {

    props = props ?? {}
    children = children ?? [];

    if (!Array.isArray(children)) {
        children = [children]
    }

    return {
        type,
        props,
        children
    };

}