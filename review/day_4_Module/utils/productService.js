//ماژول مدیریت داده‌ها و منطق فیلتر

const MASTER_PRODUCTS = [
    { id: 101, name: "لپ‌تاپ گیمینگ X50", category: "electronics" },
    { id: 102, name: "کتاب معماری تمیز", category: "books" },
    { id: 103, name: "هدفون بلوتوثی مدل Pro", category: "electronics" },
    { id: 104, name: "تی‌شرت نخی مردانه", category: "clothing" },
    { id: 105, name: "کتاب راهنمای جاوااسکریپت", category: "books" },
    { id: 106, name: "شارژر پرتابل 10000mAh", category: "electronics" },
    { id: 107, name: "شلوار جین زنانه", category: "clothing" }
];


// activeFilter کارش اینکه هنگام فیلتر مشخص کنه کدوم دسته بندی فعال باشه

let activeFilter = 'all';


//گرفتن کل محصولات توسط ماژول دیگه

export const getProducts = function () {

    return MASTER_PRODUCTS

}



//ماژول‌های دیگر با فراخوانی این تابع، وضعیت activeFilter را تغییر می‌دهند

export const setActiveFilter = function (category) {

    return activeFilter = category



}



//مسئول برگرداندن لیست محصولات فیلتر شده است


export const getFilteredProducts = function () {


    if (activeFilter === 'all') {
        return getProducts()
    }

    else {

        const filterProduct = MASTER_PRODUCTS.filter(item => item.category === activeFilter)

        return filterProduct
    }



}



