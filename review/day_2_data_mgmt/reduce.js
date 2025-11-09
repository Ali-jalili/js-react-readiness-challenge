const products = [

    { name: 'Laptop', price: 1200, category: 'Electronics', stock: 5 },
    { name: 'T-shirt', price: 25, category: 'Apparel', stock: 20 },
    { name: 'Monitor', price: 300, category: 'Electronics', stock: 10 },
    { name: 'Jeans', price: 70, category: 'Apparel', stock: 15 },
    { name: 'Mouse', price: 40, category: 'Electronics', stock: 30 },
];




const funProduct = function (products) {

    const totalStok = products.reduce((accumulator, stock) => {

        return accumulator += stock.stock;


    }, 0)


    return totalStok;

}


console.log(funProduct(products));


