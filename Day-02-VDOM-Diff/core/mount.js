// Day-02-VDOM-Diff/core/mount.js (نسخه نهایی و قطعی)

export const mount = function (vnode, container) {

    // ⭐⭐ گارد ایمنی نهایی: اگر ورودی یک رشته بود (مثل فراخوانی از diff) ⭐⭐
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        container.appendChild(textNode);

        // چون این یک رشته است، نمی توانیم el را روی آن ذخیره کنیم.
        // در این حالت، ما باید آن را به یک VNode آبجکتی موقت تبدیل کنیم تا در diff ذخیره شود.
        // اما از آنجا که diff انتظار دارد mount چیزی را به DOM بچسباند، همین کافی است. 
        // در diff، باید oldVNode آبجکتی باشد تا بتواند newVNode (رشته) را مقایسه کند.
        return textNode;
    }
    // ⭐⭐ پایان گارد ایمنی ⭐⭐

    // 1. مدیریت VNode متنی (Text VNode Object) - که در حلقه فرزندان ساخته شده
    if (vnode.type === 'text') {
        const textNode = document.createTextNode(vnode.children);
        container.appendChild(textNode);
        vnode.el = textNode;
        return textNode;
    }

    // 2. ساخت المان واقعی (Element VNode)
    const el = document.createElement(vnode.type);

    // 3. مدیریت صفات (Props)
    for (let key in vnode.props) {
        // ... (منطق Props شما)
        const value = vnode.props[key];
        if (key.startsWith('on')) {
            const eventName = key.substring(2).toLowerCase();
            el.addEventListener(eventName, value);
        } else {
            el.setAttribute(key, value);
        }
    }

    // 4. مدیریت فرزندان (Children)
    const children = vnode.children || [];

    for (let i = 0; i < children.length; i++) {
        let child = children[i];

        if (typeof child === 'string') {
            const textNode = document.createTextNode(child);
            el.appendChild(textNode);

            // تبدیل رشته به VNode آبجکتی برای نگهداری 'el'
            vnode.children[i] = {
                type: 'text',
                el: textNode,
                children: child
            };
        }
        else {
            mount(child, el);
        }
    }

    // 5. الحاق به DOM و ذخیرهٔ اشاره‌گر (فقط برای VNodeهای آبجکتی)
    container.appendChild(el);
    vnode.el = el;
    return el;
}