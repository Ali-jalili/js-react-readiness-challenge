import { validateStepSync } from "./validation.js";

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




//قلب تپنده پروژه
//تعریف State مرکزی است  

const appState = {

    // نگه داری داده های خام

    formData: {

        name: '',
        phone: '',
        email: '',
        password: '',
    },


    //برای مدیریت وضعیت فرم

    formStatus: {

        currentStep: 1, // 👈 تعریف مقدار پیش‌فرض
        errors: {},     // 👈 تعریف آبجکت خطاها
    }

};

//بروز رسانی State

const updateUIForStep = function (newStep) {

    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    submitBtn.style.display = 'none'


    appState.formStatus.currentStep = newStep

    formSteps.forEach(elem => elem.classList.remove('active'));

    stepIndicators.forEach(elem => elem.classList.remove('active'));


    const selector = `[data-step="${newStep}"]`;

    // استفاده از querySelectorAll برای پیدا کردن تمام المان‌های مرتبط
    const stepElements = document.querySelectorAll(selector);

    // پیمایش روی NodeList و اضافه کردن کلاس 'active'
    stepElements.forEach(element => {
        element.classList.add('active');
    });

    if (newStep >= 1 && newStep <= 2) {

        nextBtn.style.display = 'block'
    }


    if (newStep > 1) {
        prevBtn.style.display = 'block'
    }

    if (newStep === 3) {

        submitBtn.style.display = 'block'

    }



}