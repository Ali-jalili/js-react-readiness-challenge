
// این ماژول تنها مسئول نمایش وضعیت (State) فعلی در DOM است.

// 1. تعریف ثابت‌های DOM
// المانی که محتوای داینامیک (لودینگ، خطا، داده) در آن تزریق می‌شود.
const contentArea = document.querySelector('#content-area');

// کانتینر تب‌ها برای مدیریت کلاس 'active'.
const tabContainer = document.querySelector('#tab-container');



export const renderPosts = (postsArray) => {

    const postItemsHTML = postsArray.map(post => {

        return `
            <li>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </li>
        `
    }).join('')

    return `<div class="posts-list-container"><ul>${postItemsHTML}</ul></div>`;

} 