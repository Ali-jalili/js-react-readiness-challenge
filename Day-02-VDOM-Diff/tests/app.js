import { h } from "../core/h.js";
import { mount } from "../core/mount.js";


const buttonHandler = () => {
    alert('رویداد کلیک روی VDOM با موفقیت اجرا شد!');
    console.log('کلیک ثبت شد.');
}


// --- ساخت درخت مجازی (VNode) ---

const VNodeApp = h('div', { class: 'vdom-app', id: 'main-container' }, [
    // 1. تگ عنوان (H2)
    h('h2', null, 'خروجی برنامهٔ Virtual DOM'),

    // 2. تگ پاراگراف با یک رویداد
    h('p', { class: 'info-text' }, 'اگر این متن را می‌بینید، VDOM به DOM تبدیل شده است!'),

    // 3. تگ Button با رویداد onclick
    h('button', { id: 'test-btn', onclick: buttonHandler }, 'روی من کلیک کن'),

    // 4. لیست تودرتو (تست بازگشت/Recursion)
    h('ul', { class: 'item-list' }, [
        h('li', null, 'آیتم شماره ۱'),
        h('li', null, 'آیتم شماره ۲'),
        h('li', null, 'آیتم شماره ۳')
    ])
]);



// --- مرحلهٔ نصب (Mounting) ---
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    if (root) {
        console.log('--- درخت مجازی ساخته شد: ---');
        console.log(VNodeApp);

        mount(VNodeApp, root)
        console.log('✅ نصب VDOM به DOM واقعی با موفقیت انجام شد!');
    }

    else {
        console.error('⛔ المان #root در صفحه پیدا نشد. مطمئن شوید تگ <script> در پایین <body> قرار دارد.');
    }

})