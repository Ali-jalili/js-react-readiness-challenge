
import { mount } from "./mount.js";
import { patchProps } from "./patchProps.js";

export const diff = function (oldVNode, newVNode, parentEl) {

    // 1. سناریو حذف (Removal)

    if (newVNode === null) {

        if (oldVNode && oldVNode.el) {
            parentEl.removeChild(oldVNode.el);
        }

        return;
    }

    // 2. سناریو اضافه (Addition)
    if (oldVNode === null) {
        mount(newVNode, parentEl);
        return;
    }

    // 3. سناریو جایگزینی (Replacement)
    if (oldVNode.type !== newVNode.type) {
        if (oldVNode.el) {
            parentEl.removeChild(oldVNode.el);
        }
        mount(newVNode, parentEl);
        return;
    }

    // 4. سناریو به‌روزرسانی (Update - تگ‌ها و نوع VNode یکسان هستند)

    // 4.1. مدیریت VNode متنی (Text Node)

    if (newVNode.type === 'text') {
        if (newVNode.children !== oldVNode.children) {
            oldVNode.el.nodeValue = newVNode.children;
        }
        newVNode.el = oldVNode.el;
        return;
    }

    // 4.2. مدیریت VNode المانی (Element VNode)
    if (typeof newVNode.type === 'string') {

        const el = oldVNode.el;
        newVNode.el = el;

        patchProps(el, oldVNode.props, newVNode.props);

        const oldChildren = oldVNode.children || []; // گارد ایمنی
        const newChildren = newVNode.children || []; // گارد ایمنی

        // A. مدیریت محتوای متنی ساده در برابر محتوای پیچیده (فرزندان)
        if (typeof newChildren === 'string') {
            if (newChildren !== oldChildren) {
                el.textContent = newChildren;
            }
        }
        // B. مدیریت محتوای آرایه‌ای (VNodeها)
        else {

            // B.1. اگر قبلی متن بود، باید آن را پاک کنیم
            if (typeof oldChildren === 'string') {
                el.textContent = '';
            }

            // B.2. مقایسهٔ بازگشتی هر فرزند (مقایسهٔ دوقلوها)
            const commonLength = Math.min(oldChildren.length, newChildren.length);

            for (let i = 0; i < commonLength; i++) {
                diff(oldChildren[i], newChildren[i], el);
            }

            // B.3. اگر طول آرایه جدید بیشتر است، فرزندان اضافی را نصب کن
            if (newChildren.length > oldChildren.length) {
                for (let i = commonLength; i < newChildren.length; i++) {
                    mount(newChildren[i], el);
                }
            }

            // B.4. اگر طول آرایه قدیمی بیشتر است، فرزندان اضافی را حذف کن
            if (oldChildren.length > newChildren.length) {
                for (let i = commonLength; i < oldChildren.length; i++) {
                    if (oldChildren[i].el) {
                        el.removeChild(oldChildren[i].el);
                    }
                }
            }
        }
    }
}