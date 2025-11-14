
// این ماژول تنها مسئول نمایش وضعیت (State) فعلی در DOM است.

// 1. تعریف ثابت‌های DOM
// المانی که محتوای داینامیک (لودینگ، خطا، داده) در آن تزریق می‌شود.
const $contentArea = document.querySelector('#content-area');

// کانتینر تب‌ها برای مدیریت کلاس 'active'.
const $tabContainer = document.querySelector('#tab-container');