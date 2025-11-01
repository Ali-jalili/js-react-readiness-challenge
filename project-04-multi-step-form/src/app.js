// -----------------------------------------------------------
// ۱. المان‌های اصلی فرم و مراحل
// -----------------------------------------------------------
const form = document.getElementById('multi-step-form');
const formSteps = document.querySelectorAll('.form-step'); // همه Divهای مرحله
const stepIndicators = document.querySelectorAll('.step-indicator .step'); // نشانگرهای مرحله بالا

// -----------------------------------------------------------
// ۲. دکمه‌های ناوبری
// -----------------------------------------------------------
const prevBtn = document.getElementById('prev-btn'); // دکمه "قبلی"
const nextBtn = document.getElementById('next-btn'); // دکمه "بعدی"
const submitBtn = document.getElementById('submit-btn'); // دکمه "ارسال نهایی"

// -----------------------------------------------------------
// ۳. فیلدهای ورودی (Inputs) برای State و Validation
// -----------------------------------------------------------
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// -----------------------------------------------------------
// ۴. المان‌های نمایش خطا و خلاصه
// -----------------------------------------------------------
// یک NodeList از تمام تگ‌های <small class="error-message"> را می‌گیریم
const errorMessages = document.querySelectorAll('.error-message');
const summaryDiv = document.getElementById('summary');