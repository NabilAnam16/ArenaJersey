const products = [
    {
        id: 1,
        title: "Jersey Arsenal 2000-2001 Away",
        price: 1600000,
        image: "arsenal_dreamcast.jpg"
    },
    {
        id: 2,
        title: "Jersey Bola - Away Edition",
        price: 245000,
        image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        title: "Celana Training Premium",
        price: 150000,
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        title: "Jaket Olahraga Timnas",
        price: 350000,
        image: "https://images.unsplash.com/photo-1556822284-ce444005b5db?auto=format&fit=crop&q=80&w=400"
    }
];

let cart = [];

// Format Currency
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// Render Products
const renderProducts = () => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productEl = document.createElement('div');
        productEl.classList.add('product-card');

        productEl.innerHTML = 