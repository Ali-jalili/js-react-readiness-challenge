import { mount } from "./mount.js";
// import patchProps from "./patchProps.js" // باید patchProps را هم import کنید

export const diff = function (oldVNode, newVNode, parentEl) {

    // 1. سناریو حذف (Removal)
    if (newVNode === null) {
        if (oldVNode) {
            parentEl.removeChild(oldVNode.el)
        }
        return
    }

    // 2. سناریو اضافه (Addition)
    if (oldVNode === null) {
        mount(newVNode, parentEl);
        return;
    }

    // 3. سناریو جایگزینی (Replacement)
    if (oldVNode.type !== newVNode.type) {
        parentEl.removeChild(oldVNode.el)
        mount(newVNode, parentEl)
        return
    }

    // 4. سناریو به‌روزرسانی (Update - تگ‌ها یکسان هستند)
    if (oldVNode.type === newVNode.type) {

        const el = oldVNode.el;
        newVNode.el = el; // انتقال اشاره به DOM واقعی به VNode جدید

        // فرض می‌کنیم patchProps در همین فایل یا import شده است
        patchProps(el, oldVNode.props, newVNode.props); // بروزرسانی صفات

        const oldChildren = oldVNode.children;
        const newChildren = newVNode.children;

        // A. مدیریت محتوای متنی ساده در برابر محتوای پیچیده
        if (typeof newChildren === 'string') {

            // محتوای جدید متن است، آیا با محتوای قبلی فرق دارد؟
            if (newChildren !== oldChildren) {
                el.textContent = newChildren; // جایگزینی سریع با متن جدید
            }
        }

        // B. مدیریت محتوای آرایه‌ای (VNodeها)
        else {

            // B.1. اگر قبلی متن بود، باید آن را پاک کنیم تا بتوانیم المان‌های جدید را نصب کنیم
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
                    el.removeChild(oldChildren[i].el);
                }
            }
        }
    } // بلاک if نهایی اینجا به درستی بسته می‌شود
}