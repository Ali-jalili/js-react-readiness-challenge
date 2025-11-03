// fetchWithPolicy(url,

//     {
//         cacheTTL: 60000,       // 60 ثانیه
//         retries: 3,            // حداکثر تلاش مجدد
//         timeout: 5000,         // تایم‌اوت هر درخواست
//         concurrency: 2,    // حداکثر 2 درخواست همزمان
//         signal: AbortSignal,
//     });


export const fetchWithPolicy = function (url, options) {

    if (cacheManager.has(url)) {

        const cachedData = cacheManager.get(url);

        if (cachedData.expiryTime > currentTime) {

            return Promise.resolve(cachedData.data);
        }

        else {
            // اگر منقضی شده بود، آن را از کش حذف کن تا فضای جدید باز شود.
            cacheManager.delete(url);
        }
    }



}