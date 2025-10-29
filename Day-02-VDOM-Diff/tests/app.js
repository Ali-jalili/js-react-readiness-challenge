import { h } from "../core/h.js";
import { mount } from "../core/mount.js";
import { diff } from "../core/diff.js";


const buttonHandler = () => {
    alert('رویداد کلیک روی VDOM با موفقیت اجرا شد!');
    console.log('کلیک ثبت شد.');
}

// VNode اولیه (نسخه ۱)
const VNode1 = h('div', { class: 'vdom-app', id: 'main-container' }, [
    h('h2', null, 'خروجی برنامهٔ Virtual DOM'),
    h('p', { class: 'info-text' }, 'اگر این متن را می‌بینید، VDOM به DOM تبدیل شده است!'),
    h('button', { id: 'test-btn', onclick: buttonHandler }, 'روی من کلیک کن'),
    h('ul', { class: 'item-list' }, [
        h('li', null, 'آیتم شماره ۱'),
        h('li', null, 'آیتم شماره ۲'),
        h('li', null, 'آیتم شماره ۳')
    ])
]);


// VNode جدید (نسخه ۲ - برای مقایسه)
const VNode2 = h('div', { id: 'main-container', class: 'updated-app' }, [ // تغییر: class عوض شده
    h('h2', null, 'خروجی به‌روزرسانی شده با DIFF!'), // تغییر: متن عوض شده
    h('p', { class: 'new-info' }, 'تغییرات با الگوریتم Diff اعمال شدند.'), // تغییر: class و متن
    h('button', { onclick: buttonHandler, disabled: true }, 'دکمه غیرفعال شد'), // تغییر: صفت disabled و متن
]);
// حذف شد: لیست ul در VNode1 وجود داشت اما اینجا حذف شد


// --- مرحلهٔ نصب و تست Diffing (ادغام شده) ---
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    if (root) {

        // 1. نصب نسخهٔ اولیه (VNode1)
        console.log('--- نصب نسخه V1 ---');
        mount(VNode1, root);
        console.log('✅ نصب V1 به DOM واقعی با موفقیت انجام شد!');

        // 2. فراخوانی Diff بعد از ۵ ثانیه
        setTimeout(() => {
            console.log('--- شروع به‌روزرسانی (DIFF V2) ---');

            // فراخوانی تابع diff: مقایسهٔ VNode1 با VNode2 در المان root
            // VNode1 در اینجا نقش oldVNode و VNode2 نقش newVNode را دارد
            diff(VNode1, VNode2, root);

            console.log('✅ به‌روزرسانی Diff با موفقیت اعمال شد!');
        }, 5000);
    }
    else {
        console.error('⛔ المان #root در صفحه پیدا نشد.');
    }
});