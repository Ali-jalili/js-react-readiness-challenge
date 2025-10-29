export const patchProps = function (el, oldProps, newProps) {


    for (let key in newProps) {
        const oldValue = oldProps[key];
        const newValue = newProps[key];

        if (newValue !== oldValue) {
            // ⭐ منطق جدید: اگر رویداد بود، از addEventListener استفاده کن
            if (key.startsWith('on')) {
                const eventName = key.substring(2).toLowerCase();

                // نکتهٔ پیشرفته: باید رویداد قدیمی را حذف کنیم!
                // چرا؟ چون اگر تابع عوض شده باشد، تابع قدیمی هنوز روی المان چسبیده است.
                if (oldValue) {
                    el.removeEventListener(eventName, oldValue);
                }

                el.addEventListener(eventName, newValue);
            }
            // اگر رویداد نبود، صفت عادی است
            else {
                el.setAttribute(key, newValue);
            }
        }
    }

    // حلقه دوم برای حذف صفات
    for (const key in oldProps) {
        if (!(key in newProps)) {
            // ⭐ منطق جدید: اگر صفت حذف شده یک رویداد بود، آن را با removeEventListener حذف کن
            if (key.startsWith('on')) {
                const eventName = key.substring(2).toLowerCase();
                el.removeEventListener(eventName, oldProps[key]);
            } else {
                el.removeAttribute(key);
            }
        }
    }

}