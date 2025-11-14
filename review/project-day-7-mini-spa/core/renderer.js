
// این ماژول تنها مسئول نمایش وضعیت (State) فعلی در DOM است.

import { getState } from "./state.js";

// 1. تعریف ثابت‌های DOM
// المانی که محتوای داینامیک (لودینگ، خطا، داده) در آن تزریق می‌شود.
const contentArea = document.querySelector('#content-area');

// کانتینر تب‌ها برای مدیریت کلاس 'active'.
const tabContainer = document.querySelector('#tab-container');

const allTabButtons = document.querySelectorAll('.tab-button');


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


export const renderUI = function () {

    const state = getState();



    allTabButtons.forEach(button => button.classList.remove('active'));


    const activeTabElement = document.querySelector(`[data-tab-id="${state.activeTab}"]`);

    activeTabElement.classList.add('active');

    let content = '';

    if (state.isLoading) {

        content = `<div class='loader'> </div> `

    }

    else if (state.error) {

        content = `<div class="error-message"> </div>`

    }

    else {

        if (state.activeTab === 'profile') {

            content = `
        <div class="profile-card">
            <h2>${state.data.name}</h2>
            <p>@${state.data.username}</p>
            <p>${state.data.bio}</p>
            <p>${state.data.location}</p>
            <p>${state.data.registration_date}</p>
        </div>
    `;
        }

        else if (state.activeTab === 'posts') {

            content = renderPosts(state.data)
        }

        else {
            content = `
                <div class="static-settings">
                    <h2>تنظیمات کاربری</h2>
                    <p>این بخش استاتیک است و نیازی به واکشی داده ندارد.</p>
                </div>
            `;
        }


    }

    contentArea.innerHTML = content




}