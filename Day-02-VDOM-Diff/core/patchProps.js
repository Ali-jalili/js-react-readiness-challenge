// Day-02-VDOM-Diff/core/patchProps.js (نهایی)
export const patchProps = function (el, oldProps = {}, newProps = {}) {

    // 1. به‌روزرسانی و اضافه کردن صفات
    for (let key in newProps) {
        const oldValue = oldProps[key];
        const newValue = newProps[key];

        if (newValue !== oldValue) {
            if (key.startsWith('on')) {
                const eventName = key.substring(2).toLowerCase();

                // حذف رویداد قدیمی قبل از اضافه کردن جدید
                if (oldValue) {
                    el.removeEventListener(eventName, oldValue);
                }
                el.addEventListener(eventName, newValue);
            }
            else {
                el.setAttribute(key, newValue);
            }
        }
    }

    // 2. حذف صفات قدیمی
    for (const key in oldProps) {
        if (!(key in newProps)) {
            if (key.startsWith('on')) {
                const eventName = key.substring(2).toLowerCase();
                el.removeEventListener(eventName, oldProps[key]);
            } else {
                el.removeAttribute(key);
            }
        }
    }
}