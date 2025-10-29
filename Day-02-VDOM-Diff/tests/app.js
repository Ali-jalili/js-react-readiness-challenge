import { h } from "../core/h.js";
import { mount } from "../core/mount.js";


// 1. ساختار ساده: یک تگ h1 با متن
const VNode1 = h('h1', { id: 'title' }, 'Hello VDOM!');

// 2. ساختار تودرتو: یک div با دو فرزند
const VNode2 = h('div', { class: 'container' }, [
    VNode1, // فرزند اول: VNode1
    h('p', null, 'This is a child paragraph.') // فرزند دوم: یک VNode دیگر
]);



console.log();
