fetchWithPolicy(url, {
    cacheTTL: 60000,       // 60 ثانیه
    retries: 3,            // حداکثر تلاش مجدد
    timeout: 5000,         // تایم‌اوت هر درخواست
    concurrency: 2         // حداکثر 2 درخواست همزمان
});


