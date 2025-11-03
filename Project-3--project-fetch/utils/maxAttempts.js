// فرض می‌کنیم تمام تلاش‌ها (retries + 1) را در متغیر maxAttempts داریم.
const maxAttempts = retries + 1;

// ۴. حلقه تلاش: برای هر تلاش یک حلقه ایجاد کن.
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
        // ایجاد یک AbortController محلی برای مدیریت Timeout این تلاش
        const timeoutController = new AbortController();

        // ایجاد Promise برای مدیریت Timeout: این Promise پس از 'timeout' میلی‌ثانیه رد (Reject) می‌شود.
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                timeoutController.abort(); // لغو fetch توسط timeout
                reject(new Error("Timeout exceeded"));
            }, timeout);
        });

        // ۵. عملیات fetch: از Promise.race برای رقابت بین fetch و timeout استفاده کن.
        const fetchPromise = fetch(url, { signal: timeoutController.signal });

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        // ۶. مدیریت موفقیت (Success):
        if (!response.ok) { // وضعیت پاسخ 4xx یا 5xx بود
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // تبدیل به JSON و ذخیره در کش
        const finalData = await response.json();

        // ذخیره در کش (همراه با زمان انقضا)
        cacheManager.set(url, finalData, cacheTTL);

        return finalData; // موفقیت! داده را برگردان و از حلقه خارج شو.

    } catch (error) {
        // ۷. مدیریت خطا/شکست:
        if (error.name === 'AbortError' && error.message !== "Timeout exceeded") {
            // اگر خطا ناشی از لغو خارجی (توسط کاربر در UI) بود، فوراً خطا را پرتاب کن.
            // این به این معنی است که نباید تلاش مجدد انجام شود.
            throw error;
        }

        // اگر تلاش نهایی بود (attempt === maxAttempts)، خطا را پرتاب کن.
        if (attempt === maxAttempts) {
            throw new Error(`Failed after ${maxAttempts} attempts: ${error.message}`);
        }

        // اگر تلاش نهایی نبود، با Exponential Backoff تأخیر ایجاد کن.
        // تأخیر = ۲ به توان (شماره تلاش) * ۱۰۰ میلی‌ثانیه.
        const delayTime = Math.pow(2, attempt) * 100;
        await wait(delayTime); // تابع wait را از قبل فرض می‌کنیم (همانند VDOM)
    }
}