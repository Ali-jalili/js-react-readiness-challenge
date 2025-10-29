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

    if (oldVNode.type === newVNode.type) {
        // 1. یک اشاره به المان واقعی DOM قدیمی بگیرید (برای کار کردن با آن)
        const el = oldVNode.el;

        // 2. اشارهٔ المان واقعی را به VNode جدید منتقل کنید (برای به‌روزرسانی‌های بعدی)
        newVNode.el = el;

        // 3. صفات را مقایسه و به‌روزرسانی کنید
        patchProps(el, oldVNode.props, newVNode.props);

        // 4. مدیریت فرزندان (گام بعدی)
        const oldChildren = oldVNode.children;
        const newChildren = newVNode.children;
    }


    if (typeof newChildren === 'string') {
        // محتوای جدید متن است، اما آیا با محتوای قبلی فرق دارد؟
        if (newChildren !== oldChildren) {
            // اگر قبلی چیزی جز متن بوده یا متن متفاوت بوده، کل محتوای DOM را پاک و متن جدید را جایگزین کن
            el.textContent = newChildren;
        }
    }
    // 4.2. اگر محتوای جدید یک آرایهٔ VNode یا یک VNode است (سناریوی ۵)
    else {
        // 4.2.1. اگر قبلی متن بود، باید آن را حذف کنیم تا بتوانیم المان‌های جدید را نصب کنیم
        if (typeof oldChildren === 'string') {
            el.textContent = ''; // پاک کردن متن قدیمی
        }

        // 4.2.2. مقایسهٔ بازگشتی هر فرزند (گام نهایی)
        // این حلقه، قلب Diffing برای فرزندان است.
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
            // فراخوانی بازگشتی تابع diff برای هر جفت فرزند
            diff(oldChildren[i], newChildren[i], el);
        }

        // 4.2.3. اگر طول آرایه جدید بیشتر است، فرزندان اضافی را نصب کن
        if (newChildren.length > oldChildren.length) {
            for (let i = commonLength; i < newChildren.length; i++) {
                mount(newChildren[i], el);
            }
        }

        // 4.2.4. اگر طول آرایه قدیمی بیشتر است، فرزندان اضافی را حذف کن
        if (oldChildren.length > newChildren.length) {
            for (let i = commonLength; i < oldChildren.length; i++) {
                el.removeChild(oldChildren[i].el);
            }
        }
    }

}