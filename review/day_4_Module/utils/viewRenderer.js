//ماژول مدیریت DOM





const productListContainer = document.getElementById('product-list-container')


export const renderProducts = function (productsList) {

    productListContainer.innerHTML = '';

    productsList.forEach(item => {

        const productElement = document.createElement('div');

        productElement.textContent = `${item.name}`

        productListContainer.append(productElement)




    })



}

