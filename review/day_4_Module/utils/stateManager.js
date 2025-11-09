//مدیریت داده‌ها و وضعیت (State)

const TAB_DATA = [
    { id: 'general', title: 'تنظیمات عمومی', content: 'این محتوای بخش تنظیمات عمومی است. (محتوای ثابت)' },
    { id: 'security', title: 'امنیت و حریم خصوصی', content: 'این محتوای مربوط به تنظیمات امنیتی است. (محتوای ثابت)' },
    { id: 'notifications', title: 'اعلان‌ها', content: 'این محتوای مربوط به مدیریت اعلان‌ها است. (محتوای ثابت)' }
];


let activeTabId = TAB_DATA[0].id

export const getTabData = function () {
    return TAB_DATA
}


export const getActiveTabId = function () {
    return activeTabId
}


export function setActiveTabId(newId) {
    const exists = TAB_DATA.some(tab => tab.id === newId);
    if (exists) {
        activeTabId = newId;
    } else {
        console.error(`خطا: Tab ID "${newId}" یافت نشد.`);
    }
}